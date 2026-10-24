"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Sparkles,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

export interface HopestDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  hasError?: boolean;
  typeLabel?: string; // e.g. "LOST", "FOUND", "THEFT"
  placeholder?: string;
  maxDate?: string; // Optional maximum allowed date (YYYY-MM-DD)
  disabled?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Timezone-safe parsing to avoid any UTC-day shifts
function parseDateString(str: string): Date | null {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m, d);
}

// Format local Date object to YYYY-MM-DD
function formatDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Human-friendly date display
function formatDisplayDate(str: string): string {
  const d = parseDateString(str);
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Relative incident tags (Today, Yesterday, etc.)
function getRelativeTag(str: string): string | null {
  const d = parseDateString(str);
  if (!d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - target.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays > 7 && diffDays <= 14) return "Last week";
  return null;
}

export default function HopestDatePicker({
  value,
  onChange,
  hasError = false,
  typeLabel = "Incident",
  placeholder = "Select incident date (DD/MM/YYYY)",
  maxDate,
  disabled = false,
}: HopestDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize view year & month from selected value or today
  const selectedDate = parseDateString(value);
  const initialDate = selectedDate || new Date();

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Keep view year & month synced when value changes from outside
  useEffect(() => {
    if (value) {
      const parsed = parseDateString(value);
      if (parsed) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }
  }, [value]);

  // Close calendar popover on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Navigation handlers
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    const dateStr = formatDateString(d);
    onChange(dateStr);
    setIsOpen(false);
  };

  // Quick preset shortcuts
  const handlePreset = (offsetDays: number) => {
    const target = new Date();
    target.setDate(target.getDate() - offsetDays);
    const dateStr = formatDateString(target);
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  // Build 42 calendar grid cells for current month view
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: {
    year: number;
    month: number;
    day: number;
    isCurrentMonth: boolean;
    dateStr: string;
    isToday: boolean;
    isSelected: boolean;
    isFuture: boolean;
  }[] = [];

  const todayStr = formatDateString(new Date());

  // 1. Trailing days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const dateStr = formatDateString(new Date(prevYear, prevMonth, day));
    cells.push({
      year: prevYear,
      month: prevMonth,
      day,
      isCurrentMonth: false,
      dateStr,
      isToday: dateStr === todayStr,
      isSelected: dateStr === value,
      isFuture: maxDate ? dateStr > maxDate : false,
    });
  }

  // 2. Days of the current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateStr = formatDateString(new Date(viewYear, viewMonth, day));
    cells.push({
      year: viewYear,
      month: viewMonth,
      day,
      isCurrentMonth: true,
      dateStr,
      isToday: dateStr === todayStr,
      isSelected: dateStr === value,
      isFuture: maxDate ? dateStr > maxDate : false,
    });
  }

  // 3. Leading days for next month to complete standard 42 (or 35) cells
  const remainingCells = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const dateStr = formatDateString(new Date(nextYear, nextMonth, day));
    cells.push({
      year: nextYear,
      month: nextMonth,
      day,
      isCurrentMonth: false,
      dateStr,
      isToday: dateStr === todayStr,
      isSelected: dateStr === value,
      isFuture: maxDate ? dateStr > maxDate : false,
    });
  }

  const relativeTag = value ? getRelativeTag(value) : null;

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {/* =====================================================
          1. REALISTIC & MODERN INPUT TRIGGER
      ===================================================== */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full group rounded-xl px-3.5 py-2.5 sm:py-3 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${
          hasError
            ? "bg-red-50/50 border-2 border-red-500 ring-2 ring-red-200/50"
            : isOpen
            ? "bg-white border-2 border-[#6b3f23] ring-3 ring-[#8b5e3c]/20 shadow-md"
            : "bg-[#fbf9f6] border border-[#dcd2c6] hover:border-[#8b5e3c]/70 hover:bg-white"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Glowing brown icon badge */}
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
              value
                ? "bg-gradient-to-tr from-[#4a2c17] to-[#7a482b] text-white shadow-[0_2px_10px_rgba(107,63,35,0.35)] group-hover:scale-105"
                : "bg-[#2b1b11] border border-[#6b3f23]/40 text-[#d4a373]"
            }`}
          >
            <CalendarIcon size={17} />
          </div>

          {/* Formatted Date or Placeholder */}
          <div className="flex flex-col min-w-0">
            {value ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#2b1f18] tracking-tight">
                  {formatDisplayDate(value)}
                </span>
                {relativeTag && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/50 text-[10px] font-bold text-[#d4a373] tracking-wide">
                    <Sparkles size={9} className="text-[#d4a373]" />
                    <span>{relativeTag}</span>
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-[#9c8a7c] font-normal truncate">
                {placeholder}
              </span>
            )}
            <span className="text-[10px] text-[#8c7667] font-medium hidden sm:inline">
              Verified Hopest Incident Date (YYYY-MM-DD)
            </span>
          </div>
        </div>

        {/* Right side controls (Clear + Chevron) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear date"
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          <div
            className={`p-1 rounded-md text-[#8b5e3c] transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#6b3f23]" : "group-hover:translate-y-0.5"
            }`}
          >
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Hidden standard input for strict form serialization & validation compatibility */}
      <input type="hidden" name="date" value={value} />

      {/* =====================================================
          2. LUXURY OBSIDIAN-BROWN CALENDAR POPOVER
      ===================================================== */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[360px] max-w-[95vw] rounded-2xl bg-[#0e0c0a]/98 backdrop-blur-2xl border border-[#6b3f23]/40 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(107,63,35,0.2)] p-4 text-white animate-in fade-in zoom-in-95 duration-150">
          {/* Ambient top light sheen */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#d4a373]/60 to-transparent pointer-events-none" />

          {/* POPOVER HEADER: MONTH & YEAR WITH CONTROLS */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#2b1b11] border border-[#6b3f23]/50 text-[#d4a373] font-semibold">
                {typeLabel}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                title="Previous month"
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/60 text-stone-300 hover:text-[#f5efe8] flex items-center justify-center transition cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                title="Next month"
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/60 text-stone-300 hover:text-[#f5efe8] flex items-center justify-center transition cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* DAY NAMES ROW */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {WEEKDAY_NAMES.map((name, idx) => (
              <span
                key={name}
                className={`text-[11px] font-bold uppercase tracking-wider py-1 ${
                  idx === 0 || idx === 6 ? "text-[#d4a373]" : "text-stone-400"
                }`}
              >
                {name}
              </span>
            ))}
          </div>

          {/* DAYS GRID (42 CELLS) */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, idx) => {
              const isDisabled = cell.isFuture;

              return (
                <button
                  key={`${cell.year}-${cell.month}-${cell.day}-${idx}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() =>
                    !isDisabled &&
                    handleSelectDay(cell.year, cell.month, cell.day)
                  }
                  className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center relative transition-all duration-150 cursor-pointer ${
                    cell.isSelected
                      ? "bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white font-black shadow-[0_0_14px_rgba(107,63,35,0.6)] border border-[#8b5e3c]/50 scale-105 z-10"
                      : cell.isToday
                      ? "border border-[#d4a373]/80 bg-[#2b1b11] text-[#d4a373] font-bold hover:bg-[#3a2417]"
                      : cell.isCurrentMonth
                      ? "text-stone-200 hover:bg-white/10 hover:text-white"
                      : "text-stone-600 hover:bg-white/[0.04] hover:text-stone-400"
                  } ${
                    isDisabled
                      ? "opacity-30 cursor-not-allowed hover:bg-transparent"
                      : ""
                  }`}
                >
                  <span>{cell.day}</span>
                  {cell.isToday && !cell.isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#d4a373]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* QUICK REALISTIC PRESET CHIPS FOR EASY SELECTION */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-1.5">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold flex items-center gap-1">
              <Clock size={11} className="text-[#d4a373]" />
              Quick:
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => handlePreset(0)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/60 text-stone-300 hover:text-[#f5efe8] text-[11px] font-semibold transition cursor-pointer"
              >
                Today
              </button>

              <button
                type="button"
                onClick={() => handlePreset(1)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/60 text-stone-300 hover:text-[#f5efe8] text-[11px] font-semibold transition cursor-pointer"
              >
                Yesterday
              </button>

              <button
                type="button"
                onClick={() => handlePreset(3)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-[#2b1b11] border border-white/10 hover:border-[#6b3f23]/60 text-stone-300 hover:text-[#f5efe8] text-[11px] font-semibold transition cursor-pointer hidden sm:inline-block"
              >
                3 Days Ago
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#4a2c17] via-[#7a482b] to-[#4a2c17] text-white text-[11px] font-black hover:brightness-110 transition cursor-pointer shadow-sm border border-[#8b5e3c]/40 ml-1"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
