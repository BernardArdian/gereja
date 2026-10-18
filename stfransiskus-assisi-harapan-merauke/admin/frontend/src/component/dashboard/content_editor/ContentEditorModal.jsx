import { useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Plus, Save, Tag, Trash2, Type, X } from "lucide-react";
import DeleteModal from "../../alert/deleteModal";
import Dropdown from "../../dropdown/dropdown";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function ContentEditorModal({
  isOpen,
  handlers = {},
  title = "Edit konten",
  icon,
  labelTitle = "Judul",
  labelContent = "Konten narasi",
  showCategory = false,
  categories = [],
  mode = "default",
}) {
  const initialData = handlers.initialData || {};
  const [judul, setJudul] = useState(initialData.judul || "");
  const [konten, setKonten] = useState(initialData.konten || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [items, setItems] = useState(
    Array.isArray(initialData.items) ? initialData.items : [],
  );
  const [itemIndexToDelete, setItemIndexToDelete] = useState(null);
  const IconComponent = icon || FileText;

  const isValid =
    mode === "visimisi"
      ? konten.trim() !== "" &&
        items.length > 0 &&
        items.every((item) => typeof item === "string" && item.trim())
      : mode === "history"
        ? konten.trim() !== "" &&
          items.length > 0 &&
          items.every(
            (item) => item.tahun?.trim() && item.event?.trim(),
          )
        : judul.trim() !== "" &&
          konten.trim() !== "" &&
          (!showCategory || Boolean(category));

  if (!isOpen) return null;

  const contentLabel =
    mode === "history"
      ? labelContent
      : mode === "visimisi"
        ? "Visi utama"
        : labelContent;

  const updateItem = (index, value, field) => {
    setItems((previous) =>
      previous.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        return mode === "history" ? { ...item, [field]: value } : value;
      }),
    );
  };

  const addItem = () => {
    setItems((previous) => [
      ...previous,
      mode === "history" ? { tahun: "", event: "" } : "",
    ]);
  };

  const removeItem = () => {
    if (itemIndexToDelete === null) return;
    setItems((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== itemIndexToDelete),
    );
    setItemIndexToDelete(null);
  };

  return (
    <>
      {createPortal(
    <section
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handlers.close?.();
      }}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="content-editor-title"
        className="relative flex max-h-[min(92dvh,900px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
              <IconComponent size={19} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2
                id="content-editor-title"
                className="truncate font-semibold text-slate-900"
              >
                {title}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Perubahan ditampilkan setelah disimpan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlers.close}
            aria-label="Tutup formulir"
            className="shrink-0 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 sm:space-y-6 sm:p-6">
          {showCategory && (
            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Tag size={16} aria-hidden="true" />
                Kategori / topik
              </span>
              <Dropdown
                ariaLabel="Kategori atau topik"
                value={category}
                onChange={setCategory}
                placeholder="Pilih kategori"
                required
                className={fieldClass}
                options={categories
                  .filter((item) => item !== "Semua")
                  .map((item) => ({ value: item, label: item }))}
              />
            </label>
          )}

          {mode === "default" && (
            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={16} aria-hidden="true" />
                {labelTitle}
              </span>
              <input
                type="text"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
                className={fieldClass}
                placeholder={`Masukkan ${labelTitle.toLowerCase()}`}
              />
            </label>
          )}

          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText size={16} aria-hidden="true" />
              {contentLabel}
            </span>
            <textarea
              rows={mode === "default" ? 7 : 9}
              value={konten}
              onChange={(event) => setKonten(event.target.value)}
              placeholder={`Tuliskan ${contentLabel.toLowerCase()} di sini...`}
              className={`${fieldClass} min-h-36 resize-y leading-6`}
            />
          </label>

          {(mode === "history" || mode === "visimisi") && (
            <section className="space-y-3">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  {mode === "history" ? "Garis waktu" : "Daftar misi"}
                </h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex min-h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                >
                  <Plus size={15} aria-hidden="true" />
                  {mode === "history" ? "Tambah peristiwa" : "Tambah misi"}
                </button>
              </header>

              {items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                  Belum ada item. Tambahkan {mode === "history" ? "peristiwa" : "misi"} untuk melanjutkan.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <article
                      key={`${mode}-${index}`}
                      className="space-y-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-slate-600">
                          {mode === "history"
                            ? `Peristiwa ${index + 1}`
                            : `Misi ${index + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setItemIndexToDelete(index)}
                          aria-label={`Hapus ${mode === "history" ? "peristiwa" : "misi"} ${index + 1}`}
                          className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-lg px-2 text-xs font-medium text-rose-700 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                        >
                          <Trash2 size={15} aria-hidden="true" />
                          Hapus
                        </button>
                      </div>
                      {mode === "history" ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
                          <label className="block space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">
                              Tahun
                            </span>
                            <input
                              inputMode="numeric"
                              value={item.tahun || ""}
                              onChange={(event) =>
                                updateItem(index, event.target.value, "tahun")
                              }
                              className={fieldClass}
                              placeholder="1950"
                            />
                          </label>
                          <label className="block space-y-1.5">
                            <span className="text-xs font-medium text-slate-600">
                              Peristiwa penting
                            </span>
                            <textarea
                              rows={2}
                              value={item.event || ""}
                              onChange={(event) =>
                                updateItem(index, event.target.value, "event")
                              }
                              className={`${fieldClass} min-h-20 resize-y`}
                              placeholder="Jelaskan peristiwa penting"
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="block space-y-1.5">
                          <span className="text-xs font-medium text-slate-600">
                            Isi misi
                          </span>
                          <textarea
                            rows={2}
                            value={item || ""}
                            onChange={(event) =>
                              updateItem(index, event.target.value)
                            }
                            className={`${fieldClass} min-h-20 resize-y`}
                            placeholder="Tuliskan langkah misi"
                          />
                        </label>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white p-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={handlers.close}
            className="min-h-11 cursor-pointer rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={!isValid}
            onClick={() => handlers.confirm?.({ judul, konten, category, items })}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} aria-hidden="true" />
            Simpan perubahan
          </button>
        </footer>
      </section>
    </section>,
      document.body,
      )}
      <DeleteModal
        isOpen={itemIndexToDelete !== null}
        onClose={() => setItemIndexToDelete(null)}
        onConfirm={removeItem}
        title={`Hapus ${mode === "history" ? "peristiwa" : "misi"}?`}
        description="Item akan dihapus dari formulir. Simpan perubahan untuk menerapkannya."
        itemName={`${mode === "history" ? "Peristiwa" : "Misi"} ${(itemIndexToDelete ?? 0) + 1}`}
        confirmText="Hapus dari formulir"
      />
    </>
  );
}
