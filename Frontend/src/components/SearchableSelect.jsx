import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableSelect({
  label = "",
  placeholder = "Search...",
  options = [],
  value = "",
  onChange,
  getOptionLabel = (option) => option?.label ?? "",
  getOptionValue = (option) => option?.value ?? "",
  renderOption,
  selectedIcon = null,
  disabled = false,
}) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
        setQuery(value || "");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = (query || "").trim().toLowerCase();

    if (!normalizedQuery) return options;

    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(normalizedQuery)
    );
  }, [options, query, getOptionLabel]);

  const handleInputChange = (e) => {
    const nextValue = e.target.value;
    setQuery(nextValue);
    setIsOpen(true);
    setHighlightedIndex(0);

    if (nextValue === "") {
      onChange("");
    }
  };

  const handleSelect = (option) => {
    const nextValue = getOptionValue(option);
    setQuery(nextValue);
    onChange(nextValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleToggleDropdown = () => {
    if (disabled) return;

    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        inputRef.current?.focus();
      }
      return next;
    });
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    }

    if (e.key === "Enter") {
      if (isOpen && filteredOptions[highlightedIndex]) {
        e.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
      }
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
      setQuery(value || "");
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`searchable-select ${isOpen ? "is-open" : ""} ${
        disabled ? "is-disabled" : ""
      }`}
    >
      {label ? <label className="searchable-select-label">{label}</label> : null}

      <div className="searchable-select-trigger">
        {selectedIcon && value ? (
          <div className="searchable-select-selected-icon">{selectedIcon}</div>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          className="searchable-select-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />

        <button
          type="button"
          className="searchable-select-chevron"
          onClick={handleToggleDropdown}
          tabIndex={-1}
          aria-label="Toggle dropdown"
          disabled={disabled}
        >
          <ChevronDown
            size={18}
            className={`searchable-select-chevron-icon ${
              isOpen ? "is-rotated" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="searchable-select-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isHighlighted = index === highlightedIndex;
              const optionValue = getOptionValue(option);

              return (
                <button
                  key={`${optionValue}-${index}`}
                  type="button"
                  className={`searchable-select-option neu-tab-btn ${
                    value === optionValue ? "is-active" : ""
                  } ${isHighlighted ? "is-highlighted" : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                >
                  {renderOption ? renderOption(option) : getOptionLabel(option)}
                </button>
              );
            })
          ) : (
            <div className="searchable-select-empty">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}