import crypto from "crypto";

export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export interface InitializePaystackParams {
  email: string;
  amount: number; // in Naira (e.g. 10000)
  callbackUrl?: string;
  metadata?: Record<string, any>;
  reference?: string;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    status: string;
    reference: string;
    amount: number; // in kobo
    gateway_response: string;
    paid_at: string;
    channel: string;
    currency: string;
    customer: {
      email: string;
      first_name?: string;
      last_name?: string;
      phone?: string;
    };
    metadata?: Record<string, any>;
  };
}

/**
 * Initializes a transaction with Paystack API.
 */
export async function initializePaystackTransaction(
  params: InitializePaystackParams
): Promise<PaystackInitResponse> {
  const amountInKobo = Math.round(params.amount * 100);

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: amountInKobo,
      callback_url: params.callbackUrl,
      reference: params.reference,
      metadata: params.metadata,
    }),
  });

  return await res.json();
}

/**
 * Verifies a transaction reference directly with Paystack API.
 */
export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await res.json();
}

/**
 * Validates HMAC SHA512 signature on incoming Paystack Webhook requests.
 */
export function verifyPaystackWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;
  try {
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");
    return hash === signature;
  } catch (err) {
    console.error("Paystack webhook signature verification error:", err);
    return false;
  }
}
