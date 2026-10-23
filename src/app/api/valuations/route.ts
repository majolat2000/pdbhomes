import { NextRequest, NextResponse } from "next/server";
import { createValuation } from "@/lib/db";

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
      city: body.city || "Beverly Hills",
      state: body.state || "CA",
      postalCode: body.postalCode || "90210",
      propertyType: body.propertyType || "HOUSE",
      bedrooms: Number(body.bedrooms) || 3,
      bathrooms: Number(body.bathrooms) || 2.5,
      squareFeet: Number(body.squareFeet),
      condition: body.condition || "EXCELLENT",
      ownerName: body.ownerName,
      email: body.email,
      phone: body.phone,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your home valuation report is ready. A detailed comparative market analysis will be emailed to you.",
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
