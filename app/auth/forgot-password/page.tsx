
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/send-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setStep(2);
    } else {
      setMessage(data.error);
    }
  };

  const handleResetPassword = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp, new_password: newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      // Redirect to login with username prefilled
      setTimeout(() => {
        router.push(`/auth/login?username=${data.username}`);
      }, 1500);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>

      {step === 1 && (
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleSendOtp} className="bg-blue-500 text-white p-2 rounded">
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleResetPassword} className="bg-green-500 text-white p-2 rounded">
            Reset Password
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}