"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UploadCloud, X, ArrowLeft } from "lucide-react";

interface UploadedImage {
  url: string;
  filename: string;
  preview: string;
}

interface UploadProgress {
  filename: string;
  progress: number;
}

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState<UploadProgress | null>(null);
  const [uploadError, setUploadError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    type: "REKALTURE" as "REKALTURE" | "THRIFT",
    status: "AVAILABLE" as "AVAILABLE" | "RESERVED" | "SOLD",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((f) => ({ ...f, title, slug }));
  };

  const uploadFile = useCallback(async (file: File) => {
    setUploadError("");
    if (uploadedImages.length >= 3) {
      setUploadError("Maximum 3 images per product.");
      return;
    }

    setUploading({ filename: file.name, progress: 0 });

    // Show local preview immediately
    const preview = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress (XHR not available easily, simulate with intervals)
      let progress = 0;
      const interval = setInterval(() => {
        progress = Math.min(progress + 20, 85);
        setUploading({ filename: file.name, progress });
      }, 200);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      clearInterval(interval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Upload failed");
      }

      const data = await res.json();
      setUploading({ filename: file.name, progress: 100 });

      setTimeout(() => {
        setUploadedImages((prev) => [...prev, { url: data.url, filename: data.filename, preview }]);
        setUploading(null);
      }, 300);
    } catch (err: unknown) {
      setUploading(null);
      setUploadError(err instanceof Error ? err.message : "Upload failed. Try again.");
      URL.revokeObjectURL(preview);
    }
  }, [uploadedImages.length]);

  const handleFiles = (files: FileList | File[]) => {
    const file = Array.from(files)[0];
    if (!file) return;
    uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    if (uploadedImages.length === 0) {
      setSubmitError("Please upload at least one product image.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          images: uploadedImages.map((img) => img.url),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create product");
      }

      router.push("/bia-control/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", paddingBottom: "60px" }}>
      {/* Top Bar */}
      <div style={{ background: "var(--blue-deep)", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/bia-control/dashboard" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "14px", cursor: "pointer" }}>
            <ArrowLeft size={16} strokeWidth={2} />
            Back to Dashboard
          </Link>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
            Add New Piece
          </span>
          <div style={{ width: "120px" }} />
        </div>
      </div>

      <div className="container" style={{ paddingTop: "40px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "8px" }}>
            Add a New Piece
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "14px", marginBottom: "36px" }}>
            List a new 1-of-1 piece to your RE कलture inventory.
          </p>

          {submitError && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", fontFamily: "var(--font-body)", fontSize: "14px", color: "#dc2626" }} role="alert">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div style={{ background: "var(--white)", padding: "32px", borderRadius: "18px", border: "1.5px solid var(--border)", marginBottom: "24px" }}>
              <label style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "16px" }}>
                Product Images *
                <span style={{ fontWeight: 400, marginLeft: "6px" }}>(max 3, up to 5MB each)</span>
              </label>

              {/* Drop Zone */}
              <div
                className={`admin-upload-zone${dragging ? " admin-upload-zone--drag" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Upload image — click or drag and drop"
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              >
                <div className="admin-upload-icon">
                  <UploadCloud size={40} strokeWidth={1.25} />
                </div>
                <p className="admin-upload-text">
                  <strong>Click to browse</strong> or drag & drop<br />
                  JPG, PNG, WebP · Max 5MB each · Max 3 images
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
              </div>

              {/* Upload progress */}
              {uploading && (
                <div style={{ marginTop: "14px" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>
                    Uploading {uploading.filename}...
                  </p>
                  <div className="admin-upload-progress">
                    <div className="admin-upload-progress__bar" style={{ width: `${uploading.progress}%` }} />
                  </div>
                </div>
              )}

              {/* Upload error */}
              {uploadError && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#dc2626", marginTop: "10px" }} role="alert">
                  {uploadError}
                </p>
              )}

              {/* Previews */}
              {uploadedImages.length > 0 && (
                <div className="admin-upload-previews">
                  {uploadedImages.map((img, i) => (
                    <div key={img.filename} className="admin-upload-preview">
                      <Image src={img.preview} alt={`Product image ${i + 1}`} fill style={{ objectFit: "cover" }} />
                      <button
                        type="button"
                        className="admin-upload-preview__remove"
                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                        aria-label={`Remove image ${i + 1}`}
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div style={{ background: "var(--white)", padding: "32px", borderRadius: "18px", border: "1.5px solid var(--border)", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="input-group">
                <label className="input-label" htmlFor="prod-title">Product Title *</label>
                <input
                  id="prod-title"
                  type="text"
                  className="input-field"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Indigo Patchwork Denim Jacket"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="prod-slug">
                  Slug <span style={{ fontWeight: 400, opacity: 0.6 }}>(auto-generated)</span>
                </label>
                <input
                  id="prod-slug"
                  type="text"
                  className="input-field"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="indigo-patchwork-denim-jacket"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="prod-desc">Description *</label>
                <textarea
                  id="prod-desc"
                  className="input-field"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Tell the story of this piece — where it came from, how it was transformed..."
                  required
                  style={{ resize: "vertical", minHeight: "110px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group">
                  <label className="input-label" htmlFor="prod-price">Price (₹) *</label>
                  <input
                    id="prod-price"
                    type="number"
                    className="input-field"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="1499"
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="prod-type">Collection *</label>
                  <select
                    id="prod-type"
                    className="input-field"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "REKALTURE" | "THRIFT" }))}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="REKALTURE">REकलture</option>
                    <option value="THRIFT">Thrift</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="prod-status">Availability</label>
                <select
                  id="prod-status"
                  className="input-field"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "AVAILABLE" | "RESERVED" | "SOLD" }))}
                  style={{ cursor: "pointer" }}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="SOLD">Sold</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{ flex: 1, padding: "14px", fontSize: "15px" }}
                >
                  {submitting ? "Adding piece..." : "Add to Inventory →"}
                </button>
                <Link
                  href="/bia-control/dashboard"
                  className="btn-outline"
                  style={{ padding: "14px 24px" }}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
