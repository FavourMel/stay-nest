import { useState } from "react";
import { cities } from "../data/apartments";

const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under ₦150,000", min: 0, max: 150000 },
  { label: "₦150,000 – ₦250,000", min: 150000, max: 250000 },
  { label: "₦250,000 – ₦350,000", min: 250000, max: 350000 },
  { label: "₦350,000+", min: 350000, max: Infinity },
];

const ROOM_OPTIONS = ["Any", "Studio", "1", "2", "3", "4+"];

export default function FilterBar({ filters, onChange, total }) {
  const [open, setOpen] = useState(false);

  const setFilter = (key, val) => onChange({ ...filters, [key]: val });

  const activeCount = [
    filters.city !== "All Cities",
    filters.priceRange !== 0,
    filters.rooms !== "Any",
    filters.type !== "Any",
  ].filter(Boolean).length;

  const clearAll = () => onChange({ city: "All Cities", priceRange: 0, rooms: "Any", type: "Any" });

  return (
    <div style={{ background: "white", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)", marginBottom: 36, overflow: "hidden" }}>
      {/* Top Bar */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
            {total} apartment{total !== 1 ? "s" : ""} found
          </span>
          {activeCount > 0 && (
            <span style={{ background: "var(--beige-dark)", color: "white", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
              {activeCount} filter{activeCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {activeCount > 0 && (
            <button onClick={clearAll} style={{ fontSize: 13, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Clear all
            </button>
          )}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 18px",
              background: open ? "var(--beige-dark)" : "var(--surface)",
              color: open ? "white" : "var(--text-primary)",
              border: `1px solid ${open ? "var(--beige-dark)" : "var(--border)"}`,
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {open && (
        <div style={{
          borderTop: "1px solid var(--border)",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
          background: "var(--surface)",
        }}>
          {/* City */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              City
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setFilter("city", city)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    border: `1.5px solid ${filters.city === city ? "var(--beige-dark)" : "var(--border)"}`,
                    background: filters.city === city ? "var(--beige-dark)" : "white",
                    color: filters.city === city ? "white" : "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              Price Range
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {PRICE_RANGES.map((range, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange === i}
                    onChange={() => setFilter("priceRange", i)}
                    style={{ accentColor: "var(--beige-dark)", width: 16, height: 16 }}
                  />
                  <span style={{ fontSize: 13, color: filters.priceRange === i ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: filters.priceRange === i ? 600 : 400 }}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              Bedrooms
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ROOM_OPTIONS.map(r => (
                <button
                  key={r}
                  onClick={() => setFilter("rooms", r)}
                  style={{
                    minWidth: 44, height: 40, padding: "0 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 13, fontWeight: 600,
                    border: `1.5px solid ${filters.rooms === r ? "var(--beige-dark)" : "var(--border)"}`,
                    background: filters.rooms === r ? "var(--beige-dark)" : "white",
                    color: filters.rooms === r ? "white" : "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              Property Type
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Any", "Studio", "Apartment", "Loft", "Penthouse", "Townhouse"].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter("type", t)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 20, fontSize: 13, fontWeight: 500,
                    border: `1.5px solid ${filters.type === t ? "var(--beige-dark)" : "var(--border)"}`,
                    background: filters.type === t ? "var(--beige-dark)" : "white",
                    color: filters.type === t ? "white" : "var(--text-secondary)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { PRICE_RANGES };