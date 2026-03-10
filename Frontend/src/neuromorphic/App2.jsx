import { useMemo, useState, useEffect } from "react";
import { apiFetch } from "../api";
import "./App2.css";

import BackgroundScene from "./components/BackgroundScene";
import FAQCard from "./panels/FAQ";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import LeaderBoard from "./panels/Leaderboard";
import LoginButton from "./components/LoginButton";
import LoginModal from "../components/LoginModal";

const tabs = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "faq", label: "FAQs" },
];

export default function App2() {
  const [believers, setBelievers] = useState([]);
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("leaderboard");

  useEffect(() => {
    fetchLeaderboard();
    fetchMe();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await apiFetch("/api/leaderboard");
      setBelievers(data);
    } catch (error) {
      console.error("Leaderboard error:", error.message);
    }
  };

  const fetchMe = async () => {
    try {
      const data = await apiFetch("/api/auth/me");
      setUser(data.believer || null);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };


  const handleEdit = async () => {
      window.location.href = "/edit-profile"
  };

  const rootClassName = useMemo(
    () => `neu-page ${darkMode ? "dark" : ""}`,
    [darkMode]
  );

  return (
    <div className={rootClassName}>
      <BackgroundScene />

      <div className="top-bar">
        <LoginButton
          user={user}
          onEdit={handleEdit}
          onLoginClick={() => setLoginOpen(true)}
          onLogout={handleLogout}
        />
      </div>

      <Header />

      <main id="main-content" className="neu-main">
        <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "leaderboard" && <LeaderBoard believers={believers} />}
        {activeTab === "faq" && <FAQCard />}
      </main>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoggedIn={(believer) => setUser(believer)}
      />
    </div>
  );
}