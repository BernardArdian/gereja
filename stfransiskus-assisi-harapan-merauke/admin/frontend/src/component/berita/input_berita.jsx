import { User, Lock, ShieldCheck, UserPlus, Info, X } from "lucide-react";

export default function InputBerita({ isOpen, onClose }) {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;
  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <header>
        <span>input berita</span>

        <input type="text" placeholder="Penulis" />
        <input type="text" placeholder="Judul berita..." />
      </header>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <X size={15} />
      </button>
      <main>
        <section className="space-y-1.5">
          <label htmlFor="detail" className="text-sm font-medium text-gray-700">
            Detail Berita
          </label>

          <textarea
            id="detail"
            rows={12}
            placeholder="Masukkan detail berita di sini..."
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed transition-all"
          />
        </section>
      </main>
    </section>
  );
}
