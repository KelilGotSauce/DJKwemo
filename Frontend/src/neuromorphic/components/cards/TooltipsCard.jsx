import { Bell, Home, MessageSquare, Settings, User } from "lucide-react";

const items = [
  { label: "Home", icon: Home },
  { label: "Settings", icon: Settings },
  { label: "Notifications", icon: Bell },
  { label: "Profile", icon: User },
];

export default function TooltipsCard() {
  return (
    <article className="neu-card neu-raised">
      <h2 className="neu-card-title">
        <MessageSquare size={20} />
        Tooltips
      </h2>

      <div className="neu-wrap">
        {items.map(({ label, icon: Icon }) => (
          <div key={label} className="tooltip-wrap">
            <button
              type="button"
              className="neu-icon-btn neu-raised neu-btn neu-focus"
              aria-label={label}
            >
              <Icon size={20} />
            </button>
            <div className="tooltip-box">{label}</div>
          </div>
        ))}
      </div>
    </article>
  );
}