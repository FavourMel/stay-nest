import { useState } from "react";

export default function ApartmentDetailPage({ apartment, onBack }) {
  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    moveIn: "", duration: "12 months", occupants: "1",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.moveIn) e.moveIn = "Required";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const gallery = apartment.gallery || [apartment.image];

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Back Nav */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px 0" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "white", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "9px 18px",
            fontSize: 14, fontWeight: 500, color: "var(--text-secondary)",
            cursor: "pointer", transition: "all 0.2s", boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to listings
        </button>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 80px" }}>

        {/* Gallery */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderRadius: "var(--radius-xl)", overflow: "hidden", marginBottom: 48, height: 480 }} className="gallery-grid">
          <div style={{ overflow: "hidden", position: "relative" }}>
            <img
              src={gallery[activeImg]}
              alt={apartment.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20 }}>
              <span style={{ background: "var(--beige-dark)", color: "white", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                {apartment.type}
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 12 }}>
            {gallery.slice(1, 3).map((img, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer", position: "relative" }} onClick={() => setActiveImg(i + 1)}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
                {i === 1 && gallery.length > 3 && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>+{gallery.length - 3} Photos</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: "flex", gap: 10, marginBottom: 48, overflowX: "auto", paddingBottom: 4 }}>
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                flexShrink: 0,
                width: 80, height: 56,
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: `2.5px solid ${activeImg === i ? "var(--beige-dark)" : "transparent"}`,
                padding: 0,
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "start" }} className="detail-grid">

          {/* Left: Details */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14, color: "var(--text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {apartment.location}
                </span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14, color: "var(--text-muted)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--beige-dark)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {apartment.rating} ({apartment.reviews} reviews)
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
                marginBottom: 20,
              }}>
                {apartment.title}
              </h1>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { label: "Bedrooms", value: apartment.rooms === 1 && apartment.type === "Studio" ? "Studio" : `${apartment.rooms} BR` },
                  { label: "Bathrooms", value: `${apartment.bathrooms} BA` },
                  { label: "Size", value: `${apartment.size.toLocaleString()} sq ft` },
                  { label: "Available", value: apartment.available },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)", marginBottom: 32 }} />

            {/* Description */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16, fontFamily: "var(--font-sans)" }}>
                About this apartment
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {apartment.description}
              </p>
            </div>

            {/* Features */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 20, fontFamily: "var(--font-sans)" }}>
                Amenities & Features
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {apartment.features.map(feature => (
                  <div key={feature} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px",
                    background: "white",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}>
                    <span style={{
                      width: 32, height: 32,
                      background: "var(--beige-light)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--beige-accent)" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16, fontFamily: "var(--font-sans)" }}>
                Location
              </h2>
              <div style={{
                background: "white",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                height: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, var(--border) 40px, var(--border) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--border) 40px, var(--border) 41px)",
                  backgroundSize: "41px 41px",
                  opacity: 0.4,
                }} />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{apartment.location}</p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{apartment.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div style={{ position: "sticky", top: 96 }}>
            <div style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}>
              {/* Price header */}
              <div style={{
                padding: "24px 28px 20px",
                borderBottom: "1px solid var(--border)",
                background: "linear-gradient(135deg, #1a1410 0%, #2a1f14 100%)",
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--beige-dark)", marginBottom: 8 }}>
                  Book this Apartment
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: "white", letterSpacing: "-1px" }}>
                    ₦{apartment.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>/month</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                    Available {apartment.available}
                  </p>
                </div>
              </div>

              <div style={{ padding: "24px 28px" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: "50%",
                      background: "var(--beige-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px",
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, fontFamily: "var(--font-serif)" }}>
                      Booking Request Sent!
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 6 }}>
                      Your request for <strong style={{ color: "var(--text-primary)" }}>{apartment.title}</strong> has been received.
                    </p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                      Our team will contact you within 24 hours to confirm your booking.
                    </p>
                    <div style={{ background: "var(--surface)", borderRadius: "var(--radius-md)", padding: "16px", textAlign: "left", marginBottom: 24 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Booking Summary</p>
                      {[
                        { label: "Move-in Date", value: new Date(form.moveIn).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) },
                        { label: "Lease Duration", value: form.duration },
                        { label: "Occupants", value: form.occupants },
                        { label: "Monthly Rent", value: `₦${apartment.price.toLocaleString()}` },
                      ].map(row => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{row.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", moveIn: "", duration: "12 months", occupants: "1", notes: "" }); }}
                      style={{ fontSize: 13, color: "var(--beige-accent)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
                      Fill in your details below and our team will get back to you to confirm availability.
                    </p>

                    {/* Full Name */}
                    <Field label="Full Name" error={errors.name}>
                      <input
                        type="text"
                        placeholder="e.g. Chidi Okafor"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle(errors.name)}
                        onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                        onBlur={e => e.target.style.borderColor = errors.name ? "#e55" : "var(--border)"}
                      />
                    </Field>

                    {/* Email */}
                    <Field label="Email Address" error={errors.email}>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={inputStyle(errors.email)}
                        onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                        onBlur={e => e.target.style.borderColor = errors.email ? "#e55" : "var(--border)"}
                      />
                    </Field>

                    {/* Phone */}
                    <Field label="Phone Number" error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={inputStyle(errors.phone)}
                        onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                        onBlur={e => e.target.style.borderColor = errors.phone ? "#e55" : "var(--border)"}
                      />
                    </Field>

                    {/* Move-in Date */}
                    <Field label="Preferred Move-in Date" error={errors.moveIn}>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={form.moveIn}
                        onChange={e => setForm(f => ({ ...f, moveIn: e.target.value }))}
                        style={inputStyle(errors.moveIn)}
                        onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                        onBlur={e => e.target.style.borderColor = errors.moveIn ? "#e55" : "var(--border)"}
                      />
                    </Field>

                    {/* Lease Duration + Occupants side by side */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                      <Field label="Lease Duration" compact>
                        <select
                          value={form.duration}
                          onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                          style={{ ...inputStyle(), appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 }}
                        >
                          {["6 months", "12 months", "18 months", "24 months"].map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Occupants" compact>
                        <select
                          value={form.occupants}
                          onChange={e => setForm(f => ({ ...f, occupants: e.target.value }))}
                          style={{ ...inputStyle(), appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 }}
                        >
                          {["1", "2", "3", "4", "5+"].map(o => (
                            <option key={o} value={o}>{o} {o === "1" ? "person" : "people"}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Notes */}
                    <Field label="Additional Notes (optional)">
                      <textarea
                        rows={3}
                        placeholder="Any special requests or questions..."
                        value={form.notes}
                        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                        style={{ ...inputStyle(), resize: "vertical", minHeight: 76 }}
                        onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                    </Field>

                    {/* Divider with total */}
                    <div style={{ background: "var(--surface)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Monthly rent</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>₦{apartment.price.toLocaleString()}</span>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%", padding: "15px",
                        background: "var(--beige-dark)", color: "white",
                        border: "none", borderRadius: "var(--radius-md)",
                        fontSize: 15, fontWeight: 600, cursor: "pointer",
                        transition: "background 0.2s",
                        letterSpacing: "0.02em",
                      }}
                      onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
                      onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
                    >
                      Request Booking
                    </button>

                    <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 12 }}>
                      No payment required at this stage
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .gallery-grid > div:last-child { display: none !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, compact, children }) {
  return (
    <div style={{ marginBottom: compact ? 0 : 14 }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 600,
        color: "var(--text-muted)", marginBottom: 5,
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 11, color: "#e55", marginTop: 4, fontWeight: 500 }}>{error}</p>
      )}
    </div>
  );
}

function inputStyle(error) {
  return {
    width: "100%", padding: "10px 14px",
    border: `1.5px solid ${error ? "#e55" : "var(--border)"}`,
    borderRadius: "var(--radius-sm)",
    fontSize: 14, color: "var(--text-primary)",
    background: "white", outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };
}