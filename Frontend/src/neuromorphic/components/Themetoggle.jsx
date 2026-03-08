import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <div className="neu-theme-toggle-wrap">
      <button
        type="button"
        className="neu-raised neu-btn neu-focus neu-icon-btn"
        onClick={onToggle}
        aria-label="Toggle dark mode"
        aria-pressed={darkMode}
      >
        {darkMode ? <Moon size={22} /> : <Sun size={22} />}
      </button>
    </div>
  );
}