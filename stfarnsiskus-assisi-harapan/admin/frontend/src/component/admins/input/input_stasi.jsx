import { X, Church, MapPin, Users, PlusCircle } from "lucide-react";

export default function InputStasi({ onClose }) {
  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 h-fit">
        {/* Header - Dibuat lebih tipis (py-4) */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2 ml-1">
            <Church size={18} className="text-amber-600" />
            <h2 className="font-bold text-base text-gray-800">Input Stasi</h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body - Padding dikecilkan ke p-6 */}
        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Baris 1: Nama Stasi & Jumlah Umat (Grid 2 Kolom) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nama Stasi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Church size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Nama Stasi"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Umat
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Users size={16} />
                </div>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                />
              </div>
            </div>
          </section>

          {/* Baris 2: Alamat (Full Width) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Alamat Lengkap
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                <MapPin size={16} />
              </div>
              <input
                type="text"
                placeholder="Jl. Raya..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Submit Button - Lebih compact */}
          <div className="pt-2">
            <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-amber-100 transition-all active:scale-[0.98]">
              <PlusCircle size={16} />
              Simpan Data
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
