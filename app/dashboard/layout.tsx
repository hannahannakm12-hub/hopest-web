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
        <header className="bg-[#4b3425] animated-gradient px-8 py-4 text-white">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-serif">HOPEST</span>

            <div className="flex items-center gap-4">
              <div
                onClick={() => setOpenMenu(true)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer"
              >
                <User className="w-4 h-4 text-[#4b3425]" />
              </div>

              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer">
                <HelpCircle className="w-4 h-4 text-[#4b3425]" />
              </div>
            </div>
          </div>

          <nav className="flex gap-8 mt-4 text-sm">
            <span
              onClick={() => router.push("/dashboard")}
              className={`flex items-center gap-2 cursor-pointer pb-1 ${pathname === "/dashboard"
                  ? "border-b-2 border-white"
                  : "opacity-70 hover:opacity-100"
                }`}
            >
              <Home size={16} />
              Home
            </span>

            <span
              onClick={() => router.push("/dashboard/demand")}
              className={`flex items-center gap-2 cursor-pointer pb-1 ${pathname === "/dashboard/demand"
                  ? "border-b-2 border-white"
                  : "opacity-70 hover:opacity-100"
                }`}
            >
              <ClipboardList size={16} />
              Demand
            </span>

            <span
              onClick={() => router.push("/dashboard/usesage")}
              className={`flex items-center gap-2 cursor-pointer pb-1 ${pathname === "/dashboard/usage"
                  ? "border-b-2 border-white"
                  : "opacity-70 hover:opacity-100"
                }`}
            >
              <HelpCircle size={16} />
              How To Use
            </span>
          </nav>
        </header>
      )}

      {openMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpenMenu(false)}
          />

          <div className="w-72 bg-white h-full shadow-lg">
            <div className="bg-[#4b3425] text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#4b3425] font-bold">
                  {user?.fullname?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <p className="font-semibold">
                    {user?.fullname || "Guest"}
                  </p>

                  <p className="text-sm opacity-80">
                    {user?.mob || "No Mobile"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <button
                onClick={() => router.push("/my-creations")}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100"
              >
                <User size={18} />
                My Creations
              </button>

              <button
                onClick={() => router.push("/about")}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100"
              >
                <Phone size={18} />
                Call Support
              </button>

              <button
                onClick={() => router.push("/privacy")}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100"
              >
                <Shield size={18} />
                Privacy Policy
              </button>

              <button
                onClick={() => router.push("/about")}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100"
              >
                <Info size={18} />
                About Us
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}