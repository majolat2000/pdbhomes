import { NextRequest, NextResponse } from "next/server";
import { createValuation, getValuations } from "@/lib/db";

export async function GET() {
  try {
    const valuations = await getValuations();
    return NextResponse.json({ success: true, count: valuations.length, data: valuations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load valuations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.address || !body.squareFeet || !body.ownerName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Address, square footage, owner name, email, and phone are required." },
        { status: 400 }
      );
    }

    const valuation = await createValuation({
      address: body.address,
      city: body.city || "Ikoyi",
      state: body.state || "Lagos",
      postalCode: body.postalCode || "",
      propertyType: body.propertyType || "DETACHED_DUPLEX",
      bedrooms: Number(body.bedrooms) || 4,
      bathrooms: Number(body.bathrooms) || 4.5,
      squareFeet: Number(body.squareFeet),
      condition: body.condition || "EXCELLENT",
      ownerName: body.ownerName,
      email: body.email,
      phone: body.phone,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your home valuation assessment has been generated. A private advisory report will be emailed to you.",
        data: valuation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process home valuation" },
      { status: 500 }
    );
  }
}
