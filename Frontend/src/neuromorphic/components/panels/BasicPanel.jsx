import ButtonsCard from "../cards/ButtonsCard";
import TogglesChecksCard from "../cards/TogglesChecksCard";
import BadgesCard from "../cards/BadgesCard";
import TooltipsCard from "../cards/TooltipsCard";
import AccordionCard from "../cards/AccordionCard";

export default function BasicsPanel() {
  return (
    <section>
      <div className="neu-grid">

        <nav
          className="neu-tab-nav leaderboard-tab-nav"
          aria-label="Believer leaderboard"
        >
          <div
            className="neu-tab-list neu-inset leaderboard-tab-list"
          >

            {/* Leaderboard Row */}

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