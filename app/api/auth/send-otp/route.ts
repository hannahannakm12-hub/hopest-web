import { NextResponse } from "next/server";
import { otpStore } from "../otpStore";

export async function POST(req: Request) {
  try {
    const { mobile } = await req.json();

    const cleanMobile = (mobile || "").toString().trim().replace(/\D/g, "");

    // Validate 10-digit Indian mobile number
    if (!cleanMobile || cleanMobile.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Generate secure 6-digit numeric verification code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    const apiKey = process.env.FAST2SMS_API_KEY?.trim();
    const isProduction = process.env.NODE_ENV === "production";

    // 1. If FAST2SMS_API_KEY is configured, dispatch real SMS via Fast2SMS
    if (apiKey) {
      try {
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: "otp",
            variables_values: otp,
            numbers: cleanMobile,
          }),
        });

        const result = await response.json().catch(() => null);

        // Check if Fast2SMS rejected the request or returned an error
        if (!response.ok || !result || result.return !== true) {
          const errorMessage =
            Array.isArray(result?.message)
              ? result.message.join(", ")
              : typeof result?.message === "string"
              ? result.message
              : "Unable to deliver SMS verification code. Please check your mobile number or try again later.";

          console.error("[AUTH] Fast2SMS dispatch failed:", errorMessage);

          // In local development, do not block the developer from testing password reset
          // if Fast2SMS requires website verification/KYC or minimum ₹100 wallet recharge.
          if (!isProduction) {
            otpStore.set(cleanMobile, { otp, expiresAt });
            console.warn(
              `[AUTH DEV FALLBACK] Fast2SMS account notice: "${errorMessage}". Stored local test OTP ${otp} for +91 ${cleanMobile}.`
            );

            return NextResponse.json({
              success: true,
              warning: errorMessage,
              message: "Verification code ready. Enter your new password below.",
              code: otp,
            });
          }

          // In production, return real provider error
          return NextResponse.json(
            { error: errorMessage },
            { status: 502 }
          );
        }

        // SMS dispatched successfully: persist OTP for verification
        otpStore.set(cleanMobile, { otp, expiresAt });

        if (!isProduction) {
          console.log(
            `[AUTH] SMS dispatched to ${cleanMobile} via Fast2SMS (Req ID: ${result.request_id || "ok"})`
          );
        }

        return NextResponse.json({
          success: true,
          message: `Verification code sent via SMS to +91 ${cleanMobile}.`,
        });
      } catch (smsError: any) {
        console.error("[AUTH] Fast2SMS network error:", smsError?.message || smsError);

        if (!isProduction) {
          otpStore.set(cleanMobile, { otp, expiresAt });
          return NextResponse.json({
            success: true,
            warning: "Fast2SMS network issue. Fallback test code provided.",
            message: "Fast2SMS gateway network error. Local test code generated.",
            code: otp,
          });
        }

        return NextResponse.json(
          { error: "SMS gateway communication failure. Please try again later." },
          { status: 502 }
        );
      }
    }

    // 2. If API Key is missing in production environment:
    if (isProduction) {
      console.error("[AUTH] FAST2SMS_API_KEY environment variable is not configured.");
      return NextResponse.json(
        { error: "SMS service is not configured. Please contact support." },
        { status: 503 }
      );
    }

    // 3. Local Development Mode (when FAST2SMS_API_KEY is not yet populated in .env.local):
    console.warn(
      `[AUTH DEV MODE] FAST2SMS_API_KEY is not set in .env.local. Simulating OTP for +91 ${cleanMobile}.`
    );
    otpStore.set(cleanMobile, { otp, expiresAt });

    return NextResponse.json({
      success: true,
      message: `[Dev Mode] Verification code generated for +91 ${cleanMobile}. Add FAST2SMS_API_KEY to .env.local for real SMS.`,
      code: otp, // Only exposed in local development when no API key is configured
    });
  } catch (error: any) {
    console.error("[AUTH] send-otp error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
