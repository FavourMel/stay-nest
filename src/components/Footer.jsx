export default function Footer() {
  return (
    <footer style={{
      background: "#141414",
      fontFamily: "var(--font-sans)",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
        paddingBottom: 32,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 32, height: 32, background: "var(--beige-dark)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.6 20.6 21 20 21H15V15H9V21H4C3.4 21 3 20.6 3 20V9.5Z" fill="white"/>
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, color: "white" }}>
            StayNest
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {["Apartments", "About", "Privacy", "Terms"].map(item => (
            <button key={item} style={{
              background: "none", border: "none",
              fontSize: 14, color: "rgba(255,255,255,0.5)",
              cursor: "pointer", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          © 2025 StayNest. All rights reserved.
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          Lagos & Abuja, Nigeria
        </p>
      </div>
    </footer>
  );
}