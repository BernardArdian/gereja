import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck, UserPlus, UsersRound, X } from "lucide-react";
import Admin_List from "./list/list_admin";
import Input_Admin from "./input/input_admin";

const createEmptyForm = () => ({ nama: "", role: "", password: "" });

const initialAdmins = [
  { id: 1, name: "Alexander Maria", role: "Super Admin" },
  { id: 2, name: "Siti Aminah", role: "Sekretaris" },
  { id: 3, name: "Yohanes Bosco", role: "Bendahara" },
];

function isValidPassword(value) {
  return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

export default function AdminPages({ isOpen, handlers = {} }) {
  const [activeTab, setActiveTab] = useState("list");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(createEmptyForm);
  const [admins, setAdmins] = useState(initialAdmins);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [formError, setFormError] = useState("");

  const isEditing = editingAdminId !== null;
  const isFormValid =
    Boolean(formData.nama.trim()) &&
    Boolean(formData.role) &&
    (isEditing
      ? !formData.password || isValidPassword(formData.password)
      : isValidPassword(formData.password));

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        !isSubmitting &&
        !document.querySelector('[role="alertdialog"]')
      ) {
        handlers.cancel?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers, isOpen, isSubmitting]);

  const resetForm = () => {
    setFormData(createEmptyForm());
    setEditingAdminId(null);
    setFormError("");
  };

  const openCreateForm = () => {
    resetForm();
    setActiveTab("form");
  };

  const openEditForm = (admin) => {
    setFormData({ nama: admin.name, role: admin.role, password: "" });
    setEditingAdminId(admin.id);
    setFormError("");
    setActiveTab("form");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      setFormError(
        "Periksa kembali nama, peran, dan sandi. Sandi minimal 8 karakter dan harus berisi huruf serta angka.",
      );
      return;
    }

    setIsSubmitting(true);
    const normalizedName = formData.nama.trim();
    if (isEditing) {
      setAdmins((previous) =>
        previous.map((admin) =>
          admin.id === editingAdminId
            ? {
                ...admin,
                name: normalizedName,
                role: formData.role,
                ...(formData.password ? { pass: formData.password } : {}),
              }
            : admin,
        ),
      );
    } else {
      setAdmins((previous) => [
        {
          id: Date.now(),
          name: normalizedName,
          role: formData.role,
          pass: formData.password,
        },
        ...previous,
      ]);
    }
    resetForm();
    setActiveTab("list");
    setIsSubmitting(false);
  };

  const handleDelete = (adminToDelete) => {
    setAdmins((previous) =>
      previous.filter((admin) => admin.id !== adminToDelete.id),
    );
  };

  const handleFormCancel = () => {
    resetForm();
    setActiveTab("list");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handlers.cancel?.();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-management-title"
        className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-slate-50 shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
            <ShieldCheck size={19} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="admin-management-title"
              className="truncate text-base font-bold text-slate-900 sm:text-lg"
            >
              Manajemen administrator
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Kelola akun dan hak akses panel.
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup manajemen administrator"
            onClick={() => handlers.cancel?.()}
            className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <nav
          aria-label="Bagian manajemen administrator"
          className="flex shrink-0 gap-2 border-b border-slate-200 bg-white px-4 pt-2 sm:px-6"
        >
          <button
            type="button"
            aria-current={activeTab === "list" ? "page" : undefined}
            onClick={() => {
              setActiveTab("list");
              resetForm();
            }}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border-b-2 px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
              activeTab === "list"
                ? "border-amber-700 text-amber-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <UsersRound size={16} aria-hidden="true" />
            Daftar akun
          </button>
          <button
            type="button"
            aria-current={activeTab === "form" ? "page" : undefined}
            onClick={openCreateForm}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border-b-2 px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
              activeTab === "form"
                ? "border-amber-700 text-amber-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {isEditing ? (
              <KeyRound size={16} aria-hidden="true" />
            ) : (
              <UserPlus size={16} aria-hidden="true" />
            )}
            {isEditing ? "Edit akun" : "Tambah akun"}
          </button>
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "list" ? (
            <Admin_List
              admins={admins}
              handlers={{ onEdit: openEditForm, onDelete: handleDelete }}
            />
          ) : (
            <Input_Admin
              formData={formData}
              isSubmitting={isSubmitting}
              isEditing={isEditing}
              validations={() => isFormValid}
              handlers={{
                input: handleInputChange,
                submit: handleSubmit,
                cancel: handleFormCancel,
                error: formError,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
