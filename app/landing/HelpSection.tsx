"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  Package,
  ShieldAlert,
  Heart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function HelpSection() {
  const router = useRouter();

  const handleCardClick = (category: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/dashboard?category=${category}`);
  };

  const services = [
    {
      category: "LOST",
      id: "01",
      badge: "Lost Item Radar",
      title: "Lost Items",
      description:
        "Report something you have lost and let nearby community members help you track and recover it.",
      icon: Search,
      theme: {
        iconColor: "text-blue-400",
        iconBg:
          "bg-blue-500/10 border-blue-400/25 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]",
        hoverBorder: "hover:border-blue-400/50",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]",
        glow: "from-blue-500/20 via-blue-500/5 to-transparent",
        accent: "text-blue-400",
        badgeBg: "bg-blue-500/10 text-blue-300 border-blue-400/20",
        btnHover: "group-hover:bg-blue-500/10 group-hover:border-blue-400/30",
      },
    },
    {
      category: "FOUND",
      id: "02",
      badge: "Found & Reunite",
      title: "Found Items",
      description:
        "Found someone's keys, wallet, or phone? Post it safely so the rightful owner can verify and claim it.",
      icon: Package,
      theme: {
        iconColor: "text-emerald-400",
        iconBg:
          "bg-emerald-500/10 border-emerald-400/25 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]",
        hoverBorder: "hover:border-emerald-400/50",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)]",
        glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        accent: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
        btnHover: "group-hover:bg-emerald-500/10 group-hover:border-emerald-400/30",
      },
    },
    {
      category: "THEFT",
      id: "03",
      badge: "Community Alert",
      title: "Theft Reports",
      description:
        "Alert your neighbourhood about stolen bicycles, vehicles, or suspicious activities to prevent further crimes.",
      icon: ShieldAlert,
      theme: {
        iconColor: "text-rose-400",
        iconBg:
          "bg-rose-500/10 border-rose-400/25 group-hover:bg-rose-500/20 group-hover:border-rose-400/50 group-hover:shadow-[0_0_24px_rgba(244,63,94,0.35)]",
        hoverBorder: "hover:border-rose-400/50",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(244,63,94,0.2)]",
        glow: "from-rose-500/20 via-rose-500/5 to-transparent",
        accent: "text-rose-400",
        badgeBg: "bg-rose-500/10 text-rose-300 border-rose-400/20",
        btnHover: "group-hover:bg-rose-500/10 group-hover:border-rose-400/30",
      },
    },
    {
      category: "MISSING",
      id: "04",
      badge: "Urgent Search",
      title: "Missing Persons",
      description:
        "Circulate critical details and photos of a missing loved one to mobilize thousands of local eyes immediately.",
      icon: Heart,
      theme: {
        iconColor: "text-purple-400",
        iconBg:
          "bg-purple-500/10 border-purple-400/25 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 group-hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]",
        hoverBorder: "hover:border-purple-400/50",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]",
        glow: "from-purple-500/20 via-purple-500/5 to-transparent",
        accent: "text-purple-400",
        badgeBg: "bg-purple-500/10 text-purple-300 border-purple-400/20",
        btnHover: "group-hover:bg-purple-500/10 group-hover:border-purple-400/30",
      },
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-[#090807] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#d89b52]/30 selection:text-[#f8d7a4]"
    >
      {/* =====================================================
          BACKGROUND AMBIENT LIGHTING & DOT GRID
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic Standard Animated Ambient Gradient Layer */}
        <div className="absolute inset-0 landing-ambient-gradient opacity-35" />
        <div className="absolute top-20 -left-48 w-[600px] h-[600px] rounded-full bg-amber-500/[0.06] blur-[160px]" />
        <div className="absolute bottom-10 -right-48 w-[650px] h-[650px] rounded-full bg-[#8b5e3c]/[0.08] blur-[170px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 208, 150, 0.45) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADING AREA ================= */}
        <div className="mb-16 max-w-3xl">
          {/* Section Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">
              Core Community Services
            </span>
          </div>

          {/* Main Heading with Gold Gradient */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Four ways{" "}
            <span className="bg-gradient-to-r from-amber-200 via-[#e5a95d] to-[#d89b52] bg-clip-text text-transparent">
              Hopest helps
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
            Every report is surfaced to people in your immediate vicinity first,
            connecting those who need help with those who can provide it.
          </p>
        </div>

        {/* ================= 4 MODERN CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                onClick={() => handleCardClick(item.category)}
                className={`group relative min-h-[340px] p-7 rounded-2xl bg-gradient-to-b from-[#181512]/95 via-[#12100e]/95 to-[#0d0c0a]/95 border border-white/[0.07] ${item.theme.hoverBorder} ${item.theme.hoverShadow} transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl`}
              >
                {/* Dynamic Category Color Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}
                />

                {/* Top Corner Number */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                  {/* Category Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.theme.badgeBg}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{item.badge}</span>
                  </span>

                  {/* Number Badge */}
                  <span className="text-[11px] font-mono text-stone-500 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                    {item.id}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="relative z-10 flex-1">
                  {/* Icon Container with Radiant Halo */}
                  <div
                    className={`w-13 h-13 rounded-2xl border flex items-center justify-center transition-all duration-300 ${item.theme.iconBg} ${item.theme.iconColor}`}
                  >
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-extrabold text-white group-hover:text-amber-100 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#f59e0b] to-[#d89b52] text-stone-950 text-xs font-black transition-all duration-200 group-hover:scale-105 shadow-md btn-animated-gradient">
                    <span className="text-stone-950 font-black">Browse Feed</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-stone-950"
                    />
                  </div>

                  <span className="text-[11px] text-stone-500 font-medium group-hover:text-stone-400 transition-colors">
                    Free &bull; Instant
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}