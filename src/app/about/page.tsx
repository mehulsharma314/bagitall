import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Scissors, Recycle, Palette } from "lucide-react";

const PILLARS = [
  {
    icon: Scissors,
    title: "Handcrafted",
    desc: "Every piece is made by hand, never mass-manufactured. True artisanal creation.",
  },
  {
    icon: Recycle,
    title: "Zero Waste",
    desc: "We use discarded fabrics that would otherwise end up in landfills. Nothing wasted.",
  },
  {
    icon: Palette,
    title: "Wearable Art",
    desc: "Each creation is a canvas that tells a cultural story. Wear your narrative.",
  },
];

export const metadata = {
  title: "About Us | Bag It All",
  description: "Learn the story behind Bag It All and REकलture: our crusade against fast fashion and dedication to sustainable, 1-of-1 wearable art.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh", background: "var(--off-white)" }}>
        
        {/* Header */}
        <section className="gallery-header" style={{ padding: "100px 0 80px", background: "var(--blue-deep)" }}>
          <div className="container gallery-header__content">
            <span className="gallery-header__eyebrow">The Manifesto</span>
            <h1 className="gallery-header__title" style={{ maxWidth: "800px", margin: "0 auto 24px" }}>
              BagItAll: <em>THE ARCHIVE TO THE ATELIER.</em>
            </h1>
            <p className="gallery-header__subtitle" style={{ maxWidth: "700px", fontSize: "1.15rem" }}>
              It started with Bag It All. A year spent digging through the forgotten, the vintage, and the rare.
              We became obsessed with the hunt-finding soul in second-hand pieces that the world had moved past.
              But we saw a gap. Some pieces were too beautiful to leave behind, yet too &ldquo;broken&rdquo; to wear. We didn&apos;t see waste; we saw a blank canvas. That is where REकलture began.
            </p>
          </div>
        </section>

        {/* ── WHAT IS BAG IT ALL ── */}
        <section className="section about-bia reveal-section">
          <div className="container">
            <div className="about-bia__grid-v2">
              <div className="about-bia__text reveal-left">
                <span className="section-tag">Who We Are</span>
                <h2 className="section-title">
                  What is<br />
                  <em className="font-editorial">Bag It All?</em>
                </h2>
                <p className="about-bia__body">
                  Bag It All is not your average thrift store. We are a{" "}
                  <strong style={{ color: "var(--blue-mid)", fontWeight: 700 }}>
                    scarcity-driven digital gallery
                  </strong>{" "}
                  built for the conscious generation — those who believe
                  fashion should be intentional, rare, and meaningful.
                </p>
                <p className="about-bia__body">
                  We source the most unique pre-loved pieces and list them one
                  at a time. No restocks. No duplicates. When a piece is
                  claimed, it leaves our gallery forever and becomes part of
                  your story.
                </p>
                <Link href="/thrift" className="btn-primary" style={{ marginTop: "8px" }}>
                  Shop Thrift Gallery →
                </Link>
              </div>

              {/* Stat Cards */}
              <div className="about-bia__stats-v2 reveal-right">
                {[
                  { num: "1", label: "Of Each Piece", desc: "Every item is unique. Once sold, it's gone forever." },
                  { num: "0", label: "Restocks. Ever.", desc: "True scarcity. Real exclusivity. No compromises.", delay: 80 },
                  { num: "100%", label: "Sustainable", desc: "Every piece breathes new life from forgotten fabric.", accent: true, delay: 160 },
                ].map(({ num, label, desc, accent, delay = 0 }) => (
                  <div key={label} className={`stat-card${accent ? " stat-card--accent" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
                    <span className="stat-card__num">{num}</span>
                    <span className="stat-card__label">{label}</span>
                    <p className="stat-card__desc">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WAVE DOWN ── */}
        <div className="wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="#0f172a" />
          </svg>
        </div>

        {/* ── WHAT IS REKALTURE ── */}
        <section className="section about-rk-v2 reveal-section">
          <div className="container">
            <div className="about-rk__grid-v2">
              <span className="section-tag reveal-up" style={{ color: "var(--blue-light)" }}>
                In-House Label
              </span>
              <h2 className="section-title reveal-up" style={{ color: "#fff", transitionDelay: "80ms" }}>
                What is<br />
                <em className="font-editorial" style={{ color: "var(--blue-light)" }}>
                  REकलture?
                </em>
              </h2>
              <p className="about-rk__body reveal-up" style={{ transitionDelay: "160ms" }}>
                REकलture is our in-house upcycling label where discarded fabrics
                are transformed into exclusive wearable art. The word blends the
                Hindi &ldquo;कल&rdquo; (tomorrow) with culture, embodying our belief
                that tomorrow&apos;s fashion is built from today&apos;s waste.
              </p>
              <p className="about-rk__body reveal-up" style={{ transitionDelay: "220ms" }}>
                Every REकलture piece is hand-crafted, one-of-a-kind, and comes
                with its own origin story. We don&apos;t just upcycle clothes &mdash;
                we upcycle narratives.
              </p>

              {/* Glass Pillar Cards — staggered tilt-on-hover */}
              <div className="rk__pillars-v2">
                {PILLARS.map(({ icon: Icon, title, desc }, idx) => (
                  <div
                    key={title}
                    className="rk__pillar-card reveal-up tilt-card"
                    style={{ transitionDelay: `${280 + idx * 80}ms` }}
                  >
                    <div className="rk__pillar-card__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <strong className="rk__pillar-card__title">{title}</strong>
                    <p className="rk__pillar-card__desc">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="reveal-up" style={{ transitionDelay: "520ms" }}>
                <Link href="/rekalture" className="btn-primary" style={{ background: "var(--blue-brand)" }}>
                  Explore REकलture →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAVE UP ── */}
        <div className="wave-divider wave-divider--up" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 0 L0 0 Z" fill="#0f172a" />
          </svg>
        </div>

        {/* The Mission */}
        <section className="section-sm" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
          <div className="container container-sm">
            <span className="section-tag" style={{ display: "block", textAlign: "center", marginBottom: "8px" }}>What We Do Here</span>
            <h2 className="section-title text-center" style={{ fontSize: "2.5rem", marginBottom: "48px" }}>THE REWORK <em>REVOLUTION.</em></h2>
            
            <p className="about-bia__body text-center" style={{ maxWidth: "600px", margin: "0 auto 48px" }}>
              This is our upcycling space. A laboratory where denim is ripped, stitched, and reborn.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem", color: "var(--blue-brand)", fontWeight: 700, width: "40px", marginTop: "4px" }}>🔍</div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "8px" }}>The Hunt</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>Curating the best vintage via Bag It All.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem", color: "var(--blue-brand)", fontWeight: 700, width: "40px", marginTop: "4px" }}>🎨</div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "8px" }}>The Artwork</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>Hand-painting, distressing, and structural reworking.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem", color: "var(--blue-brand)", fontWeight: 700, width: "40px", marginTop: "4px" }}>🔁</div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "8px" }}>The Result</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>A REकलture piece that can never be replicated.</p>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: "64px", 
              textAlign: "center", 
              padding: "40px", 
              background: "var(--blue-deep)", 
              color: "#fff",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(10,22,40,0.15)"
            }}>
              <p className="font-editorial" style={{ fontSize: "1.5rem", marginBottom: "32px" }}>
                &ldquo;We are closing the loop on fast fashion, one stitch at a time.&rdquo;
              </p>
              <Link href="/contact" className="btn-primary" style={{ background: "var(--blue-brand)" }}>Join the Movement</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
