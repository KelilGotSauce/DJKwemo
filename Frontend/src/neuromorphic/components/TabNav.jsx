export default function TabNav({ tabs, activeTab, onChange }) {
  return (
    <nav className="neu-tab-nav" aria-label="Component categories">
      <div className="neu-tab-list neu-inset" role="tablist" aria-orientation="horizontal">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`neu-tab-btn neu-focus ${isActive ? "is-active" : ""}`}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}