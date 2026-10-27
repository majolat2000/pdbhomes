import { NextRequest, NextResponse } from "next/server";
import { createLead, getLeads, updateLeadStatus } from "@/lib/db";
import { notifyNewLead } from "@/lib/notifications";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load inquiries" },
      { status: 500 }
    );
  }
}

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

    // Notify admins (precolat@gmail.com and info@pdbhomes.com) without blocking
    notifyNewLead(lead).catch((err) => {
      console.warn("Notification dispatch error:", err);
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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 });
    }

    await updateLeadStatus(body.id, body.status);
    return NextResponse.json({ success: true, message: "Lead status updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
