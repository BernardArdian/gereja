import { Users2 } from "lucide-react";
import FormField from "../../formField";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

const coupleFields = [
  {
    title: "Data calon mempelai",
    fields: [
      { key: "namaPria", label: "Nama calon mempelai pria" },
      { key: "namaWanita", label: "Nama calon mempelai wanita" },
    ],
  },
  {
    title: "Data orang tua",
    fields: [
      { key: "namaAyahPria", label: "Nama ayah calon pria" },
      { key: "namaAyahWanita", label: "Nama ayah calon wanita" },
      { key: "namaIbuPria", label: "Nama ibu calon pria" },
      { key: "namaIbuWanita", label: "Nama ibu calon wanita" },
    ],
  },
];

export default function PranikahSection({ data = {}, onChange, isSubmitting }) {
  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <span className="rounded-xl bg-sky-50 p-2.5 text-sky-800">
          <Users2 size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Data pranikah
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Informasi calon mempelai dan orang tua.
          </p>
        </div>
      </header>

      {coupleFields.map((group) => (
        <fieldset key={group.title} className="space-y-3">
          <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
            {group.title}
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.fields.map(({ key, label }) => (
              <FormField key={key} label={label}>
                <input
                  name={key}
                  value={data[key] || ""}
                  onChange={onChange}
                  placeholder={label}
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </FormField>
            ))}
          </div>
        </fieldset>
      ))}
    </section>
  );
}
