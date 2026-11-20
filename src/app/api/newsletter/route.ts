import { NextRequest, NextResponse } from "next/server";
import {
  addNewsletterSubscriber,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
} from "@/lib/db";
import { notifyNewSubscriber } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const subscribers = await getNewsletterSubscribers();
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const result = await addNewsletterSubscriber(email, source || "Footer Property Alerts");

    if (result.isNew) {
      notifyNewSubscriber(email.trim().toLowerCase(), source || "Footer Property Alerts").catch(
        (err) => console.warn("Newsletter subscription notification error:", err)
      );
    }

    return NextResponse.json({
      success: true,
      message: result.isNew
        ? "Thank you for subscribing! You will receive updates on new verified properties."
        : "You are already subscribed to PDB Homes property alerts.",
      data: result.data,
      isNew: result.isNew,
    });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to register subscription." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Subscriber ID is required." },
        { status: 400 }
      );
    }

    await deleteNewsletterSubscriber(id);
    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete subscriber." },
      { status: 500 }
    );
  }
}
