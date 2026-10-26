"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  ArrowUpRight,
  ShieldAlert,
  HelpCircle,
  Sparkles,
  Eye,
  CheckCircle2,
  Users,
  Compass,
  AlertTriangle,
  FolderPlus,
  Phone,
  MessageCircle,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  ChevronRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{
    fullname: string;
    mob: string;
    mailid: string;
    uid?: string;
  } | null>(null);

  // Check login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      router.replace("/auth/login");
    }
  }, [router]);

  const categories = [
    {
      title: "Lost Property",
      tag: "Lost Belonging",
      badgeColor: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/40",
      dotColor: "bg-[#d4a373]",
      gradientBeam: "from-[#4a2c17] via-[#8b5e3c] to-[#4a2c17]",
      ambientGlow: "bg-[#8b5e3c]/20",
      iconBadgeBg: "bg-gradient-to-br from-[#8b5e3c] to-[#4a2c17]",
      accentBorder: "hover:border-[#8b5e3c]",
      accentGlow: "group-hover:shadow-[0_24px_50px_-12px_rgba(107,63,35,0.22)]",
      desc: "Misplaced your phone, wallet, documents, or keys? Create a verified notice to alert finders and residents nearby.",
      features: ["Instant Community Broadcast", "Location Mapping", "Finder Direct Contact"],
      img: "/lostdas.jpeg",
      type: "LOST",
      icon: Search,
      createLabel: "Report Lost Item",
      searchLabel: "Search Lost Items",
    },
    {
      title: "Found Belongings",
      tag: "Good Samaritan",
      badgeColor: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/50",
      dotColor: "bg-[#e8d5c4]",
      gradientBeam: "from-[#5c3a21] via-[#a06544] to-[#5c3a21]",
      ambientGlow: "bg-[#a06544]/20",
      iconBadgeBg: "bg-gradient-to-br from-[#7a482b] to-[#3a2417]",
      accentBorder: "hover:border-[#a06544]/70",
      accentGlow: "group-hover:shadow-[0_24px_50px_-12px_rgba(122,72,43,0.22)]",
      desc: "Found an item in a public place, transit, or bus? Register it safely to help reunite it with its true owner.",
      features: ["Safe Custody Registration", "Owner Identity Verification", "100% Free Service"],
      img: "/founddas.jpeg",
      type: "FOUND",
      icon: Package,
      createLabel: "Report Found Item",
      searchLabel: "Search Found Items",
    },
    {
      title: "Theft Incident",
      tag: "Security Alert",
      badgeColor: "bg-[#251811] text-[#c49371] border-[#6b3f23]/50",
      dotColor: "bg-[#c49371]",
      gradientBeam: "from-[#4a2c17] via-[#7a482b] to-[#4a2c17]",
      ambientGlow: "bg-[#6b3f23]/25",
      iconBadgeBg: "bg-gradient-to-br from-[#6b3f23] to-[#251811]",
      accentBorder: "hover:border-[#8b5e3c]/70",
      accentGlow: "group-hover:shadow-[0_24px_50px_-12px_rgba(107,63,35,0.22)]",
      desc: "Report stolen vehicles, mobile gadgets, or valuables to mobilize statewide vigilance alongside official police reports.",
      features: ["Police GD / FIR Linking", "Serial Number Alert", "Statewide Surveillance"],
      img: "/theftdas.jpeg",
      type: "THEFT",
      icon: ShieldAlert,
      createLabel: "Report Theft Case",
      searchLabel: "Search Stolen Items",
    },
    {
      title: "Missing Person",
      tag: "Urgent Broadcast",
      badgeColor: "bg-[#140f0c] text-white border-[#8b5e3c]/50 font-bold",
      dotColor: "bg-white",
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23]",
      ambientGlow: "bg-[#8b5e3c]/25",
      iconBadgeBg: "bg-gradient-to-br from-[#6b3f23] to-[#140f0c]",
      accentBorder: "hover:border-[#8b5e3c] border-[#6b3f23]/40 bg-gradient-to-b from-white via-white to-[#fbf9f6]",
      accentGlow: "group-hover:shadow-[0_24px_50px_-12px_rgba(107,63,35,0.28)]",
      desc: "Urgent public appeal for missing persons or runaway loved ones. Mobilizes the statewide volunteer network immediately.",
      features: ["Emergency Volunteer Mobilization", "Statewide Law Enforcement Sync", "High-Priority Banner"],
      img: "/missingdas.jpeg",
      type: "MISSING",
      icon: AlertTriangle,
      createLabel: "Broadcast Appeal",
      searchLabel: "View All Appeals",
      isEmergency: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#6b3f23] selection:text-white">

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10 sm:space-y-14">

        {/* PREMIUM HERO SECTION WITH SUPER AMBIENT GLOW */}
        <section className="animated-gradient text-white rounded-3xl p-7 sm:p-10 md:p-12 shadow-2xl border border-white/15 relative overflow-hidden group">
          {/* Ambient interactive glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8b5e3c]/20 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#5c3a21]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative z-10 max-w-4xl">

            {/* Top pill badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#d4a373] text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Sparkles size={13} className="text-[#d4a373] animate-pulse" />
                <span>Hopest Community Portal</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/40 text-[#d4a373] text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping"></span>
                <span>Live Kerala Network</span>
              </div>
            </div>

            {/* Main Greeting */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white leading-[1.15]">
              Welcome back, <span className="text-[#d4a373] drop-shadow-sm">{user?.fullname ? user.fullname.split(" ")[0] : "Citizen"}</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
              Your central command center to report lost items, register found belongings, alert against theft, and mobilize urgent missing person appeals across Kerala.
            </p>

            {/* 4 INTERACTIVE QUICK SHORTCUTS */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">

              <button
                type="button"
                onClick={() => router.push("/missing")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#8b5e3c]/50 backdrop-blur-md rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group/card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#8b5e3c]/25 rounded-full blur-xl pointer-events-none group-hover/card:scale-150 transition-transform"></div>
                <div className="flex items-center justify-between text-xs text-[#d4a373] font-semibold mb-1.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] animate-ping"></span>
                    Urgent Appeals
                  </span>
                  <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-base sm:text-lg font-bold font-serif text-white">Missing Alerts</div>
                <span className="text-[11px] text-white/70 block mt-0.5">Live volunteer appeals</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/search?type=LOST")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#8b5e3c]/50 backdrop-blur-md rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group/card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#8b5e3c]/25 rounded-full blur-xl pointer-events-none group-hover/card:scale-150 transition-transform"></div>
                <div className="flex items-center justify-between text-xs text-[#d4a373] font-semibold mb-1.5">
                  <span>Search Directory</span>
                  <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-base sm:text-lg font-bold font-serif text-white">Lost Directory</div>
                <span className="text-[11px] text-white/70 block mt-0.5">Search lost valuables</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/search?type=FOUND")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#8b5e3c]/50 backdrop-blur-md rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group/card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#8b5e3c]/25 rounded-full blur-xl pointer-events-none group-hover/card:scale-150 transition-transform"></div>
                <div className="flex items-center justify-between text-xs text-[#e8d5c4] font-semibold mb-1.5">
                  <span>Found Registry</span>
                  <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-base sm:text-lg font-bold font-serif text-white">Found Items</div>
                <span className="text-[11px] text-white/70 block mt-0.5">Claim found property</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/my-creations")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#8b5e3c]/50 backdrop-blur-md rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group/card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#8b5e3c]/25 rounded-full blur-xl pointer-events-none group-hover/card:scale-150 transition-transform"></div>
                <div className="flex items-center justify-between text-xs text-[#d4a373] font-semibold mb-1.5">
                  <span>My Activity</span>
                  <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-base sm:text-lg font-bold font-serif text-white">My Creations</div>
                <span className="text-[11px] text-white/70 block mt-0.5">Manage your listings</span>
              </button>

            </div>

            {/* TRUST HIGHLIGHTS */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-white/85">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#6b3f23]/30 text-[#d4a373] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={13} />
                </div>
                <span>100% Free Public Utility</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#6b3f23]/30 text-[#d4a373] flex items-center justify-center shrink-0">
                  <Users size={13} />
                </div>
                <span>Statewide Citizen Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#6b3f23]/30 text-[#d4a373] flex items-center justify-center shrink-0">
                  <Compass size={13} />
                </div>
                <span>District & Town Mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#6b3f23]/30 text-[#d4a373] flex items-center justify-center shrink-0">
                  <ShieldCheck size={13} />
                </div>
                <span>Law Enforcement Advisory</span>
              </div>
            </div>

          </div>
        </section>

        {/* PRIMARY SERVICES HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b3f23] mb-1">
              <Layers size={14} />
              <span>Core Portals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18]">
              Primary Community Services
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6252] mt-1 max-w-xl">
              Choose an incident type to file a verified report or browse matching community records.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.push("/my-creations")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b3f23] hover:text-[#2b1f18] bg-[#f4efe9] hover:bg-[#eae1d7] px-4 py-2 rounded-full transition border border-[#dfd4c8] cursor-pointer shadow-xs"
            >
              <FolderPlus size={14} />
              <span>My Creations</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#4b3425] hover:bg-[#38261a] px-4 py-2 rounded-full transition cursor-pointer shadow-sm"
            >
              <HelpCircle size={14} />
              <span>User Guide</span>
            </button>
          </div>
        </div>

        {/* SUPER CARDS GRID WITH MODERN VISUAL DELIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((item, i) => (
            <div
              key={i}
              className={`group bg-white rounded-3xl p-6 sm:p-8 border border-[#e5dcd3] shadow-[0_6px_24px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_24px_50px_-10px_rgba(75,52,37,0.16)] ${item.accentBorder} ${item.accentGlow} hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden`}
            >
              {/* TOP RADIANT BEAM (Expands and shines on hover) */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradientBeam} opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`}
              />

              {/* AMBIENT RADIAL MESH GLOW ON TOP-RIGHT */}
              <div
                className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${item.ambientGlow} blur-3xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out`}
              />

              {/* TOP HEADER & MEDIA ROW */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Badge & Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${item.badgeColor} transition-transform group-hover:scale-105 duration-300`}>
                        {item.type === "MISSING" ? (
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping mr-1.5 inline-block"></span>
                        ) : (
                          <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} mr-1.5 inline-block`}></span>
                        )}
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18] group-hover:text-[#6b3f23] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* ULTRA-STYLISH FLOATING MEDIA PORTAL WITH BADGE */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-white/95 to-[#f4efe9] p-1.5 border border-[#e5dcd3] shadow-[0_8px_20px_-6px_rgba(75,52,37,0.12)] group-hover:shadow-[0_16px_30px_-6px_rgba(75,52,37,0.22)] group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 overflow-hidden relative backdrop-blur-sm">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-115"
                      />
                      {/* Subtle Sheen Shine Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>

                    {/* Floating Category Icon Badge */}
                    <div className={`absolute -bottom-2 -left-2 w-7 h-7 rounded-full ${item.iconBadgeBg} text-white flex items-center justify-center shadow-md border-2 border-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                      <item.icon size={13} />
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs sm:text-sm text-[#665042] leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* HIGHLIGHTED CAPABILITIES PILLS WITH HOVER DELIGHT */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-[10px] sm:text-[11px] font-medium text-[#7a6252] bg-[#fbf9f6] hover:bg-[#ede5db] border border-[#ece3d9] hover:border-[#c9bfb6] px-3 py-1 rounded-full transition-all duration-200 cursor-default shadow-2xs group-hover:translate-x-0.5"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} mr-1.5`}></span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* CARD ACTIONS WITH MAGNETIC HOVER */}
              <div className="pt-4 border-t border-[#f0e8e0] relative z-10">
                {item.type === "MISSING" ? (
                  /* Single full-width action for Missing Person */
                  <button
                    type="button"
                    onClick={() => router.push("/missing")}
                    className="w-full bg-gradient-to-r from-[#2b1f18] via-[#4a2c17] to-[#2b1f18] hover:brightness-110 text-white px-5 py-3.5 rounded-xl flex items-center shimmer-button justify-center gap-2.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group/btn"
                  >
                    <Eye size={16} className="group-hover/btn:scale-110 transition-transform text-[#d4a373]" />
                    <span>View Missing Persons Directory</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-white/80" />
                  </button>
                ) : (
                  /* Dual actions for Lost, Found, Theft */
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => router.push(`/dashboard/create?type=${item.type}`)}
                      className="bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] shimmer-button hover:brightness-110 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group/btn"
                    >
                      <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                      <span>{item.createLabel}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push(`/dashboard/search?type=${item.type}`)}
                      className="border border-[#c9bfb6] text-[#3b2a21] hover:border-[#6b3f23] shimmer-button hover:bg-[#f7f2ed] px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-white group/btn"
                    >
                      <Search size={16} className="group-hover/btn:scale-110 transition-transform text-[#6b3f23]" />
                      <span>{item.searchLabel}</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* POLICE & SAFETY ADVISORY (ELEVATED DARK LUXURY BANNER) */}
        <section className="bg-gradient-to-br from-[#2b1f18] via-[#38261a] to-[#2b1f18] text-white border border-white/10 rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b5e3c]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#d89b52]/20 border border-[#d89b52]/40 text-[#fcd69b] flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:rotate-6 transition-transform">
                <ShieldAlert size={26} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#d4a373] font-semibold mb-1">
                  Official Advisory
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Statewide Police Coordination Advisory
                </h4>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed font-light">
                  For <strong>Theft</strong> and <strong>Missing</strong> cases, always register an official GD/FIR entry at your nearest police station. Hopest acts as an awareness multiplier to support official police investigation efforts.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#d4a373] font-medium">
                  <span>🚨 National Emergency: <strong>112</strong></span>
                  <span>•</span>
                  <span>👮 Police Control: <strong>100</strong></span>
                  <span>•</span>
                  <span>👧 Childline: <strong>1098</strong></span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => router.push("/dashboard/usesage")}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d89b52] to-[#b37c3b] hover:brightness-110 text-[#2b1f18] text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-105 active:scale-95 duration-200"
              >
                <span>Read Incident Advisory</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* 3-STEP COMMUNITY PROCESS WITH SUPER EFFECTS & BUTTONS */}
        <section className="pt-2">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8c7565] font-semibold">
              Simplified Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18] mt-1">
              How the Community Portal Works
            </h3>
            <p className="text-xs sm:text-sm text-[#7a6252] mt-1.5 max-w-md mx-auto">
              A transparent, 3-step citizen workflow designed to protect belongings and support our neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* STEP 01 */}
            <div className="bg-white rounded-3xl p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(107,63,35,0.18)] hover:border-[#8b5e3c]/60 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden">

              {/* TOP RADIANT BEAM */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23] opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500" />

              {/* AMBIENT RADIAL MESH */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8b5e3c]/15 blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out" />

              <div className="relative z-10">
                {/* STEP PILL & NUMBER ROW */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6b3f23] to-[#8b5e3c] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    01
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a373] bg-[#2b1b11] border border-[#6b3f23]/40 px-2.5 py-1 rounded-full shadow-2xs">
                    Step 1 • Report
                  </span>
                </div>

                <h5 className="font-bold text-lg sm:text-xl text-[#2b1f18] mb-2.5 font-serif group-hover:text-[#6b3f23] transition-colors">
                  Submit Accurate Details
                </h5>
                <p className="text-xs sm:text-sm text-[#6e584a] leading-relaxed mb-6">
                  Provide clear photos, place name, date, nearest police station, and your contact phone number for community verification.
                </p>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4 border-t border-[#f0e8e0] relative z-10">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/create?type=LOST")}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <Plus size={15} className="group-hover/btn:rotate-90 transition-transform" />
                  <span>File a Report</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                </button>
              </div>

            </div>

            {/* STEP 02 */}
            <div className="bg-white rounded-3xl p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(107,63,35,0.18)] hover:border-[#8b5e3c]/60 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden">

              {/* TOP RADIANT BEAM */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5c3a21] via-[#a06544] to-[#5c3a21] opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500" />

              {/* AMBIENT RADIAL MESH */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8b5e3c]/15 blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out" />

              <div className="relative z-10">
                {/* STEP PILL & NUMBER ROW */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5c3a21] to-[#a06544] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    02
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8d5c4] bg-[#21150e] border border-[#5c3a21]/50 px-2.5 py-1 rounded-full shadow-2xs">
                    Step 2 • Match
                  </span>
                </div>

                <h5 className="font-bold text-lg sm:text-xl text-[#2b1f18] mb-2.5 font-serif group-hover:text-[#6b3f23] transition-colors">
                  Instant Community Matching
                </h5>
                <p className="text-xs sm:text-sm text-[#6e584a] leading-relaxed mb-6">
                  Citizens in your town or district can search and instantly connect with verified reporters to return belongings safely.
                </p>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4 border-t border-[#f0e8e0] relative z-10">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/search?type=LOST")}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4a2c17] via-[#6b3f23] to-[#4a2c17] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <Search size={15} className="group-hover/btn:scale-110 transition-transform" />
                  <span>Search Directory</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                </button>
              </div>

            </div>

            {/* STEP 03 */}
            <div className="bg-white rounded-3xl p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(139,94,60,0.2)] hover:border-[#8b5e3c]/60 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden">

              {/* TOP RADIANT BEAM */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6b3f23] via-[#8b5e3c] to-[#d89b52] opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500" />

              {/* AMBIENT RADIAL MESH */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#d89b52]/15 blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out" />

              <div className="relative z-10">
                {/* STEP PILL & NUMBER ROW */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b2a21] via-[#6b3f23] to-[#8b5e3c] text-white flex items-center justify-center font-serif font-bold text-lg shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    03
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b3f23] bg-[#f4efe9] border border-[#d8cbbf] px-2.5 py-1 rounded-full shadow-2xs">
                    Step 3 • Manage
                  </span>
                </div>

                <h5 className="font-bold text-lg sm:text-xl text-[#2b1f18] mb-2.5 font-serif group-hover:text-[#6b3f23] transition-colors">
                  Manage In My Creations
                </h5>
                <p className="text-xs sm:text-sm text-[#6e584a] leading-relaxed mb-6">
                  Track your active listings, delete resolved cases, and update information anytime under your account’s My Creations page.
                </p>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4 border-t border-[#f0e8e0] relative z-10">
                <button
                  type="button"
                  onClick={() => router.push("/my-creations")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2b1f18] hover:bg-[#1a120e] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <FolderPlus size={15} className="group-hover/btn:scale-110 transition-transform text-[#d4a373]" />
                  <span>Open My Creations</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* 24/7 HELPDESK & SUPPORT BANNER */}
        <section className="bg-[#f4efe9] border border-[#e5dcd3] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#6b3f23] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone size={20} />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm sm:text-base text-[#2b1f18]">
                Need Direct Support or Urgent Assistance?
              </h5>
              <p className="text-xs text-[#7a6252]">
                Our dedicated citizen support coordinators are available to assist with your cases.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+918590168840"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#6b3f23] hover:bg-[#523019] text-white text-xs font-semibold text-center transition shadow-xs hover:scale-105 active:scale-95 duration-200"
            >
              Call +91 85901 68840
            </a>
            <a
              href="https://wa.me/918590168840?text=Hello%20Hopest%20Support,%20I%20need%20assistance%20with%20my%20dashboard%20report."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4a2c17] via-[#6b3f23] to-[#4a2c17] hover:brightness-110 border border-[#8b5e3c]/40 text-white text-xs font-semibold text-center transition shadow-xs flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 duration-200"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a6252]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2b1f18]">HOPEST</span>
            <span>– Hope for the best</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => router.push("/landing")}
              className="hover:text-[#2b1f18] hover:underline cursor-pointer"
            >
              Public Home
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/demand")}
              className="hover:text-[#2b1f18] hover:underline cursor-pointer"
            >
              Our Mission
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:text-[#2b1f18] hover:underline cursor-pointer"
            >
              User Guide
            </button>
            <button
              type="button"
              onClick={() => router.push("/privacy")}
              className="hover:text-[#2b1f18] hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}