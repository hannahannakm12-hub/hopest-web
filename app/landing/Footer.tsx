"use client";

import { FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/landing#${id}`);
    }
  };

  return (
    <footer id="contact" className="relative bg-[#080706] text-white border-t border-white/[0.08]">
      {/* Top subtle glow flare */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-amber-500/[0.03] blur-[120px]" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {/* =================================================
              BRAND
          ================================================= */}
          <div>
            {/* Logo */}
            <div
              onClick={() => router.push("/landing")}
              className="flex items-center gap-3 cursor-pointer w-fit group select-none"
            >
              <div className="relative h-9 w-7 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="HOPEST Logo"
                  width={100}
                  height={90}
                  className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-[0_2px_10px_rgba(216,155,82,0.25)]"
                />
              </div>

              <span className="text-xl font-black text-[#e3b437] tracking-[0.18em]">
                HOPEST
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              A free community platform to report lost and found items, raise theft
              alerts and help find missing people across Kerala and beyond.
            </p>

            <p className="mt-3 text-xs font-semibold tracking-wider uppercase text-[#e3b437] flex items-center gap-1.5">
              <span>Hope for the best</span>
            </p>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => router.push("/landing")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Services
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  How It Works
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("mobile-app")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Mobile App
                </button>
              </li>

              <li>
                <button
                  onClick={() => router.push("/about")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  About
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* =================================================
              CONTACT INFO
          ================================================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Contact Info
            </h3>

            <div className="space-y-3.5 text-sm text-stone-400">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={17} className="text-[#e3b437] mt-0.5 shrink-0" />
                <a
                  href="mailto:hopestdhanaf@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  hopestdhanaf@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone size={17} className="text-[#e3b437] mt-0.5 shrink-0" />
                <a
                  href="tel:918590168840"
                  className="hover:text-white transition-colors"
                >
                  +91 8590168840
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-[#e3b437] mt-0.5 shrink-0" />
                <span>Kerala, India</span>
              </div>
            </div>
          </div>

          {/* =================================================
              CONNECT WITH US
          ================================================= */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Connect With Us
            </h3>

            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-[#e3b437] hover:text-black hover:border-amber-400 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={18} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918590168840"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 shadow-sm"
              >
                <FaWhatsapp size={19} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-sm"
              >
                <Facebook size={18} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all duration-300 shadow-sm"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}
      <div className="border-t border-white/[0.06] bg-[#050404]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
            {/* Copyright */}
            <p>© 2026 HOPEST (hopest.in) • Civic Safety &amp; Lost Property Network. All rights reserved.</p>

            {/* Right side policies */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/privacy")}
                className="hover:text-[#e3b437] transition-colors"
              >
                Privacy
              </button>

              <span>·</span>

              <button
                onClick={() => router.push("/privacy")}
                className="hover:text-[#e3b437] transition-colors"
              >
                Terms
              </button>

              <span>·</span>

              <button
                onClick={() => router.push("/about")}
                className="hover:text-[#e3b437] transition-colors"
              >
                Community Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}