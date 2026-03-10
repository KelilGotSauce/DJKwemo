export default function LoginButton({ user, onLoginClick, onLogout, onEdit}) {
  return !user ? (
    <button className="log-btn neu-glass-surface" onClick={onLoginClick}>
        <span className="login-label">Login</span>
    </button>
  ) : (
    <div className="container-btn">
      <button className="log-btn neu-glass-surface" onClick={onEdit}>
          <span className="edit-label">Edit Profile</span>
      </button>
      <button className="log-btn neu-glass-surface" onClick={onLogout}>
          <span className="logout-label">Logout</span>
      </button>
    </div>
  );
}