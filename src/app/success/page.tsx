import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main className="success-main" style={{ background: "linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-brand) 100%)", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "0" }}>
        <div className="success-container" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "32px", padding: "60px", maxWidth: "600px", width: "90%", textAlign: "center" }}>
          <div className="success-icon" style={{ fontSize: "4rem", marginBottom: "24px", color: "var(--blue-pale)" }}>✦</div>
          <h1 className="font-display success-title" style={{ fontSize: "3.5rem", color: "#fff", marginBottom: "16px" }}>It&apos;s Yours.</h1>
          <p className="success-message" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", marginBottom: "40px", lineHeight: "1.6" }}>
            Your piece has been permanently claimed. A confirmation email is on its way. This item is now <strong>gone forever</strong> from our gallery — and yours forever.
          </p>
          <div className="success-next-steps" style={{ textAlign: "left", background: "rgba(0,0,0,0.2)", borderRadius: "16px", padding: "24px", marginBottom: "40px" }}>
            <div className="success-next-title" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue-pale)", marginBottom: "16px" }}>What happens next?</div>
            <div className="success-next-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["📧 Check your email for order confirmation","📦 Your piece ships within 3-5 business days","🌱 Packed in recycled kraft paper","❤️ Thank you for choosing sustainable fashion"].map((s,i)=>(
                <div key={i} className="success-next-item" style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>{s}</div>
              ))}
            </div>
          </div>
          <Link href="/gallery" className="btn-primary" style={{ background: "#fff", color: "var(--blue-brand)", border: "none" }}>← Explore More Drops</Link>
        </div>
      </main>
    </>
  );
}
