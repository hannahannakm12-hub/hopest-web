"use client";

import { Bell, MapPin, MessageCircle, Smartphone } from "lucide-react";

export default function MobileAppSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f0e0d]  animated-gradient text-white py-24 md:py-28">

      {/* Subtle grid background */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          opacity-[0.025]
          bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]
          bg-[size:4rem_4rem]
        "
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div>

            {/* Label */}
           <div className="inline-block px-5 py-2 md:px-6 md:py-2 bg-[#e3b437]/10 rounded-full mb-4">
            <p
              className="
      text-[#e3b437]
      text-xs
      sm:text-sm
      font-semibold
      uppercase
    "
            >
            Mobile App
            </p>
          </div>

            {/* Heading */}
            <h2
              className="
                text-[54px]
                font-bold
                tracking-tight
                text-white
                leading-tight
              "
            >
              Carry Hopest
              <br />
              in your pocket
            </h2>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-base
                sm:text-lg
                leading-relaxed
                text-[#b9aaa0]
              "
            >
              Stay connected to lost, found, missing and theft reports
              wherever you go. Keep up with reports that matter to your
              community.
            </p>


            {/* ============================================= */}
            {/* FEATURES */}
            {/* ============================================= */}

            <div className="mt-8 space-y-5">

              {/* Feature 1 */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-10 h-10
                    shrink-0
                    rounded-full
                    bg-[#2a261c]
                    flex items-center justify-center
                    border border-[#e3b437]/10
                  "
                >
                  <Bell className="w-4 h-4 text-[#e3b437]" />
                </div>

                <p className="text-sm sm:text-base text-white/90">
                  Stay updated with reports that matter to you
                </p>

              </div>


              {/* Feature 2 */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-10 h-10
                    shrink-0
                    rounded-full
                    bg-[#2a261c]
                    flex items-center justify-center
                    border border-[#e3b437]/10
                  "
                >
                  <MapPin className="w-4 h-4 text-[#e3b437]" />
                </div>

                <p className="text-sm sm:text-base text-white/90">
                  Discover reports from your local area
                </p>

              </div>


              {/* Feature 3 */}
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-10 h-10
                    shrink-0
                    rounded-full
                    bg-[#2a261c]
                    flex items-center justify-center
                    border border-[#e3b437]/10
                  "
                >
                  <MessageCircle className="w-4 h-4 text-[#e3b437]" />
                </div>

                <p className="text-sm sm:text-base text-white/90">
                  Connect with the community when it matters
                </p>

              </div>

            </div>


            {/* ============================================= */}
            {/* APP BUTTONS */}
            {/* ============================================= */}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">

              {/* App Store */}
              <button
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  px-7
                  py-3.5
                  rounded-xl
                  bg-[#e3b437]
                  text-[#17130b]
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-[#f5cb55]
                  hover:scale-[1.03]
                  hover:shadow-[0_10px_30px_rgba(227,180,55,0.2)]
                "
              >
                <Smartphone className="w-5 h-5" />

                <span>App Store</span>
              </button>


              {/* Google Play */}
              <button
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  px-7
                  py-3.5
                  rounded-xl
                  border border-white/15
                  bg-white/[0.02]
                  text-white
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-white/10
                  hover:border-white/30
                  hover:scale-[1.03]
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 2.5v19l11-9.5L3 2.5Z" />
                  <path d="m14 8.5 3-2.6 3.5 2c.7.4.7 1.4 0 1.8l-3.5 2L14 8.5Z" />
                </svg>

                <span>Google Play</span>
              </button>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE — PHONE MOCKUP */}
          {/* ================================================= */}

          <div className="flex justify-center lg:justify-end">

            <div
              className="
                relative
                w-[320px]
                sm:w-[370px]
                rounded-[38px]
                border border-white/10
                bg-[#171614]
                p-3
                shadow-[0_30px_80px_rgba(0,0,0,0.55)]
              "
            >

              {/* Outer glow */}
              <div
                className="
                  absolute
                  -inset-5
                  -z-10
                  rounded-[50px]
                  bg-[#e3b437]/5
                  blur-2xl
                "
              />


              {/* Phone screen */}
              <div
                className="
                  rounded-[30px]
                  border border-white/10
                  bg-[#0d0c0b]
                  overflow-hidden
                  min-h-[500px]
                "
              >

                {/* Phone top */}
                <div className="px-6 pt-7 pb-5">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-9 h-9
                        bg-white
                        rounded-sm
                        flex items-center justify-center
                      "
                    >
                      <span className="text-[#e3b437] font-bold text-xs">
                        ♥
                      </span>
                    </div>

                    <span className="text-[#e3b437] font-semibold">
                      HOPEST
                    </span>

                  </div>

                </div>


                {/* Reports */}
                <div className="px-5 space-y-3">

                  {/* Lost */}
                  <div
                    className="
                      rounded-xl
                      border border-white/10
                      bg-[#1b1a18]
                      p-4
                      transition-all
                      duration-300
                      hover:border-[#e3b437]/30
                    "
                  >
                    <p className="text-sm font-semibold text-white">
                      Lost · Wallet near you
                    </p>

                    <p className="mt-1 text-xs text-[#9d928a]">
                      Tap to view details
                    </p>
                  </div>


                  {/* Found */}
                  <div
                    className="
                      rounded-xl
                      border border-white/10
                      bg-[#1b1a18]
                      p-4
                    "
                  >
                    <p className="text-sm font-semibold text-white">
                      Found · Keys at Metro
                    </p>

                    <p className="mt-1 text-xs text-[#9d928a]">
                      Tap to view details
                    </p>
                  </div>


                  {/* Theft */}
                  <div
                    className="
                      rounded-xl
                      border border-white/10
                      bg-[#1b1a18]
                      p-4
                    "
                  >
                    <p className="text-sm font-semibold text-white">
                      Theft alert · Bicycle
                    </p>

                    <p className="mt-1 text-xs text-[#9d928a]">
                      Tap to view details
                    </p>
                  </div>


                  {/* Missing */}
                  <div
                    className="
                      rounded-xl
                      border border-white/10
                      bg-[#1b1a18]
                      p-4
                    "
                  >
                    <p className="text-sm font-semibold text-white">
                      Missing · Person nearby
                    </p>

                    <p className="mt-1 text-xs text-[#9d928a]">
                      Tap to view details
                    </p>
                  </div>

                </div>


                {/* Bottom navigation */}
                <div
                  className="
                    mt-8
                    border-t border-white/10
                    px-6
                    py-5
                    flex
                    justify-around
                    text-xs
                    text-white/40
                  "
                >
                  <span className="text-[#e3b437]">
                    Home
                  </span>

                  <span>
                    Reports
                  </span>

                  <span>
                    Profile
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}