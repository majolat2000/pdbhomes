import { NextRequest, NextResponse } from "next/server";
import { getProperties, addProperty, deleteProperty, loadDemoNigerianListings, clearAllListings } from "@/lib/db";
import { PropertyFilterParams } from "@/types";
import { slugify } from "@/lib/utils";
import { agents } from "@/lib/data/agents";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const params: PropertyFilterParams = {
      location: searchParams.get("location") || undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      listingStatus: searchParams.get("listingStatus") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
      bathrooms: searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : undefined,
      sortBy: (searchParams.get("sortBy") as any) || undefined,
    };

    const rawAmenities = searchParams.get("amenities");
    if (rawAmenities) {
      params.amenities = rawAmenities.split(",").map((s) => s.trim());
    }

    const properties = await getProperties(params);
    return NextResponse.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Special action from admin dashboard: load demo listings
    if (body.action === "LOAD_DEMO") {
      const demoLoaded = await loadDemoNigerianListings();
      return NextResponse.json({
        success: true,
        message: "Loaded Nigerian demo luxury listings successfully",
        data: demoLoaded,
      });
    }

    if (body.action === "CLEAR_ALL") {
      await clearAllListings();
      return NextResponse.json({
        success: true,
        message: "Cleared all listings",
      });
    }

    if (!body.title || !body.price || !body.city || !body.state) {
      return NextResponse.json(
        { success: false, error: "Title, Price, City, and State are required." },
        { status: 400 }
      );
    }

    const newProperty = await addProperty({
      id: body.id || `prop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mlsId: body.mlsId || `PDB-NG-${Math.floor(1000 + Math.random() * 9000)}`,
      title: body.title,
      slug: slugify(body.title) + `-${Math.random().toString(36).substr(2, 4)}`,
      description: body.description || "Exclusive Nigerian luxury residence managed by PDB Homes.",
      propertyType: body.propertyType || "DETACHED_DUPLEX",
      listingStatus: body.listingStatus || "FOR_SALE",
      price: Number(body.price),
      rentalFrequency: body.rentalFrequency,
      bedrooms: Number(body.bedrooms) || 4,
      bathrooms: Number(body.bathrooms) || 4.5,
      squareFeet: Number(body.squareFeet) || 5000,
      lotSizeAcres: body.lotSizeAcres ? Number(body.lotSizeAcres) : undefined,
      yearBuilt: Number(body.yearBuilt) || 2024,
      address: body.address || "Exclusive Address Upon Request",
      city: body.city,
      state: body.state,
      country: "Nigeria",
      latitude: Number(body.latitude) || 6.45,
      longitude: Number(body.longitude) || 3.43,
      isFeatured: Boolean(body.isFeatured),
      isExclusive: Boolean(body.isExclusive),
      primaryImage: body.primaryImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      images: body.images || [
        { url: body.primaryImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", isPrimary: true }
      ],
      amenities: body.amenities || ["Swimming Pool", "24/7 Security", "Clean Title"],
      agent: agents.find((a) => a.id === body.agentId) || agents[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add property" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Property ID required" }, { status: 400 });
    }

    await deleteProperty(id);
    return NextResponse.json({ success: true, message: "Property removed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
