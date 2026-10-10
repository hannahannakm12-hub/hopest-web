"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Trash2,
  Bell,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      gradientBeam: "from-amber-600 via-amber-400 to-[#d89b52]",
      badge: "Data Collection",
      content:
        "When you register or submit a report on Hopest, we collect the necessary information required to facilitate recovery and community awareness. This includes your account name, email address, contact phone number, and report details (such as item title, incident category, location, date of occurrence, nearest police station, and optional photographs).",
    },
    {
      icon: UserCheck,
      title: "2. How We Use and Display Your Information",
      gradientBeam: "from-[#8b5e3c] via-[#d89b52] to-[#8b5e3c]",
      badge: "Public Visibility",
      content:
        "Information submitted as part of a public report (Lost, Found, Theft, or Missing) is displayed on our search directories to allow citizens, local authorities, and finders to identify items or individuals. Your personal account passwords are encrypted and never disclosed. We do not use your data for advertising tracking or third-party behavioral profiling.",
    },
    {
      icon: Phone,
      title: "3. Contact Number Visibility & Phone Privacy",
      gradientBeam: "from-emerald-600 via-teal-400 to-emerald-400",
      badge: "Phone Privacy",
      content:
        "When submitting a listing, the contact telephone number you provide is made accessible to verified visitors so that an honest finder, legal owner, or police officer can reach out directly via call or WhatsApp. If you wish to mask your personal number, you may specify a designated representative or authorized police station contact instead.",
    },
    {
      icon: Lock,
      title: "4. Security & Data Protection Measures",
      gradientBeam: "from-[#6b3f23] via-[#8b5e3c] to-[#6b3f23]",
      badge: "Cyber Security",
      content:
        "We value your trust and implement commercially reasonable technical safeguards to protect your personal information from unauthorized access, accidental alteration, or disclosure. However, no internet transmission or electronic storage method is 100% immune from external hazards, and we continuously maintain our security practices.",
    },
    {
      icon: Shield,
      title: "5. Children's Privacy (Under 13 Protection)",
      gradientBeam: "from-purple-600 via-pink-400 to-purple-600",
      badge: "Child Safety",
      content:
        "Hopest services are not targeted at or knowingly made for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years old. If we discover that a minor under 13 has submitted personal data without verified parental consent, we immediately purge the data from our databases.",
    },
    {
      icon: Trash2,
      title: "6. User Control & Right to Deletion",
      gradientBeam: "from-rose-600 via-rose-400 to-orange-400",
      badge: "User Autonomy",
      content:
        "You maintain full ownership of your contributions. You can remove any active listing you published at any time directly through the 'My Creations' management dashboard. Once deleted, the listing is promptly removed from public searches. To request a complete erasure of your user profile, please email our support desk.",
    },
    {
      icon: Bell,
      title: "7. Modifications to This Policy",
      gradientBeam: "from-sky-600 via-cyan-400 to-sky-600",
      badge: "Policy Updates",
      content:
        "We may update our Privacy Policy periodically to reflect technological changes, community feedback, or legal updates. Any revisions will be published on this page with an updated effective date. We recommend checking this page occasionally to stay informed about how we safeguard your data.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#d89b52]/30 selection:text-[#2b1f18]">
      
      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#2b1f18]/95 backdrop-blur-md border-b border-white/10 text-white py-3.5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          <span className="text-xs font-mono uppercase tracking-widest text-amber-200/90 font-medium">
            Hopest Portal • Privacy Policy
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-10 sm:space-y-12">
        
        {/* HERO BANNER */}
        <section className="animated-gradient text-white rounded-3xl p-7 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Lock size={13} className="text-amber-300 animate-pulse" />
              <span>Official Privacy Notice</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Privacy Policy & Data Security
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-white/90 leading-relaxed font-light">
              Your trust is our cornerstone. Read our commitment to protecting your personal information, safeguarding communications, and providing full control over your published records.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-amber-200/90 pt-1 font-medium">
              <span>Effective Date: <strong>October 2026</strong></span>
              <span>•</span>
              <span>Civic Transparency Standard 2.4</span>
            </div>
          </div>
        </section>

        {/* KEY HIGHLIGHTS STRIP WITH SUPER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-400" />
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="font-bold font-serif text-base text-[#2b1f18]">Zero Data Selling</h3>
              <p className="text-xs text-[#7a6252] mt-1.5 leading-relaxed">
                We never commercialize, broker, or sell user records to advertisers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(217,119,6,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-[#d89b52]" />
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-bold font-serif text-base text-[#2b1f18]">Humanitarian Purpose</h3>
              <p className="text-xs text-[#7a6252] mt-1.5 leading-relaxed">
                Data is collected solely to assist recovery and community verification.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(139,94,60,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b3f23] to-[#8b5e3c]" />
            <div className="w-11 h-11 rounded-2xl bg-[#f4efe9] text-[#6b3f23] border border-[#e5dcd3] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
              <Trash2 size={20} />
            </div>
            <div>
              <h3 className="font-bold font-serif text-base text-[#2b1f18]">Full User Control</h3>
              <p className="text-xs text-[#7a6252] mt-1.5 leading-relaxed">
                Delete any listing in seconds directly from your account dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* PRIVACY SECTIONS WITH SUPER CARDS */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <article
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(75,52,37,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Top Radiant Beam */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.gradientBeam} opacity-75 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300`}
                />

                <div className="flex items-start gap-4 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#f4efe9] text-[#6b3f23] border border-[#e5dcd3] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7565] bg-[#fbf9f6] border border-[#e8dfd6] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {section.badge}
                    </span>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2b1f18] group-hover:text-[#6b3f23] transition-colors">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#665042] leading-relaxed pl-0 sm:pl-15">
                  {section.content}
                </p>
              </article>
            );
          })}
        </div>

        {/* CONTACT PRIVACY OFFICER CARD */}
        <section className="bg-gradient-to-br from-[#2b1f18] via-[#38261a] to-[#2b1f18] text-white border border-white/10 rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                Data Privacy & Inquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Have Questions or Need an Account Deletion?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-xl leading-relaxed font-light">
                Our privacy desk is ready to assist you with record updates, deletion requests, or data compliance questions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="mailto:hopestdhanaf@gmail.com"
                className="w-full sm:w-auto bg-gradient-to-r from-[#d89b52] to-[#b37c3b] hover:brightness-110 text-[#2b1f18] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-105 active:scale-95 duration-200"
              >
                <Mail size={15} />
                <span>Email Privacy Desk</span>
              </a>
              <a
                href="tel:+918590168840"
                className="w-full sm:w-auto border border-white/20 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Phone size={15} />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
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
              Support
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Guidelines
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}