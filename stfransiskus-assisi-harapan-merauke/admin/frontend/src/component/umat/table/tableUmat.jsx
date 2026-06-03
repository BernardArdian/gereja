import { useState, useMemo } from "react";
import {
  Search,
  MoreVertical,
  MapPin,
  Edit2,
  Trash2,
  Pencil,
} from "lucide-react";

import AlertDialogModal from "../../../util/alertDialog.jsx";

export default function TableUmat({ umatList, onEdit, onDelete }) {
  const [stasiFilter, setStasiFilter] = useState("");
  const [statusNikahFilter, setStatusNikahFilter] = useState("");
  const [sakramenFilter, setSakramenFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeEditStatus, setActiveEditStatus] = useState(null);

  const filteredUmat = useMemo(() => {
    return (umatList || []).filter(
      (item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noKk?.includes(searchQuery),
    );
  }, [searchQuery, umatList]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete?.(selectedId);
    setIsModalOpen(false);
  };

  return (
    <main className="w-full space-y-6 antialiased">
      {/* SEARCH BAR - Modern Floating Style */}
      <header className="max-w-5xl mx-auto px-4 md:px-0">
        <form className="flex flex-col md:flex-row gap-3 items-center">
          <section className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari Nama atau No. KK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
            />
          </section>
          <section className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              className="w-full md:w-44 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-600 outline-none cursor-pointer hover:border-slate-300 transition-all appearance-none"
              value={statusNikahFilter}
              onChange={(i) => setStatusNikahFilter(i.target.value)}
            >
              <option value="" disabled hidden>
                - Status Pernikahan
              </option>
              <option value="lajang">belum menikah</option>
              <option value="menikah">sudah menikah</option>
              <option value="janda">janda</option>
              <option value="duda">duda</option>
            </select>
          </section>
          <section className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              className="w-full md:w-44 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-600 outline-none cursor-pointer hover:border-slate-300 transition-all appearance-none"
              value={stasiFilter}
              onChange={(i) => setStasiFilter(i.target.value)}
            >
              <option value="" hidden>
                - Stasi
              </option>
              <option value="Harapan">Stasi Harapan</option>
              <option value="Kurik">Stasi Kurik</option>
            </select>

            <select
              className="w-full md:w-44 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-600 outline-none cursor-pointer hover:border-slate-300 transition-all appearance-none"
              value={sakramenFilter}
              onChange={(i) => {
                setSakramenFilter(i.target.value);
              }}
            >
              <option value="" disabled hidden>
                - Sakramen
              </option>
              <option value="Baptis">Baptis</option>
              <option value="Komuni Pertama">Komuni Pertama</option>
              <option value="Krisma">Krisma</option>
              <option value="Perkawinan">Perkawinan</option>
            </select>
          </section>
        </form>
      </header>

      {/* TABEL DATA  */}
      <section className="bg-white rounded border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0 min-w-[600px] md:min-w-full">
          <thead>
            <tr className="text-gray-900 text-center font-serif">
              <th className="px-4 md:px-8 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Data Umat & KK
              </th>
              {/* Sembunyikan kolom tertentu di mobile jika perlu, atau biarkan overflow-x-auto menangani */}
              <th className="px-4 md:px-6 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Status Nikah
              </th>
              <th className="px-4 md:px-6 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Sakramen
              </th>
              <th className="px-4 md:px-8 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Kelola
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUmat.map((item, index) => (
              <tr
                key={item.id || index}
                onClick={() => onEdit(item)}
                className={`group cursor-pointer hover:bg-slate-50/80 transition-all duration-200 ${item.statusHidup === "meninggal" ? "bg-red-50/40" : ""}`}
              >
                {/* INFO UTAMA */}
                <td className="px-4 md:px-8 py-5">
                  <div className="flex flex-col items-center md:items-start">
                    <span
                      className={`text-center md:text-left text-base font-bold tracking-tight ${item.statusHidup === "meninggal" ? "text-red-600 italic" : "text-slate-800"}`}
                    >
                      {item.name} {item.statusHidup === "meninggal" && "†"}
                    </span>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-[11px] font-medium text-slate-600 mt-1 uppercase tracking-wide">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {item.stasiKeluarga || "Tanpa Stasi"}
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span>KK: {item.noKk || "-"}</span>
                    </div>
                  </div>
                </td>

                {/* STATUS NIKAH */}
                <td
                  className="px-4 md:px-6 py-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <section className="flex flex-col sm:flex-row items-center justify-center gap-2 relative">
                    <span
                      className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        item.statusNikah === "menikah"
                          ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                          : item.statusNikah === "janda" ||
                              item.statusNikah === "duda"
                            ? "bg-amber-50 border-amber-100 text-amber-600"
                            : "bg-blue-50 border-slate-100 text-gray-900"
                      }`}
                    >
                      {item.statusNikah || "belum menikah"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEditStatus(
                          activeEditStatus === item.id ? null : item.id,
                        );
                      }}
                      className="cursor-pointer p-1.5 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    {activeEditStatus === item.id && (
                      <>
                        <div
                          className="fixed inset-0 z-[125]"
                          onClick={() => setActiveEditStatus(null)}
                        ></div>

                        <div
                          className={`absolute left-1/2 -translate-x-1/2 z-[130] w-36 bg-white border border-slate-100 shadow-2xl rounded-2xl p-1.5 animate-in fade-in zoom-in duration-150
      ${index >= filteredUmat.length - 2 ? "bottom-full mb-3" : "top-full mt-2"}
    `}
                        >
                          <div className="px-3 py-2 mb-1 border-b border-slate-50">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">
                              Ubah Status Nikah
                            </p>
                          </div>

                          {["Menikah", "Duda", "Janda"].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                console.log(`Update status ke: ${status}`);
                                setActiveEditStatus(null);
                              }}
                              className={`cursor-pointer w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center gap-2
            ${
              item.statusNikah?.toLowerCase() === status.toLowerCase()
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-500"
            }
          `}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.statusNikah?.toLowerCase() ===
                                  status.toLowerCase()
                                    ? "bg-indigo-500"
                                    : "bg-slate-200"
                                }`}
                              />
                              {status}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </section>
                </td>

                {/* SAKRAMEN */}
                <td className="px-4 md:px-6 py-4 text-center">
                  <div className="flex justify-center gap-1.5">
                    {["baptis", "komuni", "krisma"].map((s) => {
                      const isDone = item[s]?.status === "sudah";
                      return (
                        <div
                          key={s}
                          className={`w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center text-[9px] md:text-[10px] font-bold uppercase transition-all border ${
                            isDone
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                              : "bg-blue-300/50 border-slate-100 text-gray-800"
                          }`}
                        >
                          {s.charAt(0)}
                        </div>
                      );
                    })}
                  </div>
                </td>

                {/* AKSI */}
                <td
                  className="px-4 md:px-8 py-4 text-right relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <section className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2">
                    <button
                      className="w-full sm:w-auto flex items-center justify-center gap-1 cursor-pointer p-2 text-yellow-500 hover:text-amber-500 hover:bg-amber-100 rounded-xl transition-colors"
                      title="Edit Data Umat"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                        setActiveMenu(activeMenu === item.id ? null : item.id);
                      }}
                    >
                      <Pencil size={18} />
                      <span className="text-[10px] font-bold uppercase md:hidden lg:inline">
                        edit
                      </span>
                    </button>
                    <button
                      className="w-full sm:w-auto flex items-center justify-center gap-1 cursor-pointer p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Hapus Data Umat"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(item.id);
                        setActiveMenu(activeMenu === item.id ? null : item.id);
                      }}
                    >
                      <Trash2 size={18} />
                      <span className="text-[10px] font-bold uppercase md:hidden lg:inline">
                        hapus
                      </span>
                    </button>
                  </section>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AlertDialogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Data Umat?"
        description="Apakah Anda yakin? Data yang dihapus tidak dapat dikembalikan secara permanen."
        confirmText="Ya, Hapus"
        type="danger"
      />
    </main>
  );
}
