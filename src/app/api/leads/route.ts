import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "First name, last name, email, and phone are required." },
        { status: 400 }
      );
    }

    const lead = await createLead({
      propertyId: body.propertyId,
      agentId: body.agentId,
      leadType: body.leadType || "SCHEDULE_VIEWING",
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      message: body.message,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. A PDB Homes private client advisor will contact you promptly.",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
