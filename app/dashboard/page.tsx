"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{
    fullname: string;
    mob: string;
    mailid: string;
  } | null>(null);
  // 🔐 Check login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);



  return (
    <div className="min-h-screen bg-white">
      {/* TOP HEADER */}


      <main className="max-w-7xl  mx-auto px-6 py-10">
        {/* HERO SECTION */}
        <div className="animated-gradient text-white rounded-3xl p-10 mb-10 shadow-md">
          <p className="text-sm tracking-widest opacity-80 mb-2">DASHBOARD</p>
          <h1 className="text-6xl font-bold">
            Welcome back 
          </h1>         
           <p className="mt-3 opacity-90">
            Choose a category below to get started with your post.
          </p>
        </div>

        {/* CARD GRID */}
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD COMPONENT */}
          {[
            {
              title: "Lost",
              desc: "Report something you've lost",
              img: "/lostdas.jpeg",
              type: "LOST",
              color: "bg-[#4b3425]",
            },
            {
              title: "Found",
              desc: "Help return something you found",
              img: "/founddas.jpeg",
              type: "FOUND",
              color: "bg-green-600",
            },
            {
              title: "Theft",
              desc: "Report stolen item",
              img: "/theftdas.jpeg",
              type: "THEFT",
              color: "bg-red-600",
            },
            {
              title: "Missing",
              desc: "Missing person alert",
              img: "/missingdas.jpeg",
              type: "MISSING",
              color: "bg-red-600",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative group  bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-3 border-[#4b3425]"
            >
              {/* 🔥 Arrow (top-right) */}
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-full border border-[#4b3425] flex items-center justify-center text-[#4b3425] group-hover:bg-[#4b3425] group-hover:text-white transition">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                <Image src={item.img} alt={item.title} width={80} height={80} />
              </div>

              {/* TEXT */}
              <h3 className="text-lg font-semibold  text-[#4b3425]">
                {item.title}
              </h3>
              <p className="text-sm  text-white mb-5">{item.desc}</p>

              {/* ACTIONS */}
              {item.type === "MISSING" ? (
                <button
                  onClick={() => router.push("/missing")}
                  className="w-full bg-[#4b3425] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm hover:scale-105 transition"
                >
                  View
                </button>
              ) : (
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/create?type=${item.type}`)
                    }
                    className={`${item.color} text-white px-4 py-2 animated-gradient rounded-lg flex items-center justify-center gap-2 text-sm w-full hover:scale-105 transition`}
                  >
                    <Plus size={14} /> Create
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/dashboard/search?type=${item.type}`)
                    }
                    className="border border-[#4b3425] text-[#4b3425] px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm w-full hover:bg-gray-100 transition"
                  >
                    <Search size={14} /> Search
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-gray-300 bg-white py-4 text-center text-xs text-gray-600">
        © 2025 HOPEST - hope for the best
        <span className="mx-2">|</span>
        <button
          onClick={() => router.push("/landing")}
          className="hover:underline"
        >
          Back to Home
        </button>
      </footer>
    </div>
  );
}