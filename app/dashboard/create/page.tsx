"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Tag,
  MapPin,
  Calendar,
  Shield,
  Phone,
  Building,
  Compass,
  Hash,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HopestSpinner } from "@/components/HopestLoader";
import HopestDatePicker from "@/components/HopestDatePicker";

const TYPES = ["LOST", "FOUND", "THEFT", "MISSING"] as const;

export default function CreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = (searchParams.get("type") || "LOST").toUpperCase();

  const [type, setType] = useState<typeof TYPES[number]>(
    TYPES.includes(initialType as any) ? (initialType as typeof TYPES[number]) : "LOST"
  );
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const paramType = (searchParams.get("type") || "LOST").toUpperCase();
    if (TYPES.includes(paramType as any)) {
      setType(paramType as typeof TYPES[number]);
    }
  }, [searchParams]);

  const handleTypeChange = (newType: typeof TYPES[number]) => {
    setType(newType);
    setErrors({});
    router.replace(`/dashboard/create?type=${newType}`);
  };

  const [form, setForm] = useState({
    name: "",
    place: "",
    date: "",
    police: "",
    mob: "",
    town: "",
    district: "",
    pin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Item name is required";
    if (!form.place.trim()) newErrors.place = "Place is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.police.trim()) {
      newErrors.police = "Nearest Police Station is required";
    }

    if (!form.mob) {
      newErrors.mob = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mob.trim())) {
      newErrors.mob = "Enter valid 10-digit mobile number";
    }

    if (!form.pin) {
      newErrors.pin = "Pin code is required";
    } else if (!/^[0-9]{6}$/.test(form.pin.trim())) {
      newErrors.pin = "Please enter 6-digit pin code";
    }

    if (!form.town.trim()) newErrors.town = "Town is required";
    if (!form.district.trim()) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "MISSING") {
      alert("Missing records can only be created by Admin/Police authority.");
      return;
    }

    if (!validate()) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      alert("Please login again.");
      router.push("/auth/login");
      return;
    }

    setSubmitting(true);

    let api = "";
    const body: any = {
      Uid: user.id,
      Itemname: form.name.trim(),
      Nearpolicestation: form.police.trim(),
      Mob: form.mob.trim(),
      Town: form.town.trim(),
      District: form.district.trim(),
      Pin: form.pin.trim(),
    };

    switch (type) {
      case "LOST":
        api = "/api/create/lost";
        body.Lostplace = form.place.trim();
        body.Lostdate = form.date;
        break;

      case "FOUND":
        api = "/api/create/found";
        body.Foundplace = form.place.trim();
        body.Founddate = form.date;
        break;

      case "THEFT":
        api = "/api/create/theft";
        body.Theftplace = form.place.trim();
        body.Theftdate = form.date;
        break;
    }

    try {
      const res = await axios.post(api, body);

      if (
        res.data.message === "success" ||
        res.data.status === "success" ||
        res.data.success === true
      ) {
        alert(`${type} report submitted successfully.`);
        setForm({
          name: "",
          place: "",
          date: "",
          police: "",
          mob: "",
          town: "",
          district: "",
          pin: "",
        });
        router.push("/dashboard");
      } else {
        alert(res.data.message || "Unable to create record.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Server Error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const typeConfig = {
    LOST: {
      title: "Report Lost Property",
      desc: "Provide comprehensive details to help the community identify and return your lost item.",
      color: "from-[#4a2c17] to-[#2b1b11]",
      badge: "Lost Property",
      badgeClass: "bg-[#2b1b11] text-[#d4a373] border-[#6b3f23]/60",
    },
    FOUND: {
      title: "Register Found Belongings",
      desc: "Record found property so the rightful owner can safely reach out and claim it.",
      color: "from-[#3a2417] to-[#21150e]",
      badge: "Good Samaritan",
      badgeClass: "bg-[#21150e] text-[#e8d5c4] border-[#5c3a21]/60",
    },
    THEFT: {
      title: "File Theft Incident Alert",
      desc: "Broadcast theft details to alert your neighborhood and aid local investigations.",
      color: "from-[#4a2c17] to-[#251811]",
      badge: "Security Alert",
      badgeClass: "bg-[#251811] text-[#c49371] border-[#6b3f23]/60",
    },
    MISSING: {
      title: "Missing Person Notice",
      desc: "Official emergency broadcast coordinated with local police authorities.",
      color: "from-[#341d14] to-[#1c100b]",
      badge: "Urgent Priority",
      badgeClass: "bg-[#2b1c14] text-white border-[#7a482b]/60",
    },
  }[type];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#3b2a21] flex flex-col justify-between selection:bg-[#6b3f23]/30 selection:text-[#2b1f18]">

      {/* TOP BAR / BACK NAVIGATION */}
      <div className="sticky top-0 z-30 bg-[#080706]/95 backdrop-blur-md border-b border-white/10 text-white py-3 px-3.5 min-[360px]:px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 min-[360px]:gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer shrink-0"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <span className="text-[10px] min-[360px]:text-xs font-mono uppercase tracking-wider min-[360px]:tracking-widest text-[#d4a373] font-medium text-right truncate">
            Hopest Portal • Create Report
          </span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-4xl mx-auto px-3.5 min-[360px]:px-4 sm:px-6 py-6 sm:py-10 w-full">

        {/* HEADER HERO CARD */}
        <div className="animated-gradient text-white rounded-2xl min-[360px]:rounded-3xl p-4 min-[360px]:p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            {/* TYPE SWITCHER TABS - BALANCED GRID FOR 320PX/360PX */}
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
              {typeConfig.desc}
            </p>
          </div>
        </div>

        {/* SPECIAL MISSING CASE ADVISORY */}
        {type === "MISSING" ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-red-200 shadow-md text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#2b1f18] mb-3">
              Official Police & Admin Coordination Required
            </h2>

            <p className="text-sm text-[#6e584a] leading-relaxed mb-6">
              To protect public safety and privacy, <strong>Missing Person</strong> records must be filed in consultation with local police authorities and Hopest coordinators with verified FIR/GD details.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/missing")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4b3425] text-white text-sm font-semibold hover:bg-[#38261a] transition flex items-center justify-center gap-2"
              >
                <span>View Missing Person Notices</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => router.push("/about")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#d5c7bc] text-[#3b2a21] text-sm font-semibold hover:bg-[#f7f2ed] transition"
              >
                Contact Hopest Team
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD FORM CARD */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8dfd6] shadow-[0_8px_32px_-8px_rgba(75,52,37,0.08)]">
            <div className="border-b border-[#f0e7de] pb-5 mb-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2b1f18]">
                {type} Item Information
              </h2>
              <p className="text-xs sm:text-sm text-[#7a6252] mt-1">
                Please complete all fields with precise location and contact details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ITEM NAME */}
              <div>
                <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} className="text-[#8b5e3c]" />
                    Item Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Black Leather Wallet, iPhone 14 Pro, RC Document"
                  className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                    }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* 2-COL: PLACE & DATE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#8b5e3c]" />
                      {type} Place <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="e.g., Aluva Railway Station, KSRTC Bus Stand"
                    className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.place
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                      }`}
                  />
                  {errors.place && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.place}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#8b5e3c]" />
                      {type} Date <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <HopestDatePicker
                    value={form.date}
                    typeLabel={type}
                    onChange={(newDate) => {
                      setForm((prev) => ({ ...prev, date: newDate }));
                      if (errors.date) {
                        setErrors((prev) => ({ ...prev, date: "" }));
                      }
                    }}
                    hasError={Boolean(errors.date)}
                    placeholder={`Select date item was ${type.toLowerCase()} (DD/MM/YYYY)...`}
                  />
                  {errors.date && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* NEAREST POLICE STATION */}
              <div>
                <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Shield size={13} className="text-[#8b5e3c]" />
                    Nearest Police Station <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="police"
                  value={form.police}
                  onChange={handleChange}
                  placeholder="e.g., Central Police Station, Ernakulam"
                  className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.police
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                    }`}
                />
                {errors.police && (
                  <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.police}
                  </p>
                )}
              </div>

              {/* 2-COL: MOBILE & TOWN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-[#8b5e3c]" />
                      Contact Mobile (+91) <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="mob"
                    value={form.mob}
                    maxLength={10}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) {
                        setForm((prev) => ({ ...prev, mob: val }));
                        if (errors.mob) setErrors((prev) => ({ ...prev, mob: "" }));
                      }
                    }}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.mob
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                      }`}
                  />
                  {errors.mob && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.mob}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Building size={13} className="text-[#8b5e3c]" />
                      Town / City <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={form.town}
                    onChange={handleChange}
                    placeholder="e.g., Edappally, Palarivattom"
                    className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.town
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                      }`}
                  />
                  {errors.town && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.town}
                    </p>
                  )}
                </div>
              </div>

              {/* 2-COL: DISTRICT & PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Compass size={13} className="text-[#8b5e3c]" />
                      District <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="e.g., Ernakulam, Kozhikode, Thrissur"
                    className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.district
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                      }`}
                  />
                  {errors.district && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.district}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4b3425] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Hash size={13} className="text-[#8b5e3c]" />
                      PIN Code (6 digits) <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={form.pin}
                    maxLength={6}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 6) {
                        setForm((prev) => ({ ...prev, pin: val }));
                        if (errors.pin) setErrors((prev) => ({ ...prev, pin: "" }));
                      }
                    }}
                    placeholder="e.g., 682024"
                    className={`w-full bg-[#fbf9f6] border rounded-xl px-4 py-3 text-sm text-[#2b1f18] placeholder-[#9c8a7c] outline-none transition-all ${errors.pin
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#dcd2c6] focus:border-[#6b3f23] focus:bg-white focus:ring-2 focus:ring-[#8b5e3c]/20"
                      }`}
                  />
                  {errors.pin && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.pin}
                    </p>
                  )}
                </div>
              </div>

              {/* NOTICE BOX */}
              <div className="bg-[#fcfaf7] border border-[#e8ded3] rounded-2xl p-4 text-xs text-[#7a6252] flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#6b3f23] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your report will be listed immediately in the community database. You can manage, update, or remove your listing anytime from your <strong>My Creations</strong> panel.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#f0e7de]">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#d5c7bc] text-[#3b2a21] text-sm font-semibold hover:bg-[#f7f2ed] transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#4b3425] via-[#6b3f23] to-[#4b3425] hover:brightness-110 text-white font-semibold py-3 px-10 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <HopestSpinner size="sm" variant="light" />
                      <span>Submitting Report...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit {type} Report</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-[#e2d5c7] bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6252]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2b1f18]">HOPEST</span>
            <span>– Hope for the best</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push(`/dashboard/search?type=${type}`)}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Search {type} Records
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/usesage")}
              className="hover:underline hover:text-[#2b1f18]"
            >
              Guidelines
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}