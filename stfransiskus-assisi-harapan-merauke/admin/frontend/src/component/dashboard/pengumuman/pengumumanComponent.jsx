import {
  Calendar,
  Clock,
  Edit2,
  MapPin,
  Paperclip,
  Save,
  Type,
  X,
} from "lucide-react";

import FormField from "../../formField";
import PernikahanSection from "./pernikahanSection";
import PranikahSection from "./pranikahSection";
import Misa from "./misa";
import Dropdown from "../../dropdown/dropdown";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100";

export default function PengumumanComponent({
  isOpen,
  editMode,
  formData,
  selectedStatus,
  isSubmitting,
  previews,
  handlers,
  validation,
  formError,
}) {
  if (!isOpen) return null;

  return (
    <section
      className="fixed inset-0 z-90 flex items-center justify-center p-3 sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handlers.cancel();
        }
      }}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-form-title"
        className="relative flex max-h-[min(94dvh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Manajemen konten
            </p>
            <h2
              id="announcement-form-title"
              className="mt-1 text-lg font-bold text-slate-900 sm:text-xl"
            >
              {editMode ? "Edit pengumuman" : "Tambah pengumuman"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handlers.cancel}
            aria-label="Tutup formulir"
            className="shrink-0 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            disabled={isSubmitting}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <form
          onSubmit={handlers.submit}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:space-y-6 sm:p-6"
        >
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Judul pengumuman"
              icon={<Edit2 size={16} />}
              required
            >
              <input
                type="text"
                name="judul"
                required
                value={formData.judul}
                placeholder="Contoh: Jadwal Misa Minggu"
                onChange={handlers.input}
                className={fieldClass}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              label="Topik pengumuman"
              icon={<Type size={16} />}
              required
            >
              <Dropdown
                name="status"
                ariaLabel="Topik pengumuman"
                value={selectedStatus}
                onChange={(value) => handlers.status({ target: { value } })}
                placeholder="Pilih topik"
                className={`${fieldClass} cursor-pointer`}
                disabled={isSubmitting}
                required
                options={[
                  { value: "baptis", label: "Baptis" },
                  { value: "krisma", label: "Krisma" },
                  { value: "komuni", label: "Komuni" },
                  { value: "misa", label: "Misa" },
                  { value: "pra-nikah", label: "Pranikah" },
                  { value: "pernikahan", label: "Pernikahan" },
                  { value: "other", label: "Umum" },
                ]}
              />
            </FormField>

            {selectedStatus !== "pra-nikah" && (
              <>
                <FormField
                  label="Waktu pelaksanaan"
                  icon={<Clock size={16} />}
                  required
                >
                  <input
                    type="time"
                    name="waktu"
                    value={formData.waktu}
                    onChange={handlers.input}
                    className={fieldClass}
                    disabled={isSubmitting}
                    required
                  />
                </FormField>
                {selectedStatus !== "pernikahan" && (
                  <FormField
                    label="Tanggal pelaksanaan"
                    icon={<Calendar size={16} />}
                    required
                  >
                    <input
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handlers.input}
                      className={fieldClass}
                      disabled={isSubmitting}
                      required
                    />
                  </FormField>
                )}
              </>
            )}

            <FormField label="Stasi" icon={<MapPin size={16} />} required>
              <Dropdown
                name="stasi"
                ariaLabel="Stasi"
                value={formData.stasi}
                onChange={(value) =>
                  handlers.input({ target: { name: "stasi", value } })
                }
                placeholder="Pilih stasi"
                className={`${fieldClass} cursor-pointer`}
                disabled={isSubmitting}
                required
                options={[
                  { value: "Harapan", label: "Pusat Paroki - Harapan Makmur" },
                  { value: "Kurik", label: "Stasi Kurik" },
                ]}
              />
            </FormField>
          </section>

          {selectedStatus === "pernikahan" && (
            <PernikahanSection
              data={formData.pernikahanData}
              handlers={{
                pernikahan: handlers.pernikahan,
                foto: handlers.foto,
              }}
              previews={previews}
              isSubmitting={isSubmitting}
            />
          )}

          {selectedStatus === "pra-nikah" && (
            <PranikahSection
              data={formData.dataPranikah}
              onChange={handlers.pranikah}
              isSubmitting={isSubmitting}
            />
          )}

          {selectedStatus === "misa" && (
            <Misa
              data={formData.misa}
              onChange={handlers.misa}
              disabled={isSubmitting}
            />
          )}

          <FormField
            label="Catatan / keterangan"
            icon={<Paperclip size={16} />}
            required
          >
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Tulis informasi yang perlu diketahui umat..."
              className={`${fieldClass} min-h-28 resize-y leading-6`}
              value={formData.description}
              onChange={handlers.input}
              disabled={isSubmitting}
            />
          </FormField>

          {formError && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            >
              {formError}
            </p>
          )}

          <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handlers.cancel}
              className="min-h-11 cursor-pointer rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!validation() || isSubmitting}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} aria-hidden="true" />
              {isSubmitting
                ? "Menyimpan..."
                : editMode
                  ? "Simpan perubahan"
                  : "Simpan pengumuman"}
            </button>
          </footer>
        </form>
      </section>
    </section>
  );
}
