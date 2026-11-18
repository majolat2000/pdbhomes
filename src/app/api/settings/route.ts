import { NextRequest, NextResponse } from "next/server";
import { getConsultationFee, updateConsultationFee } from "@/lib/db";

export async function GET() {
  try {
    const fee = await getConsultationFee();
    return NextResponse.json({
      success: true,
      consultationFee: fee,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fee = Number(body.consultationFee);

    if (isNaN(fee) || fee < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid consultation fee amount." },
        { status: 400 }
      );
    }

    const result = await updateConsultationFee(fee);
    return NextResponse.json({
      success: true,
      consultationFee: result.fee,
      message: "Consultation price updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}
