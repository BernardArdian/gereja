import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Printer, X } from "lucide-react";

export default function UmatPrintPreview({
  isOpen,
  onClose,
  title,
  description,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="umat-print-preview fixed inset-0 z-[200] overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="mx-auto max-w-6xl">
        <div className="umat-print-controls mb-4 flex flex-col gap-3 rounded-2xl border border-white/15 bg-slate-900 p-4 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold tracking-wide">{title}</h2>
            <p className="mt-1 text-xs text-slate-300">{description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 px-3.5 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <X size={16} aria-hidden="true" />
              Tutup
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Printer size={16} aria-hidden="true" />
              Cetak
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
