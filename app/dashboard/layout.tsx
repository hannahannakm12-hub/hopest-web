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
  Bell,
  BellRing,
  CheckCheck,
  RefreshCw,
  X,
  AlertTriangle,
  Package,
  Search,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "missing" | "lost" | "found" | "theft" | "system";
  timestamp: string;
  link: string;
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "missing" | "unread">("all");

  const [user, setUser] = useState<{
    id: string;
    uid: string;
    fullname: string;
    mob: string;
    mailid: string;
  } | null>(null);

  // Load read notification IDs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hopest_read_notifications");
      if (saved) {
        setReadIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch live notifications from API
  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const uid = user?.uid || "";
      const res = await fetch(`/api/notifications${uid ? `?uid=${uid}` : ""}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Poll for notifications
  useEffect(() => {
    fetchNotifications();
    const timer = setInterval(() => {
      fetchNotifications();
    }, 45000); // 45 seconds polling
    return () => clearInterval(timer);
  }, [user]);

  // Mark all as read
  const handleMarkAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    try {
      localStorage.setItem("hopest_read_notifications", JSON.stringify(allIds));
    } catch {}
  };

  // Mark single as read & navigate
  const handleNotificationClick = (item: NotificationItem) => {
    if (!readIds.includes(item.id)) {
      const updated = [...readIds, item.id];
      setReadIds(updated);
      try {
        localStorage.setItem("hopest_read_notifications", JSON.stringify(updated));
      } catch {}
    }
    setOpenNotifications(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "missing") return n.category === "missing";
    if (activeFilter === "unread") return !readIds.includes(n.id);
    return true;
  });

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

                {/* NOTIFICATION BELL */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenNotifications(!openNotifications)}
                    title="Notifications"
                    className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition cursor-pointer group"
                  >
                    <Bell className="w-4 h-4 transition-transform group-hover:rotate-12 text-amber-200/90" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* NOTIFICATION POPOVER */}
                  {openNotifications && (
                    <>
                      {/* Transparent backdrop for outside clicks */}
                      <div
                        className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
                        onClick={() => setOpenNotifications(false)}
                      />

                      <div className="fixed sm:absolute top-16 right-4 sm:right-0 sm:top-12 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-[#fbf9f6] text-[#3b2a21] rounded-2xl shadow-2xl border border-[#e5dcd3] overflow-hidden animate-fadeIn">
                        
                        {/* POPOVER HEADER */}
                        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#2b1f18] via-[#3e2b20] to-[#2b1f18] text-white flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BellRing size={16} className="text-[#d89b52]" />
                            <h3 className="font-serif font-bold text-sm tracking-wide">
                              Notifications
                            </h3>
                            {unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {unreadCount} new
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            {unreadCount > 0 && (
                              <button
                                type="button"
                                onClick={handleMarkAllAsRead}
                                title="Mark all as read"
                                className="text-[11px] text-[#d89b52] hover:text-white transition flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer"
                              >
                                <CheckCheck size={13} />
                                <span className="hidden sm:inline">Mark read</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={fetchNotifications}
                              disabled={loadingNotifications}
                              title="Refresh notifications"
                              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                            >
                              <RefreshCw size={13} className={loadingNotifications ? "animate-spin" : ""} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setOpenNotifications(false)}
                              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>

                        {/* FILTER PILLS */}
                        <div className="px-3 py-2 bg-[#ede5db]/60 border-b border-[#e2d5c7] flex items-center gap-1.5 text-[11px]">
                          {(["all", "missing", "unread"] as const).map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveFilter(tab)}
                              className={`px-2.5 py-1 rounded-full font-medium transition cursor-pointer capitalize ${
                                activeFilter === tab
                                  ? "bg-[#6b3f23] text-white shadow-xs"
                                  : "text-[#6b5240] hover:bg-white/60"
                              }`}
                            >
                              {tab === "missing" ? "🚨 Missing Alerts" : tab}
                            </button>
                          ))}
                        </div>

                        {/* NOTIFICATION ITEMS LIST */}
                        <div className="max-h-80 overflow-y-auto divide-y divide-[#ece2d8]">
                          {filteredNotifications.length === 0 ? (
                            <div className="py-10 text-center px-4">
                              <div className="w-12 h-12 rounded-full bg-[#ede5db] text-[#8c7565] flex items-center justify-center mx-auto mb-2">
                                <Bell size={22} className="opacity-50" />
                              </div>
                              <p className="text-xs font-semibold text-[#5a4335]">
                                No notifications found
                              </p>
                              <p className="text-[11px] text-[#8c7565] mt-0.5">
                                Updates from mobile app & community will appear here.
                              </p>
                            </div>
                          ) : (
                            filteredNotifications.map((notif) => {
                              const isRead = readIds.includes(notif.id);
                              return (
                                <div
                                  key={notif.id}
                                  onClick={() => handleNotificationClick(notif)}
                                  className={`p-3 sm:p-3.5 transition cursor-pointer hover:bg-[#f3ece3] flex items-start gap-3 ${
                                    isRead ? "opacity-75 bg-transparent" : "bg-white/50"
                                  }`}
                                >
                                  {/* Category Icon */}
                                  <div className="shrink-0 mt-0.5">
                                    {notif.category === "missing" && (
                                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shadow-xs">
                                        <AlertTriangle size={15} />
                                      </div>
                                    )}
                                    {notif.category === "found" && (
                                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                                        <Package size={15} />
                                      </div>
                                    )}
                                    {notif.category === "lost" && (
                                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                                        <Search size={15} />
                                      </div>
                                    )}
                                    {(notif.category === "theft" || notif.category === "system") && (
                                      <div className="w-8 h-8 rounded-lg bg-[#ede5db] text-[#6b3f23] flex items-center justify-center shadow-xs">
                                        <Sparkles size={15} />
                                      </div>
                                    )}
                                  </div>

                                  {/* Notification Body */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-1.5">
                                      <h4 className={`text-xs leading-snug line-clamp-1 ${isRead ? "font-medium text-[#4a372a]" : "font-bold text-[#2b1f18]"}`}>
                                        {notif.title}
                                      </h4>
                                      {!isRead && (
                                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1" />
                                      )}
                                    </div>
                                    <p className="text-[11px] text-[#6b5240] line-clamp-2 mt-0.5 leading-relaxed">
                                      {notif.message}
                                    </p>
                                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#9b8575]">
                                      <span>{notif.timestamp}</span>
                                      <span className="font-semibold text-[#6b3f23] hover:underline flex items-center gap-0.5">
                                        <span>View</span>
                                        <ExternalLink size={10} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* POPOVER FOOTER */}
                        <div className="p-2.5 bg-[#ede5db]/80 border-t border-[#e2d5c7] text-center text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenNotifications(false);
                              router.push("/missing");
                            }}
                            className="text-[#6b3f23] hover:text-[#3b2a21] font-bold text-[11px] hover:underline cursor-pointer"
                          >
                            View All Missing Person Appeals →
                          </button>
                        </div>

                      </div>
                    </>
                  )}
                </div>

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