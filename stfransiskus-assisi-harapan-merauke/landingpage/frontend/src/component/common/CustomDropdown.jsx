import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function CustomDropdown({
  value,
  options,
  onChange,
  placeholder = "Pilih",
  ariaLabel = "Pilih opsi",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative min-w-[160px] ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-100"
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`ml-2 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 text-left text-sm transition ${
                  option.value === value
                    ? "bg-amber-50 font-medium text-amber-900"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 text-amber-700"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
