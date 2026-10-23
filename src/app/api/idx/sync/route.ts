import { NextRequest, NextResponse } from "next/server";
import { addProperty } from "@/lib/db";
import { Property } from "@/types";
import { agents } from "@/lib/data/agents";
import { slugify } from "@/lib/utils";

/**
 * Standardized RESO Web API / MLS Webhook Ingestion Endpoint
 * Accepts syndicated property payloads from MLS providers (CRMLS, OneKey MLS, Miami Realtors, etc.)
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (!payload.mlsId || !payload.title || !payload.price) {
      return NextResponse.json(
        { success: false, error: "Invalid MLS payload: missing required fields (mlsId, title, price)" },
        { status: 400 }
      );
    }

    const normalizedProperty: Property = {
      id: `prop-mls-${payload.mlsId}`,
      mlsId: payload.mlsId,
      title: payload.title,
      slug: slugify(payload.title),
      description: payload.description || "Syndicated luxury property via MLS data exchange.",
      propertyType: payload.propertyType || "HOUSE",
      listingStatus: payload.listingStatus || "FOR_SALE",
      price: Number(payload.price),
      bedrooms: Number(payload.bedrooms) || 3,
      bathrooms: Number(payload.bathrooms) || 2.5,
      squareFeet: Number(payload.squareFeet) || 3500,
      yearBuilt: Number(payload.yearBuilt) || 2020,
      address: payload.address || "Exclusive Address Upon Request",
      city: payload.city || "Beverly Hills",
      state: payload.state || "CA",
      postalCode: payload.postalCode || "90210",
      country: "United States",
      latitude: Number(payload.latitude) || 34.0736,
      longitude: Number(payload.longitude) || -118.4004,
      isFeatured: Boolean(payload.isFeatured),
      isExclusive: Boolean(payload.isExclusive),
      primaryImage: payload.primaryImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      images: payload.images || [
        { url: payload.primaryImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80", isPrimary: true }
      ],
      amenities: payload.amenities || ["Smart Home Automation", "Private Security Gate"],
      mlsMetadata: payload.metadata || {},
      agent: agents[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await addProperty(normalizedProperty);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully ingested MLS listing ${saved.mlsId}`,
        data: saved,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to ingest MLS record" },
      { status: 500 }
    );
  }
}
