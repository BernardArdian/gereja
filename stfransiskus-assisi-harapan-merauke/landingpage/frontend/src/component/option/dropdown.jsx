import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCheck } from "lucide-react";

export default function CustomDropdown({
  value,
  options,
  onChange,
  placeholder = "Pilih",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={wrapperRef} className="relative min-w-[160px]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between pl-9 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:border-gray-400 transition-all cursor-pointer"
        children={[
          <span
            key="label"
            className="truncate"
            children={selected ? selected.label : placeholder}
          />,
          <ChevronDown
            key="icon"
            size={14}
            className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />,
        ]}
      />

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg py-1 max-h-60 overflow-auto"
          children={options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2 text-semibold cursor-pointer transition-colors ${
                opt.value === value
                  ? "bg-slate-500/80 text-gray-100 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              children={[
                <span key="label" children={opt.label} />,
                opt.value === value && (
                  <CheckCheck key="check" size={14} className="text-rose-500" />
                ),
              ]}
            />
          ))}
        />
      )}
    </div>
  );
}
