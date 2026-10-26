"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  Sparkles,
  LogOut,
  ChevronRight,
} from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";

export default function LandingHero() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check local user session
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore JSON parse error
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Protected route check
  const handleProtectedRoute = (path: string) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
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
    <div className="relative bg-[#080706] text-white overflow-hidden selection:bg-[#6b3f23] selection:text-white">
      {/* =====================================================
          TOP NAVIGATION BAR (Ultra-clean glassmorphic)
      ===================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#080706]/92 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3.5"
          : "bg-gradient-to-b from-[#080706]/90 via-[#080706]/60 to-transparent border-b border-white/[0.04] py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/landing"
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            <div className="relative h-9 w-7 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="HOPEST Logo"
                width={48}
                height={76}
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(107,63,35,0.35)]"
                priority
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl font-black tracking-[0.2em] text-[#d4a373] drop-shadow-sm group-hover:text-white transition-colors leading-none">
                HOPEST
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mt-1 hidden sm:block">
                Community Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Browse
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("mobile-app")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Mobile App
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <NotificationDropdown uid={user?.uid || ""} align="right" />
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6b3f23] to-[#4a2c17] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(107,63,35,0.4)] hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer btn-animated-gradient"
                >
                  <LayoutDashboard size={15} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    router.push("/landing");
                  }}
                  title="Log out"
                  className="p-2 rounded-xl border border-white/10 text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-stone-900/90 border border-white/20 hover:border-[#8b5e3c]/80 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white transition-all duration-200 shadow-md"
                >
                  Log in
                </Link>

                <Link
                  href="/auth/register"
                  className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(107,63,35,0.5)] hover:shadow-[0_0_30px_rgba(139,94,60,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer btn-animated-gradient"
                >
                  <span className="relative z-10 text-white font-black">Get Started</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-streak bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-white/10 text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-6 pt-4 pb-6 bg-[#110f0d]/98 backdrop-blur-2xl border-b border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 text-base font-medium text-stone-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleProtectedRoute("/dashboard");
                }}
                className="text-left py-1.5 hover:text-[#d4a373] transition-colors"
              >
                Browse Listings
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-1.5 hover:text-[#d4a373] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left py-1.5 hover:text-[#d4a373] transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("mobile-app")}
                className="text-left py-1.5 hover:text-[#d4a373] transition-colors"
              >
                Mobile App
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-1.5 hover:text-[#d4a373] transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    className="w-full py-2.5 rounded-xl bg-stone-900/80 border border-white/20 text-sm font-semibold text-center text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white text-sm font-bold text-center shadow-lg btn-animated-gradient"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3d2314] to-[#6d3f22] text-white font-bold text-center btn-animated-gradient"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO SECTION (Rich Ambient Effects & Standard Typography)
      ===================================================== */}
      <section className="relative landing-ambient-gradient min-h-[88vh] md:min-h-[94vh] flex flex-col justify-center items-center pt-32 pb-20">
        {/* Background Image & Cinematic Vignette Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/herosection.jpg')",
            backgroundPosition: "center 42%",
          }}
        />
        {/* Multilayered rich dark gradients */}
        <div className="absolute inset-0 bg-[#080706]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/95 via-[#080706]/60 to-[#080706]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(8,7,6,0.9)_95%)]" />

        {/* Dynamic Standard Animated Ambient Gradient Layer */}
        <div className="absolute inset-0 landing-ambient-gradient opacity-50 pointer-events-none" />

        {/* =====================================================
            DYNAMIC BACKGROUND EFFECTS
        ===================================================== */}
        {/* 1. Pulsing Warm Brown Aurora Orb */}
        <div className="pointer-events-none absolute top-1/5 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-[#8b5e3c]/25 via-[#6b3f23]/15 to-transparent blur-[150px] rounded-full animate-ambient-pulse" />

        {/* 2. Side Ambient Color Accents */}
        <div className="pointer-events-none absolute top-1/3 -left-32 w-[550px] h-[550px] bg-[#5c3a21]/20 blur-[170px] rounded-full" />
        <div className="pointer-events-none absolute bottom-10 -right-32 w-[600px] h-[600px] bg-[#7a482b]/20 blur-[180px] rounded-full" />

        {/* 3. Subtle Luminous Overhead Light Beam */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#8b5e3c]/40 to-transparent" />

        {/* 4. Fine Architectural Dot Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 163, 115, 0.35) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* 5. Delicate Floating Sparkle Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#d4a373]/40 blur-[1px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#c49371]/40 blur-[1px] animate-pulse [animation-delay:1.5s]" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-white/40 blur-[1px] animate-pulse [animation-delay:2.5s]" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-[#e8d5c4]/50 blur-[0.5px] animate-pulse [animation-delay:3.2s]" />
        </div>

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
          {/* =====================================================
              MODERN SHIMMER BADGE (Clean Brown/Black/White)
          ===================================================== */}
          <div className="inline-block mb-8 group cursor-default">
            <div className="relative p-[1px] rounded-full bg-gradient-to-r from-[#8b5e3c]/35 via-[#d4a373]/50 to-[#8b5e3c]/35 shadow-[0_0_25px_rgba(107,63,35,0.25)] group-hover:shadow-[0_0_35px_rgba(139,94,60,0.45)] transition-all duration-300">
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#110f0d]/90 backdrop-blur-2xl text-xs sm:text-sm font-medium">
                {/* Pulsing indicator */}
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a373] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a373]" />
                </span>

                <Sparkles className="w-3.5 h-3.5 text-[#d4a373] animate-spin [animation-duration:10s]" />

                <span className="text-stone-200 font-semibold tracking-wide">
                  Free &amp; Community-Powered Platform
                </span>

                <span className="text-[#8b5e3c] font-bold">•</span>

                <span className="text-[#d4a373] font-bold">
                  Always Here to Help
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              H1 HOPEST WITH STANDARD ANIMATED GRADIENT
          ===================================================== */}
          <div className="relative inline-block select-none">
            {/* Luminous Backlight Ambient Halo */}
            <div className="absolute inset-0 -top-6 bg-gradient-to-r from-[#6b3f23]/35 via-[#8b5e3c]/25 to-[#5c3a21]/35 blur-3xl rounded-full pointer-events-none -z-10 animate-ambient-pulse" />

            {/* Monumental Headline with Continuous Animated Brownish Sheen */}
            <h1
              className="relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.04em] leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)] h1-animated-gradient"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #f4ede6 18%, #af8f6a 36%, #695741 52%, #3d2415 68%, #8d7455 84%, #ffffff 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                animation: "h1GradientFlow 5s ease infinite",
                display: "inline-block",
              }}
            >
              HOPEST
            </h1>
          </div>

          {/* Animated Brownish Bronze Tagline */}
          <div className="mt-4 sm:mt-5 flex justify-center gap-3 sm:gap-5 text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#af8f6a] font-bold">
            {["Hope", "For", "The", "Best"].map((word, index) => (
              <span
                key={word}
                className="inline-block opacity-0 animate-fadeUp drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                style={{
                  animationDelay: `${index * 0.22}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Value Proposition Description */}
          <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-stone-200 font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            A free community platform to help others, report lost &amp; found
            items, and alert about theft in your area.
          </p>

          {/* =====================================================
              BUTTONS WITH STANDARD ANIMATED GRADIENT EFFECTS
          ===================================================== */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary Highlight Button */}
            <button
              onClick={() =>
                handleProtectedRoute("/dashboard/create?type=LOST")
              }
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] text-white font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(107,63,35,0.5),0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_55px_rgba(139,94,60,0.7),0_15px_35px_rgba(0,0,0,0.7)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer btn-animated-gradient"
            >
              {/* Continuous Light Streak Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-streak bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />

              <PlusCircle
                size={20}
                className="transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110 text-white"
              />
              <span className="relative z-10 tracking-wide text-white font-bold">
                Report Lost or Found
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-200 text-white"
              />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-[#140f0c]/90 border-2 border-[#6d3f22]/60 hover:border-[#8d7455] hover:bg-[#21150e] hover:scale-[1.03] active:scale-[0.97] text-white font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_30px_rgba(107,63,35,0.35)] cursor-pointer"
            >
              <Search
                size={18}
                className="text-[#d4a373] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="tracking-wide text-white font-bold">Browse Listings</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST PILLARS / CORE VALUES SECTION
          (Stunning Glassmorphism Cards)
      ===================================================== */}
      <section className="relative landing-ambient-gradient z-10 border-y border-white/[0.08] bg-gradient-to-b from-[#0c0a09]/95 via-[#080706]/95 to-[#0c0a09]/95 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Verified reports */}
            <div className="group relative rounded-2xl bg-gradient-to-b from-[#140f0c]/95 to-[#0e0b09]/95 border border-white/[0.06] hover:border-[#8b5e3c]/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(107,63,35,0.2)] flex flex-col justify-between overflow-hidden">
              {/* Subtle radiant background glow on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8b5e3c]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/50 flex items-center justify-center text-[#d4a373] group-hover:scale-110 group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_20px_rgba(107,63,35,0.4)] transition-all duration-300 mb-4 shadow-inner">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#e8d5c4] transition-colors">
                  Verified Reports
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                  Every listing is tied to a real account to ensure reliable and trustworthy community interactions.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8b5e3c] group-hover:text-[#d4a373] font-semibold tracking-wider uppercase">
                <span>Authentic</span>
                <span>01</span>
              </div>
            </div>

            {/* 2. Privacy first */}
            <div className="group relative rounded-2xl bg-gradient-to-b from-[#140f0c]/95 to-[#0e0b09]/95 border border-white/[0.06] hover:border-[#8b5e3c]/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(107,63,35,0.2)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8b5e3c]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/50 flex items-center justify-center text-[#d4a373] group-hover:scale-110 group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_20px_rgba(107,63,35,0.4)] transition-all duration-300 mb-4 shadow-inner">
                  <Lock size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#e8d5c4] transition-colors">
                  Privacy First
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                  Your contact details stay hidden by default until you mutually choose to connect.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8b5e3c] group-hover:text-[#d4a373] font-semibold tracking-wider uppercase">
                <span>Encrypted</span>
                <span>02</span>
              </div>
            </div>

            {/* 3. Fast reach */}
            <div className="group relative rounded-2xl bg-gradient-to-b from-[#140f0c]/95 to-[#0e0b09]/95 border border-white/[0.06] hover:border-[#8b5e3c]/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(107,63,35,0.2)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8b5e3c]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/50 flex items-center justify-center text-[#d4a373] group-hover:scale-110 group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_20px_rgba(107,63,35,0.4)] transition-all duration-300 mb-4 shadow-inner">
                  <Clock size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#e8d5c4] transition-colors">
                  Fast Reach
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                  Nearby members are notified quickly so lost belongings can be recovered without delay.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8b5e3c] group-hover:text-[#d4a373] font-semibold tracking-wider uppercase">
                <span>Real-Time</span>
                <span>03</span>
              </div>
            </div>

            {/* 4. Always free */}
            <div className="group relative rounded-2xl bg-gradient-to-b from-[#140f0c]/95 to-[#0e0b09]/95 border border-white/[0.06] hover:border-[#8b5e3c]/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(107,63,35,0.2)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8b5e3c]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2b1b11] border border-[#6b3f23]/50 flex items-center justify-center text-[#d4a373] group-hover:scale-110 group-hover:bg-[#3a2417] group-hover:border-[#8b5e3c]/60 group-hover:shadow-[0_0_20px_rgba(107,63,35,0.4)] transition-all duration-300 mb-4 shadow-inner">
                  <HeartHandshake size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#e8d5c4] transition-colors">
                  Always Free
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
                  No fees, no ads, no subscriptions. Built entirely to help people and foster community spirit.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8b5e3c] group-hover:text-[#d4a373] font-semibold tracking-wider uppercase">
                <span>Non-Profit</span>
                <span>04</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}