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
      <section className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2.5 transition-all z-[150] cursor-pointer backdrop-blur-md rounded-2xl 
              ${isPernikahan ? "bg-slate-100/10 text-slate-500 hover:bg-rose-800/20 hover:text-white hover:border-white" : "bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500"}`}
          >
            <X size={20} strokeWidth={3} />
          </button>

          {/* AREA SCROLL */}
          <section
            className="flex-1 overflow-y-auto min-h-0 bg-white scrollbar-hide"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

            {/* HEADER (Hanya muncul jika Pernikahan) */}
            {isPernikahan && (
              <section className="relative h-64 w-full shrink-0 bg-gradient-to-br from-rose-950 via-red-700 to-rose-600 overflow-hidden">
                <div className="flex h-full w-full items-center justify-around px-8 relative">
                  <section className="absolute inset-y-0 left-1/2 w-[1px] bg-white/10 z-0" />

                  {/* Pria */}
                  <section className="flex flex-col items-center z-10">
                    <div className="w-30 h-35 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <img
                        src={data.pernikahanData?.fotoPria}
                        className="w-full h-full object-cover"
                        alt="Pria"
                      />
                    </div>
                    <span className="text-white text-lg font-black uppercase tracking-tight px-8 leading-tight tracking-widest">
                      {data.pernikahanData?.namaPria}
                    </span>
                  </section>

                  {/* <div className=" absolute bottom-6 w-full text-center z-20">
                    <h2 className="text-white text-lg font-black uppercase tracking-tight px-8 leading-tight">
                      {data.pernikahanData?.namaPria} &{" "}
                      {data.pernikahanData?.namaWanita}
                    </h2>
                  </div> */}

                  {/* Wanita */}
                  <section className="flex flex-col items-center z-10">
                    <div className="w-30 h-35 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <img
                        src={data.pernikahanData?.fotoWanita}
                        className="w-full h-full object-cover"
                        alt="Wanita"
                      />
                    </div>
                    <span className="text-white text-lg font-black uppercase tracking-tight px-8 leading-tight tracking-widest">
                      {data.pernikahanData?.namaWanita}
                    </span>
                  </section>
                </div>
              </section>
            )}

            {/* AREA KONTEN */}
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
                <h4 className="text-[11px] font-black text-slate-400 tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="w-4 h-1 bg-indigo-500 rounded-full" /> foot
                  note
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium text-base whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER FIXED */}
          <footer className="p-6 bg-white border-t border-slate-100 flex justify-between items-center shrink-0">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">
              Admin Gereja Panel
            </span>
          </footer>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, label, value, color }) {
  return (
    <section className="flex gap-4 items-center">
      <section
        className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 ${color}`}
      >
        {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      </section>
      <section>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-sm font-black text-slate-800 leading-tight">
          {value || "-"}
        </p>
      </section>
    </section>
  );
}
