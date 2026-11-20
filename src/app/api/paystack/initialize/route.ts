import { NextRequest, NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, amount, bookingId, fullName, phone, purpose, notes } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid payment amount is required." },
        { status: 400 }
      );
    }

    // Paystack requires a valid email. If client did not enter one, generate a clean fallback email
    const safeEmail =
      email && email.includes("@")
        ? email.trim()
        : `${(phone || "client").replace(/[^0-9]/g, "") || Date.now()}@consultation.pdbhomes.com.ng`;

    // Construct origin or fall back to production domain
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || (host ? `${proto}://${host}` : "https://pdbhomes.com.ng");

    // Standard callback URL for Paystack redirect
    const callbackUrl = `${appUrl}/api/paystack/callback`;

    // Generate unique reference
    const reference = `PDB-PAY-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const paystackRes = await initializePaystackTransaction({
      email: safeEmail,
      amount: Number(amount),
      callbackUrl,
      reference,
      metadata: {
        bookingId: bookingId || `PDB-${Date.now().toString().slice(-6)}`,
        fullName: fullName || "Valued Client",
        phone: phone || "",
        purpose: purpose || "Real Estate Consultation",
        notes: notes || "",
        custom_fields: [
          { display_name: "Client Name", variable_name: "client_name", value: fullName || "Client" },
          { display_name: "WhatsApp Number", variable_name: "whatsapp_number", value: phone || "N/A" },
          { display_name: "Purpose", variable_name: "purpose", value: purpose || "General Consultation" },
          { display_name: "Booking Ref", variable_name: "booking_ref", value: bookingId || reference },
        ],
      },
    });

    if (!paystackRes.status || !paystackRes.data) {
      return NextResponse.json(
        {
          success: false,
          error: paystackRes.message || "Failed to initialize Paystack checkout session.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        authorization_url: paystackRes.data.authorization_url,
        access_code: paystackRes.data.access_code,
        reference: paystackRes.data.reference,
      },
    });
  } catch (error: any) {
    console.error("Paystack initialization error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error while initializing payment.",
      },
      { status: 500 }
    );
  }
}
