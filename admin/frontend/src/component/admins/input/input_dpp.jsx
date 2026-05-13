import { X, User, Calendar, Briefcase, PlusCircle } from "lucide-react";

export default function InputDpp({ onClose }) {
  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200 h-fit">
        {/* Header - Dibuat lebih tipis (py-4) */}
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2 ml-1">
            <User size={18} className="text-green-600" />
            <h2 className="font-bold text-base text-gray-800">
              Input Anggota Dpp
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </header>

        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nama
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Nama"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                />
              </div>
            </form>
            <form className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Divisi
              </label>
              <section className="relative group">
                <select
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 outline-none focus:bg-white appearance-none focus:ring-4 focus:ring-green-50 cursor-pointer bg-gray-50 focus:border-green-500 transition-all"
                  // value={sakramen}
                  // onChange={(e) => {
                  //   setSakramenFilter(e.target.value);
                  // }}
                >
                  <option>Divisi</option>
                  <option value="Dpph-Inti">Dpph Inti</option>
                  <option value="Pleno">Pleno</option>
                </select>
              </section>
            </form>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Jabatan
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Briefcase size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Jabatan"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                />
              </div>
            </form>
            <form className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Periode
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Calendar size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Periode"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                />
              </div>
            </form>
          </section>

          <div className="pt-2">
            <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-amber-100 transition-all active:scale-[0.98]">
              <PlusCircle size={16} />
              Simpan Data
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
