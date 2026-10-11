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
          badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
          iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.25)]",
        };
      case "theft":
        return {
          icon: ShieldAlert,
          label: "Theft Report",
          badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
          iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
        };
      case "found":
        return {
          icon: Package,
          label: "Found Belonging",
          badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
        };
      case "lost":
      default:
        return {
          icon: Search,
          label: "Lost Property",
          badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
          iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.25)]",
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
            ? "bg-gradient-to-b from-[#241e18] to-[#171310] border border-amber-400/60 shadow-[0_0_20px_rgba(216,155,82,0.35)]"
            : "bg-stone-900/80 hover:bg-stone-800/90 border border-white/10 hover:border-amber-500/40 shadow-md hover:shadow-[0_0_15px_rgba(216,155,82,0.2)]"
        }`}
      >
        <Bell
          size={18}
          className={`transition-all duration-300 ${
            isOpen
              ? "text-amber-300 scale-110"
              : "text-stone-300 group-hover:text-amber-300 group-hover:rotate-12"
          }`}
        />

        {/* Unread Indicator Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-[10px] shadow-[0_0_12px_rgba(239,68,68,0.7)] border border-white/20 animate-pulse">
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
            className={`fixed sm:absolute top-20 sm:top-13 ${
              align === "right" ? "right-3 sm:right-0" : "left-3 sm:left-0"
            } z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[420px] rounded-2xl bg-[#12100e]/95 backdrop-blur-2xl border border-amber-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(216,155,82,0.15)] overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in zoom-in-95 duration-200`}
          >
            {/* Header Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />

            {/* Top Header Bar */}
            <div className="p-4 bg-gradient-to-b from-[#1b1713] to-[#14110e] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <BellRing size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/30 border border-amber-500/40 text-[#f59e0b] text-[10px] font-black">
                        {unreadCount} new
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Live updates from the Hopest network
                  </p>
                </div>
              </div>

              {/* Header Right Action Controls */}
              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/30 text-stone-300 hover:text-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <CheckCheck size={13} className="text-amber-400" />
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
                    size={14}
                    className={`text-stone-300 ${
                      isLoading ? "animate-spin text-amber-400" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close notifications"
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Filter Pills Navigation */}
            <div className="px-3.5 py-2.5 bg-[#0e0c0a] border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-amber-500 to-[#d89b52] text-stone-950 shadow-[0_0_12px_rgba(216,155,82,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-stone-200 border border-white/[0.06]"
                }`}
              >
                All ({notifications.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("unread")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "unread"
                    ? "bg-gradient-to-r from-amber-500 to-[#d89b52] text-stone-950 shadow-[0_0_12px_rgba(216,155,82,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-stone-200 border border-white/[0.06]"
                }`}
              >
                Unread ({unreadCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("missing")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "missing"
                    ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-rose-300/80 hover:text-rose-200 border border-white/[0.06]"
                }`}
              >
                🚨 Missing
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("theft")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "theft"
                    ? "bg-amber-500 text-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-amber-300/80 hover:text-amber-200 border border-white/[0.06]"
                }`}
              >
                🛡️ Theft
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("found")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "found"
                    ? "bg-emerald-500 text-stone-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-emerald-300/80 hover:text-emerald-200 border border-white/[0.06]"
                }`}
              >
                📦 Found
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("lost")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === "lost"
                    ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-blue-300/80 hover:text-blue-200 border border-white/[0.06]"
                }`}
              >
                🔍 Lost
              </button>
            </div>

            {/* Notification List Scroll Area */}
            <div className="overflow-y-auto max-h-[380px] p-3 space-y-2.5 divide-y divide-white/[0.04]">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Sparkles className="w-6 h-6 text-amber-400" />
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
                      className={`group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                        isRead
                          ? "bg-[#141210]/60 hover:bg-[#1a1612]/90 border-white/[0.05] hover:border-amber-500/30 opacity-75 hover:opacity-100"
                          : "bg-gradient-to-b from-[#1c1712]/95 to-[#15120e]/95 border-amber-500/30 hover:border-amber-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_rgba(216,155,82,0.18)] -translate-y-0.5"
                      }`}
                    >
                      {/* Left Category Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${meta.iconColor}`}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Content Body */}
                      <div className="flex-1 min-w-0">
                        {/* Header Row: Category Badge + Relative Timing + Unread Dot */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${meta.badgeColor}`}
                          >
                            {meta.label}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Relative Arrival Timing Pill */}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 font-semibold font-mono">
                              <Clock size={11} className="text-amber-400 shrink-0" />
                              <span>{item.time || item.timestamp}</span>
                            </span>

                            {!isRead && (
                              <span
                                className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-ping shrink-0"
                                title="Unread"
                              />
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h4
                          className={`text-xs leading-snug line-clamp-1 group-hover:text-amber-200 transition-colors ${
                            isRead
                              ? "font-semibold text-stone-300"
                              : "font-black text-white"
                          }`}
                        >
                          {item.title}
                        </h4>

                        {/* Message Description */}
                        <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-relaxed group-hover:text-stone-300 transition-colors">
                          {item.message}
                        </p>

                        {/* Action Link & Detailed Timing Row */}
                        <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
                          {/* Exact Arrival Timing & Incident Date */}
                          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 truncate max-w-[240px]">
                            <span className="text-stone-300 font-medium truncate">
                              {item.timestamp}
                            </span>
                            {item.incidentDate && (
                              <>
                                <span className="text-stone-600">•</span>
                                <span className="text-amber-400/80 truncate">
                                  {item.incidentDate}
                                </span>
                              </>
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0">
                            <span>View</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="p-3 bg-[#0d0b09] border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/dashboard/search");
                }}
                className="text-stone-400 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
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
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-[#f59e0b] to-[#d89b52] text-stone-950 font-black text-xs hover:brightness-105 transition-all cursor-pointer shadow-md"
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
