"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ShieldCheck,
  Lock,
  Clock,
  HeartHandshake,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

export default function LandingHero() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Protected route check
  const handleProtectedRoute = (path: string) => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(path);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#0c0a09] text-white">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0a09]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/[0.04] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => router.push("/landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1c1a16] border border-amber-500/30 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(227,180,55,0.15)] group-hover:border-amber-400/50 transition-colors">
              <Image
                src="/logo.png.jpeg"
                alt="HOPEST Logo"
                width={28}
                height={28}
                className="object-contain rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.18em] text-[#e4b63b]">
                HOPEST
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold -mt-1 hidden sm:block">
                Community Safety
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="hover:text-white transition-colors duration-200"
            >
              Browse
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-white transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-white transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("mobile-app")}
              className="hover:text-white transition-colors duration-200"
            >
              Mobile App
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/auth/login")}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-white/15 text-sm font-medium text-stone-200 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/auth/register")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d89b52] to-[#e3b437] text-stone-950 text-sm font-bold shadow-[0_0_20px_rgba(227,180,55,0.25)] hover:shadow-[0_0_28px_rgba(227,180,55,0.4)] hover:brightness-105 transition-all duration-200"
            >
              Register
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-white/10 text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-6 pt-4 pb-6 bg-[#110f0d]/95 backdrop-blur-2xl border-b border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 text-base font-medium text-stone-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleProtectedRoute("/dashboard");
                }}
                className="text-left py-1.5 hover:text-amber-400 transition-colors"
              >
                Browse Listings
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left py-1.5 hover:text-amber-400 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-1.5 hover:text-amber-400 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("mobile-app")}
                className="text-left py-1.5 hover:text-amber-400 transition-colors"
              >
                Mobile App
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-1.5 hover:text-amber-400 transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full py-2.5 rounded-xl border border-white/15 text-sm font-medium text-center text-white"
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-16">
        {/* Background Image & Cinematic Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/herosection.jpg')",
            backgroundPosition: "center 42%",
          }}
        />
        <div className="absolute inset-0 bg-[#0c0a09]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/80 via-transparent to-[#0c0a09]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(12,10,9,0.7)_100%)]" />

        {/* Ambient Glow Flares */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-amber-400/30 bg-black/40 backdrop-blur-md text-[#f0c34d] text-xs sm:text-sm font-medium shadow-lg">
            <span className="text-amber-400 text-sm animate-pulse">✦</span>
            <span>Free, community-powered and always here to help</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            HOPEST
          </h1>

          {/* Animated Tagline */}
          <div className="mt-5 flex justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-[#e3b437] font-bold">
            {["Hope", "For", "The", "Best"].map((word, index) => (
              <span
                key={word}
                className="inline-block opacity-0 animate-fadeUp drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                style={{
                  animationDelay: `${index * 0.28}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-stone-200/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            A free community platform to help others, report lost & found items,
            and alert about theft in your area.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Post Item */}
            <button
              onClick={() =>
                handleProtectedRoute("/dashboard/create?type=LOST")
              }
              className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d89b52] via-[#e3b437] to-[#d89b52] text-stone-950 font-bold text-sm shadow-[0_0_25px_rgba(227,180,55,0.3)] hover:shadow-[0_0_35px_rgba(227,180,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <PlusCircle size={18} />
              <span>Post an Item</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>

            {/* Browse Listings */}
            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-stone-900/40 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg"
            >
              <Search size={18} />
              <span>Browse Listings</span>
            </button>

            {/* View Dashboard */}
            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-stone-900/40 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg"
            >
              <LayoutDashboard size={18} />
              <span>View Dashboard</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST / BENEFITS SECTION
      ===================================================== */}
      <section className="relative z-10 border-y border-white/[0.07] bg-[#110f0d]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* 1. Verified reports */}
            <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-amber-200/90 font-semibold text-[15px]">
                  Verified reports
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-5 text-stone-400">
                  Every listing is tied to a real account.
                </p>
              </div>
            </div>

            {/* 2. Privacy first */}
            <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-amber-200/90 font-semibold text-[15px]">
                  Privacy first
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-5 text-stone-400">
                  Your contact details stay hidden by default.
                </p>
              </div>
            </div>

            {/* 3. Fast reach */}
            <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-amber-200/90 font-semibold text-[15px]">
                  Fast reach
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-5 text-stone-400">
                  Nearby members are notified within minutes.
                </p>
              </div>
            </div>

            {/* 4. Always free */}
            <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                <HeartHandshake size={20} />
              </div>
              <div>
                <h3 className="text-amber-200/90 font-semibold text-[15px]">
                  Always free
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-5 text-stone-400">
                  No fees, no ads, no subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}