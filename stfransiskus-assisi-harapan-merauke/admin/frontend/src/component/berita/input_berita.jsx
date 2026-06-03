import {
  Link2,
  Info,
  X,
  User2,
  Type,
  Edit2,
  ImageIcon,
  UploadCloud,
  Calendar1Icon,
  Text,
  Save,
} from "lucide-react";

import { useState, useEffect } from "react";
import FormField from "../formField";

export default function InputBerita({
  isOpen,
  editMode,
  formData,
  isSubmitting,
  handlers,
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

  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-gary-900/60 backdrop-blur-sm z-[80] transition-opacity"
        onClick={handlers.cancel}
      />

      <form className="fixed inset-0 z-[90] flex items-center justify-center">
        <section className="h-min-screen w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? "Edit Pengumuman" : "Panel Manajemen Konten Berita"}
              </h2>
            </div>
            <button
              onClick={handlers.cancel}
              className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
              disabled={isSubmitting}
            >
              <X />
            </button>
          </div>

          <form
            onSubmit={handlers.submit}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
          >
            <section>
              <section className="flex flex-col sm:flex-row gap-6">
                <section className="relative flex  flex-shrink-0 flex-col h-[68dvh] w-full sm:w-2/5 aspect-square bg-white group overflow-hidden">
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
                            Ganti Thumbnail
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
                        <span className="mt-2 text-xs font-semibold text-gray-500/50 group-hover:text-indigo-600 text-center">
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
                    <FormField label="Image Url" icon={<Link2 size={16} />}>
                      <input
                        id="url"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        type="text"
                        placeholder="Image Url"
                      />
                    </FormField>
                  </div>
                </section>

                <section className="flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <FormField label="Judul Berita" icon={<Edit2 size={16} />}>
                      <input
                        id="judul"
                        value={formData.judul}
                        onChange={handlers.input}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Judul berita"
                      />
                    </FormField>

                    <FormField
                      label="Author/Penulis"
                      icon={<User2 size={16} />}
                    >
                      <input
                        id="author"
                        value={formData.authauthor}
                        onChange={handlers.input}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="penluis(default admin)"
                      />
                    </FormField>
                    <FormField
                      label="Tanggal"
                      icon={<Calendar1Icon size={16} />}
                    >
                      <input
                        id="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handlers.input}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        type="date"
                        disabled={isSubmitting}
                        placeholder="tanggal upload"
                      />
                    </FormField>
                  </div>
                </section>
              </section>
            </section>

            <FormField label="Dekskripsi Berita" icon={<Info size={16} />}>
              <textarea
                name="description"
                placeholder="Tulis deskripsi berita..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 h-55 resize-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                value={formData.description}
                onChange={handlers.input}
                disabled={isSubmitting}
              />
            </FormField>

            <footer
              className="flex w-full h-[10dvh] items-cenetr justify-end 
          bg-white gap-2"
            >
              <button
                type="button"
                onClick={handlers.cancel}
                className="w-[15dvw] flex items-center justify-center cursor-pointer bg-red-600 text-white rounded-2xl py-4 font-bold hover:bg-red-500/20 hover:text-red-600 transition-all disabled:opacity-50"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-[15dvw] flex items-center justify-center gap-1 cursor-pointer rounded-2xl py-4 font-bold transition-all ${
                  !isSubmitting
                    ? "bg-blue-500 text-white hover:bg-blue-500/20 hover:text-blue-600"
                    : "bg-indigo-300 text-white cursor-not-allowed"
                }`}
                onClick={selectedImage}
              >
                <Save size={16} />
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    {editMode ? "Memperbarui..." : "Uploading..."}
                  </span>
                ) : editMode ? (
                  "Update"
                ) : (
                  "Upload"
                )}
              </button>
            </footer>
          </form>
        </section>
      </form>
    </>
  );
}
