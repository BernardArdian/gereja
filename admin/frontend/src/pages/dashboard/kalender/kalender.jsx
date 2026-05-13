import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const YEARS = Array.from({ length: 100 }, (_, i) => 1970 + i);

function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const holidayCache = {};

async function fetchHolidays(year) {
  if (holidayCache[year]) return holidayCache[year];
  try {
    // Coba API pertama: api-hari-libur.vercel.app
    const res = await fetch(
      `https://api-hari-libur.vercel.app/api?year=${year}`,
    );
    const json = await res.json();
    const map = {};
    const arr = json.data ?? json;
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        const dateStr = item.date || item.holiday_date;
        const name = item.description || item.holiday_name || item.name;
        if (dateStr && name) map[dateStr] = name;
      });
    }
    // Fallback jika kosong: coba libur.deno.dev
    if (Object.keys(map).length === 0) {
      const res2 = await fetch(`https://libur.deno.dev/api?year=${year}`);
      const arr2 = await res2.json();
      if (Array.isArray(arr2)) {
        arr2.forEach((item) => {
          const dateStr = item.date || item.holiday_date;
          const name = item.name || item.holiday_name || item.description;
          if (dateStr && name) map[dateStr] = name;
        });
      }
    }
    holidayCache[year] = map;
    return map;
  } catch {
    holidayCache[year] = {};
    return {};
  }
}

