import React, { useEffect, useId, useRef } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Info,
  Tag,
  Map,
  User,
} from "lucide-react";

// Dialog detail menyesuaikan informasi yang ditampilkan menurut jenis acara.
export default function DetailPengumuman({ isOpen, onClose, data }) {
  const titleId = useId();
  const closeButtonRef = useRef(null);
  // Simpan onClose terbaru di ref agar effect utama tidak berjalan ulang setiap parent render.
  const onCloseRef = useRef(onClose);

  // Ref diperbarui di dalam effect (bukan saat render) supaya aman untuk React Compiler.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    // Kunci scroll halaman di belakang selama dialog terbuka.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pindahkan fokus ke tombol tutup, simpan elemen sebelumnya untuk dikembalikan.
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    // Esc menutup dialog.
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current?.();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  // Pengumuman pernikahan memakai susunan konten khusus untuk data pasangan.
  const isPernikahan = data.status === "pernikahan";
  const pernikahan = data.pernikahanData;

  // Judul diambil dari data; jika belum ada, dibentuk dari jenis pengumuman.
  const title =
    data.title || `Pengumuman${data.status ? ` ${data.status}` : ""}`;
  // Judul pernikahan berupa nama pasangan; nilai yang kosong dilewati.
  const coupleTitle =
    [pernikahan?.namaPria, pernikahan?.namaWanita]
      .filter(Boolean)
      .join(" & ") || "Pernikahan";

  return (
    <>
      {/* Backdrop */}
      <section
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-110"
        onClick={onClose}
      />

      {/* Container Utama */}
      <section className="fixed inset-0 z-120 flex items-center justify-center p-4 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden pointer-events-auto"
        >
          {/* --- TOMBOL X STICKY --- */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className={`cursor-pointer absolute top-5 right-5 p-2.5 transition-all z-150 backdrop-blur-md rounded-xl
              ${isPernikahan ? "bg-black/20 text-white hover:bg-red-500" : "bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500"}`}
          >
            <X size={20} strokeWidth={3} />
          </button>

          {/* AREA SCROLL */}
          <section
            className="flex-1 overflow-y-auto overscroll-contain min-h-0 bg-white scrollbar-hide"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

            {/* HEADER (Hanya muncul jika Pernikahan) */}
            {isPernikahan && (
              <section className="relative h-64 w-full shrink-0 bg-linear-to-br from-indigo-950 via-indigo-900 to-blue-900 overflow-hidden">
                <div className="flex h-full w-full items-center justify-around px-8 relative">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 z-0" />

                  {/* Pria */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <PhotoSlot
                        src={pernikahan?.fotoPria}
                        alt={`Foto ${pernikahan?.namaPria || "mempelai pria"}`}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                      Pria
                    </span>
                  </div>

                  <div className="absolute bottom-6 w-full text-center z-20">
                    <h2
                      id={titleId}
                      className="text-white text-lg font-black uppercase tracking-tight px-8 leading-tight"
                    >
                      {coupleTitle}
                    </h2>
                  </div>

                  {/* Wanita */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden mb-3">
                      <PhotoSlot
                        src={pernikahan?.fotoWanita}
                        alt={`Foto ${pernikahan?.namaWanita || "mempelai wanita"}`}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                      Wanita
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/*AREA KONTEN */}
            <section
              className={`p-8 space-y-8 bg-gray-400/40 ${!isPernikahan ? "pt-14" : ""}`}
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
                  <h2
                    id={titleId}
                    className="text-3xl font-black text-slate-800 tracking-tighter capitalize"
                  >
                    {title}
                  </h2>
                </div>
              )}

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Calendar />}
                  label="Tanggal"
                  value={
                    isPernikahan ? pernikahan?.tanggalPernikahan : data.tanggal
                  }
                  color="text-indigo-500"
                />
                <InfoItem
                  icon={<Clock />}
                  label="Waktu"
                  value={data.waktu ? `${data.waktu} WITA` : null}
                  color="text-indigo-500"
                />
                <InfoItem
                  icon={<MapPin />}
                  label="Stasi"
                  value={data.stasi ? `Stasi ${data.stasi}` : null}
                  color="text-rose-500"
                />
                <InfoItem
                  icon={<Map />}
                  label="Tempat"
                  value={data.tempat || pernikahan?.tempat}
                  color="text-rose-500"
                />
              </section>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="w-4 h-1 bg-indigo-500 rounded-full" />
                  Keterangan
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium text-base whitespace-pre-line">
                  {data.description}
                </p>
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

// Foto mempelai; tanpa URL ditampilkan ikon pengganti, bukan gambar rusak.
function PhotoSlot({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/10 text-white/60">
        <User size={32} aria-hidden="true" />
      </div>
    );
  }
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

function InfoItem({ icon, label, value, color }) {
  // Tampilkan satu metadata dengan ikon dan fallback untuk nilai yang belum ada.
  return (
    <section className="flex gap-4 items-center">
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
    </section>
  );
}
