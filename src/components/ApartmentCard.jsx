import { useState } from "react";

export default function ApartmentCard({ apartment, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        border: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
        {!imgLoaded && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, var(--beige-light) 0%, var(--beige) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: "50%",
              border: "3px solid var(--beige-dark)",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite",
            }} />
          </div>
        )}
        <img
          src={apartment.image}
          alt={apartment.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: imgLoaded ? 1 : 0,
          }}
        />

        {/* Save button */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: saved ? "var(--beige-dark)" : "rgba(255,255,255,0.9)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            backdropFilter: "blur(4px)",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "white" : "none"} stroke={saved ? "none" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Type badge */}
        <span style={{
          position: "absolute",
          top: 14,
          left: 14,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(4px)",
          padding: "4px 10px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          color: "var(--text-secondary)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {apartment.type}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 22px" }}>
        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--beige-dark)">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{apartment.rating}</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>({apartment.reviews} reviews)</span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--beige-accent)", fontWeight: 500, background: "var(--beige-light)", padding: "2px 8px", borderRadius: 20 }}>
            Available {apartment.available}
          </span>
        </div>

        <h3 style={{
          fontSize: 17,
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: 6,
          lineHeight: 1.3,
          fontFamily: "var(--font-sans)",
          letterSpacing: "-0.2px",
        }}>
          {apartment.title}
        </h3>

        <p style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {apartment.location}
        </p>

        <p style={{
          fontSize: 13.5,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: 18,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {apartment.description}
        </p>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: 0,
          marginBottom: 18,
          background: "var(--surface)",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}>
          {[
            {
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 12V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/><line x1="2" y1="16" x2="22" y2="16"/></svg>,
              label: `${apartment.rooms} ${apartment.rooms === 1 ? "Room" : "Rooms"}`,
            },
            {
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><path d="M4 12h16"/><path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4v-6z"/><path d="M6 20v1"/><path d="M18 20v1"/><path d="M4 8V6a2 2 0 0 1 2-2"/></svg>,
              label: `${apartment.bathrooms} Bath`,
            },
            {
              icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>,
              label: `${apartment.size} sq ft`,
            },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "8px 4px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>{stat.icon}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
              fontFamily: "var(--font-sans)",
            }}>
              ₦{apartment.price.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 400 }}>/month</span>
          </div>
          <button style={{
            padding: "9px 20px",
            background: hovered ? "var(--beige-dark)" : "var(--beige-light)",
            color: hovered ? "white" : "var(--beige-accent)",
            border: "1px solid var(--beige)",
            borderRadius: "var(--radius-sm)",
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.22s ease",
          }}>
            View Details
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </article>
  );
}