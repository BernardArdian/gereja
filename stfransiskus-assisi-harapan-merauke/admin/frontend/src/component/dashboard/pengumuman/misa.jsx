import { Users2 } from "lucide-react";
import FormField from "../../formField";

const assignments = [
  { key: "pemimpin", label: "Pemimpin ibadah" },
  { key: "dirigen", label: "Dirigen" },
  { key: "organis", label: "Organis" },
  { key: "doa", label: "Doa umat" },
  { key: "bacaan", label: "Pembaca bacaan" },
  { key: "misdinar", label: "Misdinar" },
];

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function Misa({ data = {}, onChange, disabled = false }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
          <Users2 size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Petugas misa
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Isi petugas yang bertugas pada perayaan ini.
          </p>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {assignments.map(({ key, label }) => (
          <FormField key={key} label={label}>
            <input
              name={key}
              value={data[key] || ""}
              onChange={(event) => onChange(key, event.target.value)}
              placeholder={`Nama ${label.toLowerCase()}`}
              className={fieldClass}
              disabled={disabled}
            />
          </FormField>
        ))}
      </section>
    </section>
  );
}
