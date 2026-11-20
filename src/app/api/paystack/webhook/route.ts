import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";
import { confirmLeadPayment } from "@/lib/db";
import { notifyConsultationPaymentSuccess } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    const isValid = verifyPaystackWebhookSignature(rawBody, signature);

    if (!isValid) {
      console.warn("Invalid Paystack webhook signature detected");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const data = payload.data;

    // Handle successful charge
    if (event === "charge.success" && data) {
      const amountInNaira = Math.round((data.amount || 0) / 100);
      const metadata = data.metadata || {};
      const fullName = metadata.fullName || data.customer?.first_name || "Valued Client";
      const phone = metadata.phone || data.customer?.phone || "";
      const email = data.customer?.email || metadata.email || "";
      const purpose = metadata.purpose || "Real Estate Consultation";
      const bookingId = metadata.bookingId || "";

      // Mark payment in database
      await confirmLeadPayment({
        bookingId,
        reference: data.reference,
        amount: amountInNaira,
        phone,
        email,
      });

      // Notify admins
      notifyConsultationPaymentSuccess({
        reference: data.reference,
        amount: amountInNaira,
        fullName,
        phone,
        email,
        purpose,
        bookingId,
        paidAt: data.paid_at,
        channel: data.channel,
      }).catch((err) => console.warn("Webhook notification error:", err));

      console.log(`Paystack webhook: verified payment for ${data.reference} (₦${amountInNaira})`);
    }

    // Always acknowledge receipt to Paystack with 200 OK
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Paystack webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler encountered an error" },
      { status: 500 }
    );
  }
}
