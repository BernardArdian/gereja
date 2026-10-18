import { useState } from "react";
import { FileText, X } from "lucide-react";
import Dropdown from "../dropdown/dropdown";

const emptyDocument = {
  name: "",
  category: "",
  pic: "",
  status: "Aktif",
};

export default function Input_Administratif({
  initialData,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState(() => ({
    ...emptyDocument,
    ...initialData,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-2 text-amber-800">
              <FileText size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">
                {initialData ? "Edit dokumen" : "Tambah dokumen"}
              </h2>
              <p className="text-xs text-slate-500">
                Isi informasi dokumen administratif.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="space-y-4 p-5 sm:p-6">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Nama dokumen
            </span>
            <input
              required
              autoFocus
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Struktur DPP 2024–2027"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Kategori
              </span>
              <input
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Contoh: Organisasi"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">
                Penanggung jawab
              </span>
              <input
                required
                name="pic"
                value={formData.pic}
                onChange={handleChange}
                placeholder="Nama PIC"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <Dropdown
              name="status"
              ariaLabel="Status dokumen"
              value={formData.status}
              onChange={(value) =>
                handleChange({ target: { name: "status", value } })
              }
              options={["Aktif", "Update", "Final", "Draft", "Arsip"].map(
                (status) => ({ value: status, label: status }),
              )}
            />
          </label>
        </div>

        <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            Batal
          </button>
          <button
            type="submit"
            className="min-h-11 cursor-pointer rounded-xl bg-amber-700 px-4 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
          >
            Simpan dokumen
          </button>
        </footer>
      </form>
    </section>
  );
}
