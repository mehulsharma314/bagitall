"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        {/* Left Nav Links */}
        <div className="navbar__links hide-mobile">
          <Link href="/" className="navbar__link">Home</Link>
          <Link href="/about" className="navbar__link">About Us</Link>
          <Link href="/our-story" className="navbar__link">Our Story</Link>
        </div>

        {/* Centro — Logo */}
        <Link href="/" className="navbar__logo-wrap" aria-label="REकलture home">
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--blue-pale)", flexShrink: 0 }}>
            <Image
              src="/logo-rekalture.jpg"
              alt="REकलture"
              width={40}
              height={40}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
          <span className="navbar__brand-text">REकलture</span>
        </Link>

        {/* Right Nav Links */}
        <div className="navbar__links navbar__links--right hide-mobile">
          <Link href="/thrift" className="navbar__link">Thrift</Link>
          <Link href="/rekalture" className="navbar__link">REकलture</Link>
          <Link href="/gallery" className="navbar__link">Gallery</Link>
          <Link href="/contact" className="navbar__link">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger hide-desktop"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
          <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
          <span className={`hamburger-line${menuOpen ? " open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu" role="menu">
          <Link href="/" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/our-story" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <Link href="/thrift" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Thrift Collection</Link>
          <Link href="/rekalture" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>REकलture Collection</Link>
          <Link href="/gallery" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/contact" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
