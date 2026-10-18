import { Church, Image as ImageIcon } from "lucide-react";
import FormField from "../../formField";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function PernikahanSection({
  data = {},
  handlers,
  previews,
  isSubmitting,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:p-5">
      <header className="flex items-center gap-3 border-b border-rose-200 pb-3">
        <span className="rounded-xl bg-white p-2.5 text-rose-800">
          <Church size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Data pernikahan
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Nama mempelai, waktu, tempat, dan foto.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { type: "Pria", label: "Nama mempelai pria" },
          { type: "Wanita", label: "Nama mempelai wanita" },
        ].map(({ type, label }) => {
          const key = type.toLowerCase();
          return (
            <fieldset
              key={type}
              className="min-w-0 space-y-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
            >
              <legend className="px-1 text-xs font-semibold text-slate-700">
                Mempelai {type.toLowerCase()}
              </legend>
              <FormField label={label} required>
                <input
                  type="text"
                  name={`nama${type}`}
                  required
                  value={data[`nama${type}`] || ""}
                  onChange={handlers.pernikahan}
                  placeholder={label}
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </FormField>
              <label className="block space-y-2">
                <span className="text-xs font-medium text-slate-700">
                  Foto mempelai {key} (opsional)
                </span>
                <span className="flex min-h-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-amber-500 hover:bg-amber-50">
                  {previews[key] ? (
                    <img
                      src={previews[key]}
                      alt={`Pratinjau foto mempelai ${key}`}
                      className="h-36 w-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon
                        size={22}
                        className="text-slate-400"
                        aria-hidden="true"
                      />
                      <span className="mt-2 text-xs font-semibold text-slate-700">
                        Pilih foto
                      </span>
                      <span className="mt-1 text-[11px] text-slate-500">
                        JPG, PNG atau WebP · maksimal 2 MB
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => handlers.foto(event, key)}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                </span>
              </label>
            </fieldset>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Tanggal pernikahan" icon={<Church size={15} />} required>
          <input
            type="date"
            name="tanggalPernikahan"
            required
            value={data.tanggalPernikahan || ""}
            onChange={handlers.pernikahan}
            className={fieldClass}
            disabled={isSubmitting}
          />
        </FormField>
        <FormField label="Tempat pernikahan" required>
          <input
            type="text"
            name="tempat"
            required
            value={data.tempat || ""}
            onChange={handlers.pernikahan}
            placeholder="Nama gereja"
            className={fieldClass}
            disabled={isSubmitting}
          />
        </FormField>
      </div>
    </section>
  );
}
