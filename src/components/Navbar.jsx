import { useState, useEffect } from "react";

export default function Navbar({ onNavigate, currentPage, onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = currentPage === "home";
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: transparent ? "transparent" : "rgba(255,255,255,0.97)",
      backdropFilter: transparent ? "none" : "blur(12px)",
      borderBottom: transparent ? "none" : "1px solid var(--border)",
      boxShadow: transparent ? "none" : "var(--shadow-sm)",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <span style={{ width: 36, height: 36, background: "var(--beige-dark)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.6 20.6 21 20 21H15V15H9V21H4C3.4 21 3 20.6 3 20V9.5Z" fill="white"/>
            </svg>
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, color: transparent ? "white" : "var(--text-primary)", letterSpacing: "-0.3px", transition: "color 0.3s ease" }}>
            StayNest
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {[
            { label: "Apartments", action: () => { onNavigate("home"); } },
            { label: "About", action: () => { onNavigate("home"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 80); } },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                padding: "8px 16px", fontSize: 14, fontWeight: 500,
                color: transparent ? "rgba(255,255,255,0.88)" : "var(--text-secondary)",
                borderRadius: "var(--radius-sm)", transition: "all var(--transition)",
                background: "none", border: "none",
              }}
              onMouseEnter={e => { e.target.style.color = transparent ? "white" : "var(--text-primary)"; e.target.style.background = transparent ? "rgba(255,255,255,0.1)" : "var(--surface)"; }}
              onMouseLeave={e => { e.target.style.color = transparent ? "rgba(255,255,255,0.88)" : "var(--text-secondary)"; e.target.style.background = "none"; }}
            >
              {label}
            </button>
          ))}

          <div style={{ width: 1, height: 20, background: transparent ? "rgba(255,255,255,0.3)" : "var(--border)", margin: "0 6px" }} />

          <button
            onClick={onBook}
            style={{
              padding: "10px 22px", fontSize: 14, fontWeight: 600,
              color: "white",
              background: "var(--beige-dark)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              transition: "background 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
            onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
          >
            Book an Apartment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: "none", flexDirection: "column", gap: 5, padding: 6, background: "none", border: "none" }}
          className="hamburger"
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 22, height: 2, background: transparent ? "white" : "var(--text-primary)", borderRadius: 2, transition: "all 0.2s" }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: "white", borderTop: "1px solid var(--border)", padding: "16px 24px 24px" }}>
          {[
            { label: "Apartments", action: () => { onNavigate("home"); setMenuOpen(false); } },
            { label: "About", action: () => { onNavigate("home"); setMenuOpen(false); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 80); } },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 0", fontSize: 15, fontWeight: 500,
                color: "var(--text-primary)", background: "none", border: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onBook(); setMenuOpen(false); }}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "14px 0", marginTop: 4,
              fontSize: 15, fontWeight: 600,
              color: "var(--beige-accent)", background: "none", border: "none",
              cursor: "pointer",
            }}
          >
            Book an Apartment
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}