"use client";

import {
  UserPlus,
  LogIn,
  Search,
  Plus,
  AlertTriangle,
} from "lucide-react";

export default function HowToUseContent() {
  const steps = [
    {
      title: "Register",
      desc: "Create your account using your name, mobile number, and password.",
      icon: UserPlus,
    },
    {
      title: "Login",
      desc: "Access your dashboard using your credentials.",
      icon: LogIn,
    },
    {
      title: "Lost → Create",
      desc: "Enter the details of the lost item.",
      icon: Plus,
    },
    {
      title: "Lost → Search",
      desc: "Check if someone already reported your lost item.",
      icon: Search,
    },
    {
      title: "Found → Create",
      desc: "Report found items to help return them.",
      icon: Plus,
    },
    {
      title: "Theft",
      desc: "Report to police first, then add theft details.",
      icon: AlertTriangle,
    },
    {
      title: "Missing",
      desc: "Report to police and inform Hopest team.",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      
      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#4b3425] tracking-tight">
          How to Use Hopest
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          A smooth and simple journey to get started
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative">
        
        {/* Gradient line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-[#4b3425] via-[#8b5e3c] to-transparent"></div>

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={index} className="relative pl-16 mb-12 group">
              
              {/* Glow dot */}
              <div className="absolute left-0 top-2">
                <div className="relative flex items-center justify-center">
                  
                  {/* Glow effect */}
                  <div className="absolute w-6 h-6 bg-[#4b3425] rounded-full blur-md opacity-40 group-hover:opacity-70 transition"></div>
                  
                  {/* Solid dot */}
                  <div className="w-4 h-4 bg-[#4b3425] rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* Card */}
              <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-[#4b3425]/10 rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-[#4b3425]" />
                  </div>

                  <h3 className="text-lg font-semibold text-[#4b3425]">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* IMPORTANT CARD */}
      <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 shadow-sm">
        <p className="text-red-700 text-sm">
          <strong>Important:</strong> Always report Theft and Missing cases to the nearest police station before posting.
        </p>
      </div>
    </div>
  );
}