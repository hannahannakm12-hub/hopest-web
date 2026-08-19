"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const terms = [
  "You are at least 18 years old",
  "You will provide accurate and truthful information about yourself",
  "You will not use this app for any commercial or illegal purposes",
  "Users are solely responsible for transactions made by users",
  "The information you provide will be secure",
  "If you notice any violation of copyright or any other kind of law by us, please notify us immediately and we will fix it immediately"
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

 
  const handleContinue = () => {
    router.push("/landing");
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(to bottom right, #f4f1ec, #e8ded3)",
      }}
    >
      {/* Content */}
      <div className="px-6 pt-16 max-w-2xl w-full mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#6b4a3a] mb-4">
          Welcome to Hopest
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Thank you very much for visiting Hopest for the first time. Only click{" "}
          <span className="font-semibold text-[#6b4a3a]">Continue</span> after
          reading below carefully.
        </p>

        {/* Terms */}
        <div className="space-y-5">
          {terms.map((term, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#f7f2ec] border border-[#e5d9cc] shadow-sm"
            >
              <CheckCircle2 className="w-6 h-6 text-[#6b4a3a] shrink-0 mt-1" />
              <p className="text-gray-800 text-base leading-relaxed">{term}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs leading-relaxed  pt-4 mb-6">
          These terms and conditions are subject to change at any time without
          prior notice. Please review them periodically for updates. If you do
          not agree to these terms and conditions, please uninstall this app
          immediately.
        </p>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-10 pt-6 flex justify-center">
        <button
          onClick={handleContinue}
          className="w-[800px] h-14 text-lg font-semibold rounded-2xl bg-[#7b4a2e] text-white hover:bg-[#6b3f26] transition-all duration-200 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
