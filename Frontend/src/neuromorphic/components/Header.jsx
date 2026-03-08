export default function Header({ believerNumber = 32, onClaimClick }) {
  return (
    <header className="neu-header">
      
      <div className="headline-row">
        <h1 className="hero-headline">
          Become Believer
        </h1>

        <span className="headline-status">
          <span className="live-dot" />
          <span className="headline-number">{believerNumber}</span>
        </span>
      </div>

      <p className="neu-subtitle">
        Prove You Believed In Me Before I Blew Up!
      </p>

      <div className="hero-row glow-wrapper">
        <button
          type="button"
          className="neu-live-pill neu-raised-sm hero-claim-pill sparkle-btn"
          onClick={onClaimClick}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 24 24"
            className="sparkle-icon"
            aria-hidden="true"
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
          </svg>

          <span className="believer-label">Become Believer</span>
        </button>
      </div>

    </header>
  );
}

/*Your place on the leaderboard is locked in forever | This is like investing in Bitcoin in 2017 | Congratulations, you found me before I became famous | This is your chance to be the # person in the entire world to ever believe in me*/