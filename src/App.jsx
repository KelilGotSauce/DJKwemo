import { useState } from "react";
import "./App.css";

export default function App() {
  const [believers, setBelievers] = useState([
    {
      rank: 1,
      profilePic: "https://via.placeholder.com/40",
      name: "Alex",
      year: "Year 5, Day 256",
      date: "3 hours ago",
      location: "Toronto",
      social: "@alex",
      score: 0
    },
    {
      rank: 2,
      profilePic: "https://via.placeholder.com/40",
      name: "Jordan",
      year: "Year 5, Day 255",
      date: "1 day ago",
      location: "New York",
      social: "@jordan",
      score: 0
    }
  ]);

  const nextRank = believers.length + 1;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Prove You Believed In Me Before I Blew Up</h1>
      <button>Become Believer #{nextRank}</button>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Year</th>
            <th>Date</th>
            <th>Location</th>
            <th>Social Media</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {believers.map((b) => (
            <tr key={b.rank}>
              <td>{b.rank}</td>
              <td><img src={b.profilePic} alt="profile" /></td>
              <td>{b.name}</td>
              <td>{b.year}</td>
              <td>{b.date}</td>
              <td>{b.location}</td>
              <td>{b.social}</td>
              <td>{b.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}