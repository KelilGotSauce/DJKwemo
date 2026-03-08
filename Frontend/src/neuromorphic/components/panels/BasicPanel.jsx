import ButtonsCard from "../cards/ButtonsCard";
import TogglesChecksCard from "../cards/TogglesChecksCard";
import BadgesCard from "../cards/BadgesCard";
import TooltipsCard from "../cards/TooltipsCard";
import AccordionCard from "../cards/AccordionCard";

export default function BasicsPanel() {
  return (
    <section>
      <div className="neu-grid">
        <ButtonsCard />
        <TogglesChecksCard />
        <BadgesCard />
        <TooltipsCard />
        <AccordionCard />
      </div>
    </section>
  );
}