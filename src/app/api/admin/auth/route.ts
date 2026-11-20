import { NextResponse } from "next/server";
import { verifyAdminCredentials, changeAdminPassword, getAdminsList } from "@/lib/db";
import { createAdminToken, verifyAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

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

      const token = createAdminToken(admin.email, admin.role);

      const res = NextResponse.json({
        success: true,
        token,
        data: admin,
      });

      // Secure HTTP-Only cookie
      res.cookies.set("pdb_admin_token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return res;
    }

    if (action === "change_password") {
      // Require authenticated admin session to change password
      const session = verifyAdminSession(req);
      if (!session) {
        return NextResponse.json(
          { success: false, error: "Unauthorized. Please log in to change your password." },
          { status: 401 }
        );
      }

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

    if (action === "logout") {
      const res = NextResponse.json({ success: true, message: "Logged out successfully" });
      res.cookies.delete("pdb_admin_token");
      return res;
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

export async function GET(req: Request) {
  try {
    const session = verifyAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

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
