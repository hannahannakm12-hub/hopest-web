"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  User,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

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
          Hello Login!
        </h1>
        <p className="text-xs sm:text-sm text-[#c9bfb6] mt-2 max-w-sm mx-auto">
          Welcome back to Hopest. Please enter your credentials to continue.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="flex justify-center items-center my-6">
        <div className="w-full max-w-md bg-[#f4efe9] text-[#3b2a21] rounded-3xl p-8 sm:p-10 shadow-2xl animate-modern animate-float border border-[#e5dcd3]">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* USERNAME INPUT */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-[#3b2a21] mb-2">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                required
                className={`w-full bg-transparent border-b outline-none py-2 pr-8 text-[#3b2a21] placeholder-[#a89f91] caret-[#6b3f23] transition text-sm sm:text-base ${
                  error ? "border-red-500" : "border-[#c9bfb6] focus:border-[#6b3f23]"
                }`}
              />
              <User
                className="absolute right-0 bottom-3 text-[#6b3f23]"
                size={18}
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative">
              <label className="block text-xs sm:text-sm font-semibold text-[#3b2a21] mb-2">
                PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                className={`w-full bg-transparent border-b outline-none py-2 pr-16 text-[#3b2a21] placeholder-[#a89f91] caret-[#6b3f23] transition text-sm sm:text-base ${
                  error ? "border-red-500" : "border-[#c9bfb6] focus:border-[#6b3f23]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-[#6b3f23] hover:text-[#3b2a21] text-xs font-semibold cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* INLINE ERROR */}
            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl text-white font-medium shimmer-button hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>

            {/* FORGOT PASSWORD */}
            <p className="text-center text-xs sm:text-sm text-[#6b3f23]">
              <span
                onClick={() => router.push("/auth/forgot-password")}
                className="cursor-pointer hover:underline font-semibold"
              >
                Forgot Password?
              </span>
            </p>

            {/* REGISTER LINK */}
            <p className="text-center text-xs sm:text-sm text-[#6b3f23] pt-2 border-t border-[#e2d5c7]">
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/auth/register")}
                className="font-bold cursor-pointer hover:underline ml-1"
              >
                Register Here
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
                <span>Opening your dashboard...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPopup(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-[#6b3f23] hover:bg-[#523019] text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
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