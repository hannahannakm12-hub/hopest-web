"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Lock,
  FileText,
  Bell,
  Mail,
  Phone,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  const sections = [
    {
      icon: FileText,
      title: "Privacy Policy",
      badge: "Free Service",
      gradientBeam: "from-[#4a2c17] via-[#8b5e3c] to-[#4a2c17]",
      content:
        "Hopest app as a free app.If you choose to use our services,then you agree to the collection and use of information in relation to this policy.The personal information that we collect is used for providing and improving the service.We will not use or share your information without your permissions.",
    },
    {
      icon: Lock,
      title: "Security",
      badge: "Protection",
      gradientBeam: "from-[#5c3a21] via-[#d4a373] to-[#5c3a21]",
      content:
        "We value your trust in providing us your personal information,thus we are striving to use commercially acceptable means of protecting it.",
    },
    {
      icon: Shield,
      title: "Childrens Privacy",
      badge: "Child Safety",
      gradientBeam: "from-[#6b3f23] via-[#a06544] to-[#6b3f23]",
      content:
        "These services do not address anyone under the age of 13.We do not knowingly collect personally identifiable information from children under 13.In this case we discover that a child under 13 has provided us with personal information,we immediately delete this from our servers.if you are a parent or guardian and you are aware that your child has provided us with personal information,please contact us so that we will be able to do necessary actions.",
    },
    {
      icon: Bell,
      title: "Changes to This Privacy Policy",
      badge: "Updates",
      gradientBeam: "from-[#4a2c17] via-[#6b3f23] to-[#2b1b11]",
      content:
        "We may update our privacy policy from time to time.thus,you are advised to review this page periodically for any changes.We will nitify you of any changes by posting the new privacy policy on this page.these changes are effective immediately after they are posted on this page.",
    },
    {
      icon: Mail,
      title: "Contact Us",
      badge: "Assistance",
      gradientBeam: "from-[#7a482b] via-[#8b5e3c] to-[#4a2c17]",
      content:
        "If you have any questions or suggestions about our privacy policy,do not hesitate to contact us.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#6b3f23] selection:text-white">

      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#080706]/95 backdrop-blur-md border-b border-white/10 text-white py-3.5 px-4 sm:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          <span className="text-xs font-mono uppercase tracking-widest text-[#d4a373] font-medium">
            Hopest Portal • Privacy Policy
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-8 sm:space-y-10">

        {/* HERO BANNER */}
        <section className="animated-gradient text-white rounded-3xl p-7 sm:p-11 shadow-2xl border border-white/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b5e3c]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#4a2c17]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b1b11]/80 backdrop-blur-md border border-[#6b3f23]/50 text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Lock size={13} className="text-[#d4a373] animate-pulse" />
              <span>Official Privacy Notice</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Privacy Policy
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-white/90 leading-relaxed font-light">
              Hopest app as a free app. Review how we protect your personal information, maintain data security, and support your privacy rights.
            </p>
          </div>
        </section>

        {/* POLICY SECTIONS CARDS - EXACT CONTENT AS SHOWN IN THE IMAGES */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <article
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5dcd3] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(75,52,37,0.12)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Top Radiant Beam */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.gradientBeam} opacity-75 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300`}
                />

                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#f4efe9] text-[#6b3f23] border border-[#e5dcd3] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c7565] bg-[#fbf9f6] border border-[#e8dfd6] px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {section.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#6b3f23] group-hover:text-[#4a2c17] transition-colors">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-[15px] text-[#2c2018] leading-relaxed pl-0 sm:pl-14">
                  {section.content}
                </p>
              </article>
            );
          })}
        </div>

        {/* CONTACT US ACTION CARD */}
        <section className="bg-gradient-to-br from-[#2b1f18] via-[#38261a] to-[#2b1f18] text-white border border-white/10 rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b5e3c]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4a373] font-semibold block mb-1">
                Data Privacy & Inquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Have questions about our privacy policy?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-xl leading-relaxed font-light">
                Do not hesitate to reach out to our team anytime. We are here to help and protect your information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="mailto:hopestdhanaf@gmail.com"
                className="w-full sm:w-auto bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] hover:brightness-110 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-105 active:scale-95 duration-200 border border-[#8b5e3c]/40"
              >
                <Mail size={15} />
                <span>Email Us</span>
              </a>
              <button
                type="button"
                onClick={() => router.push("/about")}
                className="w-full sm:w-auto border border-white/20 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Phone size={15} />
                <span>Call Support</span>
              </button>
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