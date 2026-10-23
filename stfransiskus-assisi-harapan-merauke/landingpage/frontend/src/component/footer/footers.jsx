import { MapIcon, Moon, Sun } from "lucide-react";
import StFransis from "../../assets/image/st.fransiskus_assisi.png";

const jadwalMisa = [
  "Minggu — 08.00 WIT",
  "Minggu — 10.00 WIT",
  "Minggu — 16.00 WIT",
];

export default function Footers({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`w-full border-t border-amber-600 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-gray-700/70 text-white"
      }`}
    >
      <section className="mx-auto max-w-7xl px-6 py-5">
        <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
          <section className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr]">
            <img
              src={StFransis}
              className="mx-auto h-40 w-40 object-cover sm:mx-0 sm:h-52 sm:w-36"
              alt="Santo Fransiskus Assisi"
            />
            <div className="text-center sm:text-left">
              <h2 className="mb-1 font-serif text-base font-medium text-amber-400">
                Santo Fransiskus Assisi, Harapan Makmur.
              </h2>
              <p className="font-serif text-sm leading-relaxed text-slate-200">
                Jl. Pattimura, Harapan Makmur - Distrik Kurik, Kab. Merauke,
                Papua Selatan.
              </p>
            </div>
          </section>

          <section className="flex flex-col items-center justify-around gap-7 text-center">
            <p className="cursor-pointer font-serif text-xs font-medium uppercase tracking-[0.18em] text-amber-400 hover:underline">
              Intensi Doa
            </p>

            <section>
              <h3 className="mb-3 font-serif text-xs font-medium uppercase tracking-[0.18em] text-amber-400 underline">
                Kontak Person
              </h3>
              <a
                href="https://wa.me/6284690128891"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm text-slate-200 transition-colors hover:text-green-400 hover:underline"
              >
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="26"
                  aria-hidden="true"
                >
                  <path
                    d="M50 10C27.9 10 10 27.9 10 50c0 7.2 2 14 5.4 19.8L10 90l20.8-5.3C36.4 87.9 43 90 50 90c22.1 0 40-17.9 40-40S72.1 10 50 10z"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="6"
                  />
                  <path
                    d="M63.5 57.2l-5.2-1.4c-.8-.2-1.6.1-2.1.7l-2.3 2.8c-4.1-1.9-7.4-5.2-9.3-9.3l2.8-2.3c.6-.5.9-1.3.7-2.1L46.7 40c-.3-1-.8-1.7-2-1.7h-4.8C38.6 38.3 37 40 37 42c0 13.3 10.7 24 24 24 2 0 3.7-1.6 3.7-3.9v-4.8c0-1.1-.9-1.8-1.2-2.1z"
                    fill="#25D366"
                  />
                </svg>
                <span>+62 846-9012-8891</span>
              </a>
            </section>

            <section>
              <h3 className="mb-3 font-serif text-xs font-medium uppercase tracking-[0.18em] text-amber-400 underline">
                Jadwal Misa
              </h3>
              <ul className="space-y-1.5">
                {jadwalMisa.map((jadwal) => (
                  <li key={jadwal} className="text-sm font-light text-slate-200">
                    {jadwal}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          <section>
            <h3 className="mb-3 font-serif text-xs uppercase tracking-[0.18em] text-amber-400 underline">
              Lokasi
            </h3>
            <div
              className={`flex h-44 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded border ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-400"
                  : "border-gray-100 bg-gray-50 text-gray-500"
              }`}
            >
              <MapIcon size={18} aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-widest">
                Peta belum tersedia
              </p>
            </div>
          </section>
        </section>

        <div className="mt-5 h-px bg-amber-500" />
        <section className="relative flex min-h-14 items-center justify-center px-2 pt-3">
          <p className="text-center font-serif text-[11px] leading-5 tracking-wide text-slate-300 sm:text-xs">
            © {new Date().getFullYear()} Paroki St. Fransiskus Assisi Harapan
            Makmur — All Rights Reserved
          </p>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Aktifkan tema ${isDark ? "terang" : "gelap"}`}
            aria-pressed={isDark}
            className="absolute right-2 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/5 p-2.5 text-xs font-semibold text-slate-100 transition hover:border-amber-300/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-10"
          >
            {isDark ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            <span className="hidden sm:inline">
              Tema {isDark ? "terang" : "gelap"}
            </span>
          </button>
        </section>
      </section>
    </footer>
  );
}
