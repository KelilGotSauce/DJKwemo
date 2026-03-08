export default function BasicsPanel() {
  return (
    <section>
      <div className="neu-grid">

        <nav
          className="neu-tab-nav leaderboard-tab-nav"
          aria-label="Believer leaderboard"
        >
          <div className="neu-tab-list neu-inset leaderboard-tab-list">

            {/* Header Row */}

            <div className="leaderboard-row leaderboard-header">

              <span>Rank</span>
              <span>Name</span>
              <span>Location</span>
              <span>Social</span>
              <span>Journey</span>
              <span>Date</span>
              <span>Score</span>

            </div>

            {/* First Data Row */}

            <div className="leaderboard-row neu-tab-btn">

              <span>#1</span>
              <span>Sakhia</span>
              <span>Montreal</span>
              <span>@djkwemo</span>
              <span>Year 5, Day 108</span>
              <span>March 8, 2026</span>
              <span>100</span>

            </div>

          </div>
        </nav>

      </div>
    </section>
  );
}