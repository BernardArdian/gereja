import React from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Info,
  Tag,
  Map,
} from "lucide-react";

export default function DetailPengumumanModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const isPernikahan = data.status === "pernikahan";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110]"
        onClick={onClose}
      />

      {/* Container Utama */}
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
          {/* --- TOMBOL X STICKY --- */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2.5 transition-all z-[150] backdrop-blur-md shadow-lg rounded-xl 
              ${isPernikahan ? "bg-black/20 text-white hover:bg-red-500" : "bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500"}`}
          >
            <X size={20} strokeWidth={3} />
          </button>

          {/* AREA SCROLL */}
          <div
            className="flex-1 overflow-y-auto min-h-0 bg-white scrollbar-hide"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

            {/* 1. HEADER (Hanya muncul jika Pernikahan) */}
            {isPernikahan && (
              <div className="relative h-64 w-full shrink-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-blue-900 overflow-hidden">
                <div className="flex h-full w-full items-center justify-around px-8 relative">
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/10 z-0" />

                  {/* Pria */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <img
                        src={data.pernikahanData?.fotoPria}
                        className="w-full h-full object-cover"
                        alt="Pria"
                      />
                    </div>
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                      Pria
                    </span>
                  </div>

                  <div className="absolute bottom-6 w-full text-center z-20">
                    <h2 className="text-white text-lg font-black uppercase tracking-tight px-8 leading-tight">
                      {data.pernikahanData?.namaPria} &{" "}
                      {data.pernikahanData?.namaWanita}
                    </h2>
                  </div>

                  {/* Wanita */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <img
                        src={data.pernikahanData?.fotoWanita}
                        className="w-full h-full object-cover"
                        alt="Wanita"
                      />
                    </div>
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                      Wanita
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. AREA KONTEN */}
            <div
              className={`p-8 space-y-8 bg-white ${!isPernikahan ? "pt-14" : ""}`}
            >
              {/* Badge Kategori untuk pengumuman biasa */}
              {!isPernikahan && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg w-fit">
                    <Tag size={14} className="fill-indigo-100" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                      {data.status}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter capitalize">
                    Detail Pengumuman
                  </h2>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Calendar />}
                  label="Tanggal"
                  value={
                    isPernikahan
                      ? data.pernikahanData?.tanggalPernikahan
                      : data.tanggal
                  }
                  color="text-indigo-500"
                />
                <InfoItem
                  icon={<Clock />}
                  label="Waktu"
                  value={`${data.waktu} WITA`}
                  color="text-indigo-500"
                />
                <InfoItem
                  icon={<MapPin />}
                  label="Stasi"
                  value={`Stasi ${data.stasi}`}
                  color="text-rose-500"
                />
                <InfoItem
                  icon={<Map />}
                  label="Tempat"
                  value={
                    isPernikahan ? data.pernikahanData?.tempat : "Gereja Pusat"
                  }
                  color="text-rose-500"
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="w-4 h-1 bg-indigo-500 rounded-full" /> Narasi
                  Lengkap
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium text-base whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* 3. FOOTER FIXED */}
          <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center shrink-0">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">
              Admin Gereja Panel
            </span>
            <button
              onClick={onClose}
              className="px-10 py-3 bg-[#1e293b] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoItem({ icon, label, value, color }) {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 ${color}`}
      >
        {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-sm font-black text-slate-800 leading-tight">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}
