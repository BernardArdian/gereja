import { useState } from "react";
import {
  BookOpen,
  Search,
  ChevronDown,
  FileText,
  Edit3,
  Trash2,
  Plus,
  MoreVertical,
  Calendar,
} from "lucide-react";
import ContentEditorModal from "../../../component/dashboard/content_editor/ContentEditorModal";

export default function Pedoman() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [openAccordion, setOpenAccordion] = useState(null);

  // Data Dummy Pedoman
  const [pedomanList, _setPedomanList] = useState([
    {
      id: 1,
      title: "Tata Cara Baptis Bayi",
      category: "Sakramen",
      updatedAt: "2024-01-15",
      content:
        "Persyaratan administrasi meliputi foto kopi surat nikah gereja orang tua, kartu keluarga paroki...",
    },
    {
      id: 2,
      title: "Prosedur Peminjaman Aula",
      category: "Umum",
      updatedAt: "2024-02-10",
      content:
        "Pemesanan aula dilakukan minimal 1 bulan sebelum hari H melalui sekretariat paroki...",
    },
    {
      id: 3,
      title: "Alur Pendaftaran Krisma",
      category: "Sakramen",
      updatedAt: "2024-03-01",
      content:
        "Calon penerima krisma minimal berusia 14 tahun atau sudah duduk di bangku SMP...",
    },
  ]);

  // Logika Filter (React Compiler otomatis mengoptimalkan ini)
  const filteredPedoman = pedomanList.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Semua", "Sakramen", "Umum", "Liturgi", "Keuangan"];

  return (
    <section className="min-h-screen flex flex-col">
      {/* HEADER & CONTROLS */}
      <header className="bg-white rounded-2xl sticky top-0 z-20 ">
        <section className="max-w-6xl mx-auto px-6 py-5">
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-800 tracking-tight">
                Pedoman Pastoral
              </h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                Manajemen Aturan & Prosedur
              </p>
            </div>

            <section className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Cari pedoman..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-500/20 hover:text-blue-500 text-white text-sm font-bold 
                rounded-3xl transition-all active:scale-95"
              >
                <Plus size={18} />
                Input Pedoman
              </button>
            </section>
          </section>

          {/* Category Chips */}
          <section className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 cursor-pointer rounded-full text-xs font-black transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-indigo-600/20 text-indigo-700"
                    : "bg-gray-100 text-gray-400 hover:bg-indigo-600/20 hover:text-indigo-600"
                }`}
                children={cat}
              />
            ))}
          </section>
        </section>
      </header>

      {/* LIST CONTENT */}
      <main className="max-w-6xl mx-auto w-full px-6 py-8">
        <section>
          {filteredPedoman.length > 0 ? (
            filteredPedoman.map((item) => (
              <>
                {/* Accordion Header */}
                <section
                  key={item.id}
                  className="p-5 flex hover:bg-slate-200/40 bg-white/40 overflow-hidden ml-15 mr-15 items-center border border-gray-400 mb-1 justify-between cursor-pointer group rounded"
                  onClick={() =>
                    setOpenAccordion(openAccordion === item.id ? null : item.id)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-indigo-500 uppercase">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <Calendar size={10} /> Diperbarui: {item.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="cursor-pointer p-2 hover:bg-yellow-100 rounded-lg text-gray-400 hover:text-yellow-600"
                        onClick={""}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="cursor-pointer p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                        onClick={""}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${openAccordion === item.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </section>

                {/* Accordion Body */}
                <section
                  className={`px-5 transition-all duration-300 ease-in-out ${
                    openAccordion === item.id
                      ? "max-h-[500px] pb-5 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <section className="pt-4 border-t border-gray-50 text-sm text-gray-600 leading-relaxed font-medium">
                    {item.content}
                    <div className="mt-6 flex justify-end gap-3 md:hidden">
                      <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold text-gray-600">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold">
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </section>
                </section>
              </>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center opacity-30">
              <BookOpen size={48} className="mb-4" />
              <p className="font-bold">Pedoman tidak ditemukan</p>
            </div>
          )}
        </section>
      </main>

      {/* MODAL */}
      <ContentEditorModal
        key={isModalOpen ? "pedoman-open" : "closed"} // Reset state tiap kali buka
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(newData) => {
          // Di sini data kategori bakal ikut kesimpan
          console.log("Simpan Pedoman:", newData);
          // newData berisi: { judul, konten, category }
          setIsModalOpen(false);
        }}
        title="Panel Konten Pedoman"
        icon={BookOpen}
        showCategory={true} // AKTIFKAN FIELD KATEGORI
        categories={categories}
      />
    </section>
  );
}
