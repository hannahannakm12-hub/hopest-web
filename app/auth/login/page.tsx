"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { HopestSpinner } from "@/components/HopestLoader";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // User-friendly popup state
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const paramUsername = searchParams.get("username");
    if (paramUsername) {
      setUsername(paramUsername);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.loginStatus === true) {
        localStorage.setItem("user", JSON.stringify(data.userInfo));
        console.log("Saved User =", localStorage.getItem("user"));

        // Show friendly success popup
        setPopup({
          isOpen: true,
          type: "success",
          title: "Login Successful!",
          message: `Welcome back, ${data.userInfo?.Fullname || username}! Redirecting to your dashboard...`,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        const errorMsg = data.message || "Invalid username or password. Please try again.";
        setError(errorMsg);
        setPopup({
          isOpen: true,
          type: "error",
          title: "Login Failed",
          message: errorMsg,
        });
      }
    } catch (err) {
      console.error(err);
      const errorMsg = "Unable to connect to the server. Please check your internet connection.";
      setError(errorMsg);
      setPopup({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#080706] animated-gradient text-stone-100 px-4 py-6 sm:py-8 overflow-x-hidden selection:bg-[#6b3f23] selection:text-white">
      {/* =====================================================
          AMBIENT BACKGROUND LIGHTING & GRID TEXTURE
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#6b3f23]/25 via-[#8b5e3c]/15 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-[#8b5e3c]/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-[#5c3a21]/20 blur-[160px] rounded-full" />
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#d4a373] hover:text-white border border-[#8b5e3c]/35 backdrop-blur-md text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm hover:border-[#c49371]/50"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Hopest"
              width={32}
              height={42}
              className="h-8 w-auto object-contain drop-shadow-sm"
            />
          </div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase font-semibold">
            Hopest Portal
          </span>
        </div>
      </div>

      {/* =====================================================
          GREETING & HERO TITLE
      ===================================================== */}
      <div className="relative z-10 text-center pt-8 sm:pt-10 animate-modern">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40 text-[11px] font-medium text-[#d4a373] mb-3">
          <Sparkles size={12} className="text-[#d4a373]" />
          <span>Secure Sign In</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Hello{" "}
          <span className="bg-gradient-to-r from-white via-[#d4a373] to-[#8b5e3c] bg-clip-text text-transparent font-serif">
            Login!
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
          Welcome back to Hopest. Please enter your credentials to continue.
        </p>
      </div>

      {/* =====================================================
          LOGIN CARD (Luxury Glassmorphism & Gold Accents)
      ===================================================== */}
      <div className="relative z-10 flex justify-center items-center my-6">
        <div className="group w-full max-w-md rounded-3xl bg-gradient-to-b from-[#140f0c]/95 to-[#0e0b09]/95 p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.65)] border border-white/[0.09] hover:border-[#8b5e3c]/45 transition-all duration-300 backdrop-blur-xl animate-modern relative">
          {/* Subtle Golden Glow Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#8b5e3c]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <form onSubmit={handleLogin} autoComplete="off" className="relative z-10 space-y-5">
            {/* USERNAME INPUT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d4a373] mb-2">
                USERNAME
              </label>
              <div className="relative flex items-center rounded-2xl bg-[#100d0b] border border-white/[0.08] focus-within:border-[#8b5e3c]/70 focus-within:ring-2 focus-within:ring-[#8b5e3c]/20 transition-all duration-200 shadow-inner">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                  className={`w-full bg-transparent px-4 py-3.5 pr-11 text-white placeholder-stone-500 text-sm sm:text-base outline-none ${error ? "text-red-300" : ""
                    }`}
                />
                <div className="absolute right-3.5 flex items-center pointer-events-none text-[#8b5e3c]">
                  <User size={18} />
                </div>
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d4a373]">
                  PASSWORD
                </label>
                <span
                  onClick={() => router.push("/auth/forgot-password")}
                  className="text-xs text-[#d4a373] hover:text-white cursor-pointer transition-colors font-medium hover:underline"
                >
                  Forgot Password?
                </span>
              </div>
              <div className="relative flex items-center rounded-2xl bg-[#100d0b] border border-white/[0.08] focus-within:border-[#8b5e3c]/70 focus-within:ring-2 focus-within:ring-[#8b5e3c]/20 transition-all duration-200 shadow-inner">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  className={`w-full bg-transparent px-4 py-3.5 pr-20 text-white placeholder-stone-500 text-sm sm:text-base outline-none ${error ? "text-red-300" : ""
                    }`}
                />
                <div className="absolute right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-1 text-[#d4a373] hover:text-white text-xs font-semibold px-2 py-1 rounded-lg hover:bg-white/[0.05] transition cursor-pointer"
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
            </div>

            {/* INLINE ERROR */}
            {error && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs animate-in fade-in duration-200">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center shimmer-button justify-center gap-2.5 bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white shadow-[0_0_25px_rgba(107,63,35,0.45)] hover:shadow-[0_0_35px_rgba(139,94,60,0.65)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 btn-animated-gradient"
            >
              {loading ? (
                <>
                  <HopestSpinner size="sm" variant="light" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            {/* REGISTER LINK */}
            <div className="pt-4 border-t border-white/[0.06] text-center text-xs sm:text-sm text-stone-400">
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/auth/register")}
                className="font-bold text-[#d4a373] hover:text-white cursor-pointer hover:underline ml-1 transition-colors"
              >
                Register Here
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
          <div className="w-full max-w-sm bg-[#140f0c] text-stone-100 rounded-3xl p-7 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#8b5e3c]/40 text-center animate-modern animate-float relative">
            {/* ICON BADGE */}
            {popup.type === "success" ? (
              <div className="w-16 h-16 rounded-full bg-[#2b1b11] border-2 border-[#8b5e3c]/50 text-[#d4a373] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(107,63,35,0.4)]">
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
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-center gap-2 text-xs text-[#d4a373] font-medium">
                <HopestSpinner size="sm" variant="light" />
                <span>Opening your dashboard...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPopup(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
              >
                Close & Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}