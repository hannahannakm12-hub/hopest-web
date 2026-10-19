"use client";

import {
  UserPlus,
  LogIn,
  Search,
  Plus,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowToUseContent() {
  const router = useRouter();

  const steps = [
    {
      stepNum: "01",
      title: "Register Account",
      desc: "Create your free account using your name, mobile number, and password for verified reporting.",
      icon: UserPlus,
      gradientBeam: "from-[#8b5e3c] via-[#d89b52] to-[#8b5e3c]",
      badge: "Step 1 • Profile",
      btnText: "Create Account",
      btnAction: () => router.push("/auth/register"),
    },
    {
      stepNum: "02",
      title: "Login to Dashboard",
      desc: "Access your dashboard anytime to track and manage your incident posts.",
      icon: LogIn,
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23]",
      badge: "Step 2 • Access",
      btnText: "Go to Dashboard",
      btnAction: () => router.push("/dashboard"),
    },
    {
      stepNum: "03",
      title: "Report Lost Item",
      desc: "Enter the item name, description, date, place, nearest police station, and upload photos.",
      icon: Plus,
      gradientBeam: "from-amber-600 via-amber-400 to-[#d89b52]",
      badge: "Step 3 • Lost Case",
      btnText: "Report Lost Item",
      btnAction: () => router.push("/dashboard/create?type=LOST"),
    },
    {
      stepNum: "04",
      title: "Search Lost Items",
      desc: "Check if someone has already found and reported your lost belonging across our database.",
      icon: Search,
      gradientBeam: "from-[#6b3f23] via-amber-400 to-[#8b5e3c]",
      badge: "Step 4 • Discovery",
      btnText: "Search Database",
      btnAction: () => router.push("/dashboard/search?type=LOST"),
    },
    {
      stepNum: "05",
      title: "Report Found Item",
      desc: "Safely record belongings you found to help return them to their rightful owners.",
      icon: Package,
      gradientBeam: "from-emerald-600 via-teal-400 to-emerald-400",
      badge: "Step 5 • Good Samaritan",
      btnText: "Report Found Item",
      btnAction: () => router.push("/dashboard/create?type=FOUND"),
    },
    {
      stepNum: "06",
      title: "Report Theft Incident",
      desc: "Lodge an official police FIR first, then enter theft details here to alert the community.",
      icon: AlertTriangle,
      gradientBeam: "from-rose-600 via-rose-400 to-orange-400",
      badge: "Step 6 • Security Alert",
      btnText: "Report Theft Case",
      btnAction: () => router.push("/dashboard/create?type=THEFT"),
    },
    {
      stepNum: "07",
      title: "Report Missing Person",
      desc: "Notify local authorities immediately, then create an urgent statewide broadcast.",
      icon: AlertTriangle,
      gradientBeam: "from-red-600 via-rose-500 to-amber-500",
      badge: "Step 7 • Emergency",
      btnText: "Missing Persons Portal",
      btnAction: () => router.push("/missing"),
      isEmergency: true,
    },
  ];

  return (
    <div className="bg-[#fbf9f6] text-[#3b2a21] min-h-screen py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 selection:bg-[#d89b52]/30 selection:text-[#2b1f18]">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">

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

        {/* HERO TITLE CARD */}
        <div className="animated-gradient text-white rounded-3xl p-8 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4 border border-white/20 shadow-sm">
              <Sparkles size={13} className="text-amber-300 animate-pulse" />
              <span>User Manual</span>
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              How to Use Hopest
            </h1>

            <p className="text-white/90 mt-3.5 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              A simple, step-by-step walkthrough to get the most out of our community platform.
            </p>
          </div>
        </div>

        {/* STEP-BY-STEP INTERACTIVE TIMELINE */}
        <div className="relative pt-4">

          {/* Subtle Glowing Central Connector Line */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#6b3f23] via-[#d89b52] to-transparent hidden sm:block opacity-40"></div>

          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative sm:pl-16 group">

                  {/* Glowing Node Orb on Desktop */}
                  <div className="hidden sm:flex absolute left-3.5 top-6 -translate-x-1/2 items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#6b3f23] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-md group-hover:scale-125 group-hover:bg-[#d89b52] transition-all duration-300">
                      {step.stepNum}
                    </div>
                  </div>

                  {/* Super Card with Radiant Top Beam & Effects */}
                  <div className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.16)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${step.isEmergency ? "border-red-200 bg-gradient-to-r from-white to-red-50/20" : ""}`}>

                    {/* Top Radiant Beam */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.gradientBeam} opacity-75 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`} />

                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-[#f4efe9] border border-[#e5dcd3] text-[#6b3f23] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7565] bg-[#fbf9f6] border border-[#e8dfd6] px-2.5 py-0.5 rounded-full">
                            {step.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-[#2b1f18] group-hover:text-[#6b3f23] transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#6e584a] leading-relaxed mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Step Action Button */}
                    <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0e8e0]">
                      <button
                        type="button"
                        onClick={step.btnAction}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                      >
                        <span>{step.btnText}</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IMPORTANT ADVISORY CARD */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 shadow-md flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-red-900 font-serif mb-1">
              Important Advisory
            </h4>
            <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
              <strong>Important:</strong> Always report Theft and Missing cases to the nearest police station before posting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}