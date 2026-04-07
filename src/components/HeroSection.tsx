"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy-load archival cloth reveal (WebGL, client-only)
const ArchivalCloth = dynamic(() => import("@/components/ArchivalCloth"), {
  ssr: false,
  loading: () => null,
});

// ─────────────────────────────────────────────────────────────
//  HERO SECTION — Archival Reveal Edition
//  Layer stack (z-index):
//   1 — archival backdrop (denim)
//   2 — cinematic vignettes
//   3 — ArchivalCloth (Tactile mesh unfolding)
//   4 — text content (editorial staggered entrance)
// ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [textReady, setTextReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Text entrance begins AFTER fabric starts — 600ms delay
    const timer = setTimeout(() => setTextReady(true), 600);

    // Parallax scroll handler
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-v2" aria-label="Hero">
      {/* Layer 1 — Background image with parallax */}
      <div ref={bgRef} className="hero-v2__bg" aria-hidden="true">
        <Image
          src="/hero-bg-rk.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* Layer 2 — Multi-gradient depth overlays */}
      <div className="hero-v2__overlay" aria-hidden="true">
        {/* Navy vignette from bottom */}
        <div className="hero-v2__overlay-bottom" />
        {/* Soft blue atmospheric left */}
        <div className="hero-v2__overlay-left" />
        {/* Texture noise grain */}
        <div className="hero-v2__overlay-grain" />
      </div>

      {/* Layer 3 — Archival Cloth Reveal (Denim texture) */}
      {mounted && <ArchivalCloth />}

      {/* Layer 4 — Text content */}
      <div className="hero-v2__content">
        {/* Kicker line */}
        <div
          className={`hero-v2__kicker${textReady ? " is-visible" : ""}`}
          aria-label="REकलture"
        >
          <span className="hero-v2__kicker-line" />
          <span>Wearable Art · Upcycled · One of One</span>
          <span className="hero-v2__kicker-line" />
        </div>

        {/* Main headline — each word has its own layer entrance */}
        <h1 className={`hero-v2__headline${textReady ? " is-visible" : ""}`} aria-label="Reimagined. Reworked. REकलture.">
          <span className="hero-v2__word" style={{ "--word-delay": "0ms" } as React.CSSProperties}>
            Reimagined.
          </span>
          <span className="hero-v2__word" style={{ "--word-delay": "150ms" } as React.CSSProperties}>
            Reworked.
          </span>
          <span
            className="hero-v2__word hero-v2__word--accent"
            style={{ "--word-delay": "300ms" } as React.CSSProperties}
          >
            RE<span className="font-devanagari">कल</span>ture.
          </span>
        </h1>

        {/* Sub-copy */}
        <p className={`hero-v2__sub${textReady ? " is-visible" : ""}`} style={{ transitionDelay: "600ms" }}>
          Discarded fabrics reborn as exclusive wearable art.
          <br className="hero-v2__break" />
          No restocks. No duplicates. Once gone, forever.
        </p>

        {/* CTAs */}
        <div className={`hero-v2__ctas${textReady ? " is-visible" : ""}`} style={{ transitionDelay: "780ms" }}>
          <Link href="/rekalture" className="btn-hero-primary">
            Enter REकलture
          </Link>
          <Link href="/thrift" className="btn-hero-ghost">
            Thrift Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}
