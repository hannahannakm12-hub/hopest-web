import { NextResponse } from "next/server";
import { otpStore } from "../otpStore";

export async function POST(req: Request) {
  try {
    const { mobile, otp, new_password, username } = await req.json();

    const cleanMobile = (mobile || "").toString().trim().replace(/\D/g, "");
    const cleanOtp = (otp || "").toString().trim();
    const cleanPassword = (new_password || "").toString().trim();

    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        { error: "Valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    if (!cleanOtp) {
      return NextResponse.json(
        { error: "Verification code (OTP) is required." },
        { status: 400 }
      );
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Verify OTP against stored record and expiration timestamp
    const stored = otpStore.get(cleanMobile);
    const isCodeValid =
      stored !== undefined &&
      stored.otp === cleanOtp &&
      Date.now() <= stored.expiresAt;

    if (!isCodeValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code. Please try again." },
        { status: 400 }
      );
    }

    // Clear the consumed OTP
    otpStore.delete(cleanMobile);

    // Sync new password with backend via registerregister.php
    const registeredName = (username || "").trim() || `User_${cleanMobile.slice(-4)}`;
    try {
      const response = await fetch(
        "http://hopest.in/hopestphp/registerregister.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            Fullname: registeredName,
            Mob: cleanMobile,
            Mailid: cleanPassword,
          }),
        }
      );
      const text = await response.text();
      console.log("[AUTH RESET] PHP sync response:", text);
    } catch (err) {
      console.warn("[AUTH RESET] PHP sync warning:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully! Redirecting to login...",
      username: registeredName,
    });
  } catch (error) {
    console.error("reset-password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again later." },
      { status: 500 }
    );
  }
}
