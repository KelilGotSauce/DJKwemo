export default function Header({ believerNumber = 43, onClaimClick }) {
  return (
    <header className="neu-header">
      <h1 className="hero-headline">
        Prove You Believed In Me Before I Blew Up
      </h1>
      <div className="hero-row glow-wrapper">
        <button
          type="button"
          className="neu-live-pill neu-raised-sm hero-claim-pill sparkle-btn"
          onClick={onClaimClick}
        >
          <span className="live-dot" aria-hidden="true" />

          <span className="believer-label">Become Believer</span>

          <span className="believer-number">{believerNumber}</span>
        </button>
      </div>
      <p className="neu-subtitle">
        Your place on the leaderboard is locked in forever.
      </p>
    </header>
  );
}