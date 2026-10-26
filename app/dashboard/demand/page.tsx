"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  HeartHandshake,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export default function DemandPage() {
  const router = useRouter();

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

        {/* HERO TITLE BANNER */}
        <section className="animated-gradient text-white rounded-3xl p-8 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b3f23]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#4a2c17]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
              <Sparkles size={13} className="text-[#d4a373] animate-pulse" />
              <span>Community Purpose</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.2] tracking-tight">
              What is the need for Hopest app ?
            </h1>
          </div>
        </section>

        {/* CONTENT CARD 1: THE CORE QUESTION & SOCIAL MEDIA RELEVANCE */}
        <article className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e5dcd3] shadow-[0_4px_24px_-4px_rgba(75,52,37,0.06)] space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4a2c17] via-[#8b5e3c] to-[#4a2c17]" />

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#6b3f23] tracking-tight">
            What is the need for Hopest app ?
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#2c2018] leading-relaxed">
            <p className="font-medium text-[#1f1610]">
              This is a relevant question in this era because what is its relevance when there are apps like whatsapp, facebook etc..
            </p>

            <p>
              What usually happens between us is when we lose or get something or our loved ones go missing, we rely on WhatsApp, Facebook, etc. But the reality is that it is not possible to get the message to the people quickly. Similarly, it is doubtful whether the message is getting through to the real people.
            </p>

            <p>
              Once the message reaches real people, we can see that it spreads without being able to delete it, and this is where we can understand the need for Hopest, an application.
            </p>
          </div>
        </article>

        {/* CONTENT CARD 2: USER ELIGIBILITY & TRUTHFUL INFORMATION */}
        <article className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e5dcd3] shadow-[0_4px_24px_-4px_rgba(75,52,37,0.06)] space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5c3a21] via-[#d4a373] to-[#5c3a21]" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#f4efe9] text-[#6b3f23] border border-[#e8dfd6] flex items-center justify-center shrink-0">
              <Shield size={18} />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b1f18]">
              User Guidelines & Legal Compliance
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[#2c2018] leading-relaxed">
            You are at least 18 years old.You will provide accurate and truthful information about yourself.You will not use this app for any comercial or illegal purposes.Users are solely responsible for transactions made by users.The information you provide will be secure.If you notice any violation of copyright or any other kind of law by us ,please notify us and we will fix it immediately
          </p>
        </article>

        {/* CONTENT CARD 3: SOLIDARITY MISSION FOR MALAYALIS */}
        <article className="bg-white rounded-3xl p-6 sm:p-9 border border-[#e5dcd3] shadow-[0_4px_24px_-4px_rgba(75,52,37,0.06)] space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6b3f23] via-[#a06544] to-[#6b3f23]" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#f4efe9] text-[#6b3f23] border border-[#e8dfd6] flex items-center justify-center shrink-0">
              <HeartHandshake size={18} />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b1f18]">
              Our Collective Mission
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[#2c2018] leading-relaxed">
            What we Malayalis need to do is to spread the Hopest application to everyone as much as possible, but only reminding that it will be useful for every person.
          </p>
        </article>

        {/* CONTENT CARD 4: CONTACT HOPEST TEAM CALLOUT */}
        <section className="bg-gradient-to-br from-[#2b1f18] via-[#38261a] to-[#2b1f18] text-white border border-white/10 rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b5e3c]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4a373] font-semibold block mb-1">
                Hopest Support Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                For all your help you can contact hopest team ..
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-xl leading-relaxed font-light">
                Reach out to our coordinators anytime for assistance, verification, or community questions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => router.push("/about")}
                className="w-full sm:w-auto bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] hover:brightness-110 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-105 active:scale-95 duration-200 border border-[#8b5e3c]/40"
              >
                <Phone size={15} />
                <span>Contact Hopest Team</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}