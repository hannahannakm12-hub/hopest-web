"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  MapPin,
  MessageCircle,
  Smartphone,
  Wifi,
  Battery,
  ChevronRight,
  ExternalLink,
  Download,
  X,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";

interface FeedItem {
  id: string | number;
  category: string;
  type: string;
  title: string;
  place: string;
  time: string;
  badgeStyle: string;
  borderHover: string;
  link: string;
}

export default function MobileAppSection() {
  const router = useRouter();

  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<"google_play" | "app_store" | null>(null);

  useEffect(() => {
    const fetchDynamicFeed = async () => {
      setLoading(true);
      try {
        const [lostRes, foundRes, theftRes, missingRes] = await Promise.allSettled([
          fetch("/api/serach/lost").then((r) => r.json()),
          fetch("/api/serach/found").then((r) => r.json()),
          fetch("/api/serach/theft").then((r) => r.json()),
          fetch("/api/missing").then((r) => r.json()),
        ]);

        const items: FeedItem[] = [];

        // 1. Lost Item
        if (lostRes.status === "fulfilled" && Array.isArray(lostRes.value) && lostRes.value.length > 0) {
          const l = lostRes.value[0];
          items.push({
            id: l.id || "lost-0",
            category: "Lost",
            type: "LOST",
            title: l.itemname || l.Itemname || "Lost Property",
            place: l.lostplace || l.district || l.town || "Kerala",
            time: l.lostdate ? `Reported: ${l.lostdate}` : "Live Feed",
            badgeStyle: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            borderHover: "hover:border-blue-400/40",
            link: "/dashboard/search?type=LOST",
          });
        }

        // 2. Found Item
        if (foundRes.status === "fulfilled" && Array.isArray(foundRes.value) && foundRes.value.length > 0) {
          const f = foundRes.value[0];
          items.push({
            id: f.id || "found-0",
            category: "Found",
            type: "FOUND",
            title: f.itemname || f.Itemname || "Found Belonging",
            place: f.foundplace || f.district || f.town || "Kerala",
            time: f.founddate ? `Reported: ${f.founddate}` : "Live Feed",
            badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            borderHover: "hover:border-emerald-400/40",
            link: "/dashboard/search?type=FOUND",
          });
        }

        // 3. Theft Item
        if (theftRes.status === "fulfilled" && Array.isArray(theftRes.value) && theftRes.value.length > 0) {
          const t = theftRes.value[0];
          items.push({
            id: t.id || "theft-0",
            category: "Theft alert",
            type: "THEFT",
            title: t.itemname || t.Itemname || "Stolen Property",
            place: t.theftplace || t.district || t.town || "Kerala",
            time: t.theftdate ? `Reported: ${t.theftdate}` : "Live Feed",
            badgeStyle: "text-rose-400 bg-rose-500/10 border-rose-500/20",
            borderHover: "hover:border-rose-400/40",
            link: "/dashboard/search?type=THEFT",
          });
        }

        // 4. Missing Item
        if (missingRes.status === "fulfilled") {
          const mList = Array.isArray(missingRes.value)
            ? missingRes.value
            : Array.isArray(missingRes.value?.data)
            ? missingRes.value.data
            : [];
          if (mList.length > 0) {
            const m = mList[0];
            items.push({
              id: m.id || "missing-0",
              category: "Missing",
              type: "MISSING",
              title: m.itemname || m.Itemname || "Missing Person Appeal",
              place: m.lostplace || m.district || m.town || "Kerala",
              time: m.lostdate ? `Reported: ${m.lostdate}` : "Urgent Alert",
              badgeStyle: "text-red-400 bg-red-500/10 border-red-500/20",
              borderHover: "hover:border-red-400/40",
              link: "/missing",
            });
          }
        }

        // Fallback fill if less than 4
        if (items.length < 4 && lostRes.status === "fulfilled" && Array.isArray(lostRes.value)) {
          for (let i = 1; i < lostRes.value.length && items.length < 4; i++) {
            const extra = lostRes.value[i];
            items.push({
              id: extra.id || `lost-${i}`,
              category: "Lost",
              type: "LOST",
              title: extra.itemname || "Lost Property",
              place: extra.lostplace || extra.district || "Kerala",
              time: extra.lostdate ? `Reported: ${extra.lostdate}` : "Live Feed",
              badgeStyle: "text-blue-400 bg-blue-500/10 border-blue-500/20",
              borderHover: "hover:border-blue-400/40",
              link: "/dashboard/search?type=LOST",
            });
          }
        }

        setFeedItems(items);
      } catch (err) {
        console.error("Error loading mobile feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicFeed();
  }, []);

  return (
    <section
      id="mobile-app"
      className="relative overflow-hidden bg-[#0c0a09] text-white py-24 lg:py-28 border-t border-white/[0.06]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-amber-500/[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-amber-700/[0.04] blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ================================================= */}
          {/* LEFT SIDE: COPY & FEATURES */}
          {/* ================================================= */}
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3b437]/10 border border-[#e3b437]/20 mb-4">
              <span className="text-[#e3b437] text-xs font-semibold uppercase tracking-wider">
                Mobile App
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Carry Hopest
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-[#e5a95d] to-[#d89b52] bg-clip-text text-transparent">
                in your pocket
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-stone-300">
              Stay connected to real-time lost, found, missing, and theft reports wherever
              you go. Keep up with verified community incidents in your pocket.
            </p>

            {/* Features List */}
            <div className="mt-8 space-y-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Bell className="w-4 h-4" />
                </div>
                <p className="text-sm sm:text-base font-medium text-stone-200">
                  Stay updated with reports that matter to you
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-sm sm:text-base font-medium text-stone-200">
                  Discover reports from your local area across Kerala
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <p className="text-sm sm:text-base font-medium text-stone-200">
                  Connect with the community directly through Call and WhatsApp
                </p>
              </div>
            </div>

            {/* App Download Buttons (Direct Store Links) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {/* App Store Button */}
              <a
                href="https://apps.apple.com/search?term=hopest"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d89b52] to-[#e3b437] text-stone-950 font-bold text-sm shadow-[0_0_20px_rgba(227,180,55,0.25)] hover:shadow-[0_0_30px_rgba(227,180,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                title="Download from Apple App Store"
              >
                <Smartphone className="w-5 h-5 text-stone-950" />
                <span>App Store</span>
              </a>

              {/* Google Play Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.hopestogapp.hopestog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl border border-white/20 bg-stone-900/40 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-300 cursor-pointer"
                title="Install from Google Play Store"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M3 2.5v19l11-9.5L3 2.5Z" />
                  <path d="m14 8.5 3-2.6 3.5 2c.7.4.7 1.4 0 1.8l-3.5 2L14 8.5Z" />
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE: DYNAMIC PHONE MOCKUP */}
          {/* ================================================= */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[310px] sm:w-[350px] rounded-[44px] border-4 border-stone-800 bg-[#161412] p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
              {/* Soft Outer Ambient Glow */}
              <div className="absolute -inset-4 -z-10 rounded-[50px] bg-amber-500/10 blur-2xl" />

              {/* Phone Bezel / Screen */}
              <div className="rounded-[36px] border border-white/10 bg-[#0d0c0b] overflow-hidden min-h-[520px] flex flex-col justify-between">
                
                {/* Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>9:41</span>
                  {/* Dynamic Island / Notch */}
                  <div className="w-20 h-4 bg-stone-950 rounded-full border border-white/10 mx-auto" />
                  <div className="flex items-center gap-1.5">
                    <Wifi size={12} />
                    <Battery size={13} />
                  </div>
                </div>

                {/* Phone Header with Hopest Logo */}
                <div className="px-5 pt-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1c1a16] border border-amber-500/30 flex items-center justify-center p-1">
                        <Image
                          src="/logo.png.jpeg"
                          alt="Hopest"
                          width={20}
                          height={20}
                          className="object-contain rounded"
                        />
                      </div>
                      <div>
                        <span className="text-sm font-bold tracking-wider text-[#e4b63b]">
                          HOPEST
                        </span>
                        <p className="text-[9px] text-stone-400 uppercase tracking-widest font-medium -mt-0.5">
                          Live Feed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase">Online</span>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC REPORTS FEED */}
                <div className="p-4 space-y-2.5 flex-1 overflow-hidden">
                  {loading ? (
                    /* SKELETON FEED */
                    <div className="space-y-2.5">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="rounded-xl border border-white/[0.06] bg-stone-900/50 p-3.5 space-y-2 animate-pulse"
                        >
                          <div className="flex justify-between">
                            <div className="w-12 h-3.5 bg-stone-800 rounded-md"></div>
                            <div className="w-16 h-3 bg-stone-800 rounded-md"></div>
                          </div>
                          <div className="w-3/4 h-4 bg-stone-700 rounded-md"></div>
                          <div className="w-1/2 h-3 bg-stone-800 rounded-md"></div>
                        </div>
                      ))}
                    </div>
                  ) : feedItems.length === 0 ? (
                    <div className="text-center py-10 px-4 text-xs text-stone-400">
                      <span>No active listings available.</span>
                    </div>
                  ) : (
                    feedItems.map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        onClick={() => router.push(item.link)}
                        className={`rounded-xl border border-white/[0.08] ${item.borderHover} bg-stone-900/70 p-3.5 transition-all duration-200 cursor-pointer group hover:bg-stone-900/90`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeStyle}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono truncate max-w-[120px]">
                            {item.time}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-white truncate capitalize group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </p>

                        <div className="flex items-center justify-between mt-1.5 text-[11px] text-[#e3b437]">
                          <span className="flex items-center gap-1 text-stone-400 text-[10px] truncate max-w-[170px]">
                            <MapPin size={10} className="text-amber-400 shrink-0" />
                            <span className="truncate">{item.place}</span>
                          </span>
                          <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                            <span>View</span>
                            <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-white/[0.08] px-6 py-3 flex justify-around text-xs font-medium text-stone-400 bg-stone-950/80">
                  <button
                    type="button"
                    onClick={() => router.push("/landing")}
                    className="text-[#e3b437] font-semibold hover:opacity-90 transition cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard/search")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Reports
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Dashboard
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===================================================== */}
      {/* APP DOWNLOAD MODAL (GOOGLE PLAY / APP STORE) */}
      {/* ===================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#181614] border border-amber-500/30 text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              title="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                {activeModal === "google_play" ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 2.5v19l11-9.5L3 2.5Z" />
                    <path d="m14 8.5 3-2.6 3.5 2c.7.4.7 1.4 0 1.8l-3.5 2L14 8.5Z" />
                  </svg>
                ) : (
                  <Smartphone size={24} />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  Hopest Mobile Experience
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {activeModal === "google_play" ? "Get Hopest on Google Play" : "Get Hopest on App Store"}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              {activeModal === "google_play"
                ? "Access instant community notifications for lost valuables, found items, theft investigations, and emergency missing person broadcasts on Android."
                : "Install Hopest for iOS to report incidents on the go and receive urgent missing person broadcasts directly on your iPhone or iPad."}
            </p>

            {/* ACTION OPTIONS */}
            <div className="space-y-3">
              {/* Option 1: Official Store Link */}
              <a
                href={
                  activeModal === "google_play"
                    ? "https://play.google.com/store/apps/details?id=com.hopestogapp.hopestog"
                    : "https://apps.apple.com/search?term=hopest"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#d89b52] to-[#e3b437] hover:brightness-110 text-stone-950 font-bold py-3.5 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>
                  {activeModal === "google_play" ? "Open Google Play Store" : "Open Apple App Store"}
                </span>
                <ExternalLink size={15} />
              </a>

              {/* Option 2: Direct WhatsApp APK / Support Desk */}
              <a
                href={`https://wa.me/918590168840?text=${encodeURIComponent(
                  `Hello Hopest team! I would like to download the Hopest ${
                    activeModal === "google_play" ? "Android App (APK)" : "iOS App"
                  }. Please share the direct download link.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-stone-200 font-semibold py-3 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>
                  {activeModal === "google_play" ? "Request Direct Android APK via WhatsApp" : "Contact iOS Helpdesk on WhatsApp"}
                </span>
              </a>

              {/* Option 3: Launch Web App (PWA) */}
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  router.push("/dashboard");
                }}
                className="w-full bg-stone-900/60 hover:bg-stone-800 border border-white/[0.08] text-stone-400 hover:text-white py-3 px-5 rounded-2xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={14} className="text-amber-400" />
                <span>Launch Mobile Web App Now (No Install Needed)</span>
              </button>
            </div>

            {/* iOS PWA Tip if on iOS */}
            {activeModal === "app_store" && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
                <Share2 size={14} className="shrink-0 mt-0.5 text-amber-400" />
                <span>
                  <strong>Tip for iPhone Users:</strong> In Safari, tap the <strong>Share</strong> button and choose <strong>&quot;Add to Home Screen&quot;</strong> to install the full mobile app instantly.
                </span>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}