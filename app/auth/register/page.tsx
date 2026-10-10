"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // User-friendly popup state
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const [errors, setErrors] = useState({
    username: "",
    mobile: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      mobile: "",
      password: "",
    };

    let isValid = true;

    // Username Validation
    if (username.trim() === "") {
      newErrors.username = "Please enter your full name or username";
      isValid = false;
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Mobile Validation
    if (mobile.trim() === "") {
      newErrors.mobile = "Please enter your mobile number";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number";
      isValid = false;
    }

    // Password Validation
    if (password.trim() === "") {
      newErrors.password = "Please enter a password";
      isValid = false;
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          mobile: mobile.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (data.message === "success") {
        // Show clean professional popup
        setPopup({
          isOpen: true,
          type: "success",
          title: "Account Created Successfully!",
          message: `Welcome to Hopest, ${username.trim()}! Your account is ready. Redirecting you to login...`,
        });

        setTimeout(() => {
          router.push(`/auth/login?username=${encodeURIComponent(username.trim())}`);
        }, 1600);
      } else {
        const errorMsg = data.message || "Registration could not be completed. Please try again.";
        setPopup({
          isOpen: true,
          type: "error",
          title: "Registration Failed",
          message: errorMsg,
        });
      }
    } catch (error) {
      console.error(error);
      setPopup({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: "Unable to reach the server. Please check your network and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between animated-gradient px-4 py-6 sm:py-8">
      
      {/* TOP HEADER WITH BACK TO LANDING BUTTON */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/landing")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#d89b52] hover:text-white border border-[#d89b52]/30 backdrop-blur-md text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Landing Page</span>
        </button>

        <span className="text-xs font-mono text-amber-200/80 tracking-widest hidden sm:inline uppercase">
          Hopest Portal
        </span>
      </div>

      {/* GREETING TITLE */}
      <div className="text-center pt-8 sm:pt-10 animate-modern">
        <h1 className="text-4xl sm:text-5xl font-serif text-[#d89b52] tracking-tight">
          Hello Register!
        </h1>
        <p className="text-xs sm:text-sm text-[#c9bfb6] mt-2 max-w-sm mx-auto">
          Create your free Hopest account to start reporting and discovering lost items.
        </p>
      </div>

      {/* REGISTER CARD */}
      <div className="flex justify-center items-center my-6">
        <div className="w-full max-w-md bg-[#f4efe9] text-[#3b2a21] rounded-3xl p-8 sm:p-10 shadow-2xl animate-modern animate-float border border-[#e5dcd3]">
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* USERNAME */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-[#3b2a21] mb-2">
                FULL NAME / USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: "" });
                }}
                className={`w-full bg-transparent border-b py-2 pr-8 outline-none text-[#3b2a21] placeholder-[#a89f91] caret-[#6b3f23] transition text-sm sm:text-base ${
                  errors.username
                    ? "border-red-500"
                    : "border-[#c9bfb6] focus:border-[#6b3f23]"
                }`}
              />
              <User
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* MOBILE */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-[#3b2a21] mb-2">
                REGISTERED MOBILE (+91)
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setMobile(value);
                    if (errors.mobile) setErrors({ ...errors, mobile: "" });
                  }
                }}
                className={`w-full bg-transparent border-b py-2 pr-8 outline-none text-[#3b2a21] placeholder-[#a89f91] caret-[#6b3f23] transition text-sm sm:text-base font-mono ${
                  errors.mobile
                    ? "border-red-500"
                    : "border-[#c9bfb6] focus:border-[#6b3f23]"
                }`}
              />
              <Phone
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-[#3b2a21] mb-2">
                PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={`w-full bg-transparent border-b py-2 pr-16 outline-none text-[#3b2a21] placeholder-[#a89f91] caret-[#6b3f23] transition text-sm sm:text-base ${
                  errors.password
                    ? "border-red-500"
                    : "border-[#c9bfb6] focus:border-[#6b3f23]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-[#6b3f23] hover:text-[#3b2a21] text-xs font-semibold cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl text-white font-medium shimmer-button hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-xs sm:text-sm text-[#6b3f23] pt-2 border-t border-[#e2d5c7]">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="font-bold cursor-pointer hover:underline ml-1"
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-xs text-[#c9bfb6] pb-4 animate-modern">
        © 2026 HOPEST - hope for the best
      </footer>

      {/* USER-FRIENDLY PROFESSIONAL POPUP MODAL */}
      {popup?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#f4efe9] text-[#3b2a21] rounded-3xl p-7 sm:p-8 shadow-2xl border border-[#e5dcd3] text-center animate-modern animate-float relative">
            
            {/* ICON BADGE */}
            {popup.type === "success" ? (
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle2 size={32} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-400 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                <AlertCircle size={32} />
              </div>
            )}

            {/* TITLE & MESSAGE */}
            <h3 className="text-xl sm:text-2xl font-serif text-[#3b2a21] font-bold">
              {popup.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6b5240] mt-2 leading-relaxed">
              {popup.message}
            </p>

            {/* ACTION / PROGRESS */}
            {popup.type === "success" ? (
              <div className="mt-5 pt-4 border-t border-[#e2d5c7] flex items-center justify-center gap-2 text-xs text-[#8c7565]">
                <span className="w-4 h-4 border-2 border-[#6b3f23] border-t-transparent rounded-full animate-spin"></span>
                <span>Redirecting to login...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPopup(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-[#6b3f23] hover:bg-[#523019] text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
              >
                Close & Fix
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}