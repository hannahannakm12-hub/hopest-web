"use client";

import { useRouter } from "next/navigation";
import { FilePlus, Target, Handshake, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const router = useRouter();
  const steps = [
    {
      number: "01",
      icon: FilePlus,
      title: "Post a report",
      description:
        "Add what happened, where and when. It takes under a minute — no fees, no paperwork.",
    },
    {
      number: "02",
      icon: Target,
      title: "Reach your area",
      description:
        "Your report is surfaced to members nearby and matched against opposite listings.",
    },
    {
      number: "03",
      icon: Handshake,
      title: "Connect safely",
      description:
        "Talk through the platform, verify details, and arrange a safe handover.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative bg-[#0e0c0b] landing-ambient-gradient text-white py-24 lg:py-28 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Texture & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-600/[0.04] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3b437]/10 border border-[#e3b437]/20 mb-4">
            <span className="text-[#e3b437] text-xs font-semibold uppercase tracking-wider">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Three simple steps
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            Designed so anyone can use it — from a first-time reporter to a
            local police volunteer.
          </p>
        </div>

        {/* ================= 3 STEPS GRID ================= */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-white/[0.08] hover:border-amber-500/40 bg-gradient-to-b from-[#181512]/90 to-[#12100e]/90 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(216,155,82,0.12)] flex flex-col justify-between"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.05] via-transparent to-amber-700/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                <div>
                  {/* Top row with Icon and Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 group-hover:scale-105 transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500/20 group-hover:text-amber-500/40 transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200/95 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-400 text-sm sm:text-[15px] leading-relaxed group-hover:text-stone-300 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Micro progression indicator */}
                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-stone-500 group-hover:text-amber-400/70 transition-colors">
                  <span className="font-mono uppercase tracking-wider text-[11px]">
                    Step {idx + 1} of 3
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button with Animated Gradient */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => {
              const user = localStorage.getItem("user");
              if (!user) {
                router.push("/auth/login");
              } else {
                router.push("/dashboard/create?type=LOST");
              }
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#f59e0b] to-[#d89b52] text-stone-950 font-black text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer btn-animated-gradient"
          >
            <span className="text-stone-950 font-black">Post a Report in Seconds</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200 text-stone-950" />
          </button>
        </div>
      </div>
    </section>
  );
}