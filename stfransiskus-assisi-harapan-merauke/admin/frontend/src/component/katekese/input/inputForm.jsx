import {
  X,
  UploadCloud,
  ImageIcon,
  AlignLeft,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function KatekeseInput({
  isOpen,
  onClose,
  onConfirm,
  // showCategory = false,
  // category = [],
  mode = "default",
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Menangani pemilihan file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Bersihkan memori URL saat komponen unmount atau gambar diganti
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <section className="relative flex flex-col w-[95%] md:w-[60%] h-[99dvh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <section>
            <h3 className="text-lg font-bold text-gray-800">Katekese</h3>
            <p className="text-sm text-gray-500">Kelola Katekese</p>
          </section>
          <button
            onClick={handleClose}
            className="cursor-pointer text-rose-400 hover:text-rose-600 hover:bg-rose-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* Body */}
        {mode === "default" && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30">
            <section className="flex flex-col sm:flex-row gap-6">
              {/* Thumbnail Upload & Preview */}
              <section className="relative flex flex-shrink-0 flex-col w-full sm:w-1/3 aspect-square bg-white group overflow-hidden">
                <label className="relative flex flex-shrink-0 flex-col items-center justify-center w-full sm:w-1/1 aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-indigo-50 hover:border-indigo-400 transition-all group overflow-hidden">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full m-5 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="text-white" size={24} />
                        <span className="ml-2 text-white text-xs font-medium">
                          Ganti Gambar
                        </span>
                      </div>
                    </>
                  ) : (
                    <section className="flex flex-col items-center justify-center">
                      <div className="p-2 bg-gray-100 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                        <UploadCloud
                          size={20}
                          className="text-gray-400 group-hover:text-indigo-600"
                        />
                      </div>
                      <span className="mt-2 text-xs font-semibold text-gray-500 group-hover:text-indigo-600 text-center">
                        Thumbnail
                      </span>
                    </section>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                <div className="space-y-1.5 m-1">
                  <label
                    htmlFor="author"
                    className="text-sm font-medium text-gray-700"
                  >
                    Image Url
                  </label>
                  <input
                    id="url"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    type="text"
                    placeholder="Image Url"
                  />
                </div>
              </section>

              {/* Right Side Inputs */}
              <section className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="author"
                    className="text-sm font-medium text-gray-700"
                  >
                    Judul
                  </label>
                  <input
                    id="judul"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    type="text"
                    placeholder="Judul katekese"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="author"
                    className="text-sm font-medium text-gray-700"
                  >
                    Topik
                  </label>
                  <select
                    id="topik"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    <option value="">Pilih topik Katekese...</option>
                    <option value="orang kudus">Orang Kudus</option>
                    <option value="renungan">Renungan</option>
                    <option value="Devosi">Devosi</option>
                    <option value="tradisi gereja">Tradisi Gereja</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="author"
                    className="text-sm font-medium text-gray-700"
                  >
                    Penulis
                  </label>
                  <input
                    id="author"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    type="text"
                    placeholder="Nama penulis"
                  />
                </div>
              </section>
            </section>

            {/* Textarea Detail */}
            <div className="space-y-1.5">
              <label
                htmlFor="summary"
                className="text-sm font-medium text-gray-700"
              >
                Ringkasan (summary)
              </label>
              <textarea
                id="summary"
                className="w-full px-4 h-20 py-2.5 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                type="text"
                placeholder="Ringkasan singkat..."
              />
            </div>
            <section className="space-y-1.5">
              <section className="flex w-full justify-between">
                <label
                  htmlFor="detail"
                  className="text-sm font-medium text-gray-700"
                >
                  Detail Katekese
                </label>
                <section className="flex w-[10dvw] justify-around border border-gray-300 rounded">
                  <button className="cursor-pointer">
                    <AlignLeft size={15} />
                  </button>
                  <button className="cursor-pointer">
                    <AlignJustify size={15} />
                  </button>
                  <button className="cursor-pointer">
                    <AlignRight size={15} />
                  </button>
                </section>
              </section>
              <textarea
                id="detail"
                rows={12}
                placeholder="Masukkan detail katekese di sini..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed transition-all"
              />
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-white px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row-reverse gap-3 shrink-0">
          <button
            onClick={() => onConfirm({ image: selectedImage })}
            className="cursor-pointer w-full sm:w-auto px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-100"
          >
            Simpan
          </button>
          <button
            onClick={handleClose}
            className="cursor-pointer w-full sm:w-auto px-6 bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        </footer>
      </section>
    </section>,
    document.body,
  );
}
