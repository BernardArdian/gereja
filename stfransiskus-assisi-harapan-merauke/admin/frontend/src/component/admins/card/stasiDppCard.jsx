import { Plus } from "lucide-react";

export default function StasiDanDppCard({
  title,
  value,
  icon,
  color,
  onInputClick,
  onClick,
}) {
  return (
    <section
      onClick={onClick}
      className={`p-5 rounded-2xl transition-all group
        ${
          title === "Anggota Dpp"
            ? "bg-blue-500/50 border-blue-100"
            : title === "Total Stasi"
              ? "bg-yellow-500/50 border-amber-100"
              : "bg-white"
        }`}
    >
      {/* Baris Atas: Icon di Kiri, Tombol/Trend di Kanan */}
      <header className="flex justify-between items-center mb-5">
        {/* ICON (Kiri) */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl ${color} text-white`}
          children={icon}
        />

        {/* BAGIAN KANAN (Trend atau Tombol Input) */}
        <section>
          {/*Cek jika judulnya persis "Total Stasi" */}
          {title === "Total Stasi" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInputClick();
              }}
              className="flex flex-row items-center gap-1.5 cursor-pointer bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-all"
            >
              <Plus size={13} /> Tambah Stasi
            </button>
          )}

          {/*Cek jika judulnya persis "Anggota Dpp" */}
          {title === "Anggota Dpp" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInputClick();
              }}
              className="flex flex-row items-center gap-1.5 cursor-pointer bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-100 transition-all"
            >
              <Plus size={13} /> Tambah DPP
            </button>
          )}
        </section>
      </header>

      {/* Judul & Angka */}
      <footer>
        <span
          className="text-xs font-semibold text-gray-800 uppercase tracking-widest"
          children={title}
        />
        <h2
          className="text-3xl font-bold text-gray-800 mt-1 tracking-tight"
          children={value}
        />
      </footer>
    </section>
  );
}
