import { PlusCircle } from "lucide-react";

export default function StasiDanDppCard({
  title,
  value,
  icon,
  color,
  onInputClick,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group"
    >
      {/* Baris Atas: Icon di Kiri, Tombol/Trend di Kanan */}
      <div className="flex justify-between items-center mb-5">
        {/* ICON (Kiri) */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl ${color} text-white`}
        >
          {icon}
        </div>

        {/* BAGIAN KANAN (Trend atau Tombol Input) */}
        <div>
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
              <PlusCircle size={13} /> Input Stasi
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
              <PlusCircle size={13} /> Input member DPP
            </button>
          )}
        </div>
      </div>

      {/* Baris Bawah: Judul & Angka */}
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mt-1 tracking-tight">
          {value}
        </h2>
      </div>
    </div>
  );
}
