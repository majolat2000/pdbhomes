import { NextRequest, NextResponse } from "next/server";
import { createClientRequest, getClientRequests, updateClientRequestStatus } from "@/lib/db";
import { notifyNewPropertyRequest } from "@/lib/notifications";

export async function GET() {
  try {
    const requests = await getClientRequests();
    return NextResponse.json({ success: true, count: requests.length, data: requests });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.clientName || !body.email || !body.phone || !body.requestIntent || !body.targetLocation) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, email, phone, location, and request type (Buy/Sell)." },
        { status: 400 }
      );
    }

    const saved = await createClientRequest({
      requestIntent: body.requestIntent,
      propertyType: body.propertyType || "Luxury Residence",
      targetLocation: body.targetLocation,
      budgetMin: body.budgetMin ? Number(body.budgetMin) : undefined,
      budgetMax: body.budgetMax ? Number(body.budgetMax) : undefined,
      sellingPrice: body.sellingPrice ? Number(body.sellingPrice) : undefined,
      bedrooms: body.bedrooms ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : undefined,
      additionalNotes: body.additionalNotes || undefined,
      clientName: body.clientName,
      email: body.email,
      phone: body.phone,
      preferredTimeline: body.preferredTimeline || "Immediate",
    });

    // Notify admins (precolat@gmail.com and info@pdbhomes.com) without blocking
    notifyNewPropertyRequest(saved).catch((err) => {
      console.warn("Notification dispatch error:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your property request has been dispatched to our private client desk. An advisor will contact you within 2 hours.",
        data: saved,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit property request" },
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

    await updateClientRequestStatus(body.id, body.status);
    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
