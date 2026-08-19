"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  // ================= SCROLL STATE =================
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================= PROTECTED ROUTE =================
  const handleProtectedRoute = (path: string) => {
    const user = localStorage.getItem("user");

    console.log("Landing user =", user);

    if (!user) {
      console.log("No user found");
      router.push("/auth/login");
      return;
    }

    console.log("Going to", path);
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-[#0d0c0b] text-white animated-gradient">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          h-[76px]
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-[#11100f]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto h-full px-5 lg:px-8 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <div
            onClick={() => router.push("/landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >

            <div
              className="
                w-10 h-10
                
                bg-[#1c1a16]/70
                backdrop-blur-md
                flex items-center justify-center
                transition-all duration-300
               
               
              "
            >
              <Image
                src="/logo.png.jpeg"
                alt="HOPEST Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            <span
              className="
                text-xl
                font-semibold
                tracking-wide
                text-[#e4b63b]
                transition-colors
                duration-300
              "
            >
              HOPEST
            </span>

          </div>


          {/* ================= CENTER NAVIGATION ================= */}

          <nav className="hidden lg:flex items-center gap-9 text-sm text-white/70">

            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="hover:text-white transition-colors duration-300"
            >
              Browse
            </button>

            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              className="hover:text-white transition-colors duration-300"
            >
              How It Works
            </button>

            <button
              onClick={() => handleProtectedRoute("/dashboard")}
              className="hover:text-white transition-colors duration-300"
            >
              contact
            </button>

            <button
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="hover:text-white transition-colors duration-300"
            >
              About
            </button>

          </nav>


          {/* ================= RIGHT SIDE ================= */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* THEME BUTTON */}



            {/* LOGIN */}

            <button
              onClick={() => router.push("/auth/login")}
              className="
                hidden sm:block
                px-5 py-2.5
                rounded-xl
                border border-white/15
                text-sm
                font-medium
                text-white/80
                hover:bg-white/10
                hover:text-white
                transition-all duration-300
              "
            >
              Log in
            </button>


            {/* REGISTER */}

            <button
              onClick={() => router.push("/auth/register")}
              className="
                px-5 py-2.5
                rounded-xl
                bg-[#e3b437]
                text-[#17130b]
                text-sm
                font-semibold
                transition-all duration-300
                hover:bg-[#f0c34d]
                hover:scale-[1.03]
                hover:shadow-[0_0_30px_rgba(227,180,55,0.25)]
              "
            >
              Register
            </button>

          </div>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}
{/* ================= HERO ================= */}
  {/* =====================================================
      HERO
  ===================================================== */}

  <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

    {/* ================= HERO BACKGROUND ================= */}

    <div
      className="absolute inset-0 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/herosection.jpg')",

        // IMPORTANT:
        // This controls which part of the image is visible.
        backgroundPosition: "center 45%",
      }}
    />

    {/* Main dark overlay */}
    <div className="absolute inset-0 bg-black/25" />

    {/* Cinematic warm overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-b
        from-black/20
        via-transparent
        to-black/45
      "
    />

    {/* Soft side vignette */}
    <div
      className="
        absolute inset-0
        bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.35)_100%)]
      "
    />

    {/* ================= HERO CONTENT ================= */}

    <div
      className="
        relative
        z-10
        max-w-5xl
        mx-auto
        px-6
        text-center
        pt-24
        -translate-y-6
      "
    >

      {/* ================= BADGE ================= */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          mb-8
          rounded-full
          border
          border-[#d9a928]/40
          bg-black/30
          backdrop-blur-md
          text-[#f0c34d]
          text-sm
          shadow-lg
        "
      >

        {/* STAR instead of dot */}
        <span className="text-[#e3b437] text-base animate-pulse">
          ✦
        </span>

        Free, community-powered and always here to help

      </div>


      {/* ================= MAIN HEADING ================= */}

      <h1
        className="
          text-5xl
          sm:text-7xl
          md:text-8xl
          font-bold
          tracking-tight
          leading-none
          text-white
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]
        "
      >
        HOPEST
      </h1>


      {/* ================= TAGLINE ================= */}
<p
  className="
    mt-5
    text-sm
    sm:text-base
    tracking-[0.45em]
    uppercase
    text-[#e3b437]
    font-bold
    flex
    justify-center
    gap-3
  "
>
  {["Hope", "For", "The", "Best"].map((word, index) => (
    <span
      key={word}
      className="inline-block opacity-0 animate-fadeUp"
      style={{
        animationDelay: `${index * 0.35}s`,
      }}
    >
      {word}
    </span>
  ))}
</p>


      {/* ================= DESCRIPTION ================= */}

      <p
        className="
          mt-8
          max-w-2xl
          mx-auto
          text-lg
          text-[16px]
          leading-relaxed
          text-white/85
          drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]
        "
      >
        A free community platform to help others,
        report lost & found items,
        and alert about theft in your area.
      </p>


      {/* ================= CTA BUTTONS ================= */}

      <div
        className="
          mt-10
          flex
          flex-col
          sm:flex-row
          justify-center
          items-center
          gap-4
        "
      >

        {/* POST ITEM */}

        <button
          onClick={() =>
            handleProtectedRoute("/dashboard/create?type=LOST")
          }
          className="
            group
            w-full
            sm:w-auto
            px-8
            py-3.5
            rounded-xl
            bg-[#e3b437]
            text-[#17130b]
            font-semibold
            hover:bg-[#f5cb55]
            hover:scale-[1.03]
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
            shadow-xl
            text-[14px]
            shadow-[#e3b437]/20
          "
        >
          Post an Item

          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>


        {/* BROWSE */}

        <button
          onClick={() => handleProtectedRoute("/dashboard")}
          className="
            w-full
            sm:w-auto
            px-8
            py-3.5
            rounded-xl
            border
            text-[14px]
            border-white/30
            bg-black/20
            backdrop-blur-md
            hover:bg-white/15
            hover:border-white/50
            hover:scale-[1.03]
            font-medium
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
            text-white
          "
        >

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          Browse Listings

        </button>


        {/* DASHBOARD */}

        <button
          onClick={() => handleProtectedRoute("/dashboard")}
          className="
            w-full
            sm:w-auto
            px-8
            py-3.5
            rounded-xl
            border
            text-[14px]
            border-white/30
            bg-black/20
            backdrop-blur-md
            hover:bg-white/15
            hover:border-white/50
            hover:scale-[1.03]
            font-medium
            transition-all
            duration-300
            text-white
          "
        >
          View Dashboard
        </button>

      </div>

    </div>

  </section>
  {/* =====================================================
    TRUST / BENEFITS SECTION
===================================================== */}

<section className="relative z-10 border-t  border-white/10 bg-[#151413]">

  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-14">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

      {/* ================= VERIFIED REPORTS ================= */}
      <div className="group flex items-start gap-4">

        <div
          className="
            shrink-0
            w-11 h-11
            rounded-xl
            bg-[#e3b437]/10
            border border-[#e3b437]/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#e3b437]/20
            group-hover:border-[#e3b437]/40
            group-hover:scale-105
          "
        >
          {/* Shield Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e3b437"
            strokeWidth="1.8"
          >
            <path d="M12 3l7 3v5c0 4.8-3 8.4-7 10-4-1.6-7-5.2-7-10V6l7-3z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <div>
          <h3 className="text-[#d89b52] font-semibold text-[16px]">
            Verified reports
          </h3>

          <p className="mt-1 text-[14px] leading-6 text-white/50">
            Every listing is tied to a real account.
          </p>
        </div>

      </div>


      {/* ================= PRIVACY FIRST ================= */}
      <div className="group flex items-start gap-4">

        <div
          className="
            shrink-0
            w-11 h-11
            rounded-xl
            bg-[#e3b437]/10
            border border-[#e3b437]/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#e3b437]/20
            group-hover:border-[#e3b437]/40
            group-hover:scale-105
          "
        >
          {/* Lock Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e3b437"
            strokeWidth="1.8"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v3" />
          </svg>
        </div>

        <div>
          <h3 className="text-[#d89b52] font-semibold text-[16px]">
            Privacy first
          </h3>

          <p className="mt-1 text-[14px] leading-6 text-white/50">
            Your contact details stay hidden by default.
          </p>
        </div>

      </div>


      {/* ================= FAST REACH ================= */}
      <div className="group flex items-start gap-4">

        <div
          className="
            shrink-0
            w-11 h-11
            rounded-xl
            bg-[#e3b437]/10
            border border-[#e3b437]/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#e3b437]/20
            group-hover:border-[#e3b437]/40
            group-hover:scale-105
          "
        >
          {/* Clock Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e3b437"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>

        <div>
          <h3 className="text-[#d89b52] font-semibold text-[16px]">
            Fast reach
          </h3>

          <p className="mt-1 text-[14px] leading-6 text-white/50">
            Nearby members are notified within minutes.
          </p>
        </div>

      </div>


      {/* ================= ALWAYS FREE ================= */}
      <div className="group flex items-start gap-4">

        <div
          className="
            shrink-0
            w-11 h-11
            rounded-xl
            bg-[#e3b437]/10
            border border-[#e3b437]/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#e3b437]/20
            group-hover:border-[#e3b437]/40
            group-hover:scale-105
          "
        >
          {/* Hand / Heart Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e3b437"
            strokeWidth="1.8"
          >
            <path d="M7 12.5 4.5 10a2 2 0 0 0-2.8 2.8l5.6 5.6a3 3 0 0 0 2.1.9h5.1a3 3 0 0 0 2.8-1.9l1.2-3" />
            <path d="M9 11V7a2 2 0 0 1 4 0v4" />
            <path d="M13 10V6a2 2 0 0 1 4 0v5" />
            <path d="M17 11V8a2 2 0 0 1 4 0v4" />
            <path d="M9 11h8" />
          </svg>
        </div>

        <div>
          <h3 className="text-[#d89b52] font-semibold text-sm">
            Always free
          </h3>

          <p className="mt-1 text-sm leading-6 text-white/50">
            No fees, no ads, no subscriptions.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>
    </main>
  );
}