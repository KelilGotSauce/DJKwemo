import { Loader2, MousePointerClick } from "lucide-react";
import { useState } from "react";

export default function ButtonsCard() {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <article className="neu-card neu-raised">
      <h2 className="neu-card-title">
        <MousePointerClick size={20} />
        Buttons
      </h2>

      <div className="neu-stack">
        <button
          type="button"
          className="neu-button-base neu-raised neu-btn neu-focus"
        >
          Default
        </button>

        <button
          type="button"
          className="neu-button-base neu-button-primary neu-btn neu-focus"
        >
          Primary
        </button>

        <button
          type="button"
          className="neu-button-base neu-button-success neu-btn neu-focus"
        >
          Success
        </button>

        <button
          type="button"
          onClick={handleLoadingDemo}
          disabled={loading}
          className="neu-button-base neu-raised neu-btn neu-focus"
        >
          <span className="neu-inline" style={{ justifyContent: "center" }}>
            {loading && <Loader2 size={18} className="spin" />}
            <span>{loading ? "Loading..." : "Click for Loading"}</span>
          </span>
        </button>
      </div>
    </article>
  );
}