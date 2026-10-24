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
    if (typeof window === "undefined") return;
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (category === "MISSING") {
      router.push("/missing");
      return;
    }
    router.push(`/dashboard/search?type=${category}`);
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
        iconColor: "text-[#d4a373]",
        iconBg:
          "bg-[#2b1b11] border-[#6b3f23]/50 group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_24px_rgba(107,63,35,0.4)]",
        hoverBorder: "hover:border-[#8b5e3c]/60",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(107,63,35,0.25)]",
        glow: "from-[#8b5e3c]/20 via-[#6b3f23]/10 to-transparent",
        accent: "text-[#d4a373]",
        badgeBg: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/50",
        btnHover: "group-hover:bg-[#2b1b11] group-hover:border-[#8b5e3c]/40",
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
        iconColor: "text-[#e8d5c4]",
        iconBg:
          "bg-[#21150e] border-[#5c3a21]/50 group-hover:bg-[#2b1b11] group-hover:border-[#7a482b]/60 group-hover:shadow-[0_0_24px_rgba(122,72,43,0.4)]",
        hoverBorder: "hover:border-[#a06544]/60",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(139,94,60,0.25)]",
        glow: "from-[#a06544]/20 via-[#7a482b]/10 to-transparent",
        accent: "text-[#e8d5c4]",
        badgeBg: "bg-[#21150e] text-[#e8d5c4] border-[#7a482b]/50",
        btnHover: "group-hover:bg-[#21150e] group-hover:border-[#7a482b]/40",
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
        iconColor: "text-[#c49371]",
        iconBg:
          "bg-[#251811] border-[#6b3f23]/50 group-hover:bg-[#342016] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_24px_rgba(107,63,35,0.4)]",
        hoverBorder: "hover:border-[#8b5e3c]/60",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(107,63,35,0.25)]",
        glow: "from-[#6b3f23]/25 via-[#4a2c17]/10 to-transparent",
        accent: "text-[#c49371]",
        badgeBg: "bg-[#251811] text-[#c49371] border-[#6b3f23]/50",
        btnHover: "group-hover:bg-[#251811] group-hover:border-[#6b3f23]/40",
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
        iconColor: "text-white",
        iconBg:
          "bg-[#2b1c14] border-[#7a482b]/50 group-hover:bg-[#3d2417] group-hover:border-[#a06544]/60 group-hover:shadow-[0_0_24px_rgba(139,94,60,0.4)]",
        hoverBorder: "hover:border-[#c49371]/60",
        hoverShadow: "hover:shadow-[0_20px_50px_rgba(160,101,68,0.25)]",
        glow: "from-[#8b5e3c]/20 via-[#5c3a21]/10 to-transparent",
        accent: "text-white",
        badgeBg: "bg-[#2b1c14] text-white border-[#7a482b]/50",
        btnHover: "group-hover:bg-[#2b1c14] group-hover:border-[#7a482b]/40",
      },
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-[#080706] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#6b3f23] selection:text-white"
    >
      {/* =====================================================
          BACKGROUND AMBIENT LIGHTING & DOT GRID
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic Standard Animated Ambient Gradient Layer */}
        <div className="absolute inset-0 landing-ambient-gradient opacity-35" />
        <div className="absolute top-20 -left-48 w-[600px] h-[600px] rounded-full bg-[#6b3f23]/[0.15] blur-[160px]" />
        <div className="absolute bottom-10 -right-48 w-[650px] h-[650px] rounded-full bg-[#8b5e3c]/[0.15] blur-[170px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 163, 115, 0.35) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADING AREA ================= */}
        <div className="mb-16 max-w-3xl">
          {/* Section Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span className="text-[#d4a373] font-bold text-xs uppercase tracking-wider">
              Core Community Services
            </span>
          </div>

          {/* Main Heading with Gold Gradient */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Four ways{" "}
            <span className="bg-gradient-to-r from-white via-[#d4a373] to-[#8b5e3c] bg-clip-text text-transparent">
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(item.category);
                  }
                }}
                onClick={() => handleCardClick(item.category)}
                className={`group relative min-h-[340px] p-7 rounded-2xl bg-gradient-to-b from-[#140f0c]/95 via-[#100d0b]/95 to-[#080706]/95 border border-white/[0.07] ${item.theme.hoverBorder} ${item.theme.hoverShadow} transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-[#8b5e3c]`}
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
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${item.theme.iconBg} ${item.theme.iconColor}`}
                  >
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-extrabold text-white group-hover:text-[#f5efe8] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white text-xs font-bold transition-all duration-200 group-hover:scale-105 shadow-md btn-animated-gradient">
                    <span className="text-white font-bold">Browse Feed</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white"
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