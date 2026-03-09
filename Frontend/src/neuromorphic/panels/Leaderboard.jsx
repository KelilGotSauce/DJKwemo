export default function LeaderBoard() {

  const believers = [
    {
      rank: 1,
      name: "Tyler, The Creator",
      location: "MTL, CA 🇨🇦",
      social: "@djkwemo",
      journey: "Year: 5 • Day: 108",
      date: "Mar 8, 2026",
      score: 100
    },
    {
      rank: 2,
      name: "Alex",
      location: "TOR, CA 🇨🇦 ",
      social: "@alexbeats",
      journey: "Year: 5 • Day: 109",
      date: "Mar 9, 2026",
      score: 95
    },
    {
      rank: 3,
      name: "Maya",
      location: "VA, CA 🇨🇦",
      social: "@mayawave",
      journey: "Year: 5 • Day: 110",
      date: "Mar 10, 2026",
      score: 92
    },
    {
      rank: 4,
      name: "Chris",
      location: "MTL, CA 🇨🇦",
      social: "@chrisflow",
      journey: "Year: 5 • Day: 111",
      date: "Mar 11, 2026",
      score: 88
    },
    {
      rank: 5,
      name: "Jordan",
      location: "NYC, US 🇺🇸",
      social: "@jordansounds",
      journey: "Year: 5 • Day: 112",
      date: "Mar 12, 2026",
      score: 85
    }
  ];

  return (
        <nav className="leaderboard-tab-nav">
          <div className="leaderboard-tab-list">
            {/* HEADER */}
            <div className="leaderboard-row leaderboard-header">
              <span>Rank</span>
              <span>Name</span>
              <span>Location</span>
              <span>Journey</span>
              <span>Date</span>
              <span>Score</span>
            </div>

            {/* ROWS */}

            {believers.map((believer) => (
              <div key={believer.rank} className="leaderboard-row neu-tab-btn">

                <span>{believer.rank}</span>
                <span className="leaderboard-name">
                  {believer.name} &nbsp;
                  <a href="https://twitter.com/djkwemo" target="_blank" rel="noopener noreferrer">
                    <img className="leaderboard-twitter" src="twitter.png" />
                  </a>
                  <a href="https://instagram.com/djkwemo" target="_blank" rel="noopener noreferrer">
                    <img className="leaderboard-instagram" src="instagram.png" />
                  </a>
                  <a href="https://youtube.com/@djkwemo" target="_blank" rel="noopener noreferrer">
                    <img className="leaderboard-youtube" src="youtube.png" />
                  </a>
                  <a href="https://tiktok.com/@djkwemo" target="_blank" rel="noopener noreferrer">
                    <img className="leaderboard-tiktok" src="tiktok.png" />
                  </a>
                </span>
                <span>{believer.location}</span>
                <span>{believer.journey}</span>
                <span>{believer.date}</span>
                <span style={{color: "#beac46"}}>{believer.score}</span>

              </div>
            ))}
          </div>
        </nav>
  );
}