import { useEffect, useState } from "react";
import { umatServiceApi } from "../../../api/umatApi/umatServiceApi";
import { Check, LoaderCircle, Save, UserRound } from "lucide-react";

// TRANSFORM: formData UI => payload backend
const STATUS_NIKAH_MAP = {
  "belum menikah": "belum menikah",
  menikah: "sudah menikah",
  duda: "duda",
  janda: "janda",
};

const mapSacrament = (obj) => {
  if (!obj || obj.status !== "sudah") return [];
  return [
    {
      status: obj.status,
      tempat: obj.tempat || "",
      tanggal: obj.tanggal || "",
      stasi: obj.stasi || "",
    },
  ];
};

const mapSacraments = (person) => ({
  baptis: mapSacrament(person.baptis),
  komuni: mapSacrament(person.komuni),
  krisma: mapSacrament(person.krisma),
});

const mapPerson = (person) => ({
  nama: person.nama,
  tempatLahir: person.tempatLahir || "",
  tglLahir: person.tglLahir || "",
  statusHidup: person.statusHidup || "hidup",
  ...(person.statusHidup === "meninggal" && {
    tglMeninggal: person.tglMeninggal || "",
    lokasiMakam: person.lokasiMakam || "",
  }),
  ...mapSacraments(person),
});

const transformToPayload = (formData) => {
  const statusNikah =
    STATUS_NIKAH_MAP[formData.statusNikah] ?? formData.statusNikah;

  // Data belum menikah disimpan pada field `single` sesuai schema backend.
  if (formData.statusNikah === "belum menikah") {
    return {
      statusNikah,
      ...(formData.noKk && { noKk: formData.noKk }),
      ...(formData.stasiKeluarga && { stasiKeluarga: formData.stasiKeluarga }),
      single: mapPerson(formData.individu),
    };
  }

  // Data menikah, duda, dan janda menggunakan struktur keluarga backend.
  const statusSuami =
    formData.statusNikah === "janda"
      ? "meninggal"
      : formData.suami.statusHidup || "hidup";
  const statusIstri =
    formData.statusNikah === "duda"
      ? "meninggal"
      : formData.istri.statusHidup || "hidup";
  const almarhum =
    statusSuami === "meninggal"
      ? formData.suami
      : statusIstri === "meninggal"
        ? formData.istri
        : null;

  return {
    statusNikah,
    ...(formData.noKk && { noKk: formData.noKk }),
    ...(formData.stasiKeluarga && { stasiKeluarga: formData.stasiKeluarga }),
    keluarga: {
      namaSuami: formData.suami.nama,
      statusSuami,
      statusSakramentSuami: mapSacraments(formData.suami),
      namaIstri: formData.istri.nama,
      statusIstri,
      statusSakramentIstri: mapSacraments(formData.istri),
      ...(almarhum && {
        tglMeninggal: almarhum.tglMeninggal || "Data Awal",
        lokasiMakam: almarhum.lokasiMakam || "-",
      }),
      anak: formData.anak
        .filter((child) => child.nama.trim())
        .map(mapPerson),
    },
  };
};

const createPersonTemplate = () => ({
  nama: "",
  tempatLahir: "",
  tglLahir: "",
  statusHidup: "hidup",
  statusNikah: "belum",
  tglMeninggal: "",
  lokasiMakam: "",
  baptis: { status: "belum", tempat: "", tanggal: "", stasi: "" },
  komuni: { status: "belum", tempat: "", tanggal: "", stasi: "" },
  krisma: { status: "belum", tempat: "", tanggal: "", stasi: "" },
});

function readSacrament(value) {
  const record = Array.isArray(value) ? value[0] : value;
  return record
    ? {
        status: record.status || "belum",
        tempat: record.tempat || "",
        tanggal: record.tanggal || "",
        stasi: record.stasi || "",
      }
    : { status: "belum", tempat: "", tanggal: "", stasi: "" };
}

function readPerson(source = {}) {
  const person = { ...createPersonTemplate(), ...source };
  for (const key of ["baptis", "komuni", "krisma"]) {
    person[key] = readSacrament(source[key]);
  }
  return person;
}

