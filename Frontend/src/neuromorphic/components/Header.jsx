export default function Header({ believerNumber = 43, onClaimClick }) {
  return (
    <header className="neu-header">
      {/* <div className="neu-live-pill neu-raised-sm">
        <span className="live-dot" aria-hidden="true" />
        <span
          className="neu-text-xs neu-muted"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          Live
        </span>
      </div> */}
      <div className="hero-row">
        <button
          className="hero-headline"
          onClick={onClaimClick}
        >
          Become Believer
        </button>

        <div className="neu-live-pill neu-raised-sm">
          <span className="live-dot" aria-hidden="true" />
          <span
            className="neu-text-xs neu-muted"
            style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            #{believerNumber}
          </span>
        </div>
      </div>

      <p className="neu-subtitle">
        Prove you believed in me before I blew up.
      </p>

    </header>
  );
}