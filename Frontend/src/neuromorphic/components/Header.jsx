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
      <h1 className="hero-headline">
        Prove You Believed In Me Before I Blew Up
      </h1>

      <div className="hero-row">
        <div className="neu-live-pill neu-raised-sm">
          <span className="live-dot" aria-hidden="true" />
          <span className="neu-muted believer-number">Become Believer #{believerNumber}</span>
        </div>
      </div>

      <p className="neu-subtitle">
        Your place on the leaderboard is locked in forever.
      </p>
    </header>
  );
}