import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { confirmLeadPayment } from "@/lib/db";
import { notifyConsultationPaymentSuccess } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Payment reference is required." },
        { status: 400 }
      );
    }

    const paystackRes = await verifyPaystackTransaction(reference);

    if (!paystackRes.status || !paystackRes.data) {
      return NextResponse.json(
        {
          success: false,
          error: paystackRes.message || "Failed to verify transaction with Paystack.",
        },
        { status: 400 }
      );
    }

    const tx = paystackRes.data;
    const isSuccess = tx.status === "success";

    if (isSuccess) {
      const amountInNaira = Math.round(tx.amount / 100);
      const metadata = tx.metadata || {};
      const fullName = metadata.fullName || tx.customer?.first_name || "Valued Client";
      const phone = metadata.phone || tx.customer?.phone || "";
      const email = tx.customer?.email || metadata.email || "";
      const purpose = metadata.purpose || "Real Estate Consultation";
      const bookingId = metadata.bookingId;

      // Update lead status in database
      await confirmLeadPayment({
        bookingId,
        reference: tx.reference,
        amount: amountInNaira,
        phone,
        email,
      });

      // Dispatch email notification to admins
      notifyConsultationPaymentSuccess({
        reference: tx.reference,
        amount: amountInNaira,
        fullName,
        phone,
        email,
        purpose,
        bookingId,
        paidAt: tx.paid_at,
        channel: tx.channel,
      }).catch((err) => console.warn("Consultation payment notification error:", err));
    }

    return NextResponse.json({
      success: isSuccess,
      status: tx.status,
      data: {
        reference: tx.reference,
        amount: Math.round(tx.amount / 100),
        status: tx.status,
        paidAt: tx.paid_at,
        channel: tx.channel,
        currency: tx.currency,
        metadata: tx.metadata,
      },
    });
  } catch (error: any) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error while verifying payment.",
      },
      { status: 500 }
    );
  }
}
