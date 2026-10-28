"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  Shield,
  Phone,
  Compass,
  Hash,
  Plus,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { HopestCardSkeleton } from "@/components/HopestLoader";

const TYPES = ["LOST", "FOUND", "THEFT", "MISSING"] as const;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = (searchParams.get("type") || "LOST").toUpperCase();

  const [type, setType] = useState<typeof TYPES[number]>(
    TYPES.includes(initialType as any) ? (initialType as typeof TYPES[number]) : "LOST"
  );
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  useEffect(() => {
    const paramType = (searchParams.get("type") || "LOST").toUpperCase();
    if (TYPES.includes(paramType as any)) {
      setType(paramType as typeof TYPES[number]);
    }
  }, [searchParams]);

  const handleTypeChange = (newType: typeof TYPES[number]) => {
    setType(newType);
    setQuery("");
    router.replace(`/dashboard/search?type=${newType}`);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let url = "";

        switch (type) {
          case "LOST":
            url = "/api/serach/lost";
            break;
          case "FOUND":
            url = "/api/serach/found";
            break;
          case "THEFT":
            url = "/api/serach/theft";
            break;
          case "MISSING":
            url = "/api/missing";
            break;
          default:
            url = "/api/serach/lost";
        }

        const res = await axios.get(url);
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        const filtered = list.filter((item: any) => {
          if (!query.trim()) return true;
          const q = query.toLowerCase();

          const itemName = (
            item.Itemname ||
            item.itemname ||
            item.name ||
            item.missingperson ||
            ""
          ).toLowerCase();

          const place = (
            item.place_of_occurrence ||
            item.lostplace ||
            item.foundplace ||
            item.theftplace ||
            item.missingplace ||
            item.place ||
            ""
          ).toLowerCase();

          const police = (
            item.police_station ||
            item.nearpolicestation ||
            item.Nearpolicestation ||
            item.police ||
            ""
          ).toLowerCase();

          const complainant = (item.complainant || item.Complainant || "").toLowerCase();
          const district = (item.district || item.District || "").toLowerCase();
          const town = (item.town || item.Town || "").toLowerCase();
          const pin = (item.pin || item.Pin || "").toString().toLowerCase();
          const mob = (item.contact_number || item.mob || item.Mob || "").toString().toLowerCase();

          return (
            itemName.includes(q) ||
            place.includes(q) ||
            police.includes(q) ||
            complainant.includes(q) ||
            district.includes(q) ||
            town.includes(q) ||
            pin.includes(q) ||
            mob.includes(q)
          );
        });

        setItems(filtered);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [query, type]);

  const handleCopyPhone = (id: string | number, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const typeConfig = {
    LOST: {
      title: "Lost Property Listings",
      badge: "Lost Property",
      badgeClass: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/60",
      accentBorder: "border-t-[#6b3f23]",
      emptyMessage: "No lost property matches your search.",
    },
    FOUND: {
      title: "Found Belongings Directory",
      badge: "Good Samaritan",
      badgeClass: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/60",
      accentBorder: "border-t-[#5c3a21]",
      emptyMessage: "No found belongings match your search.",
    },
    THEFT: {
      title: "Theft Incident Reports",
      badge: "Security Alert",
      badgeClass: "bg-[#251811] text-[#c49371] border-[#6b3f23]/60",
      accentBorder: "border-t-[#8b5e3c]",
      emptyMessage: "No theft incidents match your search.",
    },
    MISSING: {
      title: "Missing Person Alerts",
      badge: "മിസ്സിംഗ് പേഴ്സൺസ്",
      badgeClass: "bg-[#2b1c14] text-white border-[#7a482b]/60",
      accentBorder: "border-t-[#4a2c17]",
      emptyMessage: "No missing person notices match your search.",
    },
  }[type];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#6b3f23]/30 selection:text-[#2b1f18]">

      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-30 bg-[#080706]/95 backdrop-blur-md border-b border-white/10 text-white py-3 px-3.5 min-[360px]:px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 min-[360px]:gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer shrink-0"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <span className="text-[10px] min-[360px]:text-xs font-mono uppercase tracking-wider min-[360px]:tracking-widest text-[#d4a373] font-medium text-right truncate">
            Hopest Portal • Search Records
          </span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-3.5 min-[360px]:px-4 sm:px-6 py-6 sm:py-10 w-full">

        {/* HERO BANNER WITH CATEGORY SWITCHER */}
        <div className="animated-gradient text-white rounded-2xl min-[360px]:rounded-3xl p-4 min-[360px]:p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            {/* CATEGORY SWITCHER TABS - BALANCED GRID FOR 320PX/360PX */}
            <div className="grid grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:flex sm:flex-wrap items-center mb-4 min-[360px]:mb-5 sm:mb-6">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`w-full sm:w-auto px-1 min-[360px]:px-3 py-1.5 rounded-full text-[10px] min-[360px]:text-xs font-semibold tracking-wider text-center transition-all cursor-pointer ${type === t
                      ? "bg-white text-[#3b2a21] shadow-md font-bold"
                      : "bg-white/10 text-white/80 hover:text-white hover:bg-white/20"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-2 min-[360px]:mb-2.5">
              <span className={`inline-block text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${typeConfig.badgeClass}`}>
                {typeConfig.badge}
              </span>
            </div>

            <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-2 min-[360px]:mb-2.5">
              {typeConfig.title}
            </h1>

            <p className="text-xs min-[360px]:text-sm sm:text-base text-white/85 max-w-2xl font-light leading-relaxed">
              Search real-time community records across Kerala by item title, locality, town, district, or police station.
            </p>
          </div>
        </div>

        {/* SEARCH AND ACTION BAR */}
        <div className="bg-white rounded-2xl min-[360px]:rounded-3xl p-3.5 min-[360px]:p-4 sm:p-6 border border-[#e8dfd6] shadow-[0_8px_30px_-6px_rgba(75,52,37,0.06)] mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">

            {/* SEARCH INPUT */}
            <div className="flex-1 flex items-center gap-3 bg-[#fbf9f6] border border-[#dcd2c6] focus-within:border-[#6b3f23] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#8b5e3c]/20 rounded-2xl px-4 py-3 transition-all">
              <Search size={18} className="text-[#8b5e3c] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${type.toLowerCase()} records (e.g., "wallet", "Aluva", "Ernakulam")...`}
                className="w-full bg-transparent text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-xs transition cursor-pointer shrink-0"
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>

            {/* CREATE SHORTCUT BUTTON */}
            {type !== "MISSING" && (
              <button
                type="button"
                onClick={() => router.push(`/dashboard/create?type=${type}`)}
                className="bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition shrink-0 cursor-pointer"
              >
                <Plus size={16} />
                <span>Report New {type}</span>
              </button>
            )}
          </div>

          {/* SEARCH META ROW */}
          <div className="flex items-center justify-between text-xs text-[#7a6252] mt-4 pt-3 border-t border-[#f0e8e0]">
            <span>
              Showing <strong>{items.length}</strong> {type.toLowerCase()} listing{items.length === 1 ? "" : "s"}
            </span>
            <span className="text-[#8b5e3c] font-medium">
              Sorted by latest submissions
            </span>
          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          /* HOPEST BRANDED SKELETON LOADERS */
          <HopestCardSkeleton count={4} />
        ) : items.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e8dfd6] shadow-sm max-w-xl mx-auto my-6">
            <div className="w-16 h-16 rounded-2xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center mx-auto mb-4">
              <Search size={28} />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2b1f18] mb-2">
              {typeConfig.emptyMessage}
            </h3>

            <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed mb-6">
              {query
                ? `No results found for "${query}". Try searching with a broader keyword, district name, or town.`
                : `Currently no records have been published under this category.`}
            </p>

            {type !== "MISSING" && (
              <button
                type="button"
                onClick={() => router.push(`/dashboard/create?type=${type}`)}
                className="inline-flex items-center gap-2 bg-[#4b3425] hover:bg-[#38261a] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition cursor-pointer shadow-sm"
              >
                <Plus size={15} />
                <span>File a {type} Report Now</span>
              </button>
            )}
          </div>
        ) : (
          /* ACTIVE RESULTS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => {
              const name = item.itemname || item.Itemname || item.name || item.missingperson || "Untitled Item";
              const place = item.place_of_occurrence || item.lostplace || item.foundplace || item.theftplace || item.missingplace || item.place || "Location pending";
              const date = item.date_of_occurrence || item.lostdate || item.founddate || item.theftdate || item.missingdate || item.date || "";
              const police = item.police_station || item.nearpolicestation || item.Nearpolicestation || item.police || "Jurisdiction pending";
              const complainant = item.complainant || item.Complainant || "";
              const district = item.district || item.District || "";
              const town = item.town || item.Town || "";
              const pin = item.pin || item.Pin || "";
              const mob = item.contact_number || item.mob || item.Mob || "";
              const itemImage = item.itemimage || item.Itemimage || "";
              const itemId = item.id || index;

              if (type === "MISSING") {
                const imageSrc =
                  itemImage === "missingperson.jpeg" || itemImage.includes("missingperson")
                    ? "/missingperson.jpeg"
                    : itemImage.startsWith("http")
                      ? itemImage
                      : `http://hopest.in/hopestphp/uploads/${itemImage}`;

                return (
                  <div
                    key={itemId}
                    className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#e5dcd3] shadow-[0_12px_36px_-6px_rgba(75,52,37,0.1)] hover:shadow-[0_20px_45px_-6px_rgba(75,52,37,0.18)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* CARD TITLE - EXACT MALAYALAM BADGE */}
                      <div className="mb-4 text-left">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1f1610] tracking-tight">
                          മിസ്സിംഗ് പേഴ്സൺസ്
                        </h2>
                        <span className="text-[11px] font-medium text-[#7a6252] block -mt-0.5">
                          Verified Public Notice • Kerala Police Jurisdiction
                        </span>
                      </div>

                      {/* PHOTO */}
                      <div className="w-full flex justify-center mb-4">
                        <div className="w-full max-w-[240px] aspect-[4/5] rounded-2xl bg-[#f2ebe3] border border-[#ded3c5] overflow-hidden shadow-inner relative flex items-center justify-center">
                          <img
                            src={imageSrc}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/missingperson.jpeg";
                            }}
                          />
                        </div>
                      </div>

                      {/* NAME */}
                      <div className="text-left mb-2">
                        <h3 className="text-base font-bold text-[#1f1610] tracking-tight">
                          {name}
                        </h3>
                      </div>

                      {/* DIVIDER */}
                      <hr className="border-t border-[#e2d5c7] my-3" />

                      {/* EXACT LABELED SPECIFICATIONS */}
                      <div className="space-y-1.5 text-xs text-[#2c2018] font-normal text-left">
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">District-</span>
                          <span>{district || "Kerala"}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Police Station-</span>
                          <span>{police}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Date of Occurence-</span>
                          <span>{date}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Place of Occurrence-</span>
                          <span>{place}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Name of Complainant-</span>
                          <span>{complainant || "Local Citizen Notice"}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Contact Number -</span>
                          <span className="font-semibold text-[#6b3f23]">{mob || "Contact Police"}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1410] mr-1.5">Missing Person-</span>
                          <span className="font-semibold text-[#1a1410]">{item.missingperson || name}</span>
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="pt-4 mt-4 border-t border-[#ede3d8] flex flex-col gap-2">
                      {mob && (
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`tel:${mob.replace(/[^0-9]/g, "")}`}
                            className="bg-gradient-to-r from-[#3d2314] via-[#5c371e] to-[#3d2314] hover:brightness-110 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                          >
                            <Phone size={13} />
                            <span>Call: {mob}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyPhone(itemId, mob)}
                            className="border border-[#d5c7bc] hover:bg-[#f5eee6] text-[#3b2a21] font-medium py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            {copiedId === itemId ? (
                              <>
                                <Check size={13} className="text-[#6b3f23]" />
                                <span className="text-[#6b3f23] font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Number</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => router.push("/missing")}
                        className="w-full bg-[#4b3425] hover:bg-[#38261a] text-white py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                      >
                        <span>View Missing Persons Page</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={itemId}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(75,52,37,0.12)] hover:border-[#8b5e3c]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border-t-4 ${typeConfig.accentBorder}`}
                >
                  {/* CARD TOP INFO */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3.5">
                        {itemImage && (
                          <div className="w-14 h-14 rounded-2xl bg-[#f4efe9] border border-[#e8dfd6] overflow-hidden shrink-0 shadow-sm">
                            <img
                              src={`http://hopest.in/hopestphp/uploads/${itemImage}`}
                              alt={name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  type === "LOST"
                                    ? "/lostdas.jpeg"
                                    : type === "FOUND"
                                      ? "/founddas.jpeg"
                                      : "/theftdas.jpeg";
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeConfig.badgeClass}`}>
                              {type}
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-[#f4efe9] text-[#6b3f23] border border-[#e8ded3] px-2 py-0.5 rounded-full">
                              ID: #{itemId}
                            </span>
                          </div>
                          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2b1f18] leading-snug">
                            {name}
                          </h2>
                        </div>
                      </div>

                      {date && (
                        <div className="shrink-0 flex items-center gap-1.5 text-xs text-[#7a6252] bg-[#fcfaf7] border border-[#e8ded3] px-2.5 py-1 rounded-xl">
                          <Calendar size={13} className="text-[#8b5e3c]" />
                          <span>{date}</span>
                        </div>
                      )}
                    </div>

                    {/* ONLY REQUESTED FIELDS: PLACE, DATE, POLICE STATION, DISTRICT, ID NUMBER */}
                    <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                      <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                          {type === "LOST" ? "Lost Place" : type === "FOUND" ? "Found Place" : "Incident Place"}
                        </span>
                        <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={place}>
                          <MapPin size={11} className="text-[#8b5e3c] shrink-0" />
                          <span className="truncate">{place}</span>
                        </p>
                      </div>

                      <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                          {type === "LOST" ? "Lost Date" : type === "FOUND" ? "Found Date" : "Incident Date"}
                        </span>
                        <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={date}>
                          <Calendar size={11} className="text-[#8b5e3c] shrink-0" />
                          <span className="truncate">{date || "Not Specified"}</span>
                        </p>
                      </div>

                      <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                          Police Station
                        </span>
                        <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={police}>
                          <Shield size={11} className="text-[#8b5e3c] shrink-0" />
                          <span className="truncate">{police}</span>
                        </p>
                      </div>

                      <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                        <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                          District
                        </span>
                        <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={district}>
                          <Compass size={11} className="text-[#8b5e3c] shrink-0" />
                          <span className="truncate">{district || "Kerala"}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SECURE CARD ACTIONS - CONTACT HOPEST TEAM (NO PERSONAL PHONE NUMBER) */}
                  <div className="pt-4 border-t border-[#f0e8e0]">
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => router.push(`/support?ref=${type.toLowerCase()}&id=${itemId}`)}
                        className="w-full bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                      >
                        <Shield size={14} className="text-[#d4a373]" />
                        <span>Contact Hopest Team to Verify & Claim</span>
                        <ArrowRight size={14} className="text-white/80" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8c7565] mt-0.5 text-center">
                        <Shield size={12} className="text-[#8b5e3c] shrink-0" />
                        <span>Protected by Hopest: Citizen contact numbers remain strictly confidential.</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
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
              Dashboard Home
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Community Guidelines
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