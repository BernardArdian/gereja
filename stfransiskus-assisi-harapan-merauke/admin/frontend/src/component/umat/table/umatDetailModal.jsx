import { useEffect } from "react";
import { MapPin, UserRound, X } from "lucide-react";

const valueOrFallback = (value) =>
  value === null || value === undefined || value === "" ? "Belum diisi" : value;

function getSacrament(value) {
  const sacrament = Array.isArray(value) ? value[0] : value;
  return sacrament || {};
}

function DetailField({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 wrap-break-word text-sm font-medium text-slate-800">
        {valueOrFallback(value)}
      </dd>
    </div>
  );
}

function PersonDetails({ person, label }) {
  const sacraments = [
    { key: "baptis", label: "Baptis" },
    { key: "komuni", label: "Komuni pertama" },
    { key: "krisma", label: "Krisma" },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="flex items-center gap-2 font-semibold capitalize text-slate-900">
        <UserRound size={17} className="text-amber-700" aria-hidden="true" />
        {label}
      </h3>
      <dl className="mt-4 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <DetailField label="Nama" value={person?.nama} />
        <DetailField
          label="Status hidup"
          value={person?.statusHidup || "hidup"}
        />
        <DetailField label="Tempat lahir" value={person?.tempatLahir} />
        <DetailField label="Tanggal lahir" value={person?.tglLahir} />
        {person?.statusHidup === "meninggal" && (
          <>
            <DetailField
              label="Tanggal meninggal"
              value={person?.tglMeninggal}
            />
            <DetailField label="Lokasi makam" value={person?.lokasiMakam} />
          </>
        )}
      </dl>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Sakramen
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {sacraments.map(({ key, label: sacramentLabel }) => {
            const sacrament = getSacrament(person?.[key]);
            return (
              <div key={key} className="rounded-lg bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-slate-800">{sacramentLabel}</p>
                <p className="mt-1 capitalize text-slate-600">
                  {sacrament.status || "belum"}
                </p>
                {sacrament.status === "sudah" && (
                  <dl className="mt-2 space-y-2">
                    <DetailField label="Gereja" value={sacrament.tempat} />
                    <DetailField label="Tanggal" value={sacrament.tanggal} />
                    <DetailField label="Stasi" value={sacrament.stasi} />
                  </dl>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function UmatDetailModal({ umat, onClose }) {
  useEffect(() => {
    if (!umat) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [umat, onClose]);

  if (!umat) return null;

  const rawData = umat.rawData || umat;
  const status = (rawData.statusNikah || umat.statusNikah || umat.status || "")
    .toLowerCase()
    .replaceAll("_", " ");
  const normalizedStatus =
    status === "sudah menikah" ? "menikah" : status || "belum menikah";
  const family = rawData.keluarga || {};
  const single =
    rawData.single || rawData.personal || rawData.individu || rawData;
  const husband = {
    ...(family.statusSakramentSuami || {}),
    nama: family.namaSuami,
    statusHidup: family.statusSuami || "hidup",
    ...(family.statusSuami === "meninggal" && {
      tglMeninggal: family.tglMeninggal,
      lokasiMakam: family.lokasiMakam,
    }),
  };
  const wife = {
    ...(family.statusSakramentIstri || {}),
    nama: family.namaIstri,
    statusHidup: family.statusIstri || "hidup",
    ...(family.statusIstri === "meninggal" && {
      tglMeninggal: family.tglMeninggal,
      lokasiMakam: family.lokasiMakam,
    }),
  };
  const children = family.anak || rawData.anak || [];
  const personal = {
    ...single,
    nama: single.nama || rawData.nama || umat.name,
    baptis: single.baptis || rawData.baptis,
    komuni: single.komuni || rawData.komuni,
    krisma: single.krisma || rawData.krisma,
  };

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="umat-detail-title"
        className="flex max-h-[min(92dvh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Detail data umat
            </p>
            <h2
              id="umat-detail-title"
              className="mt-1 wrap-break-word text-lg font-bold text-slate-900"
            >
              {umat.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} aria-hidden="true" />
                {valueOrFallback(umat.stasiKeluarga || rawData.stasiKeluarga)}
              </span>
              <span>No. KK: {valueOrFallback(rawData.noKk || umat.noKk)}</span>
              <span className="capitalize">Status: {normalizedStatus}</span>
            </div>
            <p className="mt-1 break-all text-[11px] text-slate-500">
              ID: {umat.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail umat"
            className="shrink-0 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {normalizedStatus === "belum menikah" ? (
            <PersonDetails person={personal} label="Data individu" />
          ) : (
            <>
              <PersonDetails person={husband} label="Suami" />
              <PersonDetails person={wife} label="Istri" />
              <section className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">
                  Data anak ({children.length})
                </h3>
                {children.length ? (
                  <div className="mt-3 space-y-3">
                    {children.map((child, index) => (
                      <PersonDetails
                        key={child._id || `${child.nama}-${index}`}
                        person={child}
                        label={`Anak ${index + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    Belum ada data anak.
                  </p>
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
