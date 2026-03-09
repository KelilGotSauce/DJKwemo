import { useMemo, useState, useEffect } from "react";
import { apiFetch } from "../api";
import "./App2.css";

import BackgroundScene from "./components/BackgroundScene";
import FAQCard from "./panels/FAQ";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import LeaderBoard from "./panels/Leaderboard";
import LoginButton from "./components/LoginButton";

const tabs = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "faq", label: "FAQs" },
];

export default function NeuromorphicPlayground() {
  const [believers, setBelievers] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("leaderboard");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await apiFetch("/api/leaderboard");
        setBelievers(data);
      } catch (error) {
        console.error("Leaderboard error:", error.message);
      }
    };

    fetchLeaderboard();
  }, []);

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
        {activeTab === "leaderboard" && <LeaderBoard believers={believers} />}
        {activeTab === "faq" && <FAQCard />}
      </main>
    </div>
  );
}