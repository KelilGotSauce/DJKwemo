import "./LoginButton.css"

export default function LoginButton({ onClick }) {
  return (
      <button
      type="button"
      className="neu-live-pill neu-raised-sm hero-claim-pill login-btn"
      onClick={onClick}
    >
        <span className="login-label">Login</span>
      </button>
  );
}