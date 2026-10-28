"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BellRing,
  CheckCheck,
  RefreshCw,
  X,
  AlertTriangle,
  Package,
  Search,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";
import { HopestNotificationSkeleton } from "@/components/HopestLoader";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "missing" | "lost" | "found" | "theft" | "system";
  time?: string;
  timestamp: string;
  incidentDate?: string;
  link: string;
}

interface NotificationDropdownProps {
  uid?: string;
  align?: "right" | "left";
}

export default function NotificationDropdown({
  uid = "",
  align = "right",
}: NotificationDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | "missing" | "theft" | "found" | "lost"
  >("all");

  // Load read notification IDs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hopest_read_notifications");
      if (saved) {
        setReadIds(JSON.parse(saved));
      }
    } catch {
      // ignore JSON parse error
    }
  }, []);

  // Fetch live notifications
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/notifications${uid ? `?uid=${uid}` : ""}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 45000);
    return () => clearInterval(interval);
  }, [uid]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Mark all as read
  const handleMarkAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    try {
      localStorage.setItem("hopest_read_notifications", JSON.stringify(allIds));
    } catch {
      // ignore storage error
    }
  };

  // Mark single as read & navigate
  const handleItemClick = (item: NotificationItem) => {
    if (!readIds.includes(item.id)) {
      const updated = [...readIds, item.id];
      setReadIds(updated);
      try {
        localStorage.setItem(
          "hopest_read_notifications",
          JSON.stringify(updated)
        );
      } catch {
        // ignore
      }
    }
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const filteredNotifications = notifications.filter((n) => {
    const isUnread = !readIds.includes(n.id);
    if (activeFilter === "unread") return isUnread;
    if (activeFilter === "missing") return n.category === "missing";
    if (activeFilter === "theft") return n.category === "theft";
    if (activeFilter === "found") return n.category === "found";
    if (activeFilter === "lost") return n.category === "lost";
    return true;
  });

  // Category styling helper
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case "missing":
        return {
          icon: AlertTriangle,
          label: "Missing Alert",
          badgeColor: "bg-[#2b1c14] text-white border-[#7a482b]/60",
          iconColor: "text-white bg-[#2b1c14] border-[#7a482b]/50 shadow-[0_0_12px_rgba(122,72,43,0.35)]",
        };
      case "theft":
        return {
          icon: ShieldAlert,
          label: "Theft Report",
          badgeColor: "bg-[#251811] text-[#c49371] border-[#6b3f23]/60",
          iconColor: "text-[#c49371] bg-[#251811] border-[#6b3f23]/50 shadow-[0_0_12px_rgba(107,63,35,0.35)]",
        };
      case "found":
        return {
          icon: Package,
          label: "Found Belonging",
          badgeColor: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/60",
          iconColor: "text-[#e8d5c4] bg-[#21150e] border-[#5c3a21]/50 shadow-[0_0_12px_rgba(92,58,33,0.35)]",
        };
      case "lost":
      default:
        return {
          icon: Search,
          label: "Lost Property",
          badgeColor: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/60",
          iconColor: "text-[#d4a373] bg-[#2b1b11] border-[#6b3f23]/50 shadow-[0_0_12px_rgba(107,63,35,0.35)]",
        };
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* =====================================================
          NOTIFICATION BELL BUTTON
      ===================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
        className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? "bg-gradient-to-b from-[#2b1b11] to-[#140f0c] border border-[#6b3f23] shadow-[0_0_20px_rgba(107,63,35,0.35)]"
            : "bg-stone-900/80 hover:bg-stone-800/90 border border-white/10 hover:border-[#6b3f23]/60 shadow-md hover:shadow-[0_0_15px_rgba(107,63,35,0.2)]"
        }`}
      >
        <Bell
          size={18}
          className={`transition-all duration-300 ${
            isOpen
              ? "text-[#d4a373] scale-110"
              : "text-stone-300 group-hover:text-[#d4a373] group-hover:rotate-12"
          }`}
        />

        {/* Unread Indicator Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-gradient-to-r from-[#4a2c17] to-[#7a482b] text-white font-black text-[10px] shadow-[0_0_12px_rgba(107,63,35,0.7)] border border-white/20 animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* =====================================================
          NOTIFICATION DROPDOWN POPOVER
      ===================================================== */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`fixed sm:absolute top-[72px] sm:top-13 inset-x-2.5 sm:inset-x-auto ${
              align === "right" ? "sm:right-0" : "sm:left-0"
            } z-50 w-auto sm:w-[420px] max-w-[calc(100vw-1.25rem)] sm:max-w-[420px] rounded-2xl bg-[#0e0c0a]/95 backdrop-blur-2xl border border-[#6b3f23]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(107,63,35,0.2)] overflow-hidden flex flex-col max-h-[82vh] sm:max-h-[600px] animate-in fade-in zoom-in-95 duration-200`}
          >
            {/* Header Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373]/50 to-transparent pointer-events-none" />

            {/* Top Header Bar */}
            <div className="p-3 sm:p-4 bg-gradient-to-b from-[#1c140e] to-[#120e0a] border-b border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2b1b11] border border-[#6b3f23]/50 flex items-center justify-center text-[#d4a373] shrink-0">
                  <BellRing size={15} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/60 text-[#d4a373] text-[9px] sm:text-[10px] font-black shrink-0">
                        {unreadCount} new
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-stone-400 truncate">
                    Live updates from the Hopest network
                  </p>
                </div>
              </div>

              {/* Header Right Action Controls */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/50 text-stone-300 hover:text-[#f5efe8] text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <CheckCheck size={13} className="text-[#d4a373]" />
                    <span className="hidden sm:inline">Mark all read</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={fetchNotifications}
                  disabled={isLoading}
                  title="Refresh notifications"
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw
                    size={13}
                    className={`text-stone-300 ${
                      isLoading ? "animate-spin text-[#d4a373]" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close notifications"
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Filter Pills Navigation */}
            <div className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-[#080706] border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto overflow-y-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white shadow-[0_0_12px_rgba(107,63,35,0.4)] border border-[#8b5e3c]/50"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-stone-200 border border-white/[0.06]"
                }`}
              >
                All ({notifications.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("unread")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "unread"
                    ? "bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white shadow-[0_0_12px_rgba(107,63,35,0.4)] border border-[#8b5e3c]/50"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-stone-200 border border-white/[0.06]"
                }`}
              >
                Unread ({unreadCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("missing")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "missing"
                    ? "bg-[#2b1c14] text-white border border-[#7a482b]/60 shadow-[0_0_12px_rgba(122,72,43,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 hover:text-white border border-white/[0.06]"
                }`}
              >
                🚨 Missing
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("theft")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "theft"
                    ? "bg-[#251811] text-[#c49371] border border-[#6b3f23]/60 shadow-[0_0_12px_rgba(107,63,35,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-[#c49371]/80 hover:text-[#c49371] border border-white/[0.06]"
                }`}
              >
                🛡️ Theft
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("found")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "found"
                    ? "bg-[#21150e] text-[#e8d5c4] border border-[#5c3a21]/60 shadow-[0_0_12px_rgba(92,58,33,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-[#e8d5c4]/80 hover:text-[#e8d5c4] border border-white/[0.06]"
                }`}
              >
                📦 Found
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("lost")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "lost"
                    ? "bg-[#2b1b11] text-[#d4a373] border border-[#6b3f23]/60 shadow-[0_0_12px_rgba(107,63,35,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-[#d4a373]/80 hover:text-[#d4a373] border border-white/[0.06]"
                }`}
              >
                🔍 Lost
              </button>
            </div>

            {/* Notification List Scroll Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[50vh] sm:max-h-[380px] p-2.5 sm:p-3 space-y-2.5 divide-y divide-white/[0.04]">
              {isLoading && notifications.length === 0 ? (
                /* SKELETON NOTIFICATION LOADERS */
                <HopestNotificationSkeleton count={3} />
              ) : filteredNotifications.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#2b1b11] border border-[#6b3f23]/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Sparkles className="w-6 h-6 text-[#d4a373]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    All caught up!
                  </h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    {activeFilter === "unread"
                       ? "You have read all current notifications."
                      : "No community reports matching this filter at the moment."}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((item) => {
                  const isRead = readIds.includes(item.id);
                  const meta = getCategoryMeta(item.category);
                  const Icon = meta.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-2.5 sm:gap-3.5 ${
                        isRead
                          ? "bg-[#141210]/60 hover:bg-[#1c1712]/90 border-white/[0.05] hover:border-[#6b3f23]/40 opacity-75 hover:opacity-100"
                          : "bg-gradient-to-b from-[#21150e]/95 to-[#140f0c]/95 border-[#6b3f23]/40 hover:border-[#8b5e3c]/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_rgba(107,63,35,0.22)] -translate-y-0.5"
                      }`}
                    >
                      {/* Left Category Icon */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${meta.iconColor}`}
                      >
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </div>

                      {/* Content Body */}
                      <div className="flex-1 min-w-0">
                        {/* Header Row: Category Badge + Relative Timing + Unread Dot */}
                        <div className="flex items-center justify-between gap-1.5 mb-1.5">
                          <span
                            className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border shrink-0 ${meta.badgeColor}`}
                          >
                            {meta.label}
                          </span>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Relative Arrival Timing Pill */}
                            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-[#2b1b11] border border-[#6b3f23]/40 text-[9px] sm:text-[10px] text-[#d4a373] font-semibold font-mono">
                              <Clock size={10} className="text-[#d4a373] shrink-0" />
                              <span className="truncate max-w-[85px] sm:max-w-none">{item.time || item.timestamp}</span>
                            </span>

                            {!isRead && (
                              <span
                                className="w-2 h-2 rounded-full bg-[#d4a373] shadow-[0_0_8px_rgba(212,163,115,0.9)] animate-ping shrink-0"
                                title="Unread"
                              />
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4
                          className={`text-xs sm:text-[13px] leading-snug line-clamp-1 group-hover:text-[#f5efe8] transition-colors ${
                            isRead
                              ? "font-semibold text-stone-300"
                              : "font-black text-white"
                          }`}
                        >
                          {item.title}
                        </h4>

                        {/* Message Description */}
                        <p className="text-[10px] sm:text-[11px] text-stone-400 line-clamp-2 mt-1 leading-relaxed group-hover:text-stone-300 transition-colors">
                          {item.message}
                        </p>

                        {/* Action Link & Detailed Timing Row */}
                        <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] sm:text-[11px] gap-2 min-w-0">
                          {/* Exact Arrival Timing & Incident Date */}
                          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-stone-400 truncate min-w-0 flex-1">
                            <span className="text-stone-300 font-medium truncate">
                              {item.timestamp}
                            </span>
                            {item.incidentDate && (
                              <>
                                <span className="text-stone-600">•</span>
                                <span className="text-[#d4a373]/80 truncate">
                                  {item.incidentDate}
                                </span>
                              </>
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 font-bold text-[#d4a373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0">
                            <span>View</span>
                            <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-2.5 sm:p-3 bg-[#080706] border-t border-white/[0.06] flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center justify-between gap-2 sm:gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/dashboard/search");
                }}
                className="text-stone-400 hover:text-[#d4a373] font-medium transition-colors cursor-pointer flex items-center justify-center min-[380px]:justify-start gap-1 py-1"
              >
                <span>Browse all reports</span>
                <ExternalLink size={12} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/missing");
                }}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white font-bold text-center text-xs hover:brightness-110 transition-all cursor-pointer shadow-md border border-[#8b5e3c]/40 shrink-0"
              >
                Urgent Missing Appeals →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
