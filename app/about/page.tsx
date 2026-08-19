"use client";

import {
  Phone,
  MessageCircle,
  Mail,
  Users,
  Heart,
  Shield,
} from "lucide-react";

export default function AboutPage() {

  // ✅ DYNAMIC CONTACT DATA
  const contacts = [
    {
      label: "CALL",
      value: "+918590168840",
      icon: Phone,
      link: "tel:+918590168840",
    },
    {
      label: "WHATSAPP",
      value: "+918590168840",
      icon: MessageCircle,
      link: "https://wa.me/918590168840",
    },
    {
      label: "EMAIL",
      value: "hopestdhanaf@gmail.com",
      icon: Mail,
      link: "mailto:hopestdhanaf@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen animated-gradient bg-[#0b0f19] text-white flex flex-col items-center px-6 py-16">

      {/* TOP BADGE */}
      <div className="mb-4 px-4 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs tracking-widest">
        ✨ ABOUT US
      </div>

      {/* TITLE */}
      <h1 className="text-5xl font-bold text-yellow-400 mb-4">HOPEST</h1>
      <div className="w-16 h-[2px] bg-yellow-400 mb-10"></div>

      {/* DESCRIPTION */}
      <div className="max-w-2xl text-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-12">
        <p className="text-gray-300 leading-relaxed">
          Hopest is a useful and free application, where you can help others by posting
          things that you have created or search for your lost, found and theft items.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
            <Heart size={20} />
          </div>
          <h3 className="font-semibold text-lg">Help Others</h3>
          <p className="text-sm text-gray-400 mt-2">
            Post items to assist your community
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
            <Shield size={20} />
          </div>
          <h3 className="font-semibold text-lg">Report Theft</h3>
          <p className="text-sm text-gray-400 mt-2">
            Alert others about stolen items
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
            <Users size={20} />
          </div>
          <h3 className="font-semibold text-lg">Find Missing</h3>
          <p className="text-sm text-gray-400 mt-2">
            Connect and reunite people
          </p>
        </div>

      </div>

      {/* CONTACT SECTION */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <p className="text-center text-gray-400 mb-8 text-sm">
          For more information please contact us
        </p>

        <div className="space-y-5">

          {contacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition p-5 rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              </a>
            );
          })}

        </div>
      </div>

      {/* FOOTER */}
      <p className="mt-10 text-xs text-gray-500">
        © 2025 HOPEST · hope for the best
      </p>

    </div>
  );
}