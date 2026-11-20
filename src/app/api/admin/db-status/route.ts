import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const session = verifyAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const configured = isSupabaseConfigured();
  if (!configured || !supabase) {
    return NextResponse.json({
      success: false,
      status: "NOT_CONFIGURED",
      message: "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing.",
    });
  }

  try {
    const { count, error } = await supabase.from("properties").select("*", { count: "exact", head: true });
    if (error) {
      return NextResponse.json({
        success: false,
        status: "ERROR",
        message: error.message,
        hint: "Please ensure db/supabase_schema.sql has been executed in your Supabase SQL Editor and project is unpaused.",
      });
    }

    return NextResponse.json({
      success: true,
      status: "CONNECTED",
      message: "Connected to Supabase PostgreSQL database.",
      propertiesCount: count || 0,
    });
  } catch (err: any) {
    const isDnsError = err?.cause?.code === "ENOTFOUND" || err?.message?.includes("ENOTFOUND") || err?.message?.includes("fetch failed");
    return NextResponse.json({
      success: false,
      status: "UNREACHABLE",
      message: isDnsError
        ? "Supabase project paused or domain unreachable. Please unpause project in Supabase dashboard."
        : err?.message || "Connection failed",
      error: String(err),
    });
  }
}
