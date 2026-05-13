import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Edit3,
  Trash2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Plus,
} from "lucide-react";

import PengumumanComponent from "../../../component/dashboard/pengumuman/pengumumanComponent";
import DetailPengumumanModal from "../../../component/dashboard/pengumuman/detailpengumumanmodal";

export default function Pengumuman() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [stasiFilter, setStasiFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewPria, setPreviewPria] = useState(null);
  const [previewWanita, setPreviewWanita] = useState(null);

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handler untuk buka detail
  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };
  // Data Dummy (Simulasi data yang sudah ada)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan agung keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 2,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
  ]);

  const [formData, setFormData] = useState({
    stasi: "",
    waktu: "",
    tanggal: "",
    description: "",
    pernikahanData: {
      namaPria: "",
      namaWanita: "",
      tanggalPernikahan: "",
      tempat: "",
    },
    dataPranikah: {
      namaPria: "",
      namaWanita: "",
      namaAyahPria: "",
      namaAyahWanita: "",
      namaIbuPria: "",
      namaIbuWanita: "",
    },
  });

  // --- 2. LOGIC FILTER & SEARCH ---
  // Berkat React Compiler, variabel ini otomatis termemoyisasi
  const filteredData = announcements.filter((item) => {
    const matchesStasi = stasiFilter === "Semua" || item.stasi === stasiFilter;
    const contentToSearch = `
      ${item.description} 
      ${item.pernikahanData?.namaPria || ""} 
      ${item.pernikahanData?.namaWanita || ""} 
      ${item.status}
    `.toLowerCase();
    const matchesSearch = contentToSearch.includes(searchQuery.toLowerCase());
    return matchesStasi && matchesSearch;
  });

  // --- 3. PAGINATION LOGIC ---
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // --- 4. HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleFotoChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "pria") setPreviewPria(reader.result);
        else setPreviewWanita(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulasi API Delay
      await new Promise((r) => setTimeout(r, 800));
      const newItem = {
        ...formData,
        id: Date.now(),
        status: selectedStatus,
      };
      setAnnouncements([newItem, ...announcements]);
      setIsModalOpen(false);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      stasi: "",
      waktu: "",
      tanggal: "",
      description: "",
      pernikahanData: {
        namaPria: "",
        namaWanita: "",
        tanggalPernikahan: "",
        tempat: "",
      },
      dataPranikah: {
        namaPria: "",
        namaWanita: "",
        namaAyahPria: "",
        namaAyahWanita: "",
        namaIbuPria: "",
        namaIbuWanita: "",
      },
    });
    setSelectedStatus("");
    setPreviewPria(null);
    setPreviewWanita(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus pengumuman ini?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <section className="min-h-screen flex flex-col font-sans">
      {/* HEADER & FILTERS */}
      <header className="bg-white rounded-2xl border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif text-gray-900 tracking-tight">
                Pengumuman
              </h1>
              <p className="text-sm text-gray-900 font-serif">
                Manajemen konten informasi jemaat
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[240px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari nama atau deskripsi..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Filter Stasi */}
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 outline-none appearance-none cursor-pointer"
                  value={stasiFilter}
                  onChange={(e) => {
                    setStasiFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">Semua Stasi</option>
                  <option value="Harapan">Stasi Harapan</option>
                  <option value="Kurik">Stasi Kurik</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={() => {
                  setEditMode(false);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-500/50 text-white
                 rounded-3xl text-sm font-black shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                <Plus size={18} />
                INPUT PENGUMUMAN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* GRID DATA */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {currentItems.length > 0 ? (
          /* items-start bikin pengumuman teks nggak maksa tinggi kayak pernikahan */
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-gray-100 divide-x border border-gray-100 rounded overflow-hidden">
            {currentItems.map((item) => (
              <form
                key={item.id}
                onClick={() => handleShowDetail(item)}
                className="bg-gray-100/50 hover:bg-slate-200/50 transition-colors cursor-pointer flex flex-col p-8 group"
              >
                {/* KONTEN */}
                <section className="p-6">
                  <form className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        item.status === "pernikahan"
                          ? "bg-rose-50 text-rose-500"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* TOMBOL AKSI (EDIT & DELETE) - Gue balikin di sini */}
                    <section className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-indigo-600"
                        onClick={(e) => {
                          e.stopPropagation(); // Biar gak trigger modal detail
                          setFormData(item);
                          setSelectedStatus(item.status);
                          setEditMode(true);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation(); // Biar gak trigger modal detail
                          handleDelete(item.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </section>
                  </form>

                  <form className="space-y-2">
                    <h3 className="text-base font-bold text-gray-800 leading-tight capitalize">
                      {item.status === "pernikahan" ? (
                        <span className="block italic text-rose-600">
                          {item.pernikahanData.namaPria} &{" "}
                          {item.pernikahanData.namaWanita}
                        </span>
                      ) : (
                        `Pengumuman ${item.status}`
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </form>
                </section>

                {/* FOOTER CARD */}
                <footer className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
                  <form className="flex items-center gap-2 text-[10px] text-gray-900 uppercase tracking-widest">
                    <MapPin size={11} />
                    <span>Stasi {item.stasi}</span>
                  </form>
                  <section className="flex justify-between text-[10px] text-gray-900 uppercase tracking-widest">
                    <form className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {item.status === "pernikahan"
                        ? item.pernikahanData.tanggalPernikahan
                        : item.tanggal}
                    </form>
                    <form className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {item.waktu} WITA
                    </form>
                  </section>
                </footer>
              </form>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-300">
            <Search size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-bold">Data tidak ditemukan</p>
          </div>
        )}
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-2xl text-sm font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      )}

      <DetailPengumumanModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedDetail}
      />

      {/* MODAL COMPONENT */}
      <PengumumanComponent
        isOpen={isModalOpen}
        editMode={editMode}
        formData={formData}
        selectedStatus={selectedStatus}
        isSubmitting={isSubmitting}
        previews={{ pria: previewPria, wanita: previewWanita }}
        validation={() =>
          selectedStatus && formData.stasi && formData.description
        }
        handlers={{
          cancel: () => {
            setIsModalOpen(false);
            resetForm();
          },
          submit: handleSubmit,
          input: handleInputChange,
          status: handleStatusChange,
          pernikahan: (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              pernikahanData: { ...prev.pernikahanData, [name]: value },
            }));
          },
          pranikah: (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              dataPranikah: { ...prev.dataPranikah, [name]: value },
            }));
          },
          foto: handleFotoChange,
        }}
      />
    </section>
  );
}
