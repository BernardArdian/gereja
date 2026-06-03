import { useState } from "react";
import { umatServiceApi } from "../../../api/umatApi/umatServiceApi";
import { Save } from "lucide-react";

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

  // LAJANG => simpan ke koleksi Lajang via field "personal"
  if (formData.statusNikah === "belum menikah") {
    return {
      statusNikah,
      ...(formData.noKk && { noKk: formData.noKk }),
      ...(formData.stasiKeluarga && { stasiKeluarga: formData.stasiKeluarga }),
      personal: mapPerson(formData.individu),
    };
  }

  // MENIKAH / DUDA / JANDA => simpan ke koleksi Umat via field "keluarga"
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
      anak: formData.anak.map(mapPerson),
    },
  };
};

// sub-komponen
const SakramenDetail = ({ personData, sacramentKey, onUpdate }) => {
  const inputClass =
    "w-full border border-gray-100 rounded-xl p-3 text-sm outline-none transition-all focus:border-indigo-300 focus:bg-white bg-gray-50 placeholder:text-gray-300";
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
          <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">
            {label}
          </label>
          <input
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

const SakramenBlock = ({ personData, onUpdate }) => (
  <div className="space-y-2">
    {["baptis", "komuni", "krisma"].map((s) => (
      <div key={s} className="p-4 border border-gray-100 rounded-xl bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest w-14 text-gray-400">
            {s}
          </span>
          <div className="flex flex-wrap gap-4">
            {["belum", "sudah"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="w-4 h-4 accent-indigo-600"
                  checked={personData[s].status === status}
                  onChange={() => onUpdate(s, "status", status)}
                />
                <span
                  className={`text-xs font-medium ${personData[s].status === status ? "text-indigo-600" : "text-gray-300"}`}
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
            onUpdate={onUpdate}
          />
        )}
      </div>
    ))}
  </div>
);

const StatusHidupBlock = ({ personData, onUpdate, label }) => (
  <div
    className={`p-4 rounded-xl border space-y-3 transition-colors ${personData.statusHidup === "meninggal" ? "bg-red-50/50 border-red-100" : "bg-gray-50/50 border-gray-100"}`}
  >
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Riwayat {label}
      </label>
      <div className="flex gap-4">
        {["hidup", "meninggal"].map((s) => (
          <label key={s} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              className="w-4 h-4 accent-red-500"
              checked={personData.statusHidup === s}
              onChange={() => onUpdate("statusHidup", s)}
            />
            <span className="text-xs font-medium capitalize text-gray-600">
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
          className="border border-gray-100 rounded-xl p-2.5 text-xs bg-white outline-none focus:border-red-200"
          value={personData.tglMeninggal || ""}
          onChange={(e) => onUpdate("tglMeninggal", e.target.value)}
        />
        <input
          type="text"
          placeholder="Lokasi Makam"
          className="border border-gray-100 rounded-xl p-2.5 text-xs bg-white outline-none focus:border-red-200 placeholder:text-gray-300"
          value={personData.lokasiMakam || ""}
          onChange={(e) => onUpdate("lokasiMakam", e.target.value)}
        />
      </div>
    )}
  </div>
);

const SectionHeader = ({ label, color = "indigo" }) => {
  const colors = {
    indigo: "text-indigo-500 border-indigo-100",
    blue: "text-blue-500 border-blue-100",
    pink: "text-pink-500 border-pink-100",
    green: "text-green-500 border-green-100",
  };
  return (
    <div className={`pb-2 border-b ${colors[color]}`}>
      <h3
        className={`text-xs font-semibold uppercase tracking-widest ${colors[color].split(" ")[0]}`}
      >
        {label}
      </h3>
    </div>
  );
};

const inputBase =
  "w-full border border-gray-100 bg-white p-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-300";

export default function InputUmat({ initialData, isEdit, editId, onSuccess }) {
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

  const [formData, setFormData] = useState({
    statusNikah: initialData?.statusNikah || "belum menikah",
    noKk: initialData?.noKk || "",
    stasiKeluarga: initialData?.stasiKeluarga || "",
    individu: initialData?.individu || createPersonTemplate(),
    suami: initialData?.suami || createPersonTemplate(),
    istri: initialData?.istri || createPersonTemplate(),
    anak: initialData?.anak || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //simpan / update
  const handleSimpan = async () => {
    setLoading(true);
    setError("");

    const payload = transformToPayload(formData); // <= transform formData ke struktur backend

    const [data, err] = isEdit
      ? await umatServiceApi.updateDataUmat(editId, payload) // PATCH /umat/:id
      : await umatServiceApi.inputDataUmat(payload); // POST  /umat

    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    onSuccess?.(data); // misal: navigate ke halaman list
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
    <main className="max-w-4xl mx-auto p-4 md:p-6 bg-slate-400/20 border border-gray-100 rounded space-y-8 my-10 w-full">
      {/* header */}
      <header className="text-center space-y-4">
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          Data Umat
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {["belum menikah", "menikah", "duda", "janda"].map((s) => {
            const isActive = formData.statusNikah === s;
            return (
              <button
                key={s}
                onClick={() => handleStatusNikahChange(s)}
                className={`px-4 py-2 cursor-pointer rounded-xl text-xs font-semibold capitalize transition-all border ${isActive ? statusConfig[s] : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </header>

      <hr className="border-gray-100" />

      {!isSudahNikah ? (
        /* lajang */
        <section className="space-y-6 animate-in fade-in duration-500">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-gray-100">
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
                <label className="text-[10px] font-semibold text-red-400 uppercase tracking-widest">
                  {label}
                </label>
                <input
                  placeholder={placeholder}
                  type="text"
                  className={`${inputBase} focus:border-indigo-300`}
                  value={formData[key]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (key === "noKk") {
                      const cleanValue = val.replace(/\D/g, ""); // Menghapus semua yang bukan angka
                      setFormData({ ...formData, [key]: cleanValue });
                      return;
                    }
                    if (key === "stasiKeluarga") {
                      const cleanValue = val.replace(
                        /[{[:;"'<>,.?/|}~!@#$%^*()_+=-]/g,
                        "",
                      ); // Menghapus karakter special
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
              className={`${inputBase} focus:border-indigo-300`}
              pattern="[A-Za-z\s]*"
              value={formData.individu.nama}
              onChange={(e) => {
                if (e.target.validity.valid) {
                  setFormData({
                    ...formData,
                    individu: { ...formData.individu, nama: e.target.value },
                  });
                }
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Tempat Lahir"
                type="text"
                className={`${inputBase} focus:border-indigo-300`}
                pattern="[A-Za-z\s]*"
                value={formData.individu.tempatLahir || ""}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    setFormData({
                      ...formData,
                      individu: {
                        ...formData.individu,
                        tempatLahir: e.target.value,
                      },
                    });
                  }
                }}
              />
              <input
                type="date"
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
        <section className="space-y-10 animate-in slide-in-from-top-4 duration-500">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-gray-100">
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
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                  {label}
                </label>
                <input
                  placeholder={placeholder}
                  type="text"
                  className={`${inputBase} focus:border-indigo-300`}
                  value={formData[key]}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (key === "noKk") {
                      const cleanValue = val.replace(/\D/g, ""); // Menghapus semua yang bukan angka
                      setFormData({ ...formData, [key]: cleanValue });
                      return;
                    }

                    if (key === "stasiKeluarga") {
                      const cleanValue = val.replace(/[0-9]/g, ""); // Menghapus semua angka
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
                className={`${inputBase} focus:border-blue-300`}
                pattern="[A-Za-z\s]*"
                value={formData.suami.nama}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    setFormData({
                      ...formData,
                      suami: { ...formData.suami, nama: e.target.value },
                    });
                  }
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="Tempat Lahir"
                  type="text"
                  className={`${inputBase} focus:border-blue-300`}
                  value={formData.suami.tempatLahir || ""}
                  pattern="[A-Za-z\s]*"
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setFormData({
                        ...formData,
                        suami: {
                          ...formData.suami,
                          tempatLahir: e.target.value,
                        },
                      });
                    }
                  }}
                />
                <input
                  type="date"
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
                className={`${inputBase} focus:border-pink-300`}
                pattern="[A-Za-z\s]*"
                value={formData.istri.nama}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    setFormData({
                      ...formData,
                      istri: { ...formData.istri, nama: e.target.value },
                    });
                  }
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="Tempat Lahir"
                  type="text"
                  className={`${inputBase} focus:border-pink-300`}
                  pattern="[A-Za-z\s]*"
                  value={formData.istri.tempatLahir || ""}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setFormData({
                        ...formData,
                        istri: {
                          ...formData.istri,
                          tempatLahir: e.target.value,
                        },
                      });
                    }
                  }}
                />
                <input
                  type="date"
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
                className="w-14 border border-gray-100 rounded-xl p-2 text-center text-sm font-medium outline-none focus:border-green-200 bg-gray-50"
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
                className="p-4 md:p-5 border border-gray-100 rounded-2xl bg-gray-50/30 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <span className="self-start sm:self-auto text-[10px] font-semibold bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-lg uppercase tracking-widest">
                    Anak ke-{idx + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-white px-4 py-2 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                      Status
                    </span>
                    {["belum", "sudah"].map((stat) => (
                      <label
                        key={stat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="w-3 h-3 accent-green-600"
                          checked={a.statusNikah === stat}
                          onChange={() => {
                            const newAnak = [...formData.anak];
                            newAnak[idx].statusNikah = stat;
                            setFormData({ ...formData, anak: newAnak });
                          }}
                        />
                        <span
                          className={`text-[10px] font-medium uppercase ${a.statusNikah === stat ? "text-green-600" : "text-gray-300"}`}
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
                    className={`${inputBase} focus:border-green-300`}
                    type="text"
                    pattern="[A-Za-z\s]*"
                    value={a.nama}
                    onChange={(e) => {
                      if (e.target.validity.valid) {
                        const newAnak = [...formData.anak];
                        newAnak[idx].nama = e.target.value;
                        setFormData({ ...formData, anak: newAnak });
                      }
                    }}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Tempat Lahir"
                      type="text"
                      className={`${inputBase} focus:border-green-300`}
                      pattern="[A-Za-z\s]*"
                      value={a.tempatLahir || ""}
                      onChange={(e) => {
                        if (e.target.validity.valid) {
                          const newAnak = [...formData.anak];
                          newAnak[idx].tempatLahir = e.target.value;
                          setFormData({ ...formData, anak: newAnak });
                        }
                      }}
                    />
                    <input
                      type="date"
                      className={`${inputBase} focus:border-green-300`}
                      value={a.tglLahir || ""}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        const newAnak = [...formData.anak];
                        newAnak[idx].tglLahir = e.target.value;
                        setFormData({ ...formData, anak: newAnak });
                      }}
                    />
                  </div>
                </div>

                <StatusHidupBlock
                  label="Anak"
                  personData={a}
                  onUpdate={(f, v) => {
                    const newAnak = [...formData.anak];
                    newAnak[idx][f] = v;
                    setFormData({ ...formData, anak: newAnak });
                  }}
                />
                <SakramenBlock
                  personData={a}
                  onUpdate={(s, f, v) => {
                    const newAnak = [...formData.anak];
                    newAnak[idx][s][f] = v;
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
        <p className="text-center text-xs text-red-500 font-medium">{error}</p>
      )}

      <footer className="flex w-full items-center justify-end">
        <button
          onClick={handleSimpan}
          disabled={loading}
          className="flex items-center gap-1 justify-center cursor-pointer w-[16dvw] bg-blue-500 hover:bg-blue-500/20 hover:text-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-semibold text-sm transition-all tracking-widest active:scale-95"
        >
          <Save size={25} />

          {loading ? "Menyimpan..." : isEdit ? "Update Data" : "Simpan"}
        </button>
      </footer>
    </main>
  );
}
