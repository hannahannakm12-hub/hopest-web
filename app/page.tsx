"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  UserCheck,
  CheckCircle2,
  ShieldAlert,
  Handshake,
  Lock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Info,
  Check,
  Sparkles,
} from "lucide-react";
import { HopestSpinner } from "@/components/HopestLoader";

interface TermItem {
  id: number;
  label: string;
  tag: string;
  statement: string;
  icon: typeof UserCheck;
}

const termsList: TermItem[] = [
  {
    id: 1,
    label: "Age Requirement",
    tag: "Eligibility",
    statement: "You are at least 18 years old",
    icon: UserCheck,
  },
  {
    id: 2,
    label: "Accurate Profile",
    tag: "Authenticity",
    statement: "You will provide accurate and truthful information about yourself",
    icon: CheckCircle2,
  },
  {
    id: 3,
    label: "Lawful Usage",
    tag: "Compliance",
    statement: "You will not use this app for any commercial or illegal purposes",
    icon: ShieldAlert,
  },
  {
    id: 4,
    label: "User Responsibility",
    tag: "Transactions",
    statement: "Users are solely responsible for transactions made by users",
    icon: Handshake,
  },
  {
    id: 5,
    label: "Data Protection",
    tag: "Privacy",
    statement: "The information you provide will be secure",
    icon: Lock,
  },
  {
    id: 6,
    label: "Legal & Copyright",
    tag: "Resolution",
    statement:
      "If you notice any violation of copyright or any other kind of law by us, please notify us immediately and we will fix it immediately",
    icon: AlertCircle,
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [acknowledged, setAcknowledged] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleContinue = () => {
    if (!acknowledged) return;
    setIsNavigating(true);
    try {
      sessionStorage.setItem("hopest_terms_accepted", "true");
      localStorage.setItem("hopest_terms_accepted", "true");
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      router.push("/landing");
    }, 280);
  };

  return (
    <div className="relative min-h-screen animated-gradient bg-[#080706] text-stone-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#6b3f23] selection:text-white">
      {/* =====================================================
          AMBIENT BACKGROUND LIGHTING & TEXTURE
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#6b3f23]/25 via-[#8b5e3c]/15 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#8b5e3c]/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 -right-32 w-[550px] h-[550px] bg-[#5c3a21]/20 blur-[160px] rounded-full" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* =====================================================
          TOP BRAND HEADER (Standard max-w-7xl)
      ===================================================== */}
      <header className="relative z-10 w-full border-b border-white/[0.06] bg-[#080706]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <div className="relative h-10 w-8 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Hopest Logo"
                width={32}
                height={42}
                className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(107,63,35,0.4)]"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold tracking-[0.2em] text-[#d4a373] leading-tight">
                HOPEST
              </span>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium -mt-0.5">
                Community Platform
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40 text-xs font-medium text-[#d4a373]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Welcome &amp; Agreement</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT AREA (Spacious, balanced max-w-7xl)
      ===================================================== */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 lg:px-10 py-10 lg:py-14 flex flex-col justify-center">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40 text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
            <span>Official User Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white via-[#d4a373] to-[#8b5e3c] bg-clip-text text-transparent">
              Hopest
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Thank you very much for visiting Hopest for the first time. Only
            click{" "}
            <span className="font-semibold text-[#d4a373] underline decoration-[#8b5e3c]/50 underline-offset-4">
              Continue
            </span>{" "}
            after reading below carefully.
          </p>
        </motion.div>

        {/* 6 Terms Cards Grid (Clean 3-Column on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {termsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className="group relative rounded-2xl bg-gradient-to-b from-[#140f0c]/90 to-[#0e0b09]/90 border border-white/[0.08] hover:border-[#8b5e3c]/50 p-6 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(107,63,35,0.2)] hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#8b5e3c]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {/* Icon Container */}
                    <div className="w-11 h-11 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/40 flex items-center justify-center shrink-0 text-[#d4a373] group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Tag & Number Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#d4a373] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40">
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.05]">
                        0{item.id}
                      </span>
                    </div>
                  </div>

                  {/* Statement */}
                  <p className="text-stone-200 text-sm sm:text-[15px] font-medium leading-relaxed group-hover:text-white transition-colors duration-200">
                    {item.statement}
                  </p>
                </div>

                {/* Bottom Verified indicator */}
                <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-[#d4a373] transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer / Modification Notice (Centered, wide banner) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="rounded-2xl bg-[#120f0d]/90 border border-[#6b3f23]/35 p-5 mb-10 backdrop-blur-sm flex items-start gap-4 max-w-5xl mx-auto w-full"
        >
          <div className="w-8 h-8 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/40 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-[#d4a373]" />
          </div>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            These terms and conditions are subject to change at any time without
            prior notice. Please review them periodically for updates. If you do
            not agree to these terms and conditions, please stop using this
            website immediately.
          </p>
        </motion.div>

        {/* Interactive Agreement Checkbox & Continue CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="w-full max-w-md mx-auto flex flex-col items-center"
        >
          <label className="flex items-center gap-3 mb-5 cursor-pointer group select-none">
            <div
              onClick={() => setAcknowledged(!acknowledged)}
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${acknowledged
                ? "bg-[#6b3f23] border-[#8b5e3c] text-white shadow-[0_0_14px_rgba(107,63,35,0.45)]"
                : "bg-white/[0.04] border-white/20 group-hover:border-[#8b5e3c]/60"
                }`}
            >
              {acknowledged && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span
              onClick={() => setAcknowledged(!acknowledged)}
              className="text-stone-300 text-xs sm:text-sm group-hover:text-white transition-colors"
            >
              I have read, understood, and agree to the terms above
            </span>
          </label>

          <button
            onClick={handleContinue}
            disabled={!acknowledged || isNavigating}
            className={`w-full h-14 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] ${acknowledged
              ? "bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white font-bold shadow-[0_0_35px_rgba(107,63,35,0.55)] hover:shadow-[0_0_55px_rgba(139,94,60,0.85)] hover:scale-[1.01] cursor-pointer btn-animated-gradient"
              : "bg-stone-800/80 border border-white/10 text-stone-400 cursor-not-allowed opacity-60"
              }`}
          >
            {isNavigating ? (
              <>
                <HopestSpinner size="md" variant="light" />
                <span>Entering Hopest...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {!acknowledged && (
            <p className="text-[11px] text-stone-400 mt-2.5 animate-pulse text-center">
              Please check the box above to continue to the landing page.
            </p>
          )}
        </motion.div>
      </main>

      {/* =====================================================
          BOTTOM FOOTER BAR
      ===================================================== */}
      <footer className="relative z-10 w-full border-t border-white/[0.05] bg-[#040303]/80 py-4 text-center">
        <p className="text-[11px] text-stone-500">
          Hopest &copy; {new Date().getFullYear()} &bull; Community Safety &amp;
          Lost Property Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
