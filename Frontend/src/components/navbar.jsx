export default function Navbar({ user, onLoginClick, onLogout, logoText = "DJKwemo" }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 32px", 
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "24px" }}>{logoText}</div>

      {!user ? (
        <button onClick={onLoginClick}>
          Already A Believer? Login
        </button>
      ) : (
        <button onClick={onLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}