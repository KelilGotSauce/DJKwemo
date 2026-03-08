import { useMemo, useState } from "react";
import "./neuromorphic.css";

import ThemeToggle from "./components/Themetoggle";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import BasicsPanel from "./components/panels/BasicPanel";

const tabs = [
  { id: "basics", label: "Basics" },
  { id: "forms", label: "Forms" },
  { id: "feedback", label: "Feedback" },
  { id: "data", label: "Data" },
  { id: "advanced", label: "Advanced" },
];

export default function NeuromorphicPlayground() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("basics");

  const rootClassName = useMemo(
    () => `neu-page ${darkMode ? "dark" : ""}`,
    [darkMode]
  );

  return (
    <div className={rootClassName}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((v) => !v)} />

      <Header />

      <main id="main-content" className="neu-main">
        <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "basics" && <BasicsPanel />}

        {activeTab === "forms" && (
          <section className="coming-soon-card">Forms panel coming next.</section>
        )}

        {activeTab === "feedback" && (
          <section className="coming-soon-card">Feedback panel coming next.</section>
        )}

        {activeTab === "data" && (
          <section className="coming-soon-card">Data panel coming next.</section>
        )}

        {activeTab === "advanced" && (
          <section className="coming-soon-card">Advanced panel coming next.</section>
        )}
      </main>
    </div>
  );
}