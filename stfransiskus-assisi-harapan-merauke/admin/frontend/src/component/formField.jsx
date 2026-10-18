export default function FormField({ label, icon, required, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block w-full space-y-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-indigo-500">{icon}</span>
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
