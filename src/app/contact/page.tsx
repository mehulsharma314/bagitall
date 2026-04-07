"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate network request
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh", background: "var(--off-white)" }}>
        
        <section className="section">
          <div className="container" style={{ maxWidth: "1000px" }}>
            
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span className="section-tag">Get in Touch</span>
              <h1 className="section-title">Drop Us a Line.</h1>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Have a question about a piece? Want to collaborate? Or just want to talk sustainable fashion? We're all ears.
              </p>
            </div>

            <div className="grid-2" style={{ gap: "48px", alignItems: "start" }}>
              
              {/* Contact Form */}
              <div className="card" style={{ padding: "40px" }}>
                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🕊️</div>
                    <h3 style={{ fontSize: "1.5rem", color: "var(--blue-deep)", marginBottom: "8px" }}>Message Received</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "24px" }}>
                      Thank you for reaching out. We will get back to you within 24-48 hours.
                    </p>
                    <button onClick={() => setStatus("idle")} className="btn-outline" style={{ fontSize: "12px", padding: "10px 20px" }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div className="input-group">
                      <label className="input-label" htmlFor="name">Name</label>
                      <input 
                        id="name"
                        className="input-field" 
                        type="text" 
                        placeholder="What should we call you?"
                        required
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label" htmlFor="email">Email</label>
                      <input 
                        id="email"
                        className="input-field" 
                        type="email" 
                        placeholder="you@example.com"
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label" htmlFor="message">Message</label>
                      <textarea 
                        id="message"
                        className="input-field" 
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        required
                        style={{ resize: "vertical" }}
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn-primary" disabled={status === "sending"}>
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                  <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "16px" }}>Slide into our DMs</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.7" }}>
                    We are highly active on Instagram. For the fastest response regarding specific drops or pieces, direct messaging is your best bet.
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <a href="https://www.instagram.com/bagitall/" target="_blank" rel="noopener noreferrer" 
                       style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px", background: "#fff", border: "1.5px solid var(--border)", borderRadius: "16px", textDecoration: "none", transition: "all 0.3s ease" }}
                       onMouseOver={e => e.currentTarget.style.borderColor = "var(--blue-pale)"}
                       onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div style={{ width: "48px", height: "48px", background: "var(--blue-ghost)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src="/logo-bagitall.jpg" alt="Bag It All" width={48} height={48} style={{ borderRadius: "50%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Thrift Collection</div>
                        <div style={{ fontSize: "16px", color: "var(--blue-deep)", fontWeight: 700 }}>@bagitall</div>
                      </div>
                      <div style={{ marginLeft: "auto", fontSize: "20px" }}>↗</div>
                    </a>

                    <a href="https://www.instagram.com/rekalture?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" 
                       style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px", background: "var(--blue-deep)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "16px", textDecoration: "none", transition: "all 0.3s ease" }}
                       onMouseOver={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}
                       onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    >
                      <div style={{ width: "48px", height: "48px", background: "#0d2045", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                         <Image src="/logo-rekalture.jpg" alt="Rekalture" width={48} height={48} style={{ borderRadius: "50%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Upcycled Art</div>
                        <div style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>@REकलture</div>
                      </div>
                      <div style={{ marginLeft: "auto", fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>↗</div>
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "8px" }}>General Inquiries</h3>
                  <a href="mailto:hello@bagitall.com" style={{ fontSize: "1rem", color: "var(--blue-brand)", textDecoration: "none", fontWeight: 600 }}>hello@bagitall.com</a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
