export default function AboutPage({ onBook }) {
  return (
    <div style={{ background: "var(--off-white)", paddingTop: 72, minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 100px" }}>

       
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--beige-accent)", marginBottom: 16,
        }}>
          About Us
        </p>

        
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 500, color: "var(--text-primary)",
          lineHeight: 1.15, letterSpacing: "-0.5px",
          marginBottom: 24, maxWidth: 600,
        }}>
          Finding your home in Nigeria, made simple.
        </h1>

        
        <p style={{
          fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85,
          maxWidth: 620, marginBottom: 56,
        }}>
          StayNest is a Nigerian apartment rental outlet focused on Lagos and Abuja. We personally verify every listing on our platform so you can trust what you see — real photos, real prices, real availability. No agents, no hidden fees, no stress.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 56 }} className="about-cols">
          {[
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title: "Verified Listings",
              body: "Every apartment is inspected by our team before it goes live on the platform.",
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
              title: "Transparent Pricing",
              body: "The price you see is the price you pay. No surprise charges at signing.",
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              title: "Fast Response",
              body: "Submit a request and hear back from our team within 24 hours.",
            },
          ].map(item => (
            <div key={item.title} style={{
              background: "white", borderRadius: "var(--radius-lg)",
              padding: "28px 24px", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: "var(--beige-light)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

       
        <div style={{
          background: "linear-gradient(135deg, #1a1410 0%, #2a1f14 100%)",
          borderRadius: "var(--radius-xl)", padding: "48px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, color: "white", marginBottom: 8 }}>
              Ready to find your apartment?
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              Lagos & Abuja — we'll match you with the right place.
            </p>
          </div>
          <button
            onClick={onBook}
            style={{
              padding: "14px 32px", background: "var(--beige-dark)", color: "white",
              border: "none", borderRadius: "var(--radius-md)",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
            onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
          >
            Book an Apartment
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}