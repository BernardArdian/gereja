import { User, Save, Lock, ShieldCheck, UserPlus, Info } from "lucide-react";

export default function Input_Admin({
  formData,
  isSubmitting,
  validations,
  handlers,
  onClose,
}) {
  //const roles = ["super admin", "admin"];
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Info Singkat */}
      <header className="flex items-start gap-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-8">
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
      </header>

      <main className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                value={formData.nama}
                onChange={handlers.input}
                disabled={isSubmitting}
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
              <select className="w-full pl-11 cursor-pointer pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-medium appearance-none">
                <option value="" disabled>
                  -- Select Role --
                </option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </section>

        {/* Kolom Password */}
        <section className="space-y-2">
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
              value={formData.password}
              onChange={handlers.input}
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Tombol Simpan */}
        <footer className="flex w-full items-center justify-end gap-4 pt-4">
          <button
            className="w-[10dvw] cursor-pointer flex items-center justify-center gap-2 py-4 bg-rose-500 hover:bg-rose-500/20 hover:text-rose-600 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
            type="button"
            disabled={!validations() || isSubmitting}
            onClick={handlers.reset}
          >
            batal
          </button>
          <button
            className="w-[12dvw] cursor-pointer flex items-center justify-center gap-2 py-4 bg-blue-500 hover:bg-blue-500/20 hover:text-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
            type="button"
            disabled={!validations() || isSubmitting}
          >
            <Save size={18} />
            Simpan
          </button>
        </footer>
      </main>
    </section>
  );
}
