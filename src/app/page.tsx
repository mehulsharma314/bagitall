import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "REकलture | Wearable Art. Upcycled. One of One.",
  description: "REकलture transforms discarded fabrics into 1-of-1 wearable art. Part of Bag It All — a scarcity-driven platform for slow fashion. Once sold, gone forever.",
};


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO — fabric dissolve entrance ── */}
        <HeroSection />


        {/* ── MISSION ── */}
        <section className="section mission-v2 reveal-section text-center" style={{ paddingTop: "120px", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <span className="section-tag reveal-up" style={{ margin: "0 auto 20px", display: "block" }}>
              Our Mission
            </span>
            <h2 className="section-title mission__title font-display reveal-up" style={{ transitionDelay: "80ms" }}>
              Fashion That Gives Back.<br />
              <em>Not Takes Away.</em>
            </h2>
            <p className="mission__body reveal-up" style={{ transitionDelay: "160ms" }}>
              The fashion industry is the world&apos;s second-largest polluter.
              We&apos;re on a mission to change that — one curated, 1-of-1 drop
              at a time. When you buy from Bag It All or REकलture, you&apos;re
              not just buying clothing. You&apos;re casting a vote for a more
              sustainable world.
            </p>
            <div className="mission__values reveal-up" style={{ transitionDelay: "240ms" }}>
              {["Absolute Scarcity", "Zero Greenwashing", "Real Sustainability", "Authentic Stories"].map(
                (v, i) => (
                  <div key={i} className="mission__value" style={{ transitionDelay: `${240 + i * 60}ms` }}>
                    <div className="mission__value-dot" aria-hidden="true" />
                    {v}
                  </div>
                )
              )}
            </div>
            <div className="reveal-up" style={{ transitionDelay: "480ms" }}>
              <Link href="/gallery" className="btn-primary">
                Enter the Gallery →
              </Link>
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM ── */}
        <section className="section-sm reveal-section" style={{ background: "var(--white)" }}>
          <div className="container text-center">
            <span className="section-tag reveal-up" style={{ margin: "0 auto 8px", display: "block" }}>
              Follow the Journey
            </span>
            <h2 className="section-title reveal-up" style={{ transitionDelay: "80ms" }}>
              On Instagram
            </h2>
            <div className="instagram-grid">
              {[
                {
                  handle: "@REकलture",
                  url: "https://www.instagram.com/rekalture?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  logo: "/logo-rekalture.jpg",
                  color: "#1a56db",
                  delay: 120,
                },
                {
                  handle: "@bag_it_all._",
                  url: "https://www.instagram.com/bag_it_all._/",
                  logo: "/logo-bagitall.jpg",
                  color: "#0f172a",
                  delay: 200,
                },
              ].map((acc) => (
                <a
                  key={acc.handle}
                  href={acc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-card reveal-up"
                  style={{ borderColor: acc.color + "33", transitionDelay: `${acc.delay}ms` }}
                >
                  <div className="insta-card__logo">
                    <Image
                      src={acc.logo}
                      alt={`${acc.handle} on Instagram`}
                      width={88}
                      height={88}
                      style={{ objectFit: "contain", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="insta-card__handle">{acc.handle}</div>
                  <div className="insta-card__cta" style={{ background: acc.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Follow on Instagram
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
