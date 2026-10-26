"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Shield, MapPin, Calendar, Compass, Hash } from "lucide-react";

/* =====================================================================
   1. INLINE SPINNER (FOR BUTTONS & ACTIONS)
   ===================================================================== */
export interface HopestSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "amber" | "light" | "dark" | "brown";
  className?: string;
}

export function HopestSpinner({
  size = "sm",
  variant = "amber",
  className = "",
}: HopestSpinnerProps) {
  const sizeClasses = {
    xs: "w-3 h-3 border-[1.5px]",
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-7 h-7 border-[2.5px]",
  }[size];

  const variantClasses = {
    amber: "border-[#6b3f23]/30 border-t-[#d4a373]",
    light: "border-white/30 border-t-white",
    dark: "border-stone-950/30 border-t-stone-950",
    brown: "border-[#6b3f23]/30 border-t-[#d4a373]",
  }[variant];

  return (
    <span
      className={`inline-block rounded-full animate-spin shrink-0 ${sizeClasses} ${variantClasses} ${className}`}
      aria-hidden="true"
      role="status"
    />
  );
}

/* =====================================================================
   2. BRANDED FULL-SCREEN / SECTION LOADER
   ===================================================================== */
export interface HopestBrandLoaderProps {
  message?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

export function HopestBrandLoader({
  message = "Connecting to Hopest Network...",
  subtitle = "Kerala Community Safety & Verification Portal",
  fullScreen = true,
}: HopestBrandLoaderProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[#080706]/95 backdrop-blur-xl px-4"
    : "w-full py-20 flex items-center justify-center px-4";

  return (
    <div className={containerClasses}>
      {/* Ambient background glow */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#6b3f23]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Emblem with rotating dash ring */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Subtle spinning outer ring */}
          <div className="absolute inset-0 rounded-3xl border border-dashed border-[#d4a373]/40 animate-[spin_10s_linear_infinite]" />

          {/* Glowing pulse ring */}
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-tr from-[#4a2c17] to-[#d4a373] opacity-30 blur-md animate-pulse" />

          {/* Core icon box */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#140f0c] via-[#21150e] to-[#140f0c] border border-[#6b3f23]/60 flex items-center justify-center shadow-[0_0_30px_rgba(107,63,35,0.35)] p-2.5">
            <Image
              src="/main-logo.png"
              alt="Hopest Emblem"
              width={42}
              height={42}
              className="w-auto h-11 object-contain drop-shadow-[0_2px_10px_rgba(107,63,35,0.4)]"
              priority
            />
          </div>

          {/* Floating mini spark */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#2b1b11] border border-[#d4a373]/60 flex items-center justify-center shadow-[0_0_12px_rgba(107,63,35,0.6)]">
            <Sparkles size={11} className="text-[#d4a373] animate-pulse" />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#d4a373] drop-shadow-sm">
          HOPEST
        </h2>

        {/* Clean, Non-Technical User-Facing Message */}
        <p className="mt-2 text-sm sm:text-base font-medium text-stone-200">
          {message}
        </p>

        {/* Subtle subtitle */}
        <p className="mt-1 text-xs text-stone-400 font-light">
          {subtitle}
        </p>

        {/* 3 Bouncing Brown/White Rhythm Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   3. SKELETON CARD (FOR SEARCH RESULTS & MY CREATIONS)
   ===================================================================== */
export function HopestCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] border-t-4 border-t-[#6b3f23]/60 flex flex-col justify-between overflow-hidden relative"
        >
          {/* Subtle shimmer sweep overlay */}
          <div className="absolute inset-0 hopest-shimmer-light pointer-events-none opacity-40" />

          <div>
            {/* Top row: thumbnail + title + date */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex items-start gap-3.5 flex-1">
                {/* Thumbnail placeholder */}
                <div className="w-14 h-14 rounded-2xl bg-[#efe7de] shrink-0 border border-[#e5dcd1]" />

                {/* Badge + Name placeholders */}
                <div className="space-y-2 flex-1">
                  <div className="w-16 h-4 rounded-full bg-[#e8dfd4]" />
                  <div className="w-3/4 h-5 rounded-md bg-[#ded3c5]" />
                </div>
              </div>

              {/* Date pill placeholder */}
              <div className="w-24 h-7 rounded-xl bg-[#f5efe8] border border-[#e8dfd6] shrink-0" />
            </div>

            {/* 4-Item Spec Grid (Location, Police, Town, PIN) */}
            <div className="grid grid-cols-2 gap-2.5 my-4">
              {[1, 2, 3, 4].map((box) => (
                <div
                  key={box}
                  className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5 space-y-1.5"
                >
                  <div className="w-12 h-2.5 rounded bg-[#e8ded3]" />
                  <div className="w-24 h-3.5 rounded bg-[#dfd4c6]" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action bar */}
          <div className="pt-4 border-t border-[#f0e8e0] flex items-center justify-between">
            <div className="w-28 h-4 rounded bg-[#e8ded3]" />
            <div className="w-24 h-7 rounded-xl bg-[#efe7de]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   4. MISSING PERSON NOTICE SKELETON (FOR /missing)
   ===================================================================== */
export function HopestMissingCardSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd6] border-t-[6px] border-t-[#6b3f23] shadow-[0_4px_24px_-6px_rgba(75,52,37,0.06)] relative overflow-hidden"
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 hopest-shimmer-light pointer-events-none opacity-40" />

          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            {/* Photo column */}
            <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
              <div className="w-full h-72 rounded-2xl bg-[#f7f2ed] border border-[#e5d6c5] flex flex-col items-center justify-between p-4">
                <div className="w-28 h-5 rounded-full bg-[#f0e4d8] self-start" />
                <div className="w-16 h-16 rounded-full bg-[#ece2d6]" />
                <div className="w-32 h-3 rounded bg-[#ded3c5]" />
              </div>
            </div>

            {/* Content column */}
            <div className="flex-1 w-full space-y-4">
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#f0e7de]">
                <div className="space-y-2">
                  <div className="w-32 h-4 rounded-full bg-[#f0e4d8]" />
                  <div className="w-56 sm:w-80 h-7 rounded-md bg-[#ded3c5]" />
                </div>
                <div className="w-24 h-8 rounded-xl bg-[#efe7de]" />
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-4">
                <div className="w-36 h-4 rounded bg-[#e8ded3]" />
                <div className="w-36 h-4 rounded bg-[#e8ded3]" />
              </div>

              {/* 4 Spec Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((box) => (
                  <div
                    key={box}
                    className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-3 space-y-1.5"
                  >
                    <div className="w-16 h-2.5 rounded bg-[#e8ded3]" />
                    <div className="w-32 h-3.5 rounded bg-[#ded3c5]" />
                  </div>
                ))}
              </div>

              {/* Action buttons placeholder */}
              <div className="pt-2 flex items-center gap-3">
                <div className="w-36 h-10 rounded-xl bg-[#ded3c5]" />
                <div className="w-28 h-10 rounded-xl bg-[#efe7de]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   5. NOTIFICATION SKELETON (FOR DROPDOWN)
   ===================================================================== */
export function HopestNotificationSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2.5 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-3.5 rounded-xl border border-white/[0.06] bg-[#141210]/60 flex items-start gap-3.5 relative overflow-hidden"
        >
          <div className="absolute inset-0 hopest-shimmer-dark pointer-events-none opacity-40" />

          {/* Icon circle placeholder */}
          <div className="w-9 h-9 rounded-xl bg-white/[0.06] shrink-0" />

          {/* Text lines */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="w-16 h-3 rounded-full bg-white/[0.08]" />
              <div className="w-14 h-2.5 rounded bg-white/[0.05]" />
            </div>
            <div className="w-3/4 h-3.5 rounded bg-white/[0.1]" />
            <div className="w-1/2 h-2.5 rounded bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   6. DASHBOARD TOP-LEVEL SKELETON
   ===================================================================== */
export function HopestDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10 sm:space-y-14">
        {/* Hero Section Skeleton */}
        <section className="animated-gradient text-white rounded-3xl p-7 sm:p-10 md:p-12 shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-36 h-6 rounded-full bg-white/15" />
              <div className="w-28 h-6 rounded-full bg-[#6b3f23]/30" />
            </div>

            <div className="w-3/4 h-10 rounded-xl bg-white/20" />
            <div className="w-full max-w-xl h-5 rounded-md bg-white/10" />

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {[1, 2, 3, 4].map((q) => (
                <div
                  key={q}
                  className="h-24 rounded-2xl bg-white/10 border border-white/15 p-4"
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4 Main Category Cards Skeleton */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="w-48 h-7 rounded-lg bg-[#ded3c5]" />
            <div className="w-80 h-4 rounded bg-[#e8ded3]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((c) => (
              <div
                key={c}
                className="bg-white rounded-3xl p-7 border border-[#e8dfd6] shadow-sm space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="w-24 h-5 rounded-full bg-[#e8dfd4]" />
                    <div className="w-44 h-6 rounded bg-[#ded3c5]" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#efe7de]" />
                </div>

                <div className="w-full h-12 rounded-xl bg-[#f5efe8]" />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="h-11 rounded-xl bg-[#ded3c5]" />
                  <div className="h-11 rounded-xl bg-[#efe7de]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HopestBrandLoader;
