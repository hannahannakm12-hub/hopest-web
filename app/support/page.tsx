"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  Shield,
  Clock,
  Check,
  Copy,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  Building2,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function CallSupportPage() {
  const router = useRouter();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const supportHelplines = [
    {
      key: "call",
      title: "Direct Voice Helpline",
      subtitle: "Hopest Citizen Helpdesk",
      number: "+91 85901 68840",
      dialUrl: "tel:+918590168840",
      desc: "Speak with a coordinator for urgent missing person appeals, verifying found property, or reporting false claims.",
      availability: "Available 24/7 for Emergencies",
      icon: Phone,
      gradientBeam: "from-amber-600 via-amber-400 to-[#d89b52]",
      ambientGlow: "bg-amber-400/15",
      color: "from-[#4b3425] via-[#6b3f23] to-[#4b3425]",
      btnText: "Call Helpline Now",
    },
    {
      key: "whatsapp",
      title: "WhatsApp Direct Desk",
      subtitle: "Instant Photo & Document Desk",
      number: "+91 85901 68840",
      dialUrl: "https://wa.me/918590168840",
      desc: "Send photographs of lost or found belongings, share location coordinates, or receive real-time case updates.",
      availability: "Immediate Response on WhatsApp",
      icon: MessageCircle,
      gradientBeam: "from-emerald-600 via-teal-400 to-emerald-400",
      ambientGlow: "bg-emerald-400/15",
      color: "from-emerald-800 via-emerald-700 to-emerald-800",
      btnText: "Chat on WhatsApp",
    },
    {
      key: "email",
      title: "Official Email Support",
      subtitle: "Administration & Takedown Desk",
      number: "hopestdhanaf@gmail.com",
      dialUrl: "mailto:hopestdhanaf@gmail.com",
      desc: "Formal partnership queries, legal coordination with police stations, data correction, or deletion requests.",
      availability: "Response within 12-24 hours",
      icon: Mail,
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#d89b52]",
      ambientGlow: "bg-amber-500/10",
      color: "from-[#2b1f18] via-[#3b2a21] to-[#2b1f18]",
      btnText: "Send Official Email",
    },
  ];

  const emergencyServices = [
    { name: "National Emergency Helpline", dial: "112", detail: "Police, Fire, Ambulance coordination across India" },
    { name: "Kerala Police Control Room", dial: "100", detail: "Immediate district police intervention & FIR dispatch" },
    { name: "Women Emergency Safety Helpline", dial: "1091", detail: "Toll-free 24/7 dedicated women protection" },
    { name: "Childline Emergency Desk", dial: "1098", detail: "Support for missing children, runaway, and child welfare" },
  ];

  const faqs = [
    {
      q: "Is there any charge for calling or using Hopest support?",
      a: "No. Hopest is 100% free of charge. We do not charge citizens for publishing reports, searching listings, or calling our helpline desks.",
    },
    {
      q: "What should I do if I find a missing person listed on Hopest?",
      a: "Immediately contact your local police station by dialing 112 or 100, and inform our voice helpline at +91 85901 68840. Do not attempt to take custody yourself; always coordinate with law enforcement.",
    },
    {
      q: "Can Hopest help me contact the finder of my lost belongings?",
      a: "Yes. Every report includes the reporter's contact number whenever provided. If the number is missing or unreachable, contact our support team and we will assist in coordinating.",
    },
    {
      q: "How can I remove or edit my published report?",
      a: "Navigate to 'My Creations' from the dashboard drawer menu to delete your listing immediately. If you need assistance, message us on WhatsApp with the item ID.",
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

          <span className="text-xs font-mono uppercase tracking-widest text-amber-200/90 font-medium">
            Hopest Portal • Call Support
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-10 sm:space-y-12">
        
        {/* HERO BANNER WITH AMBIENT PARTICLES */}
        <section className="animated-gradient text-white rounded-3xl p-7 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Phone size={13} className="text-amber-300 animate-pulse" />
              <span>Official Citizen Helplines</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Call Support & Citizen Assistance
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-white/90 leading-relaxed font-light">
              We are here to assist you. Whether you need guidance filing an urgent missing person alert, recovering lost items, or reporting suspicious listings, connect with our team directly.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="tel:+918590168840"
                className="bg-white text-[#2b1f18] hover:bg-amber-100 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 duration-200"
              >
                <Phone size={15} />
                <span>Call +91 85901 68840</span>
              </a>
              <a
                href="https://wa.me/918590168840"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 duration-200"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* PRIMARY HELPLINES GRID WITH SUPER CARD EFFECTS */}
        <section className="space-y-4">
          <div className="border-b border-[#e8ded3] pb-3 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18]">
              Hopest Support Desks
            </h2>
            <span className="text-xs text-[#8b5e3c] font-bold bg-[#f4efe9] border border-[#e5dcd3] px-3 py-1 rounded-full shadow-2xs">
              Free Citizen Service
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportHelplines.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedKey === item.key;

              return (
                <div
                  key={item.key}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.16)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Top Radiant Beam */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradientBeam} opacity-80 group-hover:opacity-100 group-hover:h-2 transition-all duration-500`}
                  />

                  {/* Ambient Glow */}
                  <div
                    className={`absolute -top-16 -right-16 w-48 h-48 rounded-full ${item.ambientGlow} blur-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#f4efe9] text-[#6b3f23] border border-[#e5dcd3] flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shadow-2xs">
                        {item.availability}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#2b1f18] group-hover:text-[#6b3f23] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#8b5e3c] font-semibold uppercase tracking-wider mt-0.5">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#7a6252] mt-3 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Number Box with Copy Action */}
                    <div className="mt-5 p-3.5 bg-[#fcfaf7] border border-[#ede5db] rounded-2xl flex items-center justify-between shadow-2xs group-hover:border-[#c9bfb6] transition-colors">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#2b1f18] truncate pr-2">
                        {item.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.key, item.number)}
                        className="text-[#8b5e3c] hover:text-[#4b3425] p-1.5 rounded-xl hover:bg-[#ede5dc] transition cursor-pointer shrink-0"
                        title="Copy"
                      >
                        {isCopied ? (
                          <Check size={15} className="text-emerald-700" />
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Direct CTA Button */}
                  <div className="mt-6 pt-3 border-t border-[#f0e8e0] relative z-10">
                    <a
                      href={item.dialUrl}
                      target={item.key === "whatsapp" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`w-full bg-gradient-to-r ${item.color} hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group/btn`}
                    >
                      <Icon size={15} className="group-hover/btn:scale-110 transition-transform" />
                      <span>{item.btnText}</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform opacity-80" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EMERGENCY SERVICES QUICK DIRECTORY WITH HOVER CARDS */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Shield size={22} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1f18]">
                Emergency Government & Law Enforcement Numbers
              </h3>
              <p className="text-xs sm:text-sm text-[#7a6252] mt-0.5 leading-relaxed">
                For urgent life safety emergencies or reporting active crimes, dial direct government helplines:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {emergencyServices.map((svc, i) => (
              <a
                key={i}
                href={`tel:${svc.dial}`}
                className="bg-[#fcfaf7] border border-[#ede5db] hover:border-[#8b5e3c] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-center group cursor-pointer"
              >
                <span className="text-2xl font-serif font-bold text-[#4b3425] group-hover:scale-110 block transition-transform group-hover:text-red-700">
                  {svc.dial}
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#2b1f18] block mt-1">
                  {svc.name}
                </span>
                <span className="text-[11px] text-[#8c7565] block mt-1 leading-relaxed">
                  {svc.detail}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] space-y-4">
          <div className="flex items-center gap-2.5 mb-2">
            <HelpCircle size={22} className="text-[#8b5e3c]" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1f18]">
              Frequently Asked Support Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#ede5db] hover:border-[#dfd2c2] rounded-2xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm text-[#2b1f18] hover:bg-[#fcfaf7] transition cursor-pointer"
                  >
                    <span className="pr-3">{faq.q}</span>
                    <ChevronDown
                      size={17}
                      className={`text-[#8b5e3c] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6e584a] leading-relaxed border-t border-[#f0e8e0] bg-[#fcfaf7]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

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
              className="hover:underline hover:text-[#2b1f18]"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => router.push("/about")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => router.push("/privacy")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
