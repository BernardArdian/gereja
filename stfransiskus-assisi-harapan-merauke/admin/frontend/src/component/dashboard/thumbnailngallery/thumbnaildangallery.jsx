import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  FileText,
  Image as ImageIcon,
  Layers,
  MapPin,
  Save,
  Type,
  UploadCloud,
  X,
} from "lucide-react";
import Dropdown from "../../dropdown/dropdown";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function ThumbnaildanGallery({
  isOpen,
  onClose,
  onConfirm,
  initialTab,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || "thumbnail");
  const [title, setTitle] = useState("");
  const [stasi, setStasi] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const isGallery = activeTab === "gallery";

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    if (tab === "thumbnail") {
      setSelectedFiles((files) => files.slice(0, 1));
      setDate("");
      setDescription("");
    }
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    const limit = isGallery ? 10 : 1;
    if (selectedFiles.length + files.length > limit) {
      setError(
        isGallery
          ? "Unggah maksimal 10 foto dalam satu kali input."
          : "Thumbnail hanya menerima satu gambar.",
      );
      event.target.value = "";
      return;
    }
    if (
      files.some(
        (file) =>
          !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
          file.size > 2 * 1024 * 1024,
      )
    ) {
      setError(
        "Gunakan gambar JPG, PNG, atau WebP dengan ukuran maksimal 2 MB.",
      );
      event.target.value = "";
      return;
    }

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result !== "string") {
                reject(new Error(`Gambar ${file.name} tidak dapat dibaca.`));
                return;
              }
              resolve({
                name: file.name,
                url: reader.result,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              });
            };
            reader.onerror = () =>
              reject(new Error(`Gambar ${file.name} gagal dibaca.`));
            reader.readAsDataURL(file);
          }),
      ),
    )
      .then((newFiles) => {
        setSelectedFiles((previous) => [...previous, ...newFiles]);
        setError("");
      })
      .catch((fileError) => {
        setError(fileError.message);
      });
    event.target.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !stasi || !selectedFiles.length) {
      setError("Lengkapi judul, stasi, dan pilih minimal satu gambar.");
      return;
    }
    if (isGallery && !date) {
      setError("Pilih tanggal kegiatan galeri.");
      return;
    }

    onConfirm?.({
      type: activeTab,
      title: title.trim(),
      stasi,
      date,
      description: description.trim(),
      files: selectedFiles,
    });
  };

  return createPortal(
    <section
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="thumbnail-modal-title"
        className="relative flex max-h-[min(94dvh,900px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Galeri media
            </p>
            <h2
              id="thumbnail-modal-title"
              className="mt-1 font-semibold text-slate-900"
            >
              Tambah {isGallery ? "foto galeri" : "thumbnail"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Gambar JPG, PNG, atau WebP · maksimal 2 MB per gambar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir gambar"
            className="shrink-0 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <form
          id="thumbnail-upload-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 sm:p-6"
        >
          <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              aria-pressed={!isGallery}
              onClick={() => handleTabChange("thumbnail")}
              className={`inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                !isGallery
                  ? "bg-amber-50 text-amber-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <ImageIcon size={16} aria-hidden="true" />
              Thumbnail
            </button>
            <button
              type="button"
              aria-pressed={isGallery}
              onClick={() => handleTabChange("gallery")}
              className={`inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                isGallery
                  ? "bg-amber-50 text-amber-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Layers size={16} aria-hidden="true" />
              Galeri
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={15} aria-hidden="true" />
                {isGallery ? "Nama kegiatan" : "Judul thumbnail"}
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={fieldClass}
                placeholder={
                  isGallery ? "Contoh: Misa Natal" : "Contoh: Beranda paroki"
                }
                required
              />
            </label>
            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={15} aria-hidden="true" />
                Stasi
              </span>
              <Dropdown
                ariaLabel="Stasi"
                value={stasi}
                onChange={setStasi}
                placeholder="Pilih stasi"
                className="cursor-pointer"
                required
                options={[
                  { value: "Pusat", label: "Pusat Paroki" },
                  { value: "Harapan", label: "Harapan" },
                  { value: "Kurik", label: "Kurik" },
                ]}
              />
            </label>
            {isGallery && (
              <label className="block space-y-2 sm:col-span-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar size={15} aria-hidden="true" />
                  Tanggal kegiatan
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={fieldClass}
                  required
                />
              </label>
            )}
            {isGallery && (
              <label className="block space-y-2 sm:col-span-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FileText size={15} aria-hidden="true" />
                  Deskripsi singkat (opsional)
                </span>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className={`${fieldClass} min-h-20 resize-y`}
                  placeholder="Ceritakan singkat kegiatan ini."
                />
              </label>
            )}
          </div>

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Pilih gambar
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {isGallery
                  ? `Pilih sampai ${10 - selectedFiles.length} foto lagi.`
                  : "Thumbnail ditampilkan dalam rasio lebar."}
              </p>
            </div>
            {(selectedFiles.length === 0 || isGallery) && (
              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-4 text-center transition hover:border-amber-500 hover:bg-amber-50">
                <UploadCloud
                  size={23}
                  className="text-amber-800"
                  aria-hidden="true"
                />
                <span className="mt-2 text-sm font-semibold text-slate-800">
                  Pilih {isGallery ? "foto" : "thumbnail"}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  JPG, PNG, WebP · maksimal 2 MB
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple={isGallery}
                  onChange={handleFiles}
                  className="sr-only"
                />
              </label>
            )}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {selectedFiles.map((file, index) => (
                  <article
                    key={`${file.name}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <img
                      src={file.url}
                      alt={`Pratinjau ${file.name}`}
                      className={`w-full object-cover ${isGallery ? "aspect-square" : "aspect-video"}`}
                    />
                    <div className="flex items-center justify-between gap-2 p-2">
                      <span className="min-w-0 truncate text-xs text-slate-600">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFiles((previous) =>
                            previous.filter(
                              (_, fileIndex) => fileIndex !== index,
                            ),
                          )
                        }
                        aria-label={`Hapus ${file.name}`}
                        className="shrink-0 cursor-pointer rounded-md p-1 text-rose-700 hover:bg-rose-50"
                      >
                        <X size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            >
              {error}
            </p>
          )}
        </form>

        <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white p-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 cursor-pointer rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            form="thumbnail-upload-form"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            <Save size={16} aria-hidden="true" />
            Simpan gambar
          </button>
        </footer>
      </section>
    </section>,
    document.body,
  );
}
