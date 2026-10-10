"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  Heart,
  Shield,
  Users,
  Sparkles,
  Check,
  Copy,
  Clock,
  MapPin,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ArrowRight,
  PhoneCall,
  Search,
  PlusCircle,
  Flame,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const supportContacts = [
    {
      key: "call",
      title: "Direct Voice Support",
      description: "Speak directly with our community coordination team.",
      value: "+91 85901 68840",
      actionLabel: "Call Now",
      actionUrl: "tel:+918590168840",
      icon: Phone,
      gradientBeam: "from-amber-600 via-amber-400 to-[#d89b52]",
      ambientGlow: "bg-amber-400/15",
      accent: "from-[#4b3425] via-[#6b3f23] to-[#4b3425]",
      badge: "Toll-Free Priority",
      badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
      key: "whatsapp",
      title: "WhatsApp Helpdesk",
      description: "Quick chat, submit verification details, or send images.",
      value: "+91 85901 68840",
      actionLabel: "Chat on WhatsApp",
      actionUrl: "https://wa.me/918590168840",
      icon: MessageCircle,
      gradientBeam: "from-emerald-600 via-teal-400 to-emerald-400",
      ambientGlow: "bg-emerald-400/15",
      accent: "from-emerald-800 via-emerald-700 to-emerald-800",
      badge: "Fastest Response",
      badgeStyle: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
      key: "email",
      title: "Official Email Inquiries",
      description: "General support, partner requests, or data removal.",
      value: "hopestdhanaf@gmail.com",
      actionLabel: "Send Email",
      actionUrl: "mailto:hopestdhanaf@gmail.com",
      icon: Mail,
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#d89b52]",
      ambientGlow: "bg-amber-500/10",
      accent: "from-[#2b1f18] via-[#3b2a21] to-[#2b1f18]",
      badge: "Written Record",
      badgeStyle: "bg-[#f4efe9] text-[#6b3f23] border-[#e2d5c7]",
    },
  ];

  const pillars = [
    {
      icon: Heart,
      title: "Good Samaritan Network",
      description:
        "Connect honest finders with distressed owners. Restoring lost valuables, identity documents, and personal belongings quickly.",
      gradientBeam: "from-rose-500 via-pink-400 to-amber-400",
      ambientGlow: "bg-rose-400/15",
      iconBg: "bg-rose-50 border-rose-200 text-rose-700",
    },
    {
      icon: Shield,
      title: "Theft Incident Alerts",
      description:
        "Raise public awareness on stolen vehicles, electronics, and goods to prevent illegal resale and aid police investigations.",
      gradientBeam: "from-amber-600 via-amber-400 to-orange-400",
      ambientGlow: "bg-amber-400/15",
      iconBg: "bg-amber-50 border-amber-200 text-amber-800",
    },
    {
      icon: Users,
      title: "Missing Persons Broadcast",
      description:
        "An active humanitarian broadcast engine helping families spread verified alerts and photographic records across Kerala districts.",
      gradientBeam: "from-blue-600 via-sky-400 to-teal-400",
      ambientGlow: "bg-sky-400/15",
      iconBg: "bg-sky-50 border-sky-200 text-sky-800",
    },
    {
      icon: Sparkles,
      title: "100% Free & Transparent",
      description:
        "Built purely as a civic initiative. No charges, no commercial paywalls, and designed to safeguard user privacy.",
      gradientBeam: "from-emerald-600 via-teal-400 to-amber-300",
      ambientGlow: "bg-emerald-400/15",
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
  ];

  const emergencyNumbers = [
    { 
      label: "Emergency Response Support", 
      number: "112", 
      desc: "National Emergency Helpline",
      beam: "from-red-600 via-rose-500 to-amber-500",
      glow: "bg-red-400/15"
    },
    { 
      label: "Kerala Police Control Room", 
      number: "100", 
      desc: "Immediate police intervention",
      beam: "from-blue-600 via-indigo-500 to-cyan-500",
      glow: "bg-blue-400/15"
    },
    { 
      label: "Women Safety Helpline", 
      number: "1091", 
      desc: "24/7 dedicated support",
      beam: "from-purple-600 via-pink-500 to-rose-400",
      glow: "bg-purple-400/15"
    },
    { 
      label: "Child Protection Support", 
      number: "1098", 
      desc: "National Childline Network",
      beam: "from-amber-600 via-yellow-500 to-emerald-500",
      glow: "bg-amber-400/15"
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#d89b52]/30 selection:text-[#2b1f18]">
      
      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#2b1f18]/95 backdrop-blur-md border-b border-white/10 text-white py-3.5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-200/90 font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15">
            Hopest Portal • About & Support
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-12">
        
        {/* HERO BANNER WITH REALISTIC PARTICLES & MESH */}
        <section className="relative text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/15 overflow-hidden group">
          {/* Rich multi-layer background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#201610] via-[#3b2a21] to-[#1a110b]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,155,82,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(107,63,35,0.45),transparent_60%)]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider mb-5 shadow-inner">
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
              <span>Civic Solidarity Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              About Hopest & Call Support
            </h1>

            <p className="mt-4 text-sm sm:text-base text-amber-100/90 leading-relaxed font-light max-w-2xl">
              Hopest (<em>Hope for the best</em>) is a free community-driven humanitarian platform dedicated to connecting citizens across Kerala to report lost items, return found belongings, document theft incidents, and broadcast urgent missing persons alerts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#support"
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 text-[#2b1f18] hover:from-white hover:to-amber-100 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-[0_8px_20px_-4px_rgba(216,155,82,0.4)] hover:shadow-[0_12px_28px_-4px_rgba(216,155,82,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall size={15} />
                <span>Access Call Support Helpline ↓</span>
              </a>
              <button
                type="button"
                onClick={() => router.push("/dashboard/usesage")}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm border border-white/25 hover:border-white/40 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>Community Guidelines</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* CALL SUPPORT HELPLINE SECTION */}
        <section id="support" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e8ded3] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Phone size={12} className="text-amber-800" />
                <span>24/7 Helpline Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18]">
                Direct Contact & Call Support
              </h2>
            </div>
            <p className="text-xs text-[#7a6252] sm:text-right max-w-xs leading-relaxed">
              Need assistance with an active notice or missing person alert? Reach out directly through any channel below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportContacts.map((contact) => {
              const Icon = contact.icon;
              const isCopied = copiedKey === contact.key;

              return (
                <div
                  key={contact.key}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.16)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Radiant top gradient beam */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${contact.gradientBeam} opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`} />
                  
                  {/* Ambient glowing radial blur */}
                  <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full ${contact.ambientGlow} blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f8f4ef] to-[#ede3d8] border border-[#e5dcd3] text-[#6b3f23] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon size={22} className="text-[#6b3f23]" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${contact.badgeStyle}`}>
                        {contact.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#2b1f18] group-hover:text-[#6b3f23] transition-colors">
                      {contact.title}
                    </h3>
                    <p className="text-xs text-[#7a6252] mt-1.5 leading-relaxed">
                      {contact.description}
                    </p>

                    <div className="mt-4 p-3 bg-[#fbf9f6] border border-[#e8dfd6] group-hover:border-[#d5c7bc] rounded-2xl flex items-center justify-between transition-colors shadow-xs">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#2b1f18] truncate pr-2">
                        {contact.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(contact.key, contact.value)}
                        className="text-[#8b5e3c] hover:text-[#4b3425] p-1.5 rounded-lg hover:bg-[#ede5dc] transition cursor-pointer shrink-0"
                        title="Copy to clipboard"
                      >
                        {isCopied ? (
                          <div className="flex items-center gap-1 text-emerald-700 font-sans text-[11px] font-bold">
                            <Check size={14} />
                            <span>Copied</span>
                          </div>
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-2 relative z-10">
                    <a
                      href={contact.actionUrl}
                      target={contact.key === "whatsapp" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`w-full bg-gradient-to-r ${contact.accent} hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_-4px_rgba(75,52,37,0.2)] hover:shadow-[0_8px_24px_-4px_rgba(75,52,37,0.3)] transition-all duration-300 hover:gap-3`}
                    >
                      <Icon size={15} />
                      <span>{contact.actionLabel}</span>
                      <ArrowRight size={13} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* MISSION & FOUR PILLARS */}
        <section className="space-y-6">
          <div className="border-b border-[#e8ded3] pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18]">
              The Four Pillars of Hopest
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6252] mt-1">
              How our technology empowers local communities to look out for one another.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.16)] hover:-translate-y-1.5 transition-all duration-500 flex items-start gap-4 relative overflow-hidden group"
                >
                  {/* Radiant top gradient beam */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${pillar.gradientBeam} opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`} />
                  
                  {/* Ambient glowing radial blur */}
                  <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full ${pillar.ambientGlow} blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out`} />

                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <Icon size={22} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-serif font-bold text-[#2b1f18] mb-1.5 group-hover:text-[#6b3f23] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EMERGENCY POLICE & ESSENTIAL HELPLINES */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] space-y-5 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600" />
          
          <div className="flex items-start gap-3.5 pt-1">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-amber-900" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#2b1f18]">
                Emergency Law Enforcement Helplines
              </h3>
              <p className="text-xs text-[#7a6252] mt-0.5 leading-relaxed">
                Hopest serves as an awareness bridge. For ongoing crimes, immediate life safety threats, or official missing complaints, always dial official emergency services first:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {emergencyNumbers.map((num, i) => (
              <a
                key={i}
                href={`tel:${num.number}`}
                className="bg-[#fcfaf7] border border-[#ede5db] hover:border-[#8b5e3c] rounded-2xl p-4 transition-all duration-300 text-center group hover:bg-white hover:shadow-md relative overflow-hidden"
              >
                {/* Top accent beam */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${num.beam} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full ${num.glow} blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity`} />

                <span className="text-2xl font-serif font-bold text-[#4b3425] group-hover:text-[#6b3f23] group-hover:scale-105 block transition-all duration-300">
                  {num.number}
                </span>
                <span className="font-semibold text-xs text-[#2b1f18] block mt-1.5">
                  {num.label}
                </span>
                <span className="text-[11px] text-[#8c7565] block mt-0.5">
                  {num.desc}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="relative rounded-3xl p-8 sm:p-10 text-center space-y-4 border border-[#e5dcd3] overflow-hidden group shadow-[0_4px_24px_-4px_rgba(75,52,37,0.06)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf9] via-[#f7f2ec] to-[#eee5db]" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#6b3f23]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1f18]">
              Be a Guardian for Your Community
            </h3>
            <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed">
              By reporting an item you found, sharing a missing person notice, or verifying details before buying second-hand goods, you make our community safer and kinder for everyone.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard/create?type=FOUND")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-[0_4px_16px_-4px_rgba(75,52,37,0.3)] hover:-translate-y-0.5 flex items-center gap-2"
              >
                <PlusCircle size={15} />
                <span>Report a Found Item</span>
              </button>
              <button
                type="button"
                onClick={() => router.push("/missing")}
                className="px-6 py-3 rounded-xl border border-[#d5c7bc] bg-white text-[#3b2a21] hover:bg-[#fbf9f6] hover:border-[#8b5e3c] text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-xs hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Search size={15} />
                <span>View Missing Directory</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2b1f18]">HOPEST</span>
            <span>– Hope for the best</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="hover:underline hover:text-[#2b1f18] cursor-pointer"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:underline hover:text-[#2b1f18] cursor-pointer"
            >
              Guidelines
            </button>
            <button
              type="button"
              onClick={() => router.push("/privacy")}
              className="hover:underline hover:text-[#2b1f18] cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}