"use client";

import { FilePlus, Target, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FilePlus,
      title: "Post a report",
      description:
        "Add what happened, where and when. It takes under a minute — no fees, no paperwork.",
    },
    {
      number: "02",
      icon: Target,
      title: "Reach your area",
      description:
        "Your report is surfaced to members nearby and matched against opposite listings.",
    },
    {
      number: "03",
      icon: Handshake,
      title: "Connect safely",
      description:
        "Talk through the platform, verify details, and arrange a safe handover.",
    },
  ];

  return (
    <section className="relative bg-[#0f0e0d] animated-gradient text-white py-24 md:py-28">

      {/* Subtle background grid */}
      <div
        className="
      absolute inset-0
      opacity-[0.025]
      pointer-events-none
      bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]
      bg-[size:4rem_4rem]
    "
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <div className="mb-14">

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
              How It Works
            </p>
          </div>

          <h2
            className="
          text-4xl
          sm:text-5xl
          font-bold
          tracking-tight
          text-white
        "
          >
            Three simple steps
          </h2>

          <p
            className="
          mt-4
          text-base
          sm:text-lg
          text-[#b9aaa0]
          max-w-2xl
          leading-relaxed
        "
          >
            Designed so anyone can use it — from a first-time reporter to a
            local police volunteer.
          </p>

        </div>

        {/* ================= THREE STEPS ================= */}
        <div className="grid md:grid-cols-3 gap-6">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
              group
              relative
              min-h-[230px]
              rounded-2xl
              border border-white/10
              bg-[#1b1a18]
              p-7
              overflow-hidden
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-[#e3b437]/30
              hover:bg-[#201e1b]
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
            "
              >

                {/* ================= GRADIENT GLOW ================= */}
                <div
                  className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#e3b437]
                via-[#8b5e3c]
                to-[#e3b437]
                opacity-0
                group-hover:opacity-20
                transition-opacity
                duration-500
                rounded-3xl
                blur-2xl
                pointer-events-none
              "
                />

                {/* ================= CONTENT ================= */}
                <div className="relative z-10">

                  {/* Number */}
                  <span
                    className="
                  absolute
                  top-0
                  right-0
                  text-4xl
                  font-bold
                  text-[#e3b437]/20
                  group-hover:text-[#e3b437]/40
                  transition-colors
                  duration-300
                "
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#2a261c]
                  border border-[#e3b437]/10
                  flex
                  items-center
                  justify-center
                  mb-6
                  transition-all
                  duration-300
                  group-hover:bg-[#3a311d]
                  group-hover:border-[#e3b437]/40
                  group-hover:shadow-[0_0_25px_rgba(227,180,55,0.15)]
                "
                  >
                    <Icon
                      className="
                    w-5
                    h-5
                    text-[#e3b437]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                  text-xl
                  font-semibold
                  text-white
                  mb-3
                "
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                  text-sm
                  sm:text-base
                  leading-relaxed
                  text-[#b9aaa0]
                "
                  >
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}