import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function Dropdown({
  value,
  options = [],
  onChange,
  placeholder = "Pilih",
  ariaLabel,
  name,
  disabled = false,
  required = false,
  icon,
  className = "",
  menuClassName = "",
  buttonRef,
  onTriggerKeyDown,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const dropdownId = useId();
  const enabledIndexes = options.flatMap((option, index) =>
    option.disabled ? [] : [index],
  );
  const selectedIndex = options.findIndex((option) =>
    Object.is(option.value, value),
  );
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;
  const listboxId = `${dropdownId}-listbox`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsidePointer = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const selectOption = (option) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const moveActiveOption = (direction) => {
    if (enabledIndexes.length === 0) return;
    const currentPosition = enabledIndexes.indexOf(activeIndex);
    const nextPosition =
      currentPosition < 0
        ? direction > 0
          ? 0
          : enabledIndexes.length - 1
        : (currentPosition + direction + enabledIndexes.length) %
          enabledIndexes.length;
    setActiveIndex(enabledIndexes[nextPosition]);
  };

  const openDropdown = (direction = 1) => {
    setIsOpen(true);
    if (selectedIndex >= 0 && !options[selectedIndex].disabled) {
      setActiveIndex(selectedIndex);
    } else {
      setActiveIndex(direction > 0 ? enabledIndexes[0] : enabledIndexes.at(-1));
    }
  };

  const handleKeyDown = (event) => {
    if (onTriggerKeyDown?.(event, isOpen)) return;
    if (disabled) return;

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openDropdown(event.key === "ArrowUp" ? -1 : 1);
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveOption(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(
        event.key === "Home" ? enabledIndexes[0] : enabledIndexes.at(-1),
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) selectOption(option);
    } else if (event.key === "Escape" || event.key === "Tab") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-w-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }}
    >
      <button
        ref={buttonRef}
        id={name || dropdownId}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && activeIndex >= 0
            ? `${dropdownId}-option-${activeIndex}`
            : undefined
        }
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            setActiveIndex(-1);
          } else {
            openDropdown();
          }
        }}
        onKeyDown={handleKeyDown}
        className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-700 outline-none transition hover:border-amber-400 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-amber-500 dark:focus-visible:border-amber-400 ${className}`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon && (
            <span className="shrink-0 text-slate-400 dark:text-slate-400">
              {icon}
            </span>
          )}
          <span
            className={`truncate ${selected ? "" : "text-slate-400 dark:text-slate-400"}`}
          >
            {selected?.label ?? placeholder}
          </span>
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-slate-400 transition-transform dark:text-slate-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={name || undefined}
          aria-label={ariaLabel}
          className={`absolute z-120 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-950/10 ring-1 ring-black/5 dark:border-slate-600 dark:bg-slate-800 dark:shadow-black/30 dark:ring-white/5 ${menuClassName}`}
        >
          {options.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400">
              Tidak ada pilihan
            </li>
          ) : (
            options.map((option, index) => {
              const isSelected = Object.is(option.value, value);
              const isActive = index === activeIndex;

              return (
                <li
                  id={`${dropdownId}-option-${index}`}
                  key={`${String(option.value)}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    disabled={option.disabled}
                    onMouseEnter={() => {
                      if (!option.disabled) setActiveIndex(index);
                    }}
                    onClick={() => selectOption(option)}
                    className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-amber-50 font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
                        : isActive
                          ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
                    {isSelected && (
                      <Check
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-amber-700 dark:text-amber-300"
                      />
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
