import { useState } from "react";
import {
  X,
  Image as ImageIcon,
  UploadCloud,
  Layers,
  Calendar,
  Type,
  FileText,
  MapPin,
  Save,
} from "lucide-react";
import { createPortal } from "react-dom";

export default function ThumbnaildanGallery({
  isOpen,
  onClose,
  onConfirm,
  initialTab,
}) {
  const [selectedTab, setSelectedTab] = useState(null);

  const activeTab = selectedTab ?? initialTab ?? "thumbnail";

  const handleCloseInternal = () => {
    setSelectedTab(null);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <section className="fixed inset-0 z-[100] flex items-center justify-center p-2">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleCloseInternal}
      />

      <section className="relative flex flex-col w-[90%] md:w-[60%] h-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Thumbnail dan Gallery
            </h3>
            <p className="text-sm text-gray-500">
              Kelola gambar thumbnail dan galeri kegiatan
            </p>
          </div>
          <button
            onClick={handleCloseInternal}
            className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-gray-200 px-6 shrink-0 bg-white">
          <button
            type="button"
            onClick={() => setSelectedTab("thumbnail")}
            className={`cursor-pointer flex items-center gap-2 pb-3 pt-4 text-sm font-semibold transition-all border-b-2 ${
              activeTab === "thumbnail"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <ImageIcon size={18} />
            Thumbnail
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("gallery")}
            className={`cursor-pointer flex items-center gap-2 pb-3 pt-4 text-sm font-semibold transition-all border-b-2 ml-6 ${
              activeTab === "gallery"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Layers size={18} />
            Gallery
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
          {activeTab === "thumbnail" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-2">
                <span className="mt-0.5">ℹ️</span>
                <span>
                  <strong>Info:</strong> Gambar ini akan muncul sebagai cover
                  utama. Gunakan format Landscape (16:9).
                </span>
              </div>

              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 hover:border-indigo-400 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} />
                  </div>
                  <p className="mb-2 text-sm text-gray-500 font-medium">
                    <span className="font-semibold text-indigo-600">
                      Klik untuk upload
                    </span>{" "}
                    atau drag & drop
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG (Max. 2MB)
                  </p>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          )}

          {activeTab === "gallery" && (
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-2">
                  Detail Kegiatan
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* FILTER STASI */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> Pilih Stasi
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                      <option value="">Semua Stasi / Pusat</option>
                      <option value="stasi-a">Stasi A</option>
                      <option value="stasi-b">Stasi B</option>
                      <option value="stasi-c">Stasi C</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <Type size={14} /> Nama Galeri
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Misa Natal 2024"
                      className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <Calendar size={14} /> Tanggal Pelaksanaan
                    </label>
                    <input
                      type="date"
                      className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <FileText size={14} /> Nama Kegiatan / Deskripsi Singkat
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dokumentasi kegiatan misa natal pagi di gereja pusat..."
                      className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">
                    Foto Dokumentasi
                  </label>
                  <span className="text-xs text-gray-400">Max 10 foto</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-indigo-50 hover:border-indigo-400 transition-all group">
                    <div className="p-2 bg-gray-100 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                      <UploadCloud
                        size={20}
                        className="text-gray-400 group-hover:text-indigo-600"
                      />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-gray-500 group-hover:text-indigo-600">
                      Tambah Foto
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*"
                    />
                  </label>

                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="relative cursor-pointer aspect-square rounded-xl overflow-hidden group shadow-sm border border-gray-200"
                    >
                      <img
                        src={`https://picsum.photos/300/300?random=${item}`}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white cursor-pointer text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors shadow-lg">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <footer className="bg-white px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            className="cursor-pointer w-full flex items-center justify-center gap-1 sm:w-auto px-6 bg-blue-500/70 hover:bg-blue-500/20 hover:text-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            <Save size={16} />
            Simpan
          </button>
          <button
            onClick={handleCloseInternal}
            className="cursor-pointer w-full sm:w-auto px-6 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-red-500/20 hover:text-red-600 transition-colors"
          >
            Batal
          </button>
        </footer>
      </section>
    </section>,
    document.body,
  );
}