function createInitialFormData(initialData) {
  const maritalStatus = (initialData?.statusNikah || "belum menikah")
    .toLowerCase()
    .replaceAll("_", " ");
  const statusNikah =
    maritalStatus === "sudah menikah" ? "menikah" : maritalStatus;
  const family = initialData?.keluarga || {};
  const personal = initialData?.single || initialData?.personal || {};
  const husband = {
    ...family.statusSakramentSuami,
    nama: family.namaSuami || "",
    statusHidup: family.statusSuami || "hidup",
    ...(family.statusSuami === "meninggal" && {
      tglMeninggal: family.tglMeninggal || "",
      lokasiMakam: family.lokasiMakam || "",
    }),
  };
  const wife = {
    ...family.statusSakramentIstri,
    nama: family.namaIstri || "",
    statusHidup: family.statusIstri || "hidup",
    ...(family.statusIstri === "meninggal" && {
      tglMeninggal: family.tglMeninggal || "",
      lokasiMakam: family.lokasiMakam || "",
    }),
  };
  const toFormPerson = (person) => {
    const result = readPerson(person);
    for (const key of ["baptis", "komuni", "krisma"]) {
      result[key] = readSacrament(person[key]);
    }
    return result;
  };

  return {
    statusNikah: ["menikah", "duda", "janda"].includes(statusNikah)
      ? statusNikah
      : "belum menikah",
    noKk: initialData?.noKk || "",
    stasiKeluarga:
      typeof initialData?.stasiKeluarga === "string"
        ? initialData.stasiKeluarga
        : initialData?.stasiKeluarga?.nama_stasi ||
          initialData?.stasiKeluarga?.nama ||
          "",
    individu: toFormPerson(initialData?.individu || personal),
    suami: toFormPerson(initialData?.suami || husband),
    istri: toFormPerson(initialData?.istri || wife),
    anak: (initialData?.anak || family.anak || []).map(toFormPerson),
  };
}

