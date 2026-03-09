import { useMemo, useState } from "react";
import "./neuromorphic.css";

import BackgroundScene from "./components/BackgroundScene";
import FAQCard from "./components/panels/FAQ";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import BasicsPanel from "./components/panels/BasicPanel";
import LoginButton from "./components/LoginButton";

const tabs = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "faq", label: "FAQs" },
];

export default function NeuromorphicPlayground() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("leaderboard");

  const rootClassName = useMemo(
    () => `neu-page ${darkMode ? "dark" : ""}`,
    [darkMode]
  );

  return (
    <div className={rootClassName}>
      <BackgroundScene />

      <div className="top-bar">
        <LoginButton />
      </div>

      <Header />

      <main id="main-content" className="neu-main">
        <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "leaderboard" && <BasicsPanel />}
        {activeTab === "faq" && <FAQCard />}
      </main>
    </div>
  );
}