export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Bag It All",
  description: "Choose your drop — Bag It All Thrift Gallery or REकलture upcycled pieces.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="gallery-main" style={{ background: "linear-gradient(to bottom, #ffffff 0%, var(--blue-ghost) 100%)" }}>
        {/* ── PAGE HEADER ── */}
        <div className="gallery-header">
          <div className="gallery-header__bg" />
          <div className="container gallery-header__content">
            <span className="gallery-header__eyebrow">Select Your Drop</span>
            <h1 className="gallery-header__title font-display">
              The Gallery
            </h1>
            <p className="gallery-header__subtitle">
              Two distinct worlds. One shared philosophy. Choose your collection.
            </p>
          </div>
        </div>

        {/* ── TWO GALLERY BOXES ── */}
        <section className="gallery-boxes">
          <div className="container gallery-boxes__grid">

            {/* Box 1: Rekalture */}
            <Link href="/rekalture" className="gallery-box gallery-box--rekalture">
              <div className="gallery-box__bg gallery-box__bg--rk" />
              <div className="gallery-box__content">

                <div className="gallery-box__tag gallery-box__tag--rk">In-House Label</div>
                <h2 className="gallery-box__title font-display" style={{color:"#fff"}}>
                  REकलture
                </h2>
                <p className="gallery-box__subtitle" style={{color:"rgba(255,255,255,0.65)"}}>
                  Upcycled fashion reimagined from discarded fabrics — wearable art with a story stitched in.
                </p>

                <div className="gallery-box__features">
                  <div className="gallery-box__feat gallery-box__feat--rk">
                    <span>🧵</span> Handcrafted Upcycled Art
                  </div>
                  <div className="gallery-box__feat gallery-box__feat--rk">
                    <span>♻️</span> Zero Waste Process
                  </div>
                  <div className="gallery-box__feat gallery-box__feat--rk">
                    <span>🎨</span> Wearable Narratives
                  </div>
                </div>

                <div className="gallery-box__cta gallery-box__cta--rk">
                  Explore REकलture
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
              <div className="gallery-box__corner-badge gallery-box__corner-badge--rk">Upcycled</div>
            </Link>

            {/* Box 2: Bag It All Thrift */}
            <Link href="/thrift" className="gallery-box gallery-box--thrift">
              <div className="gallery-box__bg" />
              <div className="gallery-box__content">

                <div className="gallery-box__tag">Thrift Gallery</div>
                <h2 className="gallery-box__title font-display">
                  Bag It All
                </h2>
                <p className="gallery-box__subtitle">
                  Handpicked pre-loved pieces — curated for those who believe style should be rare, not repeated.
                </p>

                <div className="gallery-box__features">
                  <div className="gallery-box__feat">
                    <span>🏷️</span> 1-of-1 Thrifted Finds
                  </div>
                  <div className="gallery-box__feat">
                    <span>✅</span> Only 1 Available Each
                  </div>
                  <div className="gallery-box__feat">
                    <span>⚡</span> Claim Before It&apos;s Gone
                  </div>
                </div>

                <div className="gallery-box__cta">
                  Shop Thrift Drop
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </Link>
          </div>

          {/* ── BOTTOM TAGLINE ── */}
          <div className="gallery-tagline">
            <p className="font-editorial gallery-tagline__text">
              &ldquo;Every piece is a conversation between the past and the future.&rdquo;
            </p>
            <div className="gallery-tagline__pill">
              <span>Bag It All</span>
              <span className="sep">·</span>
              <span>REकलture</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      
    </>
  );
}
