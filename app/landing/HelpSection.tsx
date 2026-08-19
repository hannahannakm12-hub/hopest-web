"use client";

import {
  Search,
  Package,
  ShieldAlert,
  Heart,
  ArrowUpRight,
} from "lucide-react";

export default function HelpSection() {
  return (
    <section className="relative bg-[#0f0e0d] animated-gradient text-white py-24 overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-200px] w-[500px] h-[500px] rounded-full bg-[#e3b437]/[0.035] blur-[130px]" />

        <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#8b5e3c]/[0.04] blur-[140px]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ================= HEADING ================= */}
        <div className="mb-12">

          {/* Small Label */}
          <div className="inline-block px-5 py-2 md:px-6 md:py-2 bg-[#e3b437]/10 rounded-full mb-4">
            <span className="text-[#e3b437] font-semibold text-xs md:text-sm uppercase tracking-wider">
              Our Services
            </span>
          </div>

          {/* Main Heading */}
          <h2
            className="text-[54px] font-[700]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Four ways Hopest helps
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-base sm:text-lg text-white/55 leading-relaxed">
            Every report reaches people nearby first, so the right person sees it
            at the right time.
          </p>

        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* =====================================================
              LOST ITEMS
          ===================================================== */}
          <div
            className="
              group
              relative
              min-h-[300px]
              p-6
              rounded-2xl
              bg-[#191817]
              border border-white/[0.08]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-blue-400/30
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            "
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl pointer-events-none" />

            {/* Icon */}
            <div
              className="
                relative
                w-12 h-12
                rounded-xl
                bg-blue-500/10
                border border-blue-400/20
                flex items-center justify-center
                transition-all duration-300
                group-hover:bg-blue-500/20
                group-hover:border-blue-400/40
              "
            >
              <Search
                size={22}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            {/* Content */}
            <h3 className="relative mt-7 text-xl font-semibold text-white">
              Lost Items
            </h3>

            <p className="relative mt-3 text-sm leading-6 text-white/50">
              Report something you have lost and let the community help you
              find it.
            </p>

            {/* Explore */}
            <div
              className="
                absolute
                bottom-6
                left-6
                flex items-center gap-1
                text-sm
                font-medium
                text-[#e3b437]
                transition-all duration-300
                group-hover:gap-2
              "
            >
              Explore

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>


          {/* =====================================================
              FOUND ITEMS
          ===================================================== */}
          <div
            className="
              group
              relative
              min-h-[300px]
              p-6
              rounded-2xl
              bg-[#191817]
              border border-white/[0.08]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-emerald-400/30
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            "
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl pointer-events-none" />

            {/* Icon */}
            <div
              className="
                relative
                w-12 h-12
                rounded-xl
                bg-emerald-500/10
                border border-emerald-400/20
                flex items-center justify-center
                transition-all duration-300
                group-hover:bg-emerald-500/20
                group-hover:border-emerald-400/40
              "
            >
              <Package
                size={22}
                className="text-emerald-400"
                strokeWidth={1.8}
              />
            </div>

            {/* Content */}
            <h3 className="relative mt-7 text-xl font-semibold text-white">
              Found Items
            </h3>

            <p className="relative mt-3 text-sm leading-6 text-white/50">
              Found something? Post it here so the rightful owner can reach
              you.
            </p>

            {/* Explore */}
            <div
              className="
                absolute
                bottom-6
                left-6
                flex items-center gap-1
                text-sm
                font-medium
                text-[#e3b437]
                transition-all duration-300
                group-hover:gap-2
              "
            >
              Explore

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>


          {/* =====================================================
              THEFT REPORTS
          ===================================================== */}
          <div
            className="
              group
              relative
              min-h-[300px]
              p-6
              rounded-2xl
              bg-[#191817]
              border border-white/[0.08]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-red-400/30
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            "
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl pointer-events-none" />

            {/* Icon */}
            <div
              className="
                relative
                w-12 h-12
                rounded-xl
                bg-red-500/10
                border border-red-400/20
                flex items-center justify-center
                transition-all duration-300
                group-hover:bg-red-500/20
                group-hover:border-red-400/40
              "
            >
              <ShieldAlert
                size={22}
                className="text-red-400"
                strokeWidth={1.8}
              />
            </div>

            {/* Content */}
            <h3 className="relative mt-7 text-xl font-semibold text-white">
              Theft Reports
            </h3>

            <p className="relative mt-3 text-sm leading-6 text-white/50">
              Alert your neighbourhood about stolen goods and suspicious
              activity.
            </p>

            {/* Explore */}
            <div
              className="
                absolute
                bottom-6
                left-6
                flex items-center gap-1
                text-sm
                font-medium
                text-[#e3b437]
                transition-all duration-300
                group-hover:gap-2
              "
            >
              Explore

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>


          {/* =====================================================
              MISSING PERSONS
          ===================================================== */}
          <div
            className="
              group
              relative
              min-h-[300px]
              p-6
              rounded-2xl
              bg-[#191817]
              border border-white/[0.08]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-purple-400/30
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            "
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl pointer-events-none" />

            {/* Icon */}
            <div
              className="
                relative
                w-12 h-12
                rounded-xl
                bg-purple-500/10
                border border-purple-400/20
                flex items-center justify-center
                transition-all duration-300
                group-hover:bg-purple-500/20
                group-hover:border-purple-400/40
              "
            >
              <Heart
                size={22}
                className="text-purple-400"
                strokeWidth={1.8}
              />
            </div>

            {/* Content */}
            <h3 className="relative mt-7 text-xl font-semibold text-white">
              Missing Persons
            </h3>

            <p className="relative mt-3 text-sm leading-6 text-white/50">
              Share details of a missing person to reach thousands of people
              fast.
            </p>

            {/* Explore */}
            <div
              className="
                absolute
                bottom-6
                left-6
                flex items-center gap-1
                text-sm
                font-medium
                text-[#e3b437]
                transition-all duration-300
                group-hover:gap-2
              "
            >
              Explore

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}