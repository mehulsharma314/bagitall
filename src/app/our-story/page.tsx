import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Our Story | Bag It All",
  description: "The journey of Bag It All & REकलture.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh", background: "var(--off-white)" }}>
        
        {/* Header */}
        <header style={{ background: "linear-gradient(135deg, var(--blue-deep), var(--blue-brand))", padding: "100px 0 80px", color: "white", textAlign: "center" }}>
          <div className="container">
            <span style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px", display: "block" }}>The Origin</span>
            <h1 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px" }}>
              Born from a belief that <br /><em style={{ color: "var(--blue-pale)", fontStyle: "italic" }}>fashion shouldn&apos;t cost the earth.</em>
            </h1>
          </div>
        </header>

        <section className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
              
              <div style={{ padding: "40px", background: "white", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                <h2 className="font-display" style={{ fontSize: "2rem", color: "var(--blue-deep)", marginBottom: "20px" }}>The Bag It All Concept</h2>
                <p style={{ marginBottom: "16px" }}>
                  Bag It All started with a simple observation: beautiful, highly durable garments were being discarded daily, while mass-produced, lower-quality fast fashion dominated the industry. 
                </p>
                <p>
                  We wanted to create a platform that curated the incredibly rare, high-quality thrift drops — bringing the thrill of vintage hunting into a sleek, transparent digital gallery. Every 1-of-1 piece we list isn&apos;t just second-hand; it&apos;s second-loved.
                </p>
              </div>

              <div style={{ padding: "40px", background: "var(--blue-deep)", color: "rgba(255,255,255,0.8)", borderRadius: "16px", boxShadow: "var(--shadow-md)" }}>
                <h2 className="font-display" style={{ fontSize: "2rem", color: "white", marginBottom: "20px" }}>Enter REकलture</h2>
                <p style={{ marginBottom: "16px" }}>
                  But thrifting was only addressing one side of the problem. What about garments that were too damaged to resell but still had incredible fabric?
                </p>
                <p>
                  That&apos;s where <strong>REकलture</strong> was born. Blending the Hindi word <em>&quot;कल&quot;</em> (tomorrow) with culture, we began taking discarded textiles and meticulously upcycling them into completely new, wearable art pieces. By upcycling, we don&apos;t just extend the lifecycle of a fabric; we elevate it.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="section" style={{ background: "white", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div className="container">
            <h2 className="font-display" style={{ fontSize: "2.5rem", marginBottom: "24px" }}>Ready to find your piece?</h2>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href="/thrift" className="btn-primary">Explore Thrift Drops</Link>
              <Link href="/rekalture" className="btn-outline">Shop REकलture</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
