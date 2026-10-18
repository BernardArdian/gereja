import { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Maximize2,
  Layout,
  Grid2X2,
  MapPin,
  X,
  Search,
} from "lucide-react";

import ThumbnaildanGallery from "../../../component/dashboard/thumbnailngallery/thumbnaildangallery";
import DeleteModal from "../../../component/alert/deleteModal";

export default function Thumbnail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("thumbnail");
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // --- STATE FILTER STASI ---
  const [stasiFilter, setStasiFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const [images, setImages] = useState({
    thumbnail: [
      {
        id: 1,
        url: "https://picsum.photos/seed/church1/1200/800",
        title: "Header Utama",
        size: "1.2 MB",
        stasi: "Pusat",
      },
    ],
    gallery: [
      {
        id: 3,
        url: "https://picsum.photos/seed/gal1/1000/1000",
        title: "Misa Minggu",
        date: "20 Jan 2024",
        stasi: "Harapan",
      },
      {
        id: 4,
        url: "https://picsum.photos/seed/gal2/1000/1000",
        title: "Kegiatan OMK",
        date: "15 Jan 2024",
        stasi: "Kurik",
      },
      {
        id: 5,
        url: "https://picsum.photos/seed/gal3/1000/1000",
        title: "Bakti Sosial",
        date: "10 Jan 2024",
        stasi: "Harapan",
      },
      {
        id: 6,
        url: "https://picsum.photos/seed/gal4/1000/1000",
        title: "Pembangunan Gereja",
        date: "05 Jan 2024",
        stasi: "Kurik",
      },
    ],
  });

  // --- LOGIC FILTER BERDASARKAN STASI ---
  const filteredGallery = images.gallery.filter((img) => {
    const matchesStasi = stasiFilter === "Semua" || img.stasi === stasiFilter;
    const matchesSearch = img.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStasi && matchesSearch;
  });

  const daftarStasi = ["Semua", "Harapan", "Kurik", "Pusat"];

  const handleDelete = () => {
    if (!itemToDelete) return;
    setImages((previous) => ({
      ...previous,
      [itemToDelete.type]: previous[itemToDelete.type].filter(
        (image) => image.id !== itemToDelete.id,
      ),
    }));
    setSelectedImage((selected) =>
      selected?.id === itemToDelete.id ? null : selected,
    );
    setItemToDelete(null);
  };

  const handleUpload = ({ type, title, stasi, date, description, files }) => {
    const newItems = files.map((file, index) => ({
      id: Date.now() + index,
      url: file.url,
      title: files.length > 1 ? `${title} ${index + 1}` : title,
      date: date || new Date().toLocaleDateString("id-ID"),
      size: file.size,
      stasi,
      description,
    }));
    setImages((previous) => ({
      ...previous,
      [type]:
        type === "thumbnail"
          ? newItems.slice(0, 1)
          : [...newItems, ...previous.gallery],
    }));
    setIsModalOpen(false);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5">
      <header className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <section className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <nav
            className="flex w-fit rounded-xl border border-slate-200 bg-slate-50 p-1"
            aria-label="Kategori media"
          >
            <button
              type="button"
              aria-pressed={activeTab === "thumbnail"}
              onClick={() => setActiveTab("thumbnail")}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold transition sm:px-4 ${activeTab === "thumbnail" ? "bg-white text-amber-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Layout size={16} aria-hidden="true" /> Thumbnail
            </button>
            <button
              type="button"
              aria-pressed={activeTab === "gallery"}
              onClick={() => setActiveTab("gallery")}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold transition sm:px-4 ${activeTab === "gallery" ? "bg-white text-amber-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Grid2X2 size={16} aria-hidden="true" /> Galeri
            </button>
          </nav>
          <section>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              <Plus size={17} aria-hidden="true" />
              Tambah {activeTab === "thumbnail" ? "thumbnail" : "foto galeri"}
            </button>
          </section>
        </section>

        {/* --- BARIS FILTER STASI (KHUSUS GALLERY) --- */}
        {activeTab === "gallery" && (
          <section className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <section className="flex items-center gap-2">
              <div className="rounded-xl border border-slate-200 bg-white p-2 text-amber-800">
                <MapPin size={15} aria-hidden="true" />
              </div>
              <div
                className="flex min-w-0 gap-1.5 overflow-x-auto"
                children={daftarStasi.map((stasi) => (
                  <button
                    key={stasi}
                    type="button"
                    aria-pressed={stasiFilter === stasi}
                    onClick={() => setStasiFilter(stasi)}
                    className={`min-h-9 shrink-0 cursor-pointer rounded-lg px-3 text-xs font-semibold transition ${
                      stasiFilter === stasi
                        ? "bg-amber-700 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    children={stasi.toUpperCase()}
                  />
                ))}
              />
            </section>

            {/* Search Bar */}
            <label className="relative block w-full sm:w-64">
              <span className="sr-only">Cari foto galeri</span>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari di galeri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>
          </section>
        )}
      </header>

      {/* GRID DISPLAY */}
      <main className="min-w-0 flex-1">
        <section className="max-w-7xl mx-auto">
          <div
            className={`grid gap-3 sm:gap-4 ${activeTab === "thumbnail" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
            children={(activeTab === "thumbnail"
              ? images.thumbnail
              : filteredGallery
            ).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`relative overflow-hidden cursor-pointer ${activeTab === "thumbnail" ? "aspect-video" : "aspect-square"}`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onClick={() => setSelectedImage(item)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/25 opacity-100 transition-opacity sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100">
                    <button
                      type="button"
                      aria-label={`Pratinjau ${item.title}`}
                      onClick={() => setSelectedImage(item)}
                      className="cursor-pointer rounded-xl bg-white p-3 text-amber-800"
                    >
                      <Maximize2 size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Hapus ${item.title}`}
                      onClick={(i) => {
                        i.stopPropagation();
                        setItemToDelete({ ...item, type: activeTab });
                      }}
                      className="cursor-pointer rounded-xl bg-white p-3 text-rose-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {/* Badge Stasi di pojok gambar */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-white/90 px-3 py-1 text-[10px] font-semibold text-amber-900 backdrop-blur-md">
                      STASI {(item.stasi || "Pusat").toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4
                    className="text-sm font-bold text-gray-800 line-clamp-1"
                    children={item.title}
                  />
                  <p
                    className="mt-1 text-xs text-slate-500"
                    children={item.date || item.size}
                  />
                </div>
              </div>
            ))}
          />

          {/* gallery */}
          {(activeTab === "gallery" ? filteredGallery : images.thumbnail)
            .length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
              <ImageIcon
                size={30}
                className="mx-auto text-slate-400"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Belum ada gambar
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tambahkan gambar untuk menampilkannya di sini.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* LIGHTBOX PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup pratinjau"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 cursor-pointer rounded-lg p-2 text-white transition hover:bg-white/10 hover:text-rose-300"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-6 text-center text-white">
              <span className="text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                Stasi {selectedImage.stasi}
              </span>
              <h3 className="text-2xl font-black mt-1 tracking-tight">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <ThumbnaildanGallery
        key={`${isModalOpen}-${activeTab}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUpload}
        initialTab={activeTab}
      />
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        title={`Hapus ${activeTab === "thumbnail" ? "thumbnail" : "foto galeri"}?`}
        description="Gambar yang dihapus akan dihilangkan dari daftar media."
        itemName={itemToDelete?.title}
        confirmText="Ya, hapus gambar"
      />
    </section>
  );
}
