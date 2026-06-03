import { useState } from "react";
import { X, Save, FileText, Type, Tag, Plus, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

export default function ContentEditorModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Edit Konten",
  //subtitle = "Perbarui informasi detail di bawah ini",
  icon,
  labelTitle = "Judul",
  labelContent = "Konten Narasi",
  showCategory = false,
  categories = [],
  mode = "default",
  initialData = { judul: "", konten: "", category: "", items: [] },
}) {
  // INISIALISASI STATE
  const [judul, setJudul] = useState(initialData.judul || "");
  const [konten, setKonten] = useState(initialData.konten || "");
  const [category, setCategory] = useState(
    initialData.category ||
      (categories.length > 0
        ? categories[0] !== "Semua"
          ? categories[0]
          : categories[1]
        : ""),
  );
  const [items, setItems] = useState(
    Array.isArray(initialData.items) ? [...initialData.items] : [],
  );

  if (!isOpen) return null;
  const IconComponent = icon || FileText;

  // HANDLER ITEM
  const addItem = (e) => {
    e.preventDefault();
    const newItem = mode === "history" ? { tahun: "", event: "" } : "";
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index, value, field) => {
    setItems((prev) => {
      const newItems = [...prev];
      if (mode === "history") {
        newItems[index] = { ...newItems[index], [field]: value };
      } else {
        newItems[index] = value;
      }
      return newItems;
    });
  };

  // Logika penamaan label konten narasi agar dinamis
  const getDynamicLabelContent = () => {
    if (mode === "history") return "Sejarah";
    if (mode === "visimisi") return "Visi Utama";
    return labelContent;
  };

  return createPortal(
    <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <IconComponent size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6 bg-gray-50/30">
          {showCategory && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={16} /> Kategori / Topik
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories
                  .filter((c) => c !== "Semua")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* INPUT JUDUL (Disembunyikan jika mode history/visimisi untuk fokus ke konten utama) */}
          {mode === "default" && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Type size={16} /> {labelTitle}
              </label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {/* INPUT UTAMA (SEJARAH / VISI UTAMA) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText size={16} /> {getDynamicLabelContent()}
            </label>
            <textarea
              rows={mode === "default" ? 8 : 12} // Dibuat lebih tinggi untuk Visi & Sejarah
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              placeholder={`Tuliskan ${getDynamicLabelContent()} di sini...`}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
            />
          </div>

          {/* TIMELINE / DAFTAR MISI */}
          {(mode === "history" || mode === "visimisi") && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">
                  {mode === "history"
                    ? "Garis Waktu (Timeline)"
                    : "Daftar Misi"}
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-3 py-1.5 cursor-pointer text-xs font-bold text-white bg-blue-500 rounded-lg flex items-center gap-1 hover:bg-blue-500/20 hover:text-blue-500 transition-colors"
                >
                  <Plus size={14} /> Tambah time line
                </button>
              </div>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-start bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                  >
                    {mode === "history" ? (
                      <>
                        <input
                          placeholder="Tahun"
                          value={item.tahun || ""}
                          onChange={(e) =>
                            updateItem(idx, e.target.value, "tahun")
                          }
                          className="w-24 px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                        <textarea
                          placeholder="Peristiwa penting..."
                          value={item.event || ""}
                          onChange={(e) =>
                            updateItem(idx, e.target.value, "event")
                          }
                          className="flex-1 px-2 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-indigo-400 outline-none leading-relaxed"
                          rows={3} // Lebih tinggi sedikit
                        />
                      </>
                    ) : (
                      <textarea
                        placeholder={`Misi ke-${idx + 1}`}
                        value={item || ""}
                        onChange={(e) => updateItem(idx, e.target.value)}
                        className="flex-1 px-2 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-indigo-400 outline-none leading-relaxed"
                        rows={3} // Lebih tinggi sedikit
                      />
                    )}
                    <button
                      type="button"
                      onClick={(e) => removeItem(e, idx)}
                      className="text-red-500 p-2 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="py-8 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400 text-xs italic">
                    Belum ada item ditambahkan.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="px-6 py-4 border-t bg-white flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="cursor-pointer w-full sm:w-auto px-6 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-red-500/20 hover:text-red-600 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm({ judul, konten, category, items })}
            className="flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto px-6 bg-amber-600 hover:bg-amber-500/20 hover:text-amber-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            <Save size={16} /> Simpan
          </button>
        </footer>
      </div>
    </section>,
    document.body,
  );
}
