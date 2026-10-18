import { createElement, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Map,
  Tag,
  UsersRound,
  X,
} from "lucide-react";

const topicLabels = {
  baptis: "Baptis",
  krisma: "Krisma",
  komuni: "Komuni",
  misa: "Misa",
  "pra-nikah": "Pranikah",
  pernikahan: "Pernikahan",
  other: "Umum",
};

const preWeddingFields = [
  ["namaPria", "Calon mempelai pria"],
  ["namaWanita", "Calon mempelai wanita"],
  ["namaAyahPria", "Ayah calon mempelai pria"],
  ["namaIbuPria", "Ibu calon mempelai pria"],
  ["namaAyahWanita", "Ayah calon mempelai wanita"],
  ["namaIbuWanita", "Ibu calon mempelai wanita"],
];

const massFields = [
  ["pemimpin", "Pemimpin ibadah"],
  ["dirigen", "Dirigen"],
  ["organis", "Organis"],
  ["doa", "Doa umat"],
  ["bacaan", "Pembaca bacaan"],
  ["misdinar", "Misdinar"],
];

function formatDate(value) {
  if (!value) return "";
  const parts = value.split("-").map(Number);
  const date =
    parts.length === 3 && parts.every(Number.isFinite)
      ? new Date(parts[0], parts[1] - 1, parts[2], 12)
      : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function InfoItem({ icon: Icon, label, value, accent = "indigo" }) {
  if (!value) return null;
  const accentClass =
    accent === "rose"
      ? "bg-rose-50 text-rose-700"
      : "bg-indigo-50 text-indigo-700";

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:gap-4 sm:p-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentClass}`}
      >
        {createElement(Icon, { size: 20, "aria-hidden": true })}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold leading-5 text-slate-900 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailSection({ title, items }) {
  const visibleItems = items.filter(([, , value]) => Boolean(value));
  if (!visibleItems.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
        <UsersRound size={18} className="text-indigo-700" aria-hidden="true" />
        {title}
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {visibleItems.map(([key, label, value]) => (
          <div key={key} className="min-w-0">
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="mt-0.5 break-words text-sm font-medium text-slate-800">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Couple({ label, name, image }) {
  return (
    <div className="flex min-w-0 items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
      {image ? (
        <img
          src={image}
          alt={`Foto ${label.toLowerCase()}`}
          className="h-16 w-16 shrink-0 rounded-xl border border-white/30 object-cover shadow-lg sm:h-24 sm:w-24"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
          {name?.trim()?.charAt(0)?.toUpperCase() || "?"}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-rose-100">{label}</p>
        <p className="mt-0.5 break-words text-sm font-bold leading-5 text-white sm:text-base">
          {name || "Nama belum tersedia"}
        </p>
      </div>
    </div>
  );
}

export default function DetailPengumumanModal({ isOpen, onClose, data }) {
  const titleId = useId();
  const isWedding = data?.status === "pernikahan";
  const isPreWedding = data?.status === "pra-nikah";
  const isMass = data?.status === "misa";
  const wedding = data?.pernikahanData || {};
  const preWedding = data?.dataPranikah || {};
  const mass = data?.misa || {};
  const title =
    data?.judul ||
    (isWedding
      ? `${wedding.namaPria || "Mempelai pria"} & ${wedding.namaWanita || "Mempelai wanita"}`
      : `Detail Pengumuman ${topicLabels[data?.status] || ""}`);
  const dateValue = isWedding
    ? wedding.tanggalPernikahan || data?.tanggal
    : data?.tanggal;
  const placeValue = isWedding
    ? wedding.tempat || data?.tempat
    : data?.tempat || (isMass ? "Gereja Pusat" : "");

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
      >
        {isWedding && (
          <header className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-red-800 to-rose-600 px-4 py-5 sm:px-8 sm:py-6">
            <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/20 sm:block" />
            <div className="mx-auto grid max-w-lg grid-cols-2 gap-4 sm:gap-12">
              <Couple
                label="Mempelai pria"
                name={wedding.namaPria}
                image={wedding.fotoPria}
              />
              <Couple
                label="Mempelai wanita"
                name={wedding.namaWanita}
                image={wedding.fotoWanita}
              />
            </div>
          </header>
        )}

        <header className="flex items-start gap-3 border-b border-slate-100 px-4 py-4 sm:px-7 sm:py-5">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <Tag size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800">
              {topicLabels[data.status] || data.status || "Pengumuman"}
            </span>
            <h2
              id={titleId}
              className="mt-1.5 break-words text-xl font-bold leading-7 text-slate-900 sm:text-2xl"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            autoFocus
            aria-label="Tutup detail pengumuman"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-xl bg-slate-100 p-2.5 text-slate-600 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="space-y-4 p-4 sm:space-y-5 sm:p-7">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <InfoItem
              icon={CalendarDays}
              label="Tanggal"
              value={formatDate(dateValue)}
            />
            <InfoItem
              icon={Clock3}
              label="Waktu"
              value={data.waktu ? `${data.waktu} WITA` : ""}
            />
            <InfoItem
              icon={MapPin}
              label="Stasi"
              value={data.stasi ? `Stasi ${data.stasi}` : ""}
              accent="rose"
            />
            <InfoItem
              icon={Map}
              label="Tempat"
              value={placeValue}
              accent="rose"
            />
          </section>

          {data.description && (
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="h-1 w-5 rounded-full bg-indigo-600" />
                Keterangan
              </h3>
              <p className="whitespace-pre-line break-words text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                {data.description}
              </p>
            </section>
          )}

          {isPreWedding && (
            <DetailSection
              title="Data calon mempelai dan orang tua"
              items={preWeddingFields.map(([key, label]) => [
                key,
                label,
                preWedding[key],
              ])}
            />
          )}

          {isMass && (
            <DetailSection
              title="Petugas Misa"
              items={massFields.map(([key, label]) => [key, label, mass[key]])}
            />
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
}
