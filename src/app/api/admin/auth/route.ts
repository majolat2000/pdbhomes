import { NextResponse } from "next/server";
import { verifyAdminCredentials, changeAdminPassword, getAdminsList } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "login";
    const body = await req.json();

    if (action === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required." },
          { status: 400 }
        );
      }

      const admin = await verifyAdminCredentials(email, password);
      if (!admin) {
        return NextResponse.json(
          { success: false, error: "Invalid admin credentials." },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        data: admin,
      });
    }

    if (action === "change_password") {
      const { email, currentPassword, newPassword } = body;
      if (!email || !currentPassword || !newPassword) {
        return NextResponse.json(
          { success: false, error: "All password fields are required." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const result = await changeAdminPassword(email, currentPassword, newPassword);
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Failed to update password." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Password updated successfully.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Unsupported action." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Admin Auth API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admins = await getAdminsList();
    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
