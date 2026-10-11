"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  HelpCircle,
  Phone,
  Shield,
  Info,
  LogOut,
  Home,
  ClipboardList,
} from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    uid: string;
    fullname: string;
    mob: string;
    mailid: string;
  } | null>(null);

  // Check login
 useEffect(() => {
  const storedUser = localStorage.getItem("user");

  console.log("Dashboard storedUser =", storedUser);

  if (!storedUser) {
    router.replace("/auth/login");
    return;
  }

  try {
    setUser(JSON.parse(storedUser));
  } catch {
    localStorage.removeItem("user");
    router.replace("/auth/login");
  }
}, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");

    setOpenMenu(false);

    router.replace("/landing");
  };

  // Hide header
  const hideHeader =
    pathname.startsWith("/dashboard/create") ||
    pathname.startsWith("/dashboard/search");

  return (
    <div className="min-h-screen bg-white">
      {!hideHeader && (
        <header className="sticky top-0 z-40 bg-[#2b1f18]/95 backdrop-blur-md border-b border-white/10 text-white shadow-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-18">
              
              {/* BRAND LOGO */}
              <div 
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6b3f23] to-[#d89b52] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                  <span className="font-serif font-bold text-xl text-white">H</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    HOPEST
                  </span>
                  <span className="text-[10px] tracking-wider text-amber-200/80 uppercase font-medium -mt-1 hidden sm:inline">
                    Community Portal
                  </span>
                </div>
              </div>

              {/* CENTER NAVIGATION PILLS */}
              <nav className="hidden md:flex items-center gap-1.5 bg-black/25 p-1 rounded-full border border-white/10">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    pathname === "/dashboard"
                      ? "bg-gradient-to-r from-[#8b5e3c] to-[#6b3f23] text-white shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Home size={14} />
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard/demand")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    pathname === "/dashboard/demand"
                      ? "bg-gradient-to-r from-[#8b5e3c] to-[#6b3f23] text-white shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <ClipboardList size={14} />
                  Demand
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard/usesage")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    pathname === "/dashboard/usesage" || pathname === "/dashboard/usage"
                      ? "bg-gradient-to-r from-[#8b5e3c] to-[#6b3f23] text-white shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <HelpCircle size={14} />
                  How To Use
                </button>
              </nav>

              {/* RIGHT CONTROLS */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* How to use button for mobile / quick access */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/usesage")}
                  title="How to Use"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                {/* MODERN NOTIFICATION DROPDOWN */}
                <NotificationDropdown uid={user?.uid || ""} align="right" />

                {/* USER PROFILE PILL */}
                <button
                  type="button"
                  onClick={() => setOpenMenu(true)}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full pl-1.5 pr-3.5 py-1 transition-all cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d89b52] to-[#8b5e3c] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user?.fullname?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-xs font-medium text-white/90 group-hover:text-white max-w-[100px] truncate hidden sm:inline">
                    {user?.fullname ? user.fullname.split(" ")[0] : "Account"}
                  </span>
                </button>
              </div>

            </div>

            {/* MOBILE NAVIGATION BAR (below on small screens) */}
            <nav className="flex md:hidden items-center justify-around py-2.5 border-t border-white/10 text-xs">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  pathname === "/dashboard"
                    ? "bg-[#6b3f23] text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Home size={14} />
                Home
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/demand")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  pathname === "/dashboard/demand"
                    ? "bg-[#6b3f23] text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <ClipboardList size={14} />
                Demand
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/usesage")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  pathname === "/dashboard/usesage" || pathname === "/dashboard/usage"
                    ? "bg-[#6b3f23] text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <HelpCircle size={14} />
                How To Use
              </button>
            </nav>
          </div>
        </header>
      )}

      {/* PROFILE SLIDE-OVER DRAWER */}
      {openMenu && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setOpenMenu(false)}
          />

          {/* DRAWER PANEL */}
          <div className="relative w-80 max-w-[90vw] bg-[#fbf9f6] text-[#3b2a21] h-full shadow-2xl flex flex-col border-l border-[#e7ded5] z-10 animate-slideIn">
            
            {/* DRAWER HEADER */}
            <div className="bg-gradient-to-br from-[#2b1f18] via-[#4b3425] to-[#3b2a21] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
                title="Close"
              >
                ✕
              </button>

              <div className="flex items-center gap-3.5 mt-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#d89b52] to-[#8b5e3c] flex items-center justify-center text-white font-bold text-2xl shadow-md border-2 border-white/20">
                  {user?.fullname?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="overflow-hidden">
                  <p className="font-semibold text-lg text-white truncate">
                    {user?.fullname || "Community Member"}
                  </p>
                  <p className="text-xs text-amber-200/90 font-mono mt-0.5 truncate">
                    {user?.mob || "No mobile registered"}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-[10px] text-amber-200 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Active Member
                  </div>
                </div>
              </div>
            </div>

            {/* DRAWER NAV LINKS */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <p className="px-3 pt-2 pb-1 text-[11px] font-bold text-[#8b5e3c] uppercase tracking-wider">
                My Activity
              </p>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/my-creations");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <User size={16} />
                </div>
                <span>My Creations</span>
              </button>

              <p className="px-3 pt-4 pb-1 text-[11px] font-bold text-[#8b5e3c] uppercase tracking-wider">
                Help & Guidelines
              </p>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/dashboard/usesage");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <HelpCircle size={16} />
                </div>
                <span>How to Use Hopest</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/dashboard/demand");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <ClipboardList size={16} />
                </div>
                <span>Why Hopest Matters</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/support");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <Phone size={16} />
                </div>
                <span>Call Support</span>
              </button>

              <p className="px-3 pt-4 pb-1 text-[11px] font-bold text-[#8b5e3c] uppercase tracking-wider">
                Information
              </p>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/privacy");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <Shield size={16} />
                </div>
                <span>Privacy Policy</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/about");
                }}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-[#ede5dc] text-[#3b2a21] text-sm font-medium transition cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#efebe7] flex items-center justify-center text-[#4b3425]">
                  <Info size={16} />
                </div>
                <span>About Us</span>
              </button>
            </div>

            {/* DRAWER FOOTER / LOGOUT */}
            <div className="p-4 border-t border-[#e7ded5] bg-white">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold transition cursor-pointer border border-red-200"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>

          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}