// sub-komponen
const SakramenDetail = ({
  personData,
  sacramentKey,
  personLabel,
  onUpdate,
}) => {
  const inputClass =
    "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
      {[
        {
          label: "Nama Gereja",
          key: "tempat",
          type: "text",
          placeholder: "Gereja...",
        },
        { label: "Tanggal", key: "tanggal", type: "date", placeholder: "" },
        { label: "Stasi", key: "stasi", type: "text", placeholder: "Stasi..." },
      ].map(({ label, key, type, placeholder }) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label
            htmlFor={`${personLabel}-${sacramentKey}-${key}`}
            className="text-xs font-medium text-slate-600"
          >
            {label}
          </label>
          <input
            id={`${personLabel}-${sacramentKey}-${key}`}
            type={type}
            placeholder={placeholder}
            className={inputClass}
            value={personData[sacramentKey][key] || ""}
            onChange={(e) => onUpdate(sacramentKey, key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

const SakramenBlock = ({ personData, onUpdate, personLabel }) => (
  <div className="space-y-2">
    {["baptis", "komuni", "krisma"].map((s) => (
      <div key={s} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <span className="w-32 text-sm font-semibold capitalize text-slate-800">
            {s === "komuni" ? "Komuni pertama" : s}
          </span>
          <div className="flex flex-wrap gap-4">
            {["belum", "sudah"].map((status) => (
              <label
                key={status}
                className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name={`sacrament-${personLabel}-${s}`}
                  className="h-4 w-4 accent-amber-700"
                  checked={personData[s].status === status}
                  onChange={() => onUpdate(s, "status", status)}
                />
                <span
                  className={`capitalize ${personData[s].status === status ? "font-semibold text-amber-800" : "text-slate-500"}`}
                >
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
        {personData[s].status === "sudah" && (
          <SakramenDetail
            personData={personData}
            sacramentKey={s}
            personLabel={personLabel}
            onUpdate={onUpdate}
          />
        )}
      </div>
    ))}
  </div>
);

const StatusHidupBlock = ({ personData, onUpdate, label }) => (
  <div
    className={`space-y-3 rounded-xl border p-4 transition-colors ${personData.statusHidup === "meninggal" ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-slate-50"}`}
  >
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <span className="text-sm font-semibold text-slate-700">
        Riwayat {label}
      </span>
      <div className="flex gap-4">
        {["hidup", "meninggal"].map((s) => (
          <label key={s} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm text-slate-700 hover:bg-white">
            <input
              type="radio"
              name={`life-status-${label}`}
              className="h-4 w-4 accent-rose-600"
              checked={personData.statusHidup === s}
              onChange={() => onUpdate("statusHidup", s)}
            />
            <span className="capitalize">
              {s}
            </span>
          </label>
        ))}
      </div>
    </div>
    {personData.statusHidup === "meninggal" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="date"
          aria-label={`Tanggal meninggal ${label}`}
          className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          value={personData.tglMeninggal || ""}
          onChange={(e) => onUpdate("tglMeninggal", e.target.value)}
        />
        <input
          type="text"
          placeholder="Lokasi Makam"
          aria-label={`Lokasi makam ${label}`}
          className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          value={personData.lokasiMakam || ""}
          onChange={(e) => onUpdate("lokasiMakam", e.target.value)}
        />
      </div>
    )}
  </div>
);

const SectionHeader = ({ label, color = "indigo" }) => {
  const colors = {
    indigo: "text-amber-800 border-amber-200",
    blue: "text-sky-800 border-sky-200",
    pink: "text-rose-800 border-rose-200",
    green: "text-emerald-800 border-emerald-200",
  };
  return (
    <div className={`border-b pb-2 ${colors[color]}`}>
      <h3
        className={`text-xs font-semibold uppercase tracking-widest ${colors[color].split(" ")[0]}`}
      >
        {label}
      </h3>
    </div>
  );
};

const inputBase =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function InputUmat({ initialData, isEdit, editId, onSuccess }) {
  const [formData, setFormData] = useState(() =>
    createInitialFormData(initialData),
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData(createInitialFormData(initialData));
    setError("");
  }, [initialData]);

  //simpan / update
  const handleSimpan = async () => {
    setError("");
    setSuccess("");

    if (!formData.stasiKeluarga.trim()) {
      setError("Stasi keluarga harus diisi.");
      return;
    }

    if (formData.statusNikah === "belum menikah") {
      if (!formData.individu.nama.trim()) {
        setError("Nama umat harus diisi.");
        return;
      }
    } else if (
      !formData.noKk.trim() ||
      !formData.suami.nama.trim() ||
      !formData.istri.nama.trim()
    ) {
      setError("Nomor KK dan nama suami serta istri harus diisi.");
      return;
    }

    setLoading(true);
    const payload = transformToPayload(formData);
    const minimumLoadingTime = new Promise((resolve) => {
      window.setTimeout(resolve, 5000);
    });

    try {
      const [data, err] = isEdit
        ? await umatServiceApi.updateDataUmat(editId, payload)
        : await umatServiceApi.inputDataUmat(payload);
      await minimumLoadingTime;

      if (err) {
        setError(
          typeof err === "string"
            ? err
            : "Data umat gagal disimpan. Periksa kembali isian dan coba lagi.",
        );
        return;
      }

      const handled = await onSuccess?.(data, isEdit);
      if (handled === false) return;

      if (!isEdit) {
        setFormData(createInitialFormData(null));
        setSuccess(
          "Data umat berhasil ditambahkan. Form siap untuk input berikutnya.",
        );
      }
    } catch (saveError) {
      await minimumLoadingTime;
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Data umat gagal disimpan. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  //status nikah
  const handleStatusNikahChange = (newStatus) => {
    setFormData((prev) => {
      let updatedSuami = { ...prev.suami };
      let updatedIstri = { ...prev.istri };
      if (newStatus === "duda") {
        updatedIstri.statusHidup = "meninggal";
        updatedSuami.statusHidup = "hidup";
      } else if (newStatus === "janda") {
        updatedSuami.statusHidup = "meninggal";
        updatedIstri.statusHidup = "hidup";
      } else if (newStatus === "menikah") {
        updatedSuami.statusHidup = "hidup";
        updatedIstri.statusHidup = "hidup";
      }
      return {
        ...prev,
        statusNikah: newStatus,
        suami: updatedSuami,
        istri: updatedIstri,
      };
    });
  };

  const isSudahNikah = ["menikah", "duda", "janda"].includes(
    formData.statusNikah,
  );

  const statusConfig = {
    "belum menikah": "bg-blue-50 text-blue-600 border-blue-200",
    menikah: "bg-green-50 text-green-600 border-green-200",
    duda: "bg-violet-50 text-violet-600 border-violet-200",
    janda: "bg-violet-50 text-violet-500 border-violet-200",
  };

  return (
    <main
      onChange={() => {
        if (success) setSuccess("");
      }}
      className="mx-auto my-4 w-full max-w-5xl space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:my-6 sm:space-y-8 sm:p-6 lg:p-8"
    >
      <header className="space-y-4">
        <div className="flex items-start gap-3">
        <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
          <UserRound size={20} aria-hidden="true" />
        </span>
        <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          {isEdit ? "Perbarui data terdaftar" : "Pendaftaran umat"}
        </p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {isEdit ? "Edit data umat" : "Input data umat"}
        </h1>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Pilih status pernikahan, lalu lengkapi data diri dan sakramen.
        </p>
        </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
        {["belum menikah", "menikah", "duda", "janda"].map((s) => {
          const isActive = formData.statusNikah === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleStatusNikahChange(s)}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold capitalize transition sm:px-4 ${
                isActive
                  ? `${statusConfig[s]} ring-2 ring-amber-100`
                  : "border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50"
              }`}
            >
              {isActive && <Check size={14} aria-hidden="true" />}
              {s}
            </button>
          );
        })}
        </div>
      </header>

      <hr className="border-slate-200" />

      {!isSudahNikah ? (
        /* lajang */
        <section className="space-y-6">
          <section className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
            {[
              {
                label: "No. KK (Opsional)",
                placeholder: "Isi jika sudah punya KK sendiri",
                key: "noKk",
              },
              {
                label: "Domisili / Stasi",
                placeholder: "Stasi tempat tinggal sekarang",
                key: "stasiKeluarga",
              },
            ].map(({ label, placeholder, key }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label htmlFor={`umat-${key}`} className="text-xs font-medium text-slate-700">
                  {label}
                </label>
                <input
                  placeholder={placeholder}
                  id={`umat-${key}`}
                  type="text"
                  className={`${inputBase} focus:border-indigo-300`}
                  aria-label={label}
                  value={formData[key]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (key === "noKk") {
                      const cleanValue = val.replace(/\D/g, ""); // Menghapus semua yang bukan angka
                      setFormData({ ...formData, [key]: cleanValue });
                      return;
                    }
                    setFormData({ ...formData, [key]: val });
                  }}
                />
              </div>
            ))}
          </section>

          <SectionHeader label="Data Diri Individu" color="indigo" />

          <section className="space-y-3">
            <input
              placeholder="Nama Lengkap"
              type="text"
              aria-label="Nama lengkap umat"
              autoComplete="name"
              required
              className={`${inputBase} focus:border-indigo-300`}
              value={formData.individu.nama}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  individu: { ...formData.individu, nama: e.target.value },
                })
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Tempat Lahir"
                type="text"
                aria-label="Tempat lahir umat"
                className={`${inputBase} focus:border-indigo-300`}
                value={formData.individu.tempatLahir || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    individu: {
                      ...formData.individu,
                      tempatLahir: e.target.value,
                    },
                  })
                }
              />
              <input
                type="date"
                aria-label="Tanggal lahir umat"
                className={`${inputBase} focus:border-indigo-300`}
                value={formData.individu.tglLahir || ""}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    individu: {
                      ...formData.individu,
                      tglLahir: e.target.value,
                    },
                  })
                }
              />
            </div>
          </section>

          <StatusHidupBlock
            label="Umat"
            personData={formData.individu}
            onUpdate={(f, v) =>
              setFormData({
                ...formData,
                individu: { ...formData.individu, [f]: v },
              })
            }
          />
          <SakramenBlock
            personLabel="umat"
            personData={formData.individu}
            onUpdate={(s, f, v) =>
              setFormData({
                ...formData,
                individu: {
                  ...formData.individu,
                  [s]: { ...formData.individu[s], [f]: v },
                },
              })
            }
          />
        </section>
      ) : (
        /* menikah / duda / janda */
        <section className="space-y-8">
          <section className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
            {[
              {
                label: "No. Kartu Keluarga *",
                placeholder: "Wajib diisi untuk keluarga",
                key: "noKk",
              },
              {
                label: "Stasi Domisili *",
                placeholder: "Stasi keluarga",
                key: "stasiKeluarga",
              },
            ].map(({ label, placeholder, key }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label htmlFor={`family-${key}`} className="text-xs font-medium text-slate-700">
                  {label}
                </label>
                <input
                  placeholder={placeholder}
                  id={`family-${key}`}
                  type="text"
                  required
                  className={`${inputBase} focus:border-indigo-300`}
                  aria-label={label}
                  value={formData[key]}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (key === "noKk") {
                      const cleanValue = val.replace(/\D/g, ""); // Menghapus semua yang bukan angka
                      setFormData({ ...formData, [key]: cleanValue });
                      return;
                    }

                    setFormData({ ...formData, [key]: val });
                  }}
                />
              </div>
            ))}
          </section>

          {/* suami */}
          <section className="space-y-5">
            <SectionHeader label="Data Suami" color="blue" />
            <div className="space-y-3">
              <input
                placeholder="Nama Suami"
                type="text"
                aria-label="Nama suami"
                autoComplete="name"
                required
                className={`${inputBase} focus:border-blue-300`}
                value={formData.suami.nama}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    suami: { ...formData.suami, nama: e.target.value },
                  })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="Tempat Lahir"
                  type="text"
                  aria-label="Tempat lahir suami"
                  className={`${inputBase} focus:border-blue-300`}
                  value={formData.suami.tempatLahir || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      suami: {
                        ...formData.suami,
                        tempatLahir: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="date"
                  aria-label="Tanggal lahir suami"
                  className={`${inputBase} focus:border-blue-300`}
                  value={formData.suami.tglLahir || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      suami: { ...formData.suami, tglLahir: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
            <StatusHidupBlock
              label="Suami"
              personData={formData.suami}
              onUpdate={(f, v) =>
                setFormData({
                  ...formData,
                  suami: { ...formData.suami, [f]: v },
                })
              }
            />
            <SakramenBlock
              personLabel="suami"
              personData={formData.suami}
              onUpdate={(s, f, v) =>
                setFormData({
                  ...formData,
                  suami: {
                    ...formData.suami,
                    [s]: { ...formData.suami[s], [f]: v },
                  },
                })
              }
            />
          </section>

          {/* istri */}
          <section className="space-y-5">
            <SectionHeader label="Data Istri" color="pink" />
            <div className="space-y-3">
              <input
                placeholder="Nama Istri"
                type="text"
                aria-label="Nama istri"
                autoComplete="name"
                required
                className={`${inputBase} focus:border-pink-300`}
                value={formData.istri.nama}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    istri: { ...formData.istri, nama: e.target.value },
                  })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="Tempat Lahir"
                  type="text"
                  aria-label="Tempat lahir istri"
                  className={`${inputBase} focus:border-pink-300`}
                  value={formData.istri.tempatLahir || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      istri: {
                        ...formData.istri,
                        tempatLahir: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="date"
                  aria-label="Tanggal lahir istri"
                  className={`${inputBase} focus:border-pink-300`}
                  value={formData.istri.tglLahir || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      istri: { ...formData.istri, tglLahir: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <StatusHidupBlock
              label="Istri"
              personData={formData.istri}
              onUpdate={(f, v) =>
                setFormData({
                  ...formData,
                  istri: { ...formData.istri, [f]: v },
                })
              }
            />
            <SakramenBlock
              personLabel="istri"
              personData={formData.istri}
              onUpdate={(s, f, v) =>
                setFormData({
                  ...formData,
                  istri: {
                    ...formData.istri,
                    [s]: { ...formData.istri[s], [f]: v },
                  },
                })
              }
            />
          </section>

          {/* anak */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-green-100 pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-green-500">
                Data Anak-Anak
              </h3>
              <input
                type="number"
                aria-label="Jumlah anak"
                min="0"
                step="1"
                className="min-h-11 w-24 rounded-xl border border-slate-200 bg-white px-3 text-center text-sm font-medium text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                value={formData.anak.length || ""}
                onChange={(e) => {
                  const num = Math.max(0, parseInt(e.target.value, 10) || 0);
                  let newAnak = [...formData.anak];
                  if (num > newAnak.length) {
                    for (let i = newAnak.length; i < num; i++)
                      newAnak.push(createPersonTemplate());
                  } else {
                    newAnak = newAnak.slice(0, num);
                  }
                  setFormData({ ...formData, anak: newAnak });
                }}
              />
            </div>

            {formData.anak.map((a, idx) => (
              <div
                key={idx}
                className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="self-start rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                    Anak ke-{idx + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 sm:gap-4 sm:px-4">
                    <span className="text-xs font-medium text-slate-600">
                      Status
                    </span>
                    {["belum", "sudah"].map((stat) => (
                      <label
                        key={stat}
                        className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <input
                          type="radio"
                          name={`child-marital-status-${idx}`}
                          className="h-4 w-4 accent-emerald-700"
                          checked={a.statusNikah === stat}
                          onChange={() => {
                            const newAnak = formData.anak.map((child, i) =>
                              i === idx ? { ...child, statusNikah: stat } : child,
                            );
                            setFormData({ ...formData, anak: newAnak });
                          }}
                        />
                        <span
                          className={`capitalize ${a.statusNikah === stat ? "font-semibold text-emerald-800" : "text-slate-500"}`}
                        >
                          {stat} Menikah
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    placeholder="Nama Anak"
                    aria-label={`Nama anak ke-${idx + 1}`}
                    className={`${inputBase} focus:border-green-300`}
                    type="text"
                    value={a.nama}
                    onChange={(e) => {
                      const newAnak = formData.anak.map((child, i) =>
                        i === idx ? { ...child, nama: e.target.value } : child,
                      );
                      setFormData({ ...formData, anak: newAnak });
                    }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Tempat Lahir"
                      aria-label={`Tempat lahir anak ke-${idx + 1}`}
                      type="text"
                      className={`${inputBase} focus:border-green-300`}
                      value={a.tempatLahir || ""}
                      onChange={(e) => {
                        const newAnak = formData.anak.map((child, i) =>
                          i === idx
                            ? { ...child, tempatLahir: e.target.value }
                            : child,
                        );
                        setFormData({ ...formData, anak: newAnak });
                      }}
                    />
                    <input
                      type="date"
                      aria-label={`Tanggal lahir anak ke-${idx + 1}`}
                      className={`${inputBase} focus:border-green-300`}
                      value={a.tglLahir || ""}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        const newAnak = formData.anak.map((child, i) =>
                          i === idx
                            ? { ...child, tglLahir: e.target.value }
                            : child,
                        );
                        setFormData({ ...formData, anak: newAnak });
                      }}
                    />
                  </div>
                </div>

                <StatusHidupBlock
                  label={`Anak ke-${idx + 1}`}
                  personData={a}
                  onUpdate={(f, v) => {
                    const newAnak = formData.anak.map((child, i) =>
                      i === idx ? { ...child, [f]: v } : child,
                    );
                    setFormData({ ...formData, anak: newAnak });
                  }}
                />
                <SakramenBlock
                  personLabel={`anak-${idx + 1}`}
                  personData={a}
                  onUpdate={(s, f, v) => {
                    const newAnak = formData.anak.map((child, i) =>
                      i === idx
                        ? { ...child, [s]: { ...child[s], [f]: v } }
                        : child,
                    );
                    setFormData({ ...formData, anak: newAnak });
                  }}
                />
              </div>
            ))}
          </section>
        </section>
      )}

      {/* errr message */}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          {success}
        </p>
      )}

      <footer className="sticky bottom-0 -mx-4 flex justify-end border-t border-slate-200 bg-white/95 px-4 pb-1 pt-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
        <button
          type="button"
          onClick={handleSimpan}
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Save size={18} aria-hidden="true" />
          )}
          {loading ? "Menyimpan..." : isEdit ? "Update Data" : "Simpan"}
        </button>
      </footer>
    </main>
  );
}
