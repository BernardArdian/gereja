import { Pencil, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../alert/deleteModal";

export default function Admin_List({ admins = [], handlers = {} }) {
  const [adminToDelete, setAdminToDelete] = useState(null);

  const confirmDelete = () => {
    if (!adminToDelete) return;
    handlers.onDelete?.(adminToDelete);
    setAdminToDelete(null);
  };

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Hak akses dan akun
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            Daftar administrator
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Kelola akun yang memiliki akses ke panel administrasi.
          </p>
        </div>
        <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
          {admins.length.toLocaleString("id-ID")} akun
        </span>
      </header>

      {admins.length ? (
        <ul className="space-y-3" aria-label="Daftar administrator">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-amber-200 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                  <UserRound size={19} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-slate-900">
                    {admin.name}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    <ShieldCheck size={13} aria-hidden="true" />
                    {admin.role}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-end gap-1 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">
                <button
                  type="button"
                  aria-label={`Edit administrator ${admin.name}`}
                  onClick={() => handlers.onEdit?.(admin)}
                  className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-medium text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                >
                  <Pencil size={16} aria-hidden="true" />
                  Edit
                </button>
                <button
                  type="button"
                  aria-label={`Hapus administrator ${admin.name}`}
                  onClick={() => setAdminToDelete(admin)}
                  className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
          <UserRound
            size={28}
            className="mx-auto text-slate-400"
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-semibold text-slate-800">
            Belum ada administrator
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tambahkan administrator melalui formulir untuk mulai mengelola akses.
          </p>
        </div>
      )}

      <p className="border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">
        Demi keamanan, sandi tidak ditampilkan pada daftar akun.
      </p>

      <DeleteModal
        isOpen={Boolean(adminToDelete)}
        onClose={() => setAdminToDelete(null)}
        onConfirm={confirmDelete}
        title="Hapus administrator?"
        description="Akun ini tidak lagi dapat digunakan untuk mengakses panel."
        itemName={adminToDelete?.name}
        confirmText="Ya, hapus administrator"
      />
    </section>
  );
}
