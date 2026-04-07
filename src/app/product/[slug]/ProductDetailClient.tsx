"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = {
  title: string; slug: string; price: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
  description: string; story: string; sustainability: string;
  shipping: string; images: null[]; category: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<"story" | "sustainability" | "shipping">("story");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClaim = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/cart?product=${product.slug}`);
      } else {
        alert(data.error || "This piece was just claimed.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CTAButton = () => {
    if (product.status === "SOLD") {
      return <button className="pd-cta pd-cta--sold" disabled>Sold. Forever.</button>;
    }
    if (product.status === "RESERVED") {
      return <button className="pd-cta pd-cta--reserved" disabled>Currently Being Checked Out</button>;
    }
    return (
      <button className="pd-cta pd-cta--available" onClick={handleClaim} disabled={loading}>
        {loading ? "Claiming..." : "✦ Claim This Piece"}
      </button>
    );
  };

  return (
    <section className="pd-section">
      <div className="container pd-grid">
        {/* ── IMAGES ── */}
        <div className="pd-images">
          <div className="pd-main-img">
            <div className="pd-img-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.25">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p style={{fontSize:"12px",color:"var(--text-muted)",marginTop:"12px"}}>Product Image {activeImg + 1}</p>
            </div>
            {product.status === "SOLD" && (
              <div className="sold-overlay"><span>Sold. Forever.</span></div>
            )}
            <div className="pd-scarcity-badge">
              <span className="pd-scarcity-dot" />
              Only 1 of 1 — Ever
            </div>
          </div>
          <div className="pd-thumbnails">
            {product.images.map((_, i) => (
              <button key={i} className={`pd-thumb${activeImg === i ? " pd-thumb--active" : ""}`} onClick={() => setActiveImg(i)}>
                <div style={{width:"100%",height:"100%",background:"var(--blue-ghost)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"var(--text-muted)"}}>{i+1}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── DETAILS ── */}
        <div className="pd-details">
          <div className="pd-header">
            <span className="badge-available" style={{marginBottom:"12px",display:"inline-flex"}}>Only 1 Available</span>
            <h1 className="pd-title font-display">{product.title}</h1>
            <p className="pd-desc">{product.description}</p>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="pd-price-note">Inclusive of all taxes</span>
          </div>

          <CTAButton />

          <div className="pd-guarantee">
            <div className="pd-guarantee-item">🔒 100% Secure Razorpay Checkout</div>
            <div className="pd-guarantee-item">📦 Free Shipping above ₹999</div>
            <div className="pd-guarantee-item">♻️ Sustainable Packaging</div>
          </div>

          {/* Tabs */}
          <div className="pd-tabs">
            {(["story", "sustainability", "shipping"] as const).map((t) => (
              <button key={t} className={`pd-tab${tab === t ? " pd-tab--active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="pd-tab-content">
            {tab === "story" && <p>{product.story}</p>}
            {tab === "sustainability" && <p>{product.sustainability}</p>}
            {tab === "shipping" && <p>{product.shipping}</p>}
          </div>

          <Link href="/gallery" className="pd-back-link">← Back to Gallery</Link>
        </div>
      </div>

      
    </section>
  );
}
