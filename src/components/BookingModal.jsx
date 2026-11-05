import { useState, useEffect } from "react";

const INITIAL = {
  name: "", email: "", phone: "",
  city: "", area: "", type: "", budget: "", moveIn: "", notes: "",
};

export default function BookingModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city) e.city = "Select a city";
    if (!form.type) e.type = "Select a type";
    if (!form.budget) e.budget = "Select a budget";
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

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(INITIAL); setErrors({}); setSubmitted(false); }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(10,8,6,0.65)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1101,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 16px",
        pointerEvents: "none",
      }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: "all",
            width: "100%", maxWidth: 620,
            maxHeight: "90vh",
            overflowY: "auto",
            background: "white",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
            animation: "slideUp 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "28px 32px 24px",
            borderBottom: "1px solid var(--border)",
            background: "linear-gradient(135deg, #1a1410 0%, #2a1f14 100%)",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
            position: "sticky", top: 0, zIndex: 1,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--beige-dark)", marginBottom: 6 }}>
                  StayNest
                </p>
                <h2 style={{
                  fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500,
                  color: "white", lineHeight: 1.2, margin: 0,
                }}>
                  Request an Apartment
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                  Tell us what you need — we'll find the right match for you.
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "28px 32px 32px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: 68, height: 68, borderRadius: "50%",
                  background: "var(--beige-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--beige-dark)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, color: "var(--text-primary)", marginBottom: 12 }}>
                  Request Received!
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px" }}>
                  Thank you, <strong style={{ color: "var(--text-primary)" }}>{form.name.split(" ")[0]}</strong>. Our team will review your request and reach out to you within 24 hours with available options in <strong style={{ color: "var(--text-primary)" }}>{form.city}</strong>.
                </p>

                <div style={{
                  background: "var(--surface)", borderRadius: "var(--radius-md)",
                  padding: "20px", textAlign: "left", marginBottom: 28,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
                    Your Request Summary
                  </p>
                  {[
                    { label: "City", value: form.city },
                    form.area && { label: "Preferred Area", value: form.area },
                    { label: "Apartment Type", value: form.type },
                    { label: "Budget", value: form.budget },
                    { label: "Move-in Date", value: new Date(form.moveIn).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) },
                  ].filter(Boolean).map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleClose}
                  style={{
                    padding: "13px 36px",
                    background: "var(--beige-dark)", color: "white",
                    border: "none", borderRadius: "var(--radius-md)",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
                  onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {/* Section: Contact */}
                <SectionLabel>Your Contact Details</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="modal-two-col">
                  <Field label="Full Name" error={errors.name}>
                    <input type="text" placeholder="e.g. Emeka Nwosu" value={form.name}
                      onChange={e => set("name", e.target.value)}
                      style={inp(errors.name)}
                      onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                      onBlur={e => e.target.style.borderColor = errors.name ? "#d44" : "var(--border)"}
                    />
                  </Field>
                  <Field label="Phone Number" error={errors.phone}>
                    <input type="tel" placeholder="+234 800 000 0000" value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      style={inp(errors.phone)}
                      onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                      onBlur={e => e.target.style.borderColor = errors.phone ? "#d44" : "var(--border)"}
                    />
                  </Field>
                </div>
                <Field label="Email Address" error={errors.email} bottom={24}>
                  <input type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => set("email", e.target.value)}
                    style={inp(errors.email)}
                    onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                    onBlur={e => e.target.style.borderColor = errors.email ? "#d44" : "var(--border)"}
                  />
                </Field>

                <Divider />

                {/* Section: Location */}
                <SectionLabel>Location Preference</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="modal-two-col">
                  <Field label="City" error={errors.city}>
                    <select value={form.city} onChange={e => set("city", e.target.value)} style={sel(errors.city)}>
                      <option value="">Select city...</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                    </select>
                  </Field>
                  <Field label="Preferred Area (optional)">
                    <input type="text"
                      placeholder={form.city === "Abuja" ? "e.g. Maitama, Wuse 2" : "e.g. Lekki, Ikoyi"}
                      value={form.area}
                      onChange={e => set("area", e.target.value)}
                      style={inp()}
                      onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                    />
                  </Field>
                </div>

                <Divider />

                {/* Section: Apartment */}
                <SectionLabel>Apartment Requirements</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="modal-two-col">
                  <Field label="Apartment Type" error={errors.type}>
                    <select value={form.type} onChange={e => set("type", e.target.value)} style={sel(errors.type)}>
                      <option value="">Select type...</option>
                      {["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Monthly Budget" error={errors.budget}>
                    <select value={form.budget} onChange={e => set("budget", e.target.value)} style={sel(errors.budget)}>
                      <option value="">Select range...</option>
                      {[
                        "Under ₦150,000",
                        "₦150,000 – ₦250,000",
                        "₦250,000 – ₦350,000",
                        "₦350,000 – ₦450,000",
                      ].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Preferred Move-in Date" error={errors.moveIn} bottom={24}>
                  <input type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.moveIn}
                    onChange={e => set("moveIn", e.target.value)}
                    style={inp(errors.moveIn)}
                    onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                    onBlur={e => e.target.style.borderColor = errors.moveIn ? "#d44" : "var(--border)"}
                  />
                </Field>

                <Divider />

                {/* Notes */}
                <Field label="Additional Requirements (optional)" bottom={28}>
                  <textarea
                    rows={3}
                    placeholder="e.g. Must have parking, prefer a gated estate, pet-friendly..."
                    value={form.notes}
                    onChange={e => set("notes", e.target.value)}
                    style={{ ...inp(), resize: "vertical", minHeight: 84 }}
                    onFocus={e => e.target.style.borderColor = "var(--beige-dark)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  />
                </Field>

                <button
                  type="submit"
                  style={{
                    width: "100%", padding: "16px",
                    background: "var(--beige-dark)", color: "white",
                    border: "none", borderRadius: "var(--radius-md)",
                    fontSize: 15, fontWeight: 600, cursor: "pointer",
                    transition: "background 0.2s", letterSpacing: "0.02em",
                  }}
                  onMouseEnter={e => e.target.style.background = "var(--beige-accent)"}
                  onMouseLeave={e => e.target.style.background = "var(--beige-dark)"}
                >
                  Submit Request
                </button>
                <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 12 }}>
                  No payment required — our team will contact you with options.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @media (max-width: 560px) {
          .modal-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: "var(--beige-accent)",
      marginBottom: 14,
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "20px 0 20px" }} />;
}

function Field({ label, error, bottom = 16, children }) {
  return (
    <div style={{ marginBottom: bottom }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 600,
        color: "var(--text-muted)", marginBottom: 6,
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: 11, color: "#d44", marginTop: 5, fontWeight: 500 }}>{error}</p>}
    </div>
  );
}

function inp(error) {
  return {
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${error ? "#d44" : "var(--border)"}`,
    borderRadius: "var(--radius-sm)",
    fontSize: 14, color: "var(--text-primary)",
    background: "white", outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };
}

function sel(error) {
  return {
    ...inp(error),
    appearance: "none",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: 36,
    cursor: "pointer",
  };
}