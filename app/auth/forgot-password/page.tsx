"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  User,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const getWhatsAppUrl = () => {
    const cleanNum = mobile.trim();
    let text = "Hello Hopest Support, I forgot my account password and need help recovering it.";
    if (cleanNum) {
      text += `\nRegistered Mobile: +91 ${cleanNum}`;
    }
    if (username.trim()) {
      text += `\nUsername/Name: ${username.trim()}`;
    }
    return `https://wa.me/918590168840?text=${encodeURIComponent(text)}`;
  };

  const handleQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between animated-gradient px-4 py-6 sm:py-8">

      {/* TOP HEADER WITH BACK TO LANDING BUTTON */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/landing")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#d4a373] hover:text-white border border-[#6b3f23]/40 backdrop-blur-md text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <span className="text-xs font-mono text-stone-400 tracking-widest hidden sm:inline uppercase">
          Hopest Portal
        </span>
      </div>

      {/* GREETING TITLE */}
      <div className="text-center pt-8 sm:pt-10 animate-modern">
        <h1 className="text-4xl sm:text-5xl font-serif text-[#d4a373] tracking-tight">
          Forgot Password
        </h1>
        <p className="text-xs sm:text-sm text-[#c9bfb6] mt-2 max-w-md mx-auto">
          Need help accessing your Hopest account? Contact our official support desk directly for instant password recovery.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex justify-center items-center my-6">
        <div className="w-full max-w-xl bg-[#f4efe9] text-[#3b2a21] rounded-3xl p-6 sm:p-10 shadow-2xl animate-modern border border-[#e5dcd3] space-y-6">

          {/* QUICK RECOVERY ASSISTANCE */}
          <div className="p-5 rounded-2xl bg-white/70 border border-[#e2d5c7] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b3f23]">
              <ShieldCheck size={16} className="text-[#6b3f23]" />
              <span>Fast Account Recovery</span>
            </div>

            <p className="text-xs text-[#5a4335] leading-relaxed">
              Enter your registered number below to instantly connect with a Hopest support coordinator on WhatsApp:
            </p>

            <form onSubmit={handleQuickWhatsApp} autoComplete="off" className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    autoComplete="off"
                    placeholder="Registered Mobile (+91)"
                    value={mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) setMobile(val);
                    }}
                    className="w-full bg-[#fbf9f6] border border-[#d8cbbf] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3b2a21] placeholder-[#a89f91] focus:border-[#6b3f23] outline-none transition font-mono"
                  />
                  <Phone size={14} className="absolute right-3 top-3.5 text-[#8c7565]" />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    placeholder="Username / Name (Optional)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#fbf9f6] border border-[#d8cbbf] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#3b2a21] placeholder-[#a89f91] focus:border-[#6b3f23] outline-none transition"
                  />
                  <User size={14} className="absolute right-3 top-3.5 text-[#8c7565]" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4a2c17] via-[#6b3f23] to-[#4a2c17] hover:brightness-110 text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#8b5e3c]/40"
              >
                <MessageCircle size={17} />
                <span>Request Recovery on WhatsApp</span>
                <ExternalLink size={13} className="opacity-80" />
              </button>
            </form>
          </div>

          {/* OFFICIAL CONTACT CHANNELS */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6b3f23]">
              Official Support Helplines
            </h2>

            {/* CHANNEL 1: DIRECT PHONE CALL */}
            <div className="p-4 rounded-2xl bg-[#ede5db]/80 border border-[#e0d3c4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#ede5db] transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6b3f23] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#3b2a21]">
                    Direct Voice Helpline
                  </h3>
                  <p className="text-[11px] text-[#7a6252]">
                    Speak with a coordinator to verify & reset your account
                  </p>
                  <span className="font-mono text-xs font-bold text-[#6b3f23] mt-0.5 block">
                    +91 85901 68840
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:+918590168840"
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#6b3f23] hover:bg-[#523019] text-white text-xs font-semibold text-center transition cursor-pointer"
                >
                  Call Now
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("call", "+918590168840")}
                  className="p-2 rounded-xl border border-[#d2c3b2] hover:bg-white/60 text-[#6b3f23] transition cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedKey === "call" ? <Check size={14} className="text-[#6b3f23]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* CHANNEL 2: WHATSAPP DESK */}
            <div className="p-4 rounded-2xl bg-[#ede5db]/80 border border-[#e0d3c4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#ede5db] transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6b3f23] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#3b2a21]">
                    WhatsApp Direct Helpdesk
                  </h3>
                  <p className="text-[11px] text-[#7a6252]">
                    Instant response • Message support anytime
                  </p>
                  <span className="font-mono text-xs font-bold text-[#6b3f23] mt-0.5 block">
                    +91 85901 68840
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#6b3f23] hover:bg-[#523019] text-white text-xs font-semibold text-center transition cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("whatsapp", "+918590168840")}
                  className="p-2 rounded-xl border border-[#d2c3b2] hover:bg-white/60 text-[#6b3f23] transition cursor-pointer"
                  title="Copy WhatsApp Number"
                >
                  {copiedKey === "whatsapp" ? <Check size={14} className="text-[#6b3f23]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* CHANNEL 3: EMAIL SUPPORT */}
            <div className="p-4 rounded-2xl bg-[#ede5db]/80 border border-[#e0d3c4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#ede5db] transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4b3425] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#3b2a21]">
                    Official Email Support
                  </h3>
                  <p className="text-[11px] text-[#7a6252]">
                    Send account details for manual verification
                  </p>
                  <span className="font-mono text-xs font-bold text-[#4b3425] mt-0.5 block">
                    hopestdhanaf@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="mailto:hopestdhanaf@gmail.com?subject=Hopest%20Account%20Password%20Recovery"
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#4b3425] hover:bg-[#342419] text-white text-xs font-semibold text-center transition cursor-pointer"
                >
                  Send Email
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("email", "hopestdhanaf@gmail.com")}
                  className="p-2 rounded-xl border border-[#d2c3b2] hover:bg-white/60 text-[#6b3f23] transition cursor-pointer"
                  title="Copy Email"
                >
                  {copiedKey === "email" ? <Check size={14} className="text-[#6b3f23]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* VERIFICATION PROTOCOL NOTE */}
          <div className="p-3.5 rounded-2xl bg-[#ede5db]/50 border border-[#e2d5c7] flex items-start gap-2.5 text-[11px] text-[#6b5240] leading-relaxed">
            <Clock size={16} className="text-[#6b3f23] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#3b2a21]">Verification Protocol:</strong> For your security, our support team will verify that you are the true owner of the registered mobile number before providing password assistance. This service is 100% free of charge.
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e2d5c7] text-xs">
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="inline-flex items-center gap-1.5 font-bold text-[#6b3f23] hover:text-[#3b2a21] hover:underline cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Back to Login</span>
            </button>

            <span className="text-[#8c7565]">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/register")}
                className="font-bold text-[#6b3f23] hover:underline cursor-pointer ml-1"
              >
                Register Here
              </button>
            </span>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-xs text-[#c9bfb6] pb-4 animate-modern">
        © 2026 HOPEST - hope for the best
      </footer>

    </div>
  );
}