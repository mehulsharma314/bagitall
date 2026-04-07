export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "REकलture Collection | Handcrafted Upcycled Art",
  description: "Wearable art from tomorrow's waste. Explore our 1-of-1 upcycled pieces by REकलture.",
};

export default async function REकलturePage() {
  const products = await prisma.product.findMany({
    where: { type: "REKALTURE" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="gallery-main" style={{background: "var(--blue-deep)"}}>
        {/* ── REकलture HEADER ── */}
        <header className="rk-header">
          <div className="rk-header__bg" />
          <div className="container rk-header__content">
            <Link href="/gallery" className="back-link">← Back to Gallery</Link>
            <div className="rk-header__logo">
              <Image src="/logo-rekalture.jpg" alt="REकलture" width={64} height={64} style={{borderRadius:"50%"}} />
            </div>
            <h1 className="rk-header__title font-display">
              REकलture
            </h1>
            <p className="rk-header__sub">
              Wearable art handcrafted from discarded fabrics. Blending tradition, sustainability, and 1-of-1 exclusivity.
            </p>
            <div className="rk-header__pills">
              <span className="rk-pill">🧵 Handcrafted</span>
              <span className="rk-pill">♻️ Zero Waste</span>
              <span className="rk-pill">🎨 1-of-1 Art</span>
            </div>
          </div>
        </header>

        {/* ── PRODUCT GRID ── */}
        <section className="section">
          <div className="container">
            {products.length === 0 ? (
              <div className="text-center py-20" style={{color: "#fff"}}>
                <h2 className="section-title" style={{color: "#fff"}}>Drop Coming Soon</h2>
                <p className="section-subtitle" style={{margin: "0 auto", color: "rgba(255,255,255,0.6)"}}>
                  Our artisans are currently crafting the next REकलture drop. Each piece takes time, intention, and a story.
                </p>
                <div style={{marginTop: "32px"}}>
                  <Link href="https://www.instagram.com/rekalture?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="btn-primary" style={{background: "var(--blue-brand)"}}>Follow @REकलture</Link>
                </div>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product: any) => (
                  <Link 
                    key={product.id} 
                    href={`/product/${product.slug}`} 
                    className={`product-card rk-card ${product.status === "SOLD" ? "product-card--sold" : ""}`}
                    style={{background: "#0d2045", borderColor: "rgba(255,255,255,0.1)"}}
                  >
                    <div className="product-card__img-wrap rk-card__img">
                      {Array.isArray(product.images) && product.images.length > 0 ? (
                        <Image 
                          src={product.images[0] as string} 
                          alt={product.title} 
                          fill
                          style={{objectFit: "cover"}}
                        />
                      ) : (
                        <div className="product-card__img-placeholder">
                          <span style={{color: "rgba(255,255,255,0.3)"}}>Upcycled Piece</span>
                        </div>
                      )}
                      {product.status === "SOLD" && (
                         <div className="sold-overlay">
                           <span>Sold. Forever.</span>
                         </div>
                      )}
                      {!product.status || product.status === "AVAILABLE" && (
                        <span className="rk-card__label">In-House Label Drop</span>
                      )}
                    </div>
                    <div className="product-card__body">
                      <h3 className="product-card__title" style={{color: "#fff"}}>{product.title}</h3>
                      <div className="product-card__footer">
                        <span className="product-card__price" style={{color: "var(--blue-pale)"}}>₹{product.price.toLocaleString()}</span>
                        <div className="product-card__cta rk-cta">
                          {product.status === "SOLD" ? "Sold" : "Claim This Art"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
