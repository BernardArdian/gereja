import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Plus,
} from "lucide-react";

import PengumumanComponent from "../../../component/dashboard/pengumuman/pengumumanComponent";
import DetailPengumumanModal from "../../../component/dashboard/pengumuman/detailpengumumanmodal";
import DeleteModal from "../../../component/alert/deleteModal";
import Dropdown from "../../../component/dropdown/dropdown";

const createEmptyForm = () => ({
  judul: "",
  stasi: "",
  waktu: "",
  tanggal: "",
  tempat: "",
  description: "",
  pernikahanData: {
    namaPria: "",
    namaWanita: "",
    tanggalPernikahan: "",
    tempat: "",
    fotoPria: "",
    fotoWanita: "",
  },
  dataPranikah: {
    namaPria: "",
    namaWanita: "",
    namaAyahPria: "",
    namaAyahWanita: "",
    namaIbuPria: "",
    namaIbuWanita: "",
  },
  misa: {
    pemimpin: "",
    dirigen: "",
    organis: "",
    doa: "",
    bacaan: "",
    misdinar: "",
  },
});

export default function Pengumuman() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const isSubmitting = false;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewPria, setPreviewPria] = useState(null);
  const [previewWanita, setPreviewWanita] = useState(null);
  const [formError, setFormError] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [stasiFilter, setStasiFilter] = useState("Semua");

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

  const [formData, setFormData] = useState(createEmptyForm);

  const resetForm = () => {
    setFormData(createEmptyForm());
    setSelectedStatus("");
    setEditingId(null);
    setEditMode(false);
    setPreviewPria(null);
    setPreviewWanita(null);
    setFormError("");
  };

  const filteredData = announcements.filter((item) => {
    const matchesStasi = stasiFilter === "Semua" || item.stasi === stasiFilter;
    const contentToSearch = `
      ${item.judul || ""}
      ${item.description}
      ${item.pernikahanData?.namaPria || ""}
      ${item.pernikahanData?.namaWanita || ""}
      ${item.status}
    `.toLowerCase();
    const matchesSearch = contentToSearch.includes(searchQuery.toLowerCase());
    return matchesStasi && matchesSearch;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
    setFormError("");
  };

  const handleFotoChange = (e, type) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setFormError("Pilih file gambar untuk foto mempelai.");
      e.target.value = "";
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      setFormError("Ukuran foto maksimal 2 MB.");
      e.target.value = "";
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== "string") {
          setFormError("Foto tidak dapat dibaca. Silakan pilih file lain.");
          return;
        }
        if (type === "pria") setPreviewPria(reader.result);
        else setPreviewWanita(reader.result);
        setFormData((previous) => ({
          ...previous,
          pernikahanData: {
            ...previous.pernikahanData,
            [type === "pria" ? "fotoPria" : "fotoWanita"]: reader.result,
          },
        }));
        setFormError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () =>
    Boolean(
      selectedStatus &&
      formData.judul.trim() &&
      formData.stasi &&
      formData.description.trim() &&
      (selectedStatus === "pra-nikah" ||
        (formData.waktu &&
          (selectedStatus === "pernikahan"
            ? formData.pernikahanData.tanggalPernikahan
            : formData.tanggal))) &&
      (selectedStatus !== "pernikahan" ||
        (formData.pernikahanData.namaPria.trim() &&
          formData.pernikahanData.namaWanita.trim() &&
          formData.pernikahanData.tanggalPernikahan &&
          formData.pernikahanData.tempat.trim())),
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFormError("Lengkapi kolom wajib sebelum menyimpan pengumuman.");
      return;
    }
    const item = {
      ...formData,
      id: editingId ?? Date.now(),
      status: selectedStatus,
    };
    setAnnouncements((previous) =>
      editingId
        ? previous.map((announcement) =>
            announcement.id === editingId ? item : announcement,
          )
        : [item, ...previous],
    );
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    setAnnouncements((previous) =>
      previous.filter((item) => item.id !== itemToDelete.id),
    );
    setItemToDelete(null);
  };

  const openNewAnnouncement = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditAnnouncement = (item) => {
    setEditingId(item.id);
    setEditMode(true);
    setSelectedStatus(item.status);
    setFormData({
      ...createEmptyForm(),
      ...item,
      judul:
        item.judul ||
        (item.status === "pernikahan"
          ? `${item.pernikahanData?.namaPria || ""} & ${item.pernikahanData?.namaWanita || ""}`
          : `Pengumuman ${item.status}`),
      tanggal: item.tanggal || item.pernikahanData?.tanggalPernikahan || "",
      tempat: item.tempat || item.pernikahanData?.tempat || "",
      pernikahanData: {
        ...createEmptyForm().pernikahanData,
        ...item.pernikahanData,
      },
      dataPranikah: {
        ...createEmptyForm().dataPranikah,
        ...item.dataPranikah,
      },
      misa: { ...createEmptyForm().misa, ...item.misa },
    });
    setPreviewPria(item.pernikahanData?.fotoPria || null);
    setPreviewWanita(item.pernikahanData?.fotoWanita || null);
    setFormError("");
    setIsModalOpen(true);
  };

  const bgColor = (status) => {
    if (status === "pernikahan") return "bg-rose-50 hover:bg-rose-100";
    if (status === "misa") return "bg-sky-50 hover:bg-sky-100";
    return "bg-white hover:bg-gray-50";
  };

  const badgeColor = (status) => {
    if (status === "pernikahan") return "border-red-500 text-red-600";
    return "border-gray-300 text-gray-800";
  };

  return (
    <section className="min-h-screen flex flex-col font-sans">
      {/* HEADER & FILTERS */}
      <header className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Informasi untuk umat
              </p>
              <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Pengumuman
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Kelola jadwal dan informasi kegiatan paroki.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <label className="relative block min-w-0 flex-1 sm:min-w-55">
                <span className="sr-only">Cari pengumuman</span>
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="search"
                  placeholder="Cari nama atau deskripsi..."
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </label>

              {/* Filter Stasi */}
              <label className="relative block">
                <span className="sr-only">Filter berdasarkan stasi</span>
                <Dropdown
                  ariaLabel="Filter berdasarkan stasi"
                  icon={<Filter size={16} aria-hidden="true" />}
                  value={stasiFilter}
                  onChange={(value) => {
                    setStasiFilter(value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { value: "Semua", label: "Semua Stasi" },
                    { value: "Harapan", label: "Stasi Harapan" },
                    { value: "Kurik", label: "Stasi Kurik" },
                  ]}
                  className="bg-slate-50"
                />
              </label>

              {/* Add Button */}
              <button
                onClick={openNewAnnouncement}
                type="button"
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              >
                <Plus size={18} />
                Input Pengumuman
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* GRID DATA */}
      <main
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1"
        children={
          currentItems.length > 0 ? (
            <section
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              children={currentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleShowDetail(item)}
                  className={`group flex cursor-pointer flex-col rounded-2xl border border-slate-200 p-4 shadow-sm transition hover:shadow-md sm:p-5 ${bgColor(item.status)}`}
                >
                  {/* KONTEN */}
                  <section className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border mb-6 ${badgeColor(
                          item.status,
                        )}`}
                        children={item.status}
                      />

                      {/* TOMBOL AKSI (EDIT & DELETE) - Gue balikin di sini */}
                      <section className="flex gap-1">
                        <button
                          className="p-2 cursor-pointer bg-yellow-100 rounded text-yellow-700 hover:bg-amber-500 hover:text-white transition-all active:scale-75"
                          type="button"
                          aria-label={`Edit pengumuman ${item.judul || item.status}`}
                          onClick={(i) => {
                            i.stopPropagation();
                            openEditAnnouncement(item);
                          }}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="p-2 cursor-pointer bg-rose-200 rounded text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-75"
                          type="button"
                          aria-label={`Hapus pengumuman ${item.judul || item.status}`}
                          onClick={(i) => {
                            i.stopPropagation();
                            setItemToDelete(item);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </section>
                    </div>

                    <section className="space-y-2">
                      <h3
                        className="text-base font-bold text-gray-800 leading-tight capitalize"
                        children={
                          item.judul ? (
                            item.judul
                          ) : item.status === "pernikahan" ? (
                            <span className="block italic text-rose-600">
                              {item.pernikahanData.namaPria} &{" "}
                              {item.pernikahanData.namaWanita}
                            </span>
                          ) : (
                            `Pengumuman ${item.status}`
                          )
                        }
                      />
                      <p
                        className="text-xs text-gray-900 line-clamp-3 leading-relaxed font-medium"
                        children={item.description}
                      />
                    </section>
                  </section>

                  {/* FOOTER CARD */}
                  <footer className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
                    <section className="flex items-center gap-2 text-[15px] font-semibold text-gray-900 uppercase tracking-widest">
                      <MapPin size={16} />
                      <span children={`Stasi ${item.stasi}`} />
                    </section>
                    <section className="flex justify-between text-[16px] font-semibold text-gray-900 uppercase tracking-widest">
                      <section className="flex min-w-0 items-center gap-1.5">
                        <Calendar size={14} aria-hidden="true" />
                        <span>
                          {item.status === "pernikahan"
                            ? item.pernikahanData?.tanggalPernikahan
                            : item.tanggal || "Tanggal belum ditentukan"}
                        </span>
                      </section>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {item.waktu} WITA
                      </div>
                    </section>
                  </footer>
                </div>
              ))}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-gray-300">
              <Search size={64} className="mb-4 opacity-20" />
              <p className="text-xl font-bold">Data tidak ditemukan</p>
            </div>
          )
        }
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-90"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className="flex gap-2"
              children={[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  aria-label={`Halaman ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  className={`w-11 h-11 rounded-2xl text-sm font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                  type="button"
                  children={i + 1}
                />
              ))}
            />
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 disabled:opacity-20 transition-all active:scale-90"
              type="button"
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
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDelete}
        title="Hapus pengumuman?"
        description="Pengumuman yang dihapus tidak akan ditampilkan lagi kepada umat."
        itemName={itemToDelete?.judul || itemToDelete?.status}
        confirmText="Ya, hapus pengumuman"
      />

      {/* MODAL COMPONENT */}
      <PengumumanComponent
        isOpen={isModalOpen}
        editMode={editMode}
        formData={formData}
        selectedStatus={selectedStatus}
        isSubmitting={isSubmitting}
        previews={{ pria: previewPria, wanita: previewWanita }}
        validation={isFormValid}
        formError={formError}
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
            setFormError("");
          },
          pranikah: (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              dataPranikah: { ...prev.dataPranikah, [name]: value },
            }));
            setFormError("");
          },
          misa: (key, value) => {
            setFormData((prev) => ({
              ...prev,
              misa: { ...prev.misa, [key]: value },
            }));
            setFormError("");
          },
          foto: handleFotoChange,
        }}
      />
    </section>
  );
}
