import { Check, ToggleLeft } from "lucide-react";
import { useState } from "react";

export default function TogglesChecksCard() {
  const [notifications, setNotifications] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [plan, setPlan] = useState("free");

  return (
    <article className="neu-card neu-raised">
      <h2 className="neu-card-title">
        <ToggleLeft size={20} />
        Toggles & Checks
      </h2>

      <div className="neu-section-stack">
        <div className="neu-row-between">
          <span className="neu-text-sm">Enable notifications</span>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            className={`toggle-track neu-focus ${notifications ? "is-on" : "neu-inset"}`}
            onClick={() => setNotifications((v) => !v)}
          >
            <span className="toggle-thumb neu-raised" />
          </button>
        </div>

        <div className="neu-inline">
          <button
            type="button"
            role="checkbox"
            aria-checked={termsAccepted}
            className={`checkbox-btn neu-focus ${termsAccepted ? "is-checked" : "neu-inset"}`}
            onClick={() => setTermsAccepted((v) => !v)}
          >
            {termsAccepted && <Check size={14} />}
          </button>
          <span className="neu-text-sm">Accept terms</span>
        </div>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend className="neu-text-sm neu-muted" style={{ marginBottom: "12px" }}>
            Choose plan:
          </legend>

          <div className="neu-stack">
            {["free", "pro"].map((value) => {
              const selected = plan === value;

              return (
                <label key={value} className="neu-inline" style={{ cursor: "pointer" }}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className="radio-btn neu-inset neu-focus"
                    onClick={() => setPlan(value)}
                  >
                    <span className={`radio-dot ${selected ? "is-visible" : ""}`} />
                  </button>
                  <span className="neu-text-sm">
                    {value === "free" ? "Free" : "Pro"}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </article>
  );
}