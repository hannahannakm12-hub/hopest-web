"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  MapPin,
  CalendarDays,
  Phone,
  Building2,
  Landmark,
  Compass,
  Hash,
  AlertTriangle,
  Share2,
  Copy,
  Check,
  Shield,
  MessageCircle,
  ExternalLink,
  Users,
  Plus,
} from "lucide-react";
import { HopestMissingCardSkeleton } from "@/components/HopestLoader";

export default function MissingPage() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [sharedId, setSharedId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchMissing = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/missing");
        const data = await response.json();
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setItems(list);
      } catch (error) {
        console.error("Error fetching missing persons:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMissing();
  }, []);

  const filteredItems = items.filter((item: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (item.itemname || item.Itemname || item.name || "").toLowerCase();
    const district = (item.district || item.District || "").toLowerCase();
    const place = (item.lostplace || item.missingplace || item.place || "").toLowerCase();
    const town = (item.town || item.Town || "").toLowerCase();
    const police = (item.nearpolicestation || item.Nearpolicestation || item.police || "").toLowerCase();
    const pin = (item.pin || item.Pin || "").toString().toLowerCase();
    const mob = (item.mob || item.Mob || "").toString().toLowerCase();

    return (
      name.includes(q) ||
      district.includes(q) ||
      place.includes(q) ||
      town.includes(q) ||
      police.includes(q) ||
      pin.includes(q) ||
      mob.includes(q)
    );
  });

  const handleCopyPhone = (id: string | number, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (id: string | number, name: string) => {
    const text = `Urgent Missing Person Appeal for ${name}. Please help locate or share with community groups: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hopest Alert: Missing Person - ${name}`,
          text,
          url: window.location.href,
        });
      } catch {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(text);
      setSharedId(id);
      setTimeout(() => setSharedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between">

      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#080706]/95 backdrop-blur-md border-b border-white/10 text-white py-3.5 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/create?type=MISSING")}
              className="bg-[#2b1b11] hover:bg-[#3a2417] text-[#d4a373] border border-[#6b3f23]/50 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Plus size={14} />
              <span>Report Missing Person</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full">

        {/* HERO BANNER */}
        <section className="animated-gradient text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            {/* Live alert pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2b1c14] border border-[#7a482b]/60 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping mr-0.5"></span>
              <span>Verified Public Broadcast</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Missing Persons Directory
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed font-light">
              Official community appeals to assist families and local law enforcement in locating missing individuals across Kerala. If you recognize anyone, please immediately contact the coordinates provided below.
            </p>

            {/* LIVE SEARCH BAR (CONNECTED TO STATE) */}
            <div className="mt-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 focus-within:border-white focus-within:bg-white/15 rounded-2xl px-4 py-3 text-white transition-all">
              <Search size={18} className="text-[#d4a373] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, district, place, or police station..."
                className="w-full bg-transparent text-sm text-white placeholder-white/60 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs transition cursor-pointer shrink-0"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* RESULTS META */}
            <div className="flex items-center justify-between text-xs text-[#d4a373] mt-3 pt-2">
              <span>
                Showing <strong>{filteredItems.length}</strong> verified alert{filteredItems.length === 1 ? "" : "s"}
              </span>
              <span>Kerala & Regional Network</span>
            </div>
          </div>
        </section>

        {/* POLICE ADVISORY NOTICE */}
        <div className="bg-[#fcfaf7] border border-[#e8ded3] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm flex items-start gap-3.5 text-xs text-[#7a6252]">
          <Shield size={20} className="text-[#8b5e3c] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Official Humanitarian Notice:</strong> All appeals are documented based on verified police complaints and public emergency notices. If you possess any lead regarding a missing person, please contact the provided reporter number or notify your nearest local police station directly.
          </p>
        </div>

        {/* CONTENT LIST */}
        {loading ? (
          /* HOPEST BRANDED MISSING NOTICE SKELETONS */
          <HopestMissingCardSkeleton count={2} />
        ) : filteredItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e8dfd6] shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Search size={28} />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2b1f18] mb-2">
              No Missing Person Notices Found
            </h3>

            <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed mb-6">
              {searchQuery
                ? `No alerts matched your search query "${searchQuery}". Please check spelling or try a different locality.`
                : `Currently no active missing person alerts are listed.`}
            </p>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 rounded-xl bg-[#4b3425] hover:bg-[#38261a] text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                Reset Search
              </button>
            )}
          </div>
        ) : (
          /* ACTIVE LISTINGS */
          <div className="space-y-8">
            {filteredItems.map((item: any, index: number) => {
              const name = item.itemname || item.Itemname || "Unidentified Person";
              const place = item.lostplace || item.missingplace || item.place || "Location pending verification";
              const date = item.lostdate || item.missingdate || item.date || "Date pending verification";
              const police = item.nearpolicestation || item.Nearpolicestation || item.police || "Local Police Station";
              const district = item.district || item.District || "Kerala";
              const town = item.town || item.Town || "Kerala";
              const pin = item.pin || item.Pin || "Kerala";
              const mob = item.mob || item.Mob || "";
              const itemImage = item.itemimage || item.Itemimage || "";
              const itemId = item.id || index;

              return (
                <article
                  key={itemId}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd6] shadow-[0_4px_24px_-6px_rgba(75,52,37,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(75,52,37,0.12)] border-t-[6px] border-t-[#6b3f23] transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">

                    {/* PHOTO AREA WITH PROVEN FALLBACK */}
                    <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
                      <div className="w-full h-72 sm:h-80 md:h-72 rounded-2xl bg-[#f7f2ed] border border-[#e5d6c5] overflow-hidden shadow-inner relative flex items-center justify-center">
                        <img
                          src={
                            itemImage
                              ? `http://hopest.in/hopestphp/uploads/${itemImage}`
                              : "/missingperson.jpeg"
                          }
                          alt={name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/missingperson.jpeg";
                          }}
                        />

                        {/* Top tag badge on photo */}
                        <div className="absolute top-3 left-3 bg-[#2b1c14] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#7a482b]/60 shadow-md">
                          MISSING ALERT
                        </div>
                      </div>

                      <span className="text-[11px] text-[#8c7565] mt-2 text-center">
                        Verified Community Notice #{itemId}
                      </span>
                    </div>

                    {/* DETAILS AREA */}
                    <div className="flex-1 w-full">

                      {/* HEADER ROW */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#f0e7de]">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2b1c14] text-white border border-[#7a482b]/50 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]"></span>
                            <span>Urgent Broadcast</span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b1f18] tracking-tight">
                            {name}
                          </h2>
                        </div>

                        {/* SHARE BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleShare(itemId, name)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#d5c7bc] hover:bg-[#f7f2ed] text-[#3b2a21] text-xs font-semibold transition cursor-pointer shadow-xs"
                          title="Share notice"
                        >
                          {sharedId === itemId ? (
                            <>
                              <Check size={14} className="text-[#6b3f23]" />
                              <span className="text-[#6b3f23]">Link Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 size={14} />
                              <span>Share Alert</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* QUICK METADATA */}
                      <div className="flex flex-wrap items-center gap-4 my-3 text-xs text-[#6e584a]">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-[#8b5e3c]" />
                          <span>Last seen: <strong>{place}</strong></span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} className="text-[#8b5e3c]" />
                          <span>Reported date: <strong>{date}</strong></span>
                        </span>
                      </div>

                      {/* STRUCTURED INFORMATION CARDS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">

                        <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-2xl p-3.5 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center shrink-0">
                            <Building2 size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block">
                              District & Town
                            </span>
                            <p className="font-semibold text-sm text-[#2b1f18] truncate mt-0.5" title={`${district}, ${town}`}>
                              {district || town ? `${district} • ${town}` : "Kerala"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-2xl p-3.5 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center shrink-0">
                            <Landmark size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block">
                              Nearest Police Station
                            </span>
                            <p className="font-semibold text-sm text-[#2b1f18] truncate mt-0.5" title={police}>
                              {police}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-2xl p-3.5 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center shrink-0">
                            <MapPin size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block">
                              Place of Occurrence
                            </span>
                            <p className="font-semibold text-sm text-[#2b1f18] truncate mt-0.5" title={place}>
                              {place}
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-2xl p-3.5 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center shrink-0">
                            <Hash size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block">
                              Postal PIN Code
                            </span>
                            <p className="font-semibold text-sm text-[#2b1f18] truncate mt-0.5">
                              {pin || "Kerala"}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="pt-2">
                        {mob ? (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <a
                              href={`tel:${mob}`}
                              className="bg-gradient-to-r from-[#4b3425] to-[#6b3f23] hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                            >
                              <Phone size={15} />
                              <span>Call: +91 {mob}</span>
                            </a>

                            <a
                              href={`https://wa.me/91${mob}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-[#3d2314] via-[#6d3f22] to-[#3d2314] hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition border border-[#8b5e3c]/40"
                            >
                              <MessageCircle size={15} />
                              <span>WhatsApp</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => handleCopyPhone(itemId, mob)}
                              className="border border-[#d5c7bc] hover:bg-[#f7f2ed] text-[#3b2a21] font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                            >
                              {copiedId === itemId ? (
                                <>
                                  <Check size={15} className="text-[#6b3f23]" />
                                  <span className="text-[#6b3f23]">Phone Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={15} />
                                  <span>Copy Number</span>
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-[#fcfaf7] border border-[#e8ded3] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
                            <span>Contact number pending. Please contact nearest police station or Hopest team.</span>
                            <button
                              type="button"
                              onClick={() => router.push("/about")}
                              className="px-4 py-2 rounded-lg bg-[#4b3425] text-white font-medium hover:bg-[#38261a] transition shrink-0 cursor-pointer"
                            >
                              Contact Support
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2b1f18]">HOPEST</span>
            <span>– Hope for the best</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Guidelines
            </button>
            <button
              type="button"
              onClick={() => router.push("/privacy")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}