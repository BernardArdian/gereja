import {
  X,
  Calendar,
  Clock,
  MapPin,
  Type,
  Info,
  Image as ImageIcon,
  Church,
  Edit2,
  Save,
  Paperclip,
} from "lucide-react";

import FormField from "../../formField";
//import PernikahanSection from "./pernikahanSection";
import PranikahSection from "./pranikahSection";
import Misa from "./misa";

export default function PengumumanComponent({
  isOpen,
  editMode,
  formData,
  selectedStatus,
  isSubmitting,
  previews,
  handlers,
  validation,
}) {
  if (!isOpen) return null;

  const { pria: previewPria, wanita: previewWanita } = previews;

  return (
    <>
      {/* Overlay - Lebih Smooth */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[80] transition-opacity"
        onClick={handlers.cancel}
      />

      {/* Modal Container */}
      <form className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <section className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
          {/* Header */}
          <header className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editMode
                  ? "Edit Pengumuman"
                  : "Panel Manajemen Konten Pengumuman"}
              </h2>
            </div>
            <button
              onClick={handlers.cancel}
              className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </header>

          <form
            onSubmit={handlers.submit}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
          >
            {/* Grid Atas */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Judul Pengumuman"
                icon={<Edit2 size={16} />}
                required
              >
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  placeholder="Judul Pengumuman"
                  onChange={handlers.input}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  disabled={isSubmitting}
                />
              </FormField>
              <FormField
                label="Topik Pengumuman"
                icon={<Type size={16} />}
                required
              >
                <select
                  value={selectedStatus}
                  onChange={handlers.status}
                  className="cursor-pointer w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  disabled={isSubmitting}
                  children={
                    <>
                      <option value="" disabled hidden>
                        -Topik Pengumuman-
                      </option>
                      <option value="baptis">Baptis</option>
                      <option value="krisma">Krisma</option>
                      <option value="komuni">Komuni</option>
                      <option value="misa">Misa</option>
                      <option value="pra-nikah">Pranikah</option>
                      <option value="pernikahan">Pernikahan</option>
                      <option value="other">Umum</option>
                    </>
                  }
                />
              </FormField>

              {selectedStatus !== "pra-nikah" && (
                <>
                  <FormField
                    label="Waktu Pelaksanaan"
                    icon={<Clock size={16} />}
                    required
                  >
                    <input
                      type="time"
                      name="waktu"
                      value={formData.waktu}
                      onChange={handlers.input}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      disabled={isSubmitting}
                    />
                  </FormField>
                  <FormField
                    label="Tanggal Pelaksanaan"
                    icon={<Calendar size={16} />}
                    required
                  >
                    <input
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handlers.input}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      disabled={isSubmitting}
                    />
                  </FormField>
                </>
              )}

              <FormField label="Stasi" icon={<MapPin size={16} />} required>
                <select
                  name="stasi"
                  value={formData.stasi}
                  onChange={handlers.input}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  disabled={isSubmitting}
                >
                  <option value="">-Pilih Stasi-</option>
                  <option value="Harapan">Pusat Paroki - Harapan Makmur</option>
                  <option value="Kurik">Stasi Kurik</option>
                </select>
              </FormField>

              {selectedStatus === "pernikahan" && (
                <FormField
                  label="Tempat Pelaksanaan Pernikahan"
                  required
                  icon={<Church size={14} />}
                >
                  <input
                    type="text"
                    name="tempat"
                    placeholder="Nama gereja"
                    value={formData.tempat}
                    onChange={handlers.pernikahan}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </FormField>
              )}
            </section>

            {/* Section: Data Pernikahan */}
            {selectedStatus === "pernikahan" && (
              <PernikahanSection
                data={formData.pernikahanData}
                handlers={{
                  pernikahan: handlers.pernikahan,
                  foto: handlers.foto,
                }}
                previews={{ pria: previewPria, wanita: previewWanita }}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Section: Data Pranikah */}
            {selectedStatus === "pra-nikah" && (
              <PranikahSection
                data={formData.dataPranikah}
                onChange={handlers.pranikah}
                isSubmitting={isSubmitting}
              />
            )}

            {selectedStatus !== "pra-nikah" ||
              (selectedStatus !== "pernikahan" && <Misa data={""} />)}

            {selectedStatus === "misa" && <Misa data={""} />}

            {/* Catatan Kaki... */}
            <FormField
              label="Foot notes(isi jika diperlukan)"
              icon={<Paperclip size={16} />}
            >
              <textarea
                name="deskripsi"
                placeholder="Catatan kaki..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 h-32 resize-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.description}
                onChange={handlers.input}
                disabled={isSubmitting}
              />
            </FormField>

            {/* Footer Buttons - Sticky bottom */}
            <footer className="w-full itemx-center justify-end bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={handlers.cancel}
                className="cursor-pointer w-[15dvw] px-6 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-red-500/20 hover:text-red-600 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!validation() || isSubmitting}
                className={` w-[15dvw] flex items-center justify-center gap-1 rounded-xl px-6 py-2.5 font-bold transition-all ${
                  validation() && !isSubmitting
                    ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-500/20 hover:text-blue-500"
                    : "bg-indigo-300 text-white cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    {editMode ? "Memperbarui..." : "Menyimpan..."}
                  </span>
                ) : editMode ? (
                  "Update"
                ) : (
                  "Simpan"
                )}
              </button>
            </footer>
          </form>
        </section>
      </form>
    </>
  );
}

const PernikahanSection = ({ data, handlers, previews, isSubmitting }) => (
  <section className="space-y-4 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
    <h4 className="font-bold text-indigo-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
      Data Pernikahan
    </h4>
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {["Pria", "Wanita"].map((type) => {
        const lowerType = type.toLowerCase();
        return (
          <section
            key={type}
            className="bg-white p-3 rounded-xl border border-indigo-100"
          >
            <label className="block text-xs font-bold text-indigo-400 uppercase mb-2">
              Mempelai {type}
            </label>
            <input
              type="text"
              name={`nama${type}`}
              placeholder="Nama lengkap"
              value={data[`nama${type}`]}
              onChange={handlers.pernikahan}
              className="w-full border-b border-gray-200 py-2 mb-3 outline-none focus:border-indigo-500 text-sm"
              disabled={isSubmitting}
            />
            <div className="relative h-32 w-full bg-gray-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center group">
              {previews[lowerType] ? (
                <img
                  src={previews[lowerType]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                  <ImageIcon size={24} className="mx-auto mb-1" />
                  <span className="text-[10px] font-bold">UPLOAD FOTO</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlers.foto(e, lowerType)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isSubmitting}
              />
            </div>
          </section>
        );
      })}
    </form>
  </section>
);