function Dropdown({ value, options, onChange, display }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-800 font-black text-sm rounded-xl px-3 py-2 transition-all duration-150 whitespace-nowrap"
      >
        {display}
        <svg
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1.5 left-0 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden min-w-[130px]">
          <div className="max-h-52 overflow-y-auto py-1.5">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-bold transition-all duration-100 ${
                  opt.value === value
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CustomNavigation({
  date,
  onYearChange,
  onMonthChange,
  onPrev,
  onNext,
}) {
  const monthOptions = MONTHS_ID.map((m, i) => ({ value: i, label: m }));
  const yearOptions = YEARS.map((y) => ({ value: y, label: String(y) }));
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={onPrev}
        className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-500 rounded-xl transition-all duration-150"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <Dropdown
        value={date.getMonth()}
        options={monthOptions}
        onChange={onMonthChange}
        display={MONTHS_ID[date.getMonth()]}
      />
      <Dropdown
        value={date.getFullYear()}
        options={yearOptions}
        onChange={onYearChange}
        display={String(date.getFullYear())}
      />
      <button
        onClick={onNext}
        className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-500 rounded-xl transition-all duration-150"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [loadingYear, setLoadingYear] = useState(null);

  const activeYear = activeDate.getFullYear();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (holidayCache[activeYear]) {
        if (!cancelled)
          setHolidays((prev) => ({ ...prev, ...holidayCache[activeYear] }));
        return;
      }
      if (!cancelled) setLoadingYear(activeYear);
      const data = await fetchHolidays(activeYear);
      if (!cancelled) {
        setHolidays((prev) => ({ ...prev, ...data }));
        setLoadingYear(null);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [activeYear]);

  const handleYearChange = (year) => {
    const d = new Date(activeDate);
    d.setFullYear(year);
    setActiveDate(d);
  };
  const handleMonthChange = (month) => {
    const d = new Date(activeDate);
    d.setMonth(month);
    setActiveDate(d);
  };
  const handlePrev = () => {
    const d = new Date(activeDate);
    d.setMonth(d.getMonth() - 1);
    setActiveDate(d);
  };
  const handleNext = () => {
    const d = new Date(activeDate);
    d.setMonth(d.getMonth() + 1);
    setActiveDate(d);
  };

  const selectedHoliday = holidays[toKey(date)];
  const isSunday = (d) => d.getDay() === 0;

  // Render tile content dengan warna manual — lebih reliable dari CSS class override
  const tileContent = ({ date: d, view }) => {
    if (view !== "month") return null;
    const key = toKey(d);
    const isHoliday = !!holidays[key];
    const isSelected = toKey(d) === toKey(date);

    let textColor = "text-slate-800";
    if (isSelected) textColor = "text-white";
    else if (isHoliday || isSunday(d)) textColor = "text-red-500";

    return (
      <span className={`text-[0.8rem] font-bold leading-none ${textColor}`}>
        {d.getDate()}
        {isHoliday && !isSelected && (
          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400 block" />
        )}
      </span>
    );
  };

  // Tile class: hanya untuk background, bukan warna teks
  const tileClassName = ({ date: d, view }) => {
    if (view !== "month") return "hide-default-abbr";
    const key = toKey(d);
    const isHoliday = !!holidays[key];
    const classes = ["hide-default-abbr"];
    if (isHoliday && toKey(d) !== toKey(date)) classes.push("tile-holiday-bg");
    return classes.join(" ");
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 flex justify-center items-start bg-transparent font-sans">
      <style>{`
        /* Sembunyikan abbr bawaan react-calendar — kita render angka sendiri */
        .cal .hide-default-abbr abbr { display: none !important; }

        .cal .react-calendar { width:100%; border:none; background:transparent; font-family:inherit; }
        .cal .react-calendar__navigation { display:none; }

        .cal .react-calendar__month-view__weekdays {
          display:grid !important; grid-template-columns:repeat(7,1fr);
          margin-bottom:4px; border-bottom:2px solid #f1f5f9; padding-bottom:6px;
        }
        .cal .react-calendar__month-view__weekdays__weekday {
          text-align:center; font-weight:900; font-size:0.6rem;
          text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; padding:2px 0;
        }
        /* Label MIN merah */
        .cal .react-calendar__month-view__weekdays__weekday:last-child abbr { color:#ef4444 !important; display:block !important; }
        .cal .react-calendar__month-view__weekdays__weekday abbr { text-decoration:none; }

        .cal .react-calendar__month-view__days {
          display:grid !important; grid-template-columns:repeat(7,1fr); gap:3px; margin-top:4px;
        }
        .cal .react-calendar__tile {
          aspect-ratio:1/1; display:flex !important; align-items:center; justify-content:center;
          border:none; border-radius:10px;
          background:transparent; cursor:pointer; transition:all 0.15s ease;
          padding:0 !important; line-height:1; position:relative;
        }
        .cal .react-calendar__tile:hover { background:#eef2ff !important; transform:scale(1.05); }
        .cal .react-calendar__tile:hover span { color:#4f46e5 !important; }

        /* Today */
        .cal .react-calendar__tile--now { background:#fff7ed !important; border:2px solid #fed7aa !important; }
        .cal .react-calendar__tile--now span { color:#ea580c !important; }

        /* Active/Selected */
        .cal .react-calendar__tile--active { background:#4f46e5 !important; box-shadow:0 4px 14px -4px rgba(79,70,229,0.5); transform:scale(1.08) !important; }
        .cal .react-calendar__tile--active:hover { background:#4338ca !important; }
        .cal .react-calendar__tile--active span { color:#fff !important; }

        /* Holiday background (subtle) */
        .cal .tile-holiday-bg { background:#fff1f2; }
        .cal .tile-holiday-bg:hover { background:#ffe4e6 !important; }

        /* Neighboring month faded */
        .cal .react-calendar__month-view__days__day--neighboringMonth { opacity:0.25; }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col md:flex-row overflow-hidden">
        {/* KIRI */}
        <div className="flex-[1.4] p-6 md:p-8 bg-white">
          <header className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-[15px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-1">
                Kalender Paroki
              </p>
              <h1 className="text-1xl font-[900] tracking-tight text-slate-900 uppercase leading-tight">
                St.Fransiskus Assisi Harapan - Merauke, Papua Selatan
              </h1>
            </div>
            {loadingYear && (
              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg animate-pulse mt-1">
                Memuat {loadingYear}…
              </span>
            )}
          </header>

          <div className="cal w-full">
            <CustomNavigation
              date={activeDate}
              onYearChange={handleYearChange}
              onMonthChange={handleMonthChange}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            <Calendar
              onChange={setDate}
              value={date}
              activeStartDate={activeDate}
              onActiveStartDateChange={({ activeStartDate }) =>
                setActiveDate(activeStartDate)
              }
              locale="id-ID"
              showNavigation={false}
              tileClassName={tileClassName}
              tileContent={tileContent}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                Terpilih
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-300 inline-block" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                Hari Ini
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                Libur Nasional &amp; Minggu
              </span>
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="flex-1 bg-slate-50/60 p-6 md:p-8 border-l border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-7xl font-[900] text-slate-900 leading-none tracking-tighter">
                {date.getDate()}
              </span>
              <div className="flex flex-col mb-1">
                <span className="text-indigo-600 font-black tracking-widest text-[10px] uppercase mb-0.5">
                  {date.toLocaleDateString("id-ID", { weekday: "long" })}
                </span>
                <span className="text-slate-500 font-semibold text-xs">
                  {date.toLocaleDateString("id-ID", { month: "long" })}
                </span>
                <span className="text-slate-300 font-bold text-xs">
                  {date.getFullYear()}
                </span>
              </div>
            </div>

            {selectedHoliday ? (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2 mb-4">
                <span className="text-base">🎉</span>
                <div>
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">
                    Libur Nasional
                  </p>
                  <p className="text-xs font-bold text-rose-600">
                    {selectedHoliday}
                  </p>
                </div>
              </div>
            ) : isSunday(date) ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">
                <span className="text-base">🙏</span>
                <div>
                  <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">
                    Hari Minggu
                  </p>
                  <p className="text-xs font-bold text-red-500">Hari Ibadah</p>
                </div>
              </div>
            ) : (
              <div className="h-0.5 w-12 bg-indigo-200 rounded-full mb-4" />
            )}

            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] mb-3">
              Agenda Paroki
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[120px]">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Belum ada jadwal
                <br />
                pelayanan hari ini.
              </p>
            </div>
          </div>

          <button className="cursor-pointer mt-5 w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2.5 group">
            Tambah Jadwal
            <span className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform duration-200">
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
