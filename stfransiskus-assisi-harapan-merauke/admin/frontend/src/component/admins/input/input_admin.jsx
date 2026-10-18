import { LockKeyhole, Save, ShieldCheck, UserRound } from "lucide-react";
import Dropdown from "../../dropdown/dropdown";

const inputClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-slate-100";

export default function Input_Admin({
  formData,
  isSubmitting,
  isEditing = false,
  validations,
  handlers,
}) {
  return (
    <form className="space-y-5" onSubmit={handlers.submit} noValidate>
      <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <ShieldCheck size={19} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-amber-950">
              {isEditing ? "Perbarui administrator" : "Buat akun administrator"}
            </h3>
            <p className="mt-1 text-xs leading-5 text-amber-900/80">
              {isEditing
                ? "Perbarui nama atau hak akses. Biarkan sandi kosong jika tidak ingin mengubahnya."
                : "Gunakan sandi minimal 8 karakter yang berisi huruf dan angka."}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block min-w-0 space-y-1.5">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <UserRound size={16} aria-hidden="true" />
            Nama lengkap <span className="text-rose-600">*</span>
          </span>
          <input
            autoComplete="name"
            name="nama"
            type="text"
            required
            maxLength={100}
            value={formData.nama}
            onChange={handlers.input}
            disabled={isSubmitting}
            placeholder="Contoh: Alexander Maria"
            className={inputClass}
          />
        </label>

        <label className="block min-w-0 space-y-1.5">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShieldCheck size={16} aria-hidden="true" />
            Peran administrator <span className="text-rose-600">*</span>
          </span>
          <Dropdown
            name="role"
            ariaLabel="Peran administrator"
            value={formData.role}
            placeholder="Pilih peran"
            required
            disabled={isSubmitting}
            onChange={(value) =>
              handlers.input({ target: { name: "role", value } })
            }
            options={[
              { value: "Super Admin", label: "Super Admin" },
              { value: "Admin", label: "Admin" },
              { value: "Sekretaris", label: "Sekretaris" },
              { value: "Bendahara", label: "Bendahara" },
            ]}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <LockKeyhole size={16} aria-hidden="true" />
          {isEditing ? "Sandi baru" : "Sandi"}
          {!isEditing && <span className="text-rose-600">*</span>}
        </span>
        <input
          autoComplete="new-password"
          name="password"
          type="password"
          required={!isEditing}
          minLength={8}
          value={formData.password}
          onChange={handlers.input}
          disabled={isSubmitting}
          placeholder={
            isEditing ? "Kosongkan jika tidak diubah" : "Minimal 8 karakter"
          }
          className={inputClass}
        />
        <span className="block text-xs text-slate-500">
          Sandi harus memuat setidaknya satu huruf dan satu angka.
        </span>
      </label>

      {handlers.error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-800"
        >
          {handlers.error}
        </p>
      )}

      <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handlers.cancel}
          className="min-h-11 cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={!validations() || isSubmitting}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} aria-hidden="true" />
          {isSubmitting
            ? "Menyimpan..."
            : isEditing
              ? "Simpan perubahan"
              : "Simpan administrator"}
        </button>
      </footer>
    </form>
  );
}
