"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageSquareOff,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  Plus,
  Search,
  CheckCircle2,
} from "lucide-react";

export default function DemandPage() {
  const router = useRouter();

  const comparisonCards = [
    {
      title: "Messages Get Buried",
      badge: "The Social Media Dilemma",
      badgeColor: "bg-[#2b1c14] text-white border-[#7a482b]/50",
      dotColor: "bg-[#c49371]",
      gradientBeam: "from-[#4a2c17] via-[#7a482b] to-[#4a2c17]",
      ambientGlow: "bg-[#6b3f23]/15",
      icon: MessageSquareOff,
      iconBg: "bg-[#2b1c14] text-[#d4a373] border-[#6b3f23]/40",
      desc: "Social group chats move quickly. Urgent appeals vanish under casual conversations within minutes, missing real finders.",
      btnText: "File a Permanent Notice",
      btnAction: () => router.push("/dashboard/create?type=LOST"),
      btnIcon: Plus,
      btnStyle: "bg-gradient-to-r from-[#4a2c17] via-[#6b3f23] to-[#4a2c17] text-white",
    },
    {
      title: "Old Posts Keep Circulating",
      badge: "No Expiry or Status",
      badgeColor: "bg-[#251811] text-[#c49371] border-[#6b3f23]/50",
      dotColor: "bg-[#8b5e3c]",
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23]",
      ambientGlow: "bg-[#8b5e3c]/15",
      icon: Clock,
      iconBg: "bg-[#251811] text-[#c49371] border-[#6b3f23]/40",
      desc: "Once shared into WhatsApp, posts cannot be deleted. Resolved cases continue circulating for months, creating distress.",
      btnText: "Manage & Close Cases",
      btnAction: () => router.push("/my-creations"),
      btnIcon: CheckCircle2,
      btnStyle: "bg-gradient-to-r from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23] text-white",
    },
    {
      title: "Centralized & Verified",
      badge: "The Hopest Solution",
      badgeColor: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/50",
      dotColor: "bg-[#d4a373]",
      gradientBeam: "from-[#5c3a21] via-[#d4a373] to-[#5c3a21]",
      ambientGlow: "bg-[#5c3a21]/15",
      icon: ShieldCheck,
      iconBg: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/40",
      desc: "Hopest organizes listings by police station, place, and date, allowing quick searching and instant resolution updates.",
      btnText: "Search Central Directory",
      btnAction: () => router.push("/dashboard/search?type=LOST"),
      btnIcon: Search,
      btnStyle: "bg-gradient-to-r from-[#3a2417] via-[#5c3a21] to-[#3a2417] text-white",
    },
  ];

  return (
    <div className="bg-[#fbf9f6] text-[#3b2a21] min-h-screen py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 selection:bg-[#6b3f23]/30 selection:text-[#2b1f18]">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">

        {/* BACK TO DASHBOARD NAVIGATION */}
        <div>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6b3f23] hover:text-[#2b1f18] bg-white border border-[#e8dfd6] hover:border-[#8b5e3c] px-4 py-2 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
        </div>

        {/* HERO TITLE CARD WITH AMBIENT PARTICLES */}
        <div className="animated-gradient text-white rounded-3xl p-8 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b3f23]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#4a2c17]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
              <Sparkles size={13} className="text-[#d4a373] animate-pulse" />
              <span>Community Purpose</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] tracking-tight">
              Why Hopest is Essential in the Era of Social Media
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-light">
              When someone loses an important document, finds a lost wallet, or has a missing loved one, the instinct is often to share on WhatsApp groups or Facebook. But casual social shares create critical problems.
            </p>
          </div>
        </div>

        {/* 3 COMPARISON CARDS WITH SUPER EFFECTS & BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonCards.map((card, idx) => {
            const Icon = card.icon;
            const BtnIcon = card.btnIcon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.16)] hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* TOP RADIANT BEAM */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradientBeam} opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`}
                />

                {/* AMBIENT MESH GLOW */}
                <div
                  className={`absolute -top-16 -right-16 w-48 h-48 rounded-full ${card.ambientGlow} blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out`}
                />

                <div className="relative z-10">
                  {/* ICON & BADGE ROW */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${card.iconBg} border flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${card.badgeColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${card.dotColor} inline-block mr-1`}></span>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-[#2b1f18] mb-2.5 font-serif group-hover:text-[#6b3f23] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6e584a] leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* CARD ACTION BUTTON */}
                <div className="pt-4 border-t border-[#f0e8e0] relative z-10">
                  <button
                    type="button"
                    onClick={card.btnAction}
                    className={`w-full py-2.5 px-4 rounded-xl ${card.btnStyle} hover:brightness-110 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn`}
                  >
                    <BtnIcon size={15} className="group-hover/btn:scale-110 transition-transform" />
                    <span>{card.btnText}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* CALLOUT CARD (ELEVATED LUXURY SOLIDARITY CARD) */}
        <div className="bg-gradient-to-br from-[#1c140e] via-[#2b1b11] to-[#140f0c] text-white border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b3f23]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5 max-w-3xl">
              <div className="w-13 h-13 rounded-2xl bg-[#2b1b11] border border-[#6b3f23]/50 text-[#d4a373] flex items-center justify-center shrink-0 shadow-sm mt-1 group-hover:rotate-6 transition-transform">
                <HeartHandshake size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2.5 tracking-tight">
                  A Mission of Solidarity for Every Citizen
                </h2>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                  What we need as a community is to make Hopest known to everyone. It costs nothing, respects your privacy, and creates an organized safety net where every lost item and missing alert gets direct attention from citizens who can actually help.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => router.push("/dashboard/create?type=LOST")}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 duration-200 border border-[#8b5e3c]/40"
              >
                <span>Report an Incident</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTACT LINE */}
        <div className="text-center pt-2 border-t border-[#e5dcd3]">
          <p className="text-xs sm:text-sm text-[#8c7565]">
            Have feedback or want to partner with the community? Contact the Hopest team at{" "}
            <a href="mailto:support@hopest.org" className="text-[#6b3f23] font-bold hover:underline">
              support@hopest.org
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}