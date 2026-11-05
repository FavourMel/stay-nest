import { useState, useMemo } from "react";
import ApartmentCard from "../components/ApartmentCard";
import FilterBar, { PRICE_RANGES } from "../components/FilterBar";
import { apartments } from "../data/apartments";

const HERO_BG = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80";

export default function HomePage({ onViewApartment, onBook }) {
  const [filters, setFilters] = useState({ city: "All Cities", priceRange: 0, rooms: "Any", type: "Any" });

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[filters.priceRange];
    return apartments.filter(apt => {
      const matchesCity = filters.city === "All Cities" || apt.city === filters.city;
      const matchesPrice = apt.price >= priceRange.min && apt.price <= priceRange.max;
      const matchesRooms = filters.rooms === "Any" ||
        (filters.rooms === "Studio" && apt.rooms === 1 && apt.type === "Studio") ||
        (filters.rooms === "4+" && apt.rooms >= 4) ||
        apt.rooms === parseInt(filters.rooms);
      const matchesType = filters.type === "Any" || apt.type === filters.type;
      return matchesCity && matchesPrice && matchesRooms && matchesType;
    });
  }, [filters]);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, maxHeight: 820, overflow: "hidden" }}>
        <img
          src={HERO_BG}
          alt="Premium apartments"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(10,10,10,0.72) 0%, rgba(20,15,10,0.55) 60%, rgba(30,20,10,0.45) 100%)",
        }} />

        <div style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            background: "rgba(201,169,110,0.2)",
            border: "1px solid rgba(201,169,110,0.5)",
            color: "var(--beige-dark)",
            padding: "6px 18px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}>
            Premium Apartment Rentals
          </span>

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(38px, 7vw, 72px)",
            fontWeight: 500,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            maxWidth: 780,
            marginBottom: 20,
          }}>
            Find Your Perfect
            <span style={{ display: "block", color: "var(--beige-dark)", fontStyle: "italic" }}>
              City Apartment
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.72)",
            maxWidth: 540,
            marginBottom: 40,
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            Discover curated apartment rentals across Nigeria's most vibrant cities. No compromises — only exceptional living.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={onBook}
              style={{
                padding: "15px 36px",
                background: "var(--beige-dark)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
                boxShadow: "0 8px 24px rgba(201,169,110,0.35)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--beige-accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--beige-dark)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book an Apartment
            </button>
            <button
              onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "15px 36px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "var(--radius-md)",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            >
              Browse Apartments
            </button>
          </div>

        </div>
      </section>

      {/* Listings */}
      <section id="listings" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: "var(--beige-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Handpicked for you
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              Available Apartments
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 360 }}>
            Each listing is verified and photographed to give you the most accurate view of your next home.
          </p>
        </div>

        <FilterBar filters={filters} onChange={setFilters} total={filtered.length} />

        {filtered.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 28,
          }}>
            {filtered.map(apt => (
              <ApartmentCard key={apt.id} apartment={apt} onClick={() => onViewApartment(apt)} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--beige)" strokeWidth="1.5" style={{ margin: "0 auto 16px", display: "block" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>No apartments found</h3>
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 24 }}>Try adjusting your filters or search terms.</p>
            <button
              onClick={() => setFilters({ city: "All Cities", priceRange: 0, rooms: "Any", type: "Any" })}
              style={{
                padding: "11px 28px",
                background: "var(--beige-dark)", color: "white",
                border: "none", borderRadius: "var(--radius-sm)",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--beige-accent)", marginBottom: 14 }}>
                About StayNest
              </p>
              <h2 style={{
                fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2,
                letterSpacing: "-0.3px", marginBottom: 20,
              }}>
                Finding your home in Nigeria, made simple.
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 32 }}>
                StayNest is a Nigerian apartment rental outlet focused on Lagos and Abuja. We personally verify every listing on our platform so you can trust what you see — real photos, real prices, real availability. No agents, no hidden fees, no stress.
              </p>
              <button
                onClick={onBook}
                style={{
                  padding: "13px 30px", background: "var(--beige-dark)", color: "white",
                  border: "none", borderRadius: "var(--radius-md)",
                  fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
                onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
              >
                Book an Apartment
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  title: "Verified Listings",
                  body: "Every apartment is inspected by our team before going live.",
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                  title: "Clear Pricing",
                  body: "The price you see is the price you pay. No surprises.",
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  title: "24h Response",
                  body: "Submit a request and hear back from us the same day.",
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  title: "Lagos & Abuja",
                  body: "Deep local knowledge of Nigeria's two biggest cities.",
                },
              ].map(card => (
                <div key={card.title} style={{
                  background: "white", borderRadius: "var(--radius-lg)", padding: "22px 20px",
                  border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "var(--radius-sm)",
                    background: "var(--beige-light)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}