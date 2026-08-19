"use client";
import { FaWhatsapp } from "react-icons/fa";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="bg-black text-white">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* =================================================
              BRAND
          ================================================= */}
          <div>

            {/* Logo */}
            <div
              onClick={() => router.push("/landing")}
              className="flex items-center gap-3 cursor-pointer w-fit"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <Image
                  src="/logo.png.jpeg"
                  alt="HOPEST Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <span className="text-xl font-bold text-[#e3b437] tracking-wide">
                HOPEST
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">
              A free community platform to report lost and found items,
              raise theft alerts and help find missing people.
            </p>

            <p className="mt-2 text-sm text-[#e3b437]">
              Hope for the best.
            </p>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div>

            <h3 className="text-base font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-white/65">

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
                  onClick={() => router.push("/landing#how-it-works")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  How It Works
                </button>
              </li>

              <li>
                <button
                  onClick={() => router.push("/landing#contact")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Contact
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
                  onClick={() => router.push("/landing#services")}
                  className="hover:text-[#e3b437] transition-colors"
                >
                  Services
                </button>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT INFO
          ================================================= */}
          <div>

            <h3 className="text-base font-semibold text-white mb-6">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm text-white/65">

              {/* Email */}
              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="text-[#e3b437] mt-0.5 shrink-0"
                />

                <span>
                hopestdhanaf@gmail.com
                </span>

              </div>


              {/* Phone */}
              <div className="flex items-start gap-3">

                <Phone
                  size={18}
                  className="text-[#e3b437] mt-0.5 shrink-0"
                />

                <span>
              918590168840
                </span>

              </div>


              {/* Location */}
              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="text-[#e3b437] mt-0.5 shrink-0"
                />

                <span>
                  Kerala, India
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              CONNECT WITH US
          ================================================= */}
          <div>

            <h3 className="text-base font-semibold text-white mb-6">
              Connect With Us
            </h3>

            <div className="flex items-center gap-3">

              {/* LinkedIn */}
              <button
                aria-label="LinkedIn"
                className="
                  w-10 h-10
                  rounded-full
                  bg-[#1c1c1c]
                  flex items-center justify-center
                  text-white/80
                  hover:bg-[#e3b437]
                  hover:text-black
                  transition-all duration-300
                "
              >
                <Linkedin size={18} />
              </button>

{/* WhatsApp */}
{/* WhatsApp */}
<button
  aria-label="WhatsApp"
  className="
    w-10 h-10
    rounded-full
    bg-[#1c1c1c]
    flex items-center justify-center
    text-white/80
    hover:bg-[#e3b437]
    hover:text-black
    transition-all duration-300
  "
>
  <FaWhatsapp size={19} />
</button>


              {/* Facebook */}
              <button
                aria-label="Facebook"
                className="
                  w-10 h-10
                  rounded-full
                  bg-[#1c1c1c]
                  flex items-center justify-center
                  text-white/80
                  hover:bg-[#e3b437]
                  hover:text-black
                  transition-all duration-300
                "
              >
                <Facebook size={18} />
              </button>


              {/* Instagram */}
              <button
                aria-label="Instagram"
                className="
                  w-10 h-10
                  rounded-full
                  bg-[#1c1c1c]
                  flex items-center justify-center
                  text-white/80
                  hover:bg-[#e3b437]
                  hover:text-black
                  transition-all duration-300
                "
              >
                <Instagram size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">

          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-4
              text-xs
              text-white/45
            "
          >

            {/* Copyright */}
            <p>
              © 2026 HOPEST. All rights reserved.
            </p>


            {/* Right side */}
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