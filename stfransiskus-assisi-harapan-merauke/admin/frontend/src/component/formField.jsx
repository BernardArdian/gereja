export default function FormField({ label, icon, required, children }) {
  return (
    <div className="w-full">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 ml-1">
        <span className="text-indigo-500">{icon}</span>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
