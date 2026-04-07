export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Thrift Collection | Bag It All",
  description: "Explore our curated drop of 1-of-1 thrifted pieces. Once they're gone, they're gone forever.",
};

export default async function ThriftPage() {
  // Fetch real products if any, otherwise showing empty state
  const products = await prisma.product.findMany({
    where: { type: "THRIFT" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="gallery-main" style={{ background: "linear-gradient(to bottom, #ffffff 0%, var(--blue-pale) 100%)" }}>
        {/* ── LISTING HEADER ── */}
        <header className="listing-header">
          <div className="listing-header__grid" />
          <div className="container listing-header__content">
            <Link href="/gallery" className="back-link">← Back to Gallery</Link>
            <h1 className="listing-header__title font-display">
              Thrift Collection
            </h1>
            <p className="listing-header__sub">
              A curated selection of handpicked, pre-loved pieces. Each item is unique — a 1-of-1 treasure waiting for its next chapter.
            </p>
            <div className="listing-header__pill">
              <span className="listing-pulse" />
              Live Drop: Only 1 of Each Available
            </div>
          </div>
        </header>

        {/* ── PRODUCT GRID ── */}
        <section className="section">
          <div className="container">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="section-title">Drop Coming Soon</h2>
                <p className="section-subtitle" style={{margin: "0 auto"}}>
                  We are currently curating our next 1-of-1 thrift collection. Follow us on Instagram for drop announcements.
                </p>
                <div style={{marginTop: "32px"}}>
                  <Link href="https://www.instagram.com/bag_it_all._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="btn-primary">Follow @bag_it_all._</Link>
                </div>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product: any) => (
                  <Link 
                    key={product.id} 
                    href={`/product/${product.slug}`} 
                    className={`product-card ${product.status === "SOLD" ? "product-card--sold" : ""}`}
                  >
                    <div className="product-card__img-wrap">
                      {/* Using first image from JSON array if it exists */}
                      {Array.isArray(product.images) && product.images.length > 0 ? (
                        <Image 
                          src={product.images[0] as string} 
                          alt={product.title} 
                          fill
                          style={{objectFit: "cover"}}
                        />
                      ) : (
                        <div className="product-card__img-placeholder">
                          <span>1-of-1</span>
                        </div>
                      )}
                      <div className="product-card__tag">Only 1 Available</div>
                      {product.status === "SOLD" && (
                        <div className="sold-overlay">
                          <span>Sold. Forever.</span>
                        </div>
                      )}
                    </div>
                    <div className="product-card__body">
                      <h3 className="product-card__title">{product.title}</h3>
                      <div className="product-card__footer">
                        <span className="product-card__price">₹{product.price.toLocaleString()}</span>
                        <div className="product-card__cta">
                          {product.status === "SOLD" ? "Sold" : "View Piece"}
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
