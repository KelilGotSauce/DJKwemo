import { ChevronDown, ChevronsDown } from "lucide-react";
import { useState } from "react";

const items = [
  {
    title: "What is neuromorphic design?",
    content:
      "Neuromorphic design uses soft shadows and gradients to create a soft, extruded plastic look. It mimics real physical objects with subtle depth.",
  },
  {
    title: "Is it accessible?",
    content:
      "Yes. This React version can keep keyboard navigation, labels, and focus states while still looking polished.",
  },
  {
    title: "Can I customize it?",
    content:
      "Absolutely. Once the base styles are working, you can swap colors, shadows, radius values, and spacing very easily.",
  },
];

export default function AccordionCard() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <article className="neu-card neu-raised" style={{ gridColumn: "span 2" }}>
      <h2 className="neu-card-title">
        <ChevronsDown size={20} />
        Accordion
      </h2>

      <div className="accordion-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.title} className="accordion-item neu-flat">
              <button
                type="button"
                className="accordion-trigger neu-focus"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="neu-text-sm" style={{ fontWeight: 500 }}>
                  {item.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${isOpen ? "is-open" : ""}`}
                />
              </button>

              {isOpen && <div className="accordion-panel">{item.content}</div>}
            </div>
          );
        })}
      </div>
    </article>
  );
}