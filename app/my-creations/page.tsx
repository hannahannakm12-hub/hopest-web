"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Shield,
  Compass,
  Hash,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  LogIn,
  Filter,
} from "lucide-react";
import { HopestCardSkeleton, HopestSpinner } from "@/components/HopestLoader";

const CATEGORIES = ["ALL", "LOST", "FOUND", "THEFT"] as const;

export default function MyCreationsPage() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ id: number; type: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [hasUser, setHasUser] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setHasUser(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(stored);
      if (!user || !user.id) {
        setHasUser(false);
        setLoading(false);
        return;
      }

      setHasUser(true);
      const res = await axios.post("/api/mycreation", {
        uid: user.id,
      });

      const list = Array.isArray(res.data) ? res.data : [];
      setItems(list);
    } catch (err) {
      console.error("Error fetching creations:", err);
      setNotification({
        type: "error",
        message: "Unable to load your creations. Please refresh or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);

    try {
      const res = await axios.post("/api/delete", {
        itemId: deleteModal.id,
        type: deleteModal.type,
      });

      if (res.data?.message === "success") {
        setItems((prev) => prev.filter((item) => item.id !== deleteModal.id));
        setNotification({
          type: "success",
          message: `"${deleteModal.title}" has been deleted successfully.`,
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to delete the item. Please try again.",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setNotification({
        type: "error",
        message: "Server error occurred while attempting to delete.",
      });
    } finally {
      setDeleting(false);
      setDeleteModal(null);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const filteredItems = items.filter((item) => {
    const itemType = (item.type || "").toUpperCase();
    if (selectedCategory !== "ALL" && itemType !== selectedCategory) {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();

    const name = (item.itemname || item.Itemname || "").toLowerCase();
    const place = (
      item.lostplace ||
      item.foundplace ||
      item.theftplace ||
      item.missingplace ||
      ""
    ).toLowerCase();
    const district = (item.district || "").toLowerCase();
    const town = (item.town || "").toLowerCase();
    const police = (item.nearpolicestation || "").toLowerCase();

    return (
      name.includes(q) ||
      place.includes(q) ||
      district.includes(q) ||
      town.includes(q) ||
      police.includes(q)
    );
  });

  const getTypeStyle = (type: string) => {
    switch (type?.toUpperCase()) {
      case "LOST":
        return {
          badge: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/60",
          border: "border-t-[#6b3f23]",
          fallback: "/lostdas.jpeg",
        };
      case "FOUND":
        return {
          badge: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/60",
          border: "border-t-[#5c3a21]",
          fallback: "/founddas.jpeg",
        };
      case "THEFT":
        return {
          badge: "bg-[#251811] text-[#c49371] border-[#6b3f23]/60",
          border: "border-t-[#8b5e3c]",
          fallback: "/theftdas.jpeg",
        };
      default:
        return {
          badge: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/40",
          border: "border-t-[#6b3f23]",
          fallback: "/lostdas.jpeg",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#6b3f23]/30 selection:text-[#2b1f18]">

      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#080706]/95 backdrop-blur-md border-b border-white/10 text-white py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              onClick={() => router.push("/dashboard/create?type=LOST")}
              className="bg-[#2b1b11] hover:bg-[#3a2417] text-[#d4a373] border border-[#6b3f23]/50 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>Create New Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 max-w-md animate-fade-in">
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm ${notification.type === "success"
                ? "bg-[#2b1b11] border-[#6b3f23]/60 text-white"
                : "bg-[#21150e] border-[#6b3f23]/60 text-stone-200"
              }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={18} className="text-[#d4a373] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-[#c49371] shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-white">
                {notification.type === "success" ? "Success" : "Notice"}
              </p>
              <p className="text-xs mt-0.5 text-stone-300">{notification.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-stone-400 hover:text-white text-xs cursor-pointer font-bold ml-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full">

        {/* HERO BANNER */}
        <section className="animated-gradient text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#d4a373] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} className="text-[#d4a373]" />
              <span>Member Account Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              My Published Creations
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed font-light">
              Review, filter, and manage all your active incident notices and community reports published on Hopest.
            </p>

            {/* STATS STRIP */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                <span className="text-white/70 block text-[11px]">Total Submissions</span>
                <strong className="text-lg text-white font-serif">{items.length}</strong>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                <span className="text-white/70 block text-[11px]">Active in Community</span>
                <strong className="text-lg text-[#d4a373] font-serif">
                  {items.filter((i) => i.id !== undefined).length}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* NOT LOGGED IN STATE */}
        {!hasUser && !loading && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#e8dfd6] shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center mx-auto mb-4 shadow-inner">
              <LogIn size={28} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2b1f18] mb-2">
              Sign In Required
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed mb-6">
              You must be logged in to view and manage your posted items on Hopest.
            </p>
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="px-6 py-3 rounded-xl bg-[#4b3425] hover:bg-[#38261a] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* CONTROLS BAR (SEARCH + CATEGORY FILTER) */}
        {hasUser && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#e8dfd6] shadow-[0_8px_30px_-6px_rgba(75,52,37,0.06)] mb-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

              {/* CATEGORY TABS */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${selectedCategory === cat
                        ? "bg-[#4b3425] text-white shadow-sm"
                        : "bg-[#f7f3ee] hover:bg-[#ede5dc] text-[#634e40]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* SEARCH INPUT */}
              <div className="flex-1 md:max-w-md flex items-center gap-2.5 bg-[#fbf9f6] border border-[#dcd2c6] focus-within:border-[#6b3f23] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#8b5e3c]/20 rounded-xl px-3.5 py-2.5 transition-all">
                <Search size={16} className="text-[#8b5e3c] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter creations by title, location, or police station..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-[10px] transition cursor-pointer shrink-0"
                    title="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>

            </div>

            {/* RESULTS COUNT */}
            <div className="flex items-center justify-between text-xs text-[#7a6252] mt-4 pt-3 border-t border-[#f0e8e0]">
              <span>
                Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> total submissions
              </span>
              <span className="text-[#8b5e3c] font-medium">
                {selectedCategory === "ALL" ? "All Categories" : `${selectedCategory} category`}
              </span>
            </div>
          </div>
        )}

        {/* LISTINGS GRID */}
        {hasUser && (
          <>
            {loading ? (
              /* HOPEST BRANDED SKELETON LOADERS */
              <HopestCardSkeleton count={4} />
            ) : filteredItems.length === 0 ? (
              /* EMPTY STATE */
              <div className="bg-white rounded-3xl p-12 text-center border border-[#e8dfd6] shadow-sm max-w-lg mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-[#f4efe9] text-[#6b3f23] flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2b1f18] mb-2">
                  No Creations Found
                </h3>
                <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed mb-6">
                  {searchQuery
                    ? `No listings matched your filter "${searchQuery}". Try a different keyword.`
                    : selectedCategory !== "ALL"
                      ? `You haven't posted any items under "${selectedCategory}" yet.`
                      : "You haven't published any lost, found, or theft listings yet."}
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/create?type=LOST")}
                  className="inline-flex items-center gap-2 bg-[#4b3425] hover:bg-[#38261a] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition cursor-pointer shadow-sm"
                >
                  <Plus size={15} />
                  <span>Publish Your First Report</span>
                </button>
              </div>
            ) : (
              /* ACTIVE ITEMS */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => {
                  const style = getTypeStyle(item.type);
                  const name = item.itemname || item.Itemname || "Untitled Item";
                  const place =
                    item.lostplace ||
                    item.foundplace ||
                    item.theftplace ||
                    item.missingplace ||
                    "Location pending";
                  const date =
                    item.lostdate ||
                    item.founddate ||
                    item.theftdate ||
                    item.missingdate ||
                    "";
                  const police =
                    item.nearpolicestation ||
                    item.Nearpolicestation ||
                    "Jurisdiction pending";
                  const district = item.district || "";
                  const town = item.town || "";
                  const pin = item.pin || "";
                  const itemImage = item.itemimage || "";
                  const itemId = item.id || index;

                  return (
                    <article
                      key={`${item.type}-${itemId}`}
                      className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#e8dfd6] shadow-[0_4px_20px_-4px_rgba(75,52,37,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(75,52,37,0.12)] transition-all duration-300 flex flex-col justify-between border-t-4 ${style.border}`}
                    >
                      {/* CARD HEADER */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-start gap-3.5">
                            {itemImage ? (
                              <div className="w-14 h-14 rounded-2xl bg-[#f4efe9] border border-[#e8dfd6] overflow-hidden shrink-0 shadow-sm">
                                <img
                                  src={`http://hopest.in/hopestphp/uploads/${itemImage}`}
                                  alt={name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = style.fallback;
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-2xl bg-[#f4efe9] border border-[#e8dfd6] overflow-hidden shrink-0 shadow-sm">
                                <img
                                  src={style.fallback}
                                  alt={name}
                                  className="w-full h-full object-cover opacity-80"
                                />
                              </div>
                            )}

                            <div>
                              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${style.badge}`}>
                                {item.type}
                              </span>
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

                        {/* SPEC GRID */}
                        <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                          <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                              Place
                            </span>
                            <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={place}>
                              <MapPin size={11} className="text-[#8b5e3c] shrink-0" />
                              <span className="truncate">{place}</span>
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
                              District & Town
                            </span>
                            <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1" title={`${district}, ${town}`}>
                              <Compass size={11} className="text-[#8b5e3c] shrink-0" />
                              <span className="truncate">{district || town ? `${district} • ${town}` : "Kerala"}</span>
                            </p>
                          </div>

                          <div className="bg-[#fcfaf7] border border-[#ede5db] rounded-xl p-2.5">
                            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block mb-0.5">
                              PIN Code
                            </span>
                            <p className="font-semibold text-[#2b1f18] truncate flex items-center gap-1">
                              <Hash size={11} className="text-[#8b5e3c] shrink-0" />
                              <span>{pin || "Kerala"}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CARD FOOTER WITH SECURE DELETE */}
                      <div className="pt-4 border-t border-[#f0e8e0] flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => router.push(`/dashboard/search?type=${item.type}`)}
                          className="text-xs font-semibold text-[#8b5e3c] hover:text-[#4b3425] hover:underline transition cursor-pointer"
                        >
                          View in {item.type} Directory →
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModal({
                              id: item.id,
                              type: item.type,
                              title: name,
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#8b5e3c] bg-[#2b1b11]/5 hover:bg-[#2b1b11]/15 border border-[#6b3f23]/30 transition cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete Report</span>
                        </button>
                      </div>

                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

      </main>

      {/* CONFIRM DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#e8dfd6] animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-[#2b1b11] text-[#d4a373] flex items-center justify-center mb-4 border border-[#6b3f23]/40">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#2b1f18] mb-2">
              Confirm Delete Listing?
            </h3>

            <p className="text-xs sm:text-sm text-[#7a6252] leading-relaxed mb-6">
              Are you sure you want to delete <strong>&quot;{deleteModal.title}&quot;</strong> ({deleteModal.type})? This will permanently remove it from public search records.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#d5c7bc] text-[#3b2a21] hover:bg-[#f7f2ed] text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-[#4a2c17] hover:bg-[#341d14] text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm border border-[#6b3f23]/50"
              >
                {deleting ? (
                  <>
                    <HopestSpinner size="xs" variant="light" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={() => router.push("/about")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Support
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