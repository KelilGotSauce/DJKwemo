import { Badge, Clock, X } from "lucide-react";

export default function BadgesCard() {
  return (
    <article className="neu-card neu-raised">
      <h2 className="neu-card-title">
        <Badge size={20} />
        Badges
      </h2>

      <div className="neu-wrap">
        <span className="neu-pill neu-raised-sm">Default</span>
        <span className="neu-pill badge-primary">Primary</span>
        <span className="neu-pill badge-success">Success</span>
        <span className="neu-pill badge-warning">Warning</span>
        <span className="neu-pill badge-error">Error</span>
        <span className="neu-pill badge-info">Info</span>
      </div>

      <h3 className="neu-subheading">With Icons</h3>

      <div className="neu-wrap">
        <span className="neu-pill" style={{ background: "#dcfce7", color: "#166534" }}>
          <span className="live-dot" style={{ animation: "none", width: 6, height: 6 }} />
          Active
        </span>

        <span className="neu-pill" style={{ background: "#fef3c7", color: "#92400e" }}>
          <Clock size={12} />
          Pending
        </span>

        <span className="neu-pill" style={{ background: "#fee2e2", color: "#991b1b" }}>
          <X size={12} />
          Closed
        </span>
      </div>
    </article>
  );
}