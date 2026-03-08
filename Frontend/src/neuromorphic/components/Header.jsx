export default function Header() {
  return (
    <header className="neu-header">
      <div className="neu-live-pill neu-raised-sm">
        <span className="live-dot" aria-hidden="true" />
        <span className="neu-text-xs neu-muted" style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Live Components
        </span>
      </div>

      <h1 className="neu-title">Neuromorphic UI</h1>

      <p className="neu-subtitle">
        A complete component library with accessibility, animations, and modern design patterns.
      </p>
    </header>
  );
}