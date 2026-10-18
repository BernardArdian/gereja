import { Plus } from "lucide-react";

export default function StasiDanDppCard({
  title,
  value,
  icon,
  color,
  actionLabel,
  description,
  onInputClick,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <header className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color} text-white`}
          aria-hidden="true"
        >
          {icon}
        </div>
        {actionLabel && onInputClick && (
          <button
            type="button"
            onClick={onInputClick}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Plus size={14} aria-hidden="true" />
            {actionLabel}
          </button>
        )}
      </header>
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>
    </section>
  );
}
