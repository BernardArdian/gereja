import { X } from "lucide-react";

export default function DetailBerita(isOpen, handlers, formData) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[20] transition-opacity"
        onClick={handlers.cancel}
      />
      <form className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <section className="w-full max-w-2xl bg-white runded-3xl flex flex-cl max-h-[95dvh] overflow-hidden">
          <header>
            <span> detail berita</span>
          </header>
          <section>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handlers.input}
            />
          </section>
        </section>
      </form>
    </>
  );
}
