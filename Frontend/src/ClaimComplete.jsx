import { useSearchParams, useNavigate } from "react-router-dom";

export default function ClaimComplete() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rank = searchParams.get("rank");
  const name = searchParams.get("name");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Congratulations {name}!</h1>
      <p>You are Believer #{rank}</p>

      <button onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
}