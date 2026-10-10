"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  Package,
  ShieldAlert,
  Heart,
  ArrowUpRight,
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
      title: "Lost Items",
      description:
        "Report something you have lost and let the community help you find it.",
      icon: Search,
      theme: {
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-400/25 group-hover:bg-blue-500/20 group-hover:border-blue-400/40",
        hoverBorder: "hover:border-blue-400/40",
        glow: "from-blue-500/15 via-blue-500/5 to-transparent",
        accent: "text-blue-400",
      },
    },
    {
      category: "FOUND",
      title: "Found Items",
      description:
        "Found something? Post it here so the rightful owner can reach you.",
      icon: Package,
      theme: {
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-400/25 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/40",
        hoverBorder: "hover:border-emerald-400/40",
        glow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
        accent: "text-emerald-400",
      },
    },
    {
      category: "THEFT",
      title: "Theft Reports",
      description:
        "Alert your neighbourhood about stolen goods and suspicious activity.",
      icon: ShieldAlert,
      theme: {
        iconColor: "text-rose-400",
        iconBg: "bg-rose-500/10 border-rose-400/25 group-hover:bg-rose-500/20 group-hover:border-rose-400/40",
        hoverBorder: "hover:border-rose-400/40",
        glow: "from-rose-500/15 via-rose-500/5 to-transparent",
        accent: "text-rose-400",
      },
    },
    {
      category: "MISSING",
      title: "Missing Persons",
      description:
        "Share details of a missing person to reach thousands of people fast.",
      icon: Heart,
      theme: {
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-400/25 group-hover:bg-purple-500/20 group-hover:border-purple-400/40",
        hoverBorder: "hover:border-purple-400/40",
        glow: "from-purple-500/15 via-purple-500/5 to-transparent",
        accent: "text-purple-400",
      },
    },
  ];

  return (
    <section id="services" className="relative bg-[#0c0a09] text-white py-24 lg:py-28 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-150px] w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-amber-700/[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        <div className="mb-14 max-w-3xl">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3b437]/10 border border-[#e3b437]/20 mb-4">
            <span className="text-[#e3b437] font-semibold text-xs uppercase tracking-wider">
              Our Services
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Four ways Hopest helps
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
            Every report reaches people nearby first, so the right person sees it
            at the right time.
          </p>
        </div>

        {/* ================= 4 CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                onClick={() => handleCardClick(item.category)}
                className={`group relative min-h-[300px] p-7 rounded-2xl bg-gradient-to-b from-[#181512]/90 to-[#12100e]/90 border border-white/[0.08] ${item.theme.hoverBorder} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between`}
              >
                {/* Gradient Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${item.theme.iconBg} ${item.theme.iconColor}`}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-amber-200/90 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="relative z-10 pt-6 flex items-center gap-1.5 text-xs font-semibold text-[#e3b437] transition-all duration-200 group-hover:gap-2">
                  <span>Explore</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}