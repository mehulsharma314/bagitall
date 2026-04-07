export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} | Bag It All`,
    description: "Unique 1-of-1 thrifted piece. Once sold, gone forever.",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: "120px", textAlign: "center", minHeight: "100vh" }}>
          <h1 className="section-title">Piece Not Found</h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            This 1-of-1 piece may have been sold or removed.
          </p>
          <div style={{ marginTop: "32px" }}>
            <Link href="/gallery" className="btn-primary">Browse the Gallery</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Map Prisma product to Client component props if needed
  const clientProduct = {
    ...product,
    images: Array.isArray(product.images) ? product.images : [],
    category: product.type.toLowerCase(),
    // Temporary fields until we add them to DB if needed
    story: (product as any).story || "Every piece in our gallery carries its own narrative, handpicked for its unique character and timeless appeal.",
    sustainability: (product as any).sustainability || "By choosing this 1-of-1 piece, you are directly contributing to a circular fashion economy.",
    shipping: (product as any).shipping || "Ships within 3-5 business days. Packed in recycled materials.",
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh", background: "linear-gradient(to bottom, #ffffff 0%, var(--blue-ghost) 100%)" }}>
        <div className="container" style={{ paddingTop: "40px", paddingBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
            <Link href="/gallery" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Gallery</Link>
            <span>›</span>
            <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>Item</span>
            <span>›</span>
            <span style={{ color: "var(--text-primary)" }}>{product.title}</span>
          </div>
        </div>
        <ProductDetailClient product={clientProduct as any} />
      </main>
      <Footer />
    </>
  );
}
