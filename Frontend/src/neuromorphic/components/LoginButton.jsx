import "./LoginButton.css"

export default function LoginButton({ onClick }) {
  return (
      <button className="login-btn neu-glass-surface">
        <span className="login-label">Login</span>
      </button>
  );
}