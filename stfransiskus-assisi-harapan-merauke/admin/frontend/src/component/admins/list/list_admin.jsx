import {
  Pencil,
  Trash2,
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export default function Admin_List() {
  const admins = [
    {
      id: 1,
      name: "Alexander Maria",
      role: "Super Admin",
      pass: "superadmin123",
    },
    { id: 2, name: "Siti Aminah", role: "Sekretaris", pass: "sekretaris456" },
    { id: 3, name: "Yohanes Bosco", role: "Bendahara", pass: "bendahara789" },
  ];

  const [visibleIds, setVisibleIds] = useState([]);

  const togglePassword = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 border-b border-gray-100">
        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-widest">
          Admin Name
        </span>
        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-widest">
          Role
        </span>
        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-widest">
          Password
        </span>
        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-widest text-right">
          Actions
        </span>
      </div>

      {/* List Admin */}
      <div className="space-y-2">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="cursor-pointer grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-6 py-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-gray-50/40 transition-all"
          >
            {/* Nama */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                <User size={15} />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {admin.name}
              </span>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1">
                {admin.role}
              </span>
            </div>

            {/* Password */}
            <div className="flex items-center gap-2 text-gray-400">
              <Lock size={13} />
              <span className="text-sm tracking-widest font-mono text-gray-500 flex-1">
                {visibleIds.includes(admin.id) ? admin.pass : "••••••••"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePassword(admin.id);
                }}
                className="cursor-pointer p-1 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {visibleIds.includes(admin.id) ? (
                  <EyeOff size={14} />
                ) : (
                  <Eye size={14} />
                )}
              </button>
            </div>

            {/* Aksi */}
            <div className="flex items-center justify-end gap-1">
              <button
                className="cursor-pointer p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
                title="Edit Admin"
              >
                <Pencil size={15} />
              </button>
              <button
                className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Hapus Admin"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-[11px] text-gray-400">
        <p>* Password disembunyikan untuk keamanan.</p>
        <p>Total: {admins.length} Admin</p>
      </div>
    </section>
  );
}
