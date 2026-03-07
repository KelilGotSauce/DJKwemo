import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableSelect({
  label,
  placeholder,
  options = [],
  value = "",
  onChange,
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
  renderOption,
  selectedIcon = null,
  disabled = false,
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return options.slice(0, 100);

    return options
      .filter((option) =>
        getOptionLabel(option).toLowerCase().includes(lowerQuery)
      )
      .slice(0, 100);
  }, [options, query, getOptionLabel]);

  const handleSelect = (option) => {
    const selectedValue = getOptionValue(option);
    const selectedLabel = getOptionLabel(option);

    setQuery(selectedLabel);
    onChange(selectedValue, option);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setOpen(true);

    if (newValue === "") {
      onChange("", null);
    }
  };

  return (
    <div style={{ marginBottom: "12px" }} ref={wrapperRef}>
      {label && (
        <label style={{ display: "block", marginBottom: "6px" }}>{label}</label>
      )}

      <div style={{ position: "relative" }}>
        {selectedIcon && (
          <div style={selectedIconWrapperStyle}>
            {selectedIcon}
          </div>
        )}

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            ...inputStyle,
            paddingLeft: selectedIcon ? "44px" : "12px",
          }}
          autoComplete="off"
        />

        {open && !disabled && (
          <div style={dropdownStyle}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const optionValue = getOptionValue(option);

                return (
                  <button
                    key={optionValue}
                    type="button"
                    onClick={() => handleSelect(option)}
                    style={optionStyle}
                  >
                    {renderOption ? renderOption(option) : getOptionLabel(option)}
                  </button>
                );
              })
            ) : (
              <div style={emptyStyle}>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
};

const selectedIconWrapperStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
};

const dropdownStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginTop: "6px",
  maxHeight: "220px",
  overflowY: "auto",
  zIndex: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const optionStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 12px",
  background: "#fff",
  border: "none",
  cursor: "pointer",
};

const emptyStyle = {
  padding: "10px 12px",
  color: "#666",
};