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
  Package,
  FolderOpen,
  PhoneCall,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowToUseContent() {
  const router = useRouter();

  const guideItems = [
    {
      heading: "Register",
      body: "Enter your full name, mobile number, and password to register.",
      icon: UserPlus,
      btnLabel: "Go to Register",
      btnAction: () => router.push("/auth/register"),
    },
    {
      heading: "Login",
      body: "Enter the details you provided during registration to log in.",
      icon: LogIn,
      btnLabel: "Go to Login",
      btnAction: () => router.push("/auth/login"),
    },
    {
      heading: "Home -> Lost -> Creation",
      body: "Enter the details of the lost item.",
      icon: Plus,
      btnLabel: "Report Lost Item",
      btnAction: () => router.push("/dashboard/create?type=LOST"),
    },
    {
      heading: "Home -> Lost -> Search",
      body: "Check if someone has already reported the lost item.",
      icon: Search,
      btnLabel: "Search Lost Items",
      btnAction: () => router.push("/dashboard/search?type=LOST"),
    },
    {
      heading: "Home -> Found -> Creation",
      body: "Enter the details of the found item.",
      icon: Package,
      btnLabel: "Report Found Item",
      btnAction: () => router.push("/dashboard/create?type=FOUND"),
    },
    {
      heading: "Home -> Found -> Search",
      body: "Check if someone has already reported the found item.",
      icon: Search,
      btnLabel: "Search Found Items",
      btnAction: () => router.push("/dashboard/search?type=FOUND"),
    },
    {
      heading: "Home -> Theft -> Creation",
      body: "If an item has been stolen, report it to the nearest police station after enter the details of the theft item.",
      icon: AlertTriangle,
      btnLabel: "Report Theft Case",
      btnAction: () => router.push("/dashboard/create?type=THEFT"),
    },
    {
      heading: "Home -> Theft -> Search",
      body: "Check if someone has already reported a stolen item.",
      icon: Search,
      btnLabel: "Search Stolen Items",
      btnAction: () => router.push("/dashboard/search?type=THEFT"),
    },
    {
      heading: "Home -> Missing",
      body: "If a person is missing, report it to the nearest police station and click the Help button to inform the Hopest team.",
      icon: Shield,
      btnLabel: "Missing Directory",
      btnAction: () => router.push("/missing"),
      isEmergency: true,
    },
    {
      heading: "Drawer -> My Creation",
      body: "This section stores all the details entered by the user in their mobile and you can delete",
      icon: FolderOpen,
      btnLabel: "Open My Creations",
      btnAction: () => router.push("/my-creations"),
    },
    {
      heading: "Drawer -> Call Support",
      body: "If you need assistance, you can contact the Hopest team for support",
      icon: PhoneCall,
      btnLabel: "Call Support Desk",
      btnAction: () => router.push("/about"),
    },
  ];

  return (
    <div className="bg-[#fbf9f6] text-[#3b2a21] min-h-screen py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 selection:bg-[#6b3f23]/30 selection:text-[#2b1f18]">
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
        <section className="animated-gradient text-white rounded-3xl p-8 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b3f23]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#4a2c17]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4a373] bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4 border border-white/20 shadow-sm">
              <Sparkles size={13} className="text-[#d4a373] animate-pulse" />
              <span>User Guide & Instructions</span>
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2]">
              How to use Hopest Application ?
            </h1>
          </div>
        </section>

        {/* 11 GUIDE ITEMS (MATCHING THE MOBILE APP SCREENSHOTS) */}
        <div className="space-y-4 sm:space-y-5">
          {guideItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#e5dcd3] shadow-[0_4px_16px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(75,52,37,0.12)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${item.isEmergency ? "border-l-4 border-l-[#8b5e3c]" : ""}`}
              >
                <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#f4efe9] text-[#6b3f23] border border-[#e8dfd6] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Icon size={18} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#1f1610] tracking-tight">
                      {item.heading}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#4a3b32] leading-relaxed mt-1">
                      {item.body}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0e8e0]">
                  <button
                    type="button"
                    onClick={item.btnAction}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#5c371e] to-[#3d2314] hover:brightness-110 text-white text-xs font-semibold shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                  >
                    <span>{item.btnLabel}</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform opacity-80" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* IMPORTANT ADVISORY CALLOUT */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#21150e] border border-[#6b3f23]/50 shadow-md flex items-start gap-4 text-white">
          <div className="w-10 h-10 rounded-xl bg-[#2b1b11] text-[#d4a373] border border-[#6b3f23]/40 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white font-serif mb-1">
              Important Advisory
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Always report Theft and Missing cases to the nearest police station before posting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}