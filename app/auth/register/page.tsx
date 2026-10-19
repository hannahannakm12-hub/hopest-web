"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { HopestSpinner } from "@/components/HopestLoader";

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
    <div className="relative min-h-screen flex flex-col justify-between bg-[#0c0a09] animated-gradient text-stone-100 px-4 py-6 sm:py-8 overflow-x-hidden selection:bg-[#d89b52]/30 selection:text-[#f8d7a4]">
      {/* =====================================================
          AMBIENT BACKGROUND LIGHTING & GRID TEXTURE
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-[#b67a32]/20 via-[#8b5e3c]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/4 -left-32 w-[450px] h-[450px] bg-[#d89b52]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-[#8b5e3c]/15 blur-[160px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* =====================================================
          TOP HEADER WITH BACK BUTTON & BRAND
      ===================================================== */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/landing")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 hover:text-white border border-amber-500/25 backdrop-blur-md text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm hover:border-amber-400/40"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Hopest"
              width={25}
              height={25}
              className="object-contain rounded"
            />
          </div>
          <span className="text-xs font-mono text-amber-200/90 tracking-widest uppercase font-semibold">
            Hopest Portal
          </span>
        </div>
      </div>

      {/* =====================================================
          GREETING & HERO TITLE
      ===================================================== */}
      <div className="relative z-10 text-center pt-8 sm:pt-10 animate-modern">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-300 mb-3">
          <Sparkles size={12} className="text-amber-400" />
          <span>New Account Registration</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Hello{" "}
          <span className="bg-gradient-to-r from-amber-200 via-[#e5a95d] to-[#d89b52] bg-clip-text text-transparent font-serif">
            Register!
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
          Create your free Hopest account to start reporting and discovering lost items.
        </p>
      </div>

      {/* =====================================================
          REGISTER CARD (Luxury Glassmorphism & Gold Accents)
      ===================================================== */}
      <div className="relative z-10 flex justify-center items-center my-6">
        <div className="group w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1a1714]/95 to-[#12100e]/95 p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.65)] border border-white/[0.09] hover:border-amber-500/35 transition-all duration-300 backdrop-blur-xl animate-modern relative">
          {/* Subtle Golden Glow Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/0 via-amber-500/[0.03] to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <form onSubmit={handleRegister} autoComplete="off" className="relative z-10 space-y-5">
            {/* USERNAME */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400/90 mb-2">
                FULL NAME / USERNAME
              </label>
              <div
                className={`relative flex items-center rounded-2xl bg-[#141210] border transition-all duration-200 shadow-inner ${errors.username
                  ? "border-red-500/80 ring-1 ring-red-500/20"
                  : "border-white/[0.08] focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/15"
                  }`}
              >
                <input
                  type="text"
                  name="fullname"
                  autoComplete="off"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: "" });
                  }}
                  className="w-full bg-transparent px-4 py-3.5 pr-11 text-white placeholder-stone-500 text-sm sm:text-base outline-none"
                />
                <div className="absolute right-3.5 flex items-center pointer-events-none text-amber-400/70">
                  <User size={18} />
                </div>
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1.5 pl-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400/90 mb-2">
                REGISTERED MOBILE (+91)
              </label>
              <div
                className={`relative flex items-center rounded-2xl bg-[#141210] border transition-all duration-200 shadow-inner ${errors.mobile
                  ? "border-red-500/80 ring-1 ring-red-500/20"
                  : "border-white/[0.08] focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/15"
                  }`}
              >
                <input
                  type="tel"
                  name="mobile"
                  autoComplete="off"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setMobile(value);
                      if (errors.mobile) setErrors({ ...errors, mobile: "" });
                    }
                  }}
                  className="w-full bg-transparent px-4 py-3.5 pr-11 text-white placeholder-stone-500 text-sm sm:text-base font-mono outline-none"
                />
                <div className="absolute right-3.5 flex items-center pointer-events-none text-amber-400/70">
                  <Phone size={18} />
                </div>
              </div>
              {errors.mobile && (
                <p className="text-red-400 text-xs mt-1.5 pl-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{errors.mobile}</span>
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400/90 mb-2">
                PASSWORD
              </label>
              <div
                className={`relative flex items-center rounded-2xl bg-[#141210] border transition-all duration-200 shadow-inner ${errors.password
                  ? "border-red-500/80 ring-1 ring-red-500/20"
                  : "border-white/[0.08] focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/15"
                  }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="new-password"
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className="w-full bg-transparent px-4 py-3.5 pr-20 text-white placeholder-stone-500 text-sm sm:text-base outline-none"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-1 text-amber-400/80 hover:text-amber-300 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-white/[0.05] transition cursor-pointer"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff size={14} />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 pl-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 sm:py-4 rounded-xl shimmer-button font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#b67a32] via-[#e5a95d] to-[#b67a32] text-stone-950 shadow-[0_0_25px_rgba(216,155,82,0.35)] hover:shadow-[0_0_35px_rgba(216,155,82,0.55)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <HopestSpinner size="sm" variant="dark" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            {/* LOGIN LINK */}
            <div className="pt-4 border-t border-white/[0.06] text-center text-xs sm:text-sm text-stone-400">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="font-bold text-amber-300 hover:text-amber-200 cursor-pointer hover:underline ml-1 transition-colors"
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="relative z-10 text-center text-xs text-stone-500 pb-4 animate-modern">
        © 2026 HOPEST - hope for the best
      </footer>

      {/* =====================================================
          USER-FRIENDLY PROFESSIONAL POPUP MODAL
      ===================================================== */}
      {popup?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-[#161412] text-stone-100 rounded-3xl p-7 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-amber-500/30 text-center animate-modern animate-float relative">
            {/* ICON BADGE */}
            {popup.type === "success" ? (
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <CheckCircle2 size={32} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/15 border-2 border-red-400/40 text-red-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(248,113,113,0.2)]">
                <AlertCircle size={32} />
              </div>
            )}

            {/* TITLE & MESSAGE */}
            <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
              {popup.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              {popup.message}
            </p>

            {/* ACTION / PROGRESS */}
            {popup.type === "success" ? (
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-center gap-2 text-xs text-amber-300/80 font-medium">
                <HopestSpinner size="sm" variant="light" />
                <span>Redirecting to login...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPopup(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8b5e3c] to-[#6d4529] hover:from-[#9c6a44] hover:to-[#7c4f30] text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
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