"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: "",
    description: "",
    type: "THRIFT",
    image1: "",
    image2: "",
    image3: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          images: [form.image1, form.image2, form.image3].filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create product");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title" && !form.slug) {
      setForm(prev => ({ ...prev, slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") }));
    }
  };

  return (
    <>
      <Navbar />
      <main className="admin-layout-main">
        <div className="container admin-form-container">
          <h1 className="font-display admin-title" style={{ marginBottom: "32px" }}>Add New 1-of-1 Piece</h1>
          
          <form onSubmit={handleSubmit} className="admin-form-wrap">
            <div className="admin-form-grid">
              <div className="input-group">
                <label className="input-label">Product Title</label>
                <input required className="input-field" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Vintage Denim Jacket" />
              </div>

              <div className="input-group">
                <label className="input-label">Slug (URL)</label>
                <input required className="input-field" name="slug" value={form.slug} onChange={handleChange} placeholder="vintage-denim-jacket" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group">
                  <label className="input-label">Price (INR)</label>
                  <input required type="number" className="input-field" name="price" value={form.price} onChange={handleChange} placeholder="1299" />
                </div>
                <div className="input-group">
                  <label className="input-label">Collection</label>
                  <select className="input-field" name="type" value={form.type} onChange={handleChange}>
                    <option value="THRIFT">Thrift Collection</option>
                    <option value="REKALTURE">REकलture Collection</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea required className="input-field" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="The story of this piece..." />
              </div>

              <div className="input-group">
                <label className="input-label">Image URLs (comma separated or individual)</label>
                <input className="input-field" name="image1" value={form.image1} onChange={handleChange} placeholder="Primary Image URL" style={{marginBottom:"8px"}} />
                <input className="input-field" name="image2" value={form.image2} onChange={handleChange} placeholder="Gallery Image 2" style={{marginBottom:"8px"}} />
                <input className="input-field" name="image3" value={form.image3} onChange={handleChange} placeholder="Gallery Image 3" />
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "12px", padding: "16px" }}>
                {loading ? "Creating..." : "✧ Publish to Gallery"}
              </button>
            </div>
          </form>
          
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link href="/admin" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px" }}>← Back to Admin Panel</Link>
          </div>
        </div>
      </main>
    </>
  );
}
