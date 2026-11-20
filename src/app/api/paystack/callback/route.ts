import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { confirmLeadPayment } from "@/lib/db";
import { notifyConsultationPaymentSuccess } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || (host ? `${proto}://${host}` : "https://pdbhomes.com.ng");

  if (!reference) {
    return NextResponse.redirect(`${appUrl}/consultation?status=cancelled`);
  }

  try {
    const paystackRes = await verifyPaystackTransaction(reference);

    if (paystackRes.status && paystackRes.data && paystackRes.data.status === "success") {
      const tx = paystackRes.data;
      const amountInNaira = Math.round(tx.amount / 100);
      const metadata = tx.metadata || {};
      const fullName = metadata.fullName || tx.customer?.first_name || "Valued Client";
      const phone = metadata.phone || tx.customer?.phone || "";
      const email = tx.customer?.email || metadata.email || "";
      const purpose = metadata.purpose || "Real Estate Consultation";
      const bookingId = metadata.bookingId || "";

      // Confirm payment in database
      await confirmLeadPayment({
        bookingId,
        reference: tx.reference,
        amount: amountInNaira,
        phone,
        email,
      });

      // Send admin notification
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
      }).catch((err) => console.warn("Callback payment notification error:", err));

      const redirectParams = new URLSearchParams({
        status: "success",
        reference: tx.reference,
        amount: amountInNaira.toString(),
        name: fullName,
        phone,
        bookingId,
      });

      return NextResponse.redirect(`${appUrl}/consultation?${redirectParams.toString()}`);
    } else {
      return NextResponse.redirect(
        `${appUrl}/consultation?status=failed&reference=${encodeURIComponent(reference)}`
      );
    }
  } catch (error) {
    console.error("Paystack callback verification error:", error);
    return NextResponse.redirect(
      `${appUrl}/consultation?status=error&reference=${encodeURIComponent(reference)}`
    );
  }
}
