import { NextRequest, NextResponse } from "next/server";
import { getProperties, addProperty } from "@/lib/db";
import { PropertyFilterParams } from "@/types";

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
    const newProperty = await addProperty(body);
    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add property" },
      { status: 400 }
    );
  }
}
