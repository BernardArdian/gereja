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

export default function Thumbnail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("thumbnail");
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDelete = (id, type) => {
    if (window.confirm("Hapus gambar ini?")) {
      setImages((prev) => ({
        ...prev,
        [type]: prev[type].filter((img) => img.id !== id),
      }));
    }
  };

  return (
    <section className="min-h-screen flex flex-col relative">
      {/* HEADER TABS */}
      <header className="bg-white sticky top-0 z-30 shadow-sm rounded-2xl">
        <section className="flex flex-row justify-between items-center px-8">
          <section className="flex gap-8">
            <button
              onClick={() => setActiveTab("thumbnail")}
              className={`cursor-pointer font-serif py-5 text-[10px] font-black flex items-center gap-2 border-b-2 transition-all ${activeTab === "thumbnail" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400"}`}
            >
              <Layout size={16} /> THUMBNAIL PAGE
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`cursor-pointer font-serif py-5 text-[10px] font-black flex items-center gap-2 border-b-2 transition-all ${activeTab === "gallery" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400"}`}
            >
              <Grid2X2 size={16} /> GALLERY CONTENT
            </button>
          </section>
          <section className="py-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-gray-100 text-[0.8em] font-black 
              rounded-3xl bg-blue-500 hover:bg-blue-500/50 transition-all active:scale-95"
            >
              <Plus size={18} />
              Upload {activeTab.toLowerCase()}
            </button>
          </section>
        </section>

        {/* --- BARIS FILTER STASI (KHUSUS GALLERY) --- */}
        {activeTab === "gallery" && (
          <section className="px-8 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <section className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-2xl border border-gray-200 text-indigo-600">
                <MapPin size={14} />
              </div>
              <div className="flex gap-1.5">
                {daftarStasi.map((stasi) => (
                  <button
                    key={stasi}
                    onClick={() => setStasiFilter(stasi)}
                    className={`cursor-pointer font-serif px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                      stasiFilter === stasi
                        ? "bg-blue-600/60 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {stasi.toUpperCase()}
                  </button>
                ))}
              </div>
            </section>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari di galeri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </section>
        )}
      </header>

      {/* GRID DISPLAY */}
      <main className="p-8 flex-1">
        <section className="max-w-7xl mx-auto">
          <div
            className={`grid gap-0.5 ${activeTab === "thumbnail" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
          >
            {/* thumbnail */}
            {(activeTab === "thumbnail"
              ? images.thumbnail
              : filteredGallery
            ).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="cursor-pointer group bg-white rounded overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="cursor-pointer p-3 bg-white rounded-2xl text-indigo-600"
                    >
                      <Maximize2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, activeTab)}
                      className="cursor-pointer p-3 bg-white rounded-2xl text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {/* Badge Stasi di pojok gambar */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black text-indigo-600 rounded-lg shadow-sm">
                      STASI {item.stasi.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase mt-1">
                    {item.date || item.size}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* gallery */}
          {activeTab === "gallery" && filteredGallery.length === 0 && (
            <form className="py-32 text-center opacity-20">
              <ImageIcon size={64} className="mx-auto mb-4" />
              <p className="font-black uppercase text-sm">
                Tidak ada foto di Stasi {stasiFilter}
              </p>
            </form>
          )}
        </section>
      </main>

      {/* LIGHTBOX PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <button className="cursor-pointer absolute -top-12 right-0 text-white hover:text-red-400 transition-colors">
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={activeTab}
      />
    </section>
  );
}
