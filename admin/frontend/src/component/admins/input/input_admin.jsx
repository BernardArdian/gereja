import { User, Lock, ShieldCheck, UserPlus, Info } from "lucide-react";

export default function Input_Admin() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Info Singkat */}
      <div className="flex items-start gap-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-8">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
          <Info size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900">
            Tambah Administrator Baru
          </h4>
          <p className="text-xs text-indigo-700/70 leading-relaxed">
            Pastikan data yang dimasukkan benar. Password minimal terdiri dari 8
            karakter gabungan huruf dan angka.
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kolom Nama */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Ex: Alexander Maria"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Kolom Role/Aturan */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Admin Role
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <ShieldCheck size={18} />
              </div>
              <select className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium appearance-none">
                <option value="">Select Role</option>
                <option value="super_admin">Super Admin</option>
                <option value="sekretaris">Sekretaris</option>
                <option value="bendahara">Bendahara</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kolom Password */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
            Security Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
            <UserPlus size={18} />
            Register Admin
          </button>
        </div>
      </form>
    </section>
  );
}
