import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Hapus data?",
  description = "Data yang dihapus tidak dapat dikembalikan.",
  itemName,
  confirmText = "Ya, hapus",
  errorMessage = "",
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isConfirming) onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConfirming, isOpen, onClose]);

  if (!isOpen) return null;

  const confirmDeletion = async () => {
    setIsConfirming(true);
    try {
      const result = await onConfirm?.();
      if (result !== false) onClose?.();
    } finally {
      setIsConfirming(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isConfirming) onClose?.();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start gap-3 p-5 sm:p-6">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-700">
            <AlertTriangle size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-base font-semibold text-slate-900">
              {title}
            </h2>
            <p id={descriptionId} className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
            {itemName && (
              <p className="mt-2 break-words rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
                {itemName}
              </p>
            )}
            {errorMessage && (
              <p
                role="alert"
                className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
              >
                {errorMessage}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Tutup konfirmasi"
            disabled={isConfirming}
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            autoFocus
            disabled={isConfirming}
            onClick={onClose}
            className="min-h-10 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isConfirming}
            onClick={confirmDeletion}
            className="min-h-10 cursor-pointer rounded-xl bg-rose-700 px-4 text-sm font-semibold text-white transition hover:bg-rose-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isConfirming ? "Menghapus..." : confirmText}
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
