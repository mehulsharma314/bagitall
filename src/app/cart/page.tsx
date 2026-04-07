"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

import { Suspense } from "react";

const MOCK_PRODUCT = {
  title: "Vintage Denim Jacket",
  price: 1299,
  slug: "vintage-denim-jacket-001",
};

function CartPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productSlug = searchParams.get("product");

  const [product, setProduct] = useState<any>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", pincode: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productSlug) {
      router.push("/gallery");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productSlug}`);
        const data = await res.json();
        if (!res.ok || data.status === "SOLD") {
          router.push("/gallery");
          return;
        }
        setProduct(data);
        
        if (data.reservationExpiresAt) {
          const expiry = new Date(data.reservationExpiresAt).getTime();
          const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
          setTimer(remaining);
        } else {
          setTimer(600);
        }
      } catch (err) {
        console.error("Cart Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug, router]);

  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) {
       router.push("/gallery");
       return;
    }

    const t = setInterval(() => {
      setTimer(prev => (prev !== null) ? prev - 1 : null);
    }, 1000);
    return () => clearInterval(t);
  }, [timer, router]);

  const mins = timer !== null ? String(Math.floor(timer / 60)).padStart(2, "0") : "--";
  const secs = timer !== null ? String(timer % 60).padStart(2, "0") : "--";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit Indian mobile required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Valid 6-digit pincode required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productSlug: product.slug }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); setSubmitting(false); return; }
      
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount,
        currency: "INR",
        name: "Bag It All",
        description: product.title,
        order_id: data.razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#1e4fc2" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/webhooks/verify", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, orderId: data.orderId }),
          });
          if (verifyRes.ok) router.push("/success");
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key: keyof typeof form, label: string, type = "text", placeholder = "") => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        className={`input-field${errors[key] ? " input-field--error" : ""}`}
        type={type} placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); if (errors[key]) setErrors(ev => ({ ...ev, [key]: "" })); }}
      />
      {errors[key] && <span className="input-error">{errors[key]}</span>}
    </div>
  );

  if (loading) return <div style={{paddingTop:"200px", textAlign:"center"}}>Loading...</div>;
  if (!product) return null;

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <Navbar />
      <main style={{ paddingTop: "72px", minHeight: "100vh", background: "linear-gradient(to bottom, var(--white) 0%, var(--blue-pale) 100%)" }}>
        <div className="container cart-layout">
          <div className="cart-form-wrap">
            <div className="cart-form-header">
              <h1 className="cart-form-title font-display">Secure Checkout</h1>
              <p className="cart-form-sub">Fill in your details to claim this piece</p>
            </div>

            <form onSubmit={handleSubmit} className="cart-form">
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                <div className="form-row">{field("name", "Full Name", "text", "Your full name")}</div>
                <div className="form-cols">
                  {field("email", "Email Address", "email", "you@email.com")}
                  {field("phone", "Phone Number", "tel", "10-digit mobile")}
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Delivery Address</h3>
                {field("address", "Street Address", "text", "House no, Street, Area")}
                <div className="form-cols">
                  {field("city", "City", "text", "City / District")}
                  {field("pincode", "Pincode", "text", "6-digit pincode")}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full" style={{padding:"18px", fontSize:"15px"}} disabled={submitting}>
                {submitting ? "Processing..." : `→ Claim for ₹${product.price.toLocaleString("en-IN")}`}
              </button>
            </form>
          </div>

          <div className="cart-summary">
            <div className="cart-timer">
              <div className="cart-timer__label">Reserved for you</div>
              <div className="cart-timer__clock">
                <span className="cart-timer__digit">{mins}</span>
                <span>:</span>
                <span className="cart-timer__digit">{secs}</span>
              </div>
              <div className="cart-timer__sub">Complete checkout before time runs out</div>
            </div>

            <div className="cart-product-card">
              <div className="cart-product-img">
                <Image src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} width={72} height={72} style={{objectFit:"cover", borderRadius:"8px"}} />
              </div>
              <div className="cart-product-info">
                <span className="badge-available" style={{marginBottom:"6px",display:"inline-flex",fontSize:"10px"}}>Only 1 Available</span>
                <h4 className="cart-product-title">{product.title}</h4>
                <p className="cart-product-slug">{product.slug}</p>
              </div>
            </div>

            <div className="cart-price-breakdown">
              <div className="cart-line"><span>Item Price</span><span>₹{product.price.toLocaleString("en-IN")}</span></div>
              <div className="cart-line"><span>Shipping</span><span className="cart-free">Free</span></div>
              <div className="cart-line cart-line--total">
                <span>Total</span>
                <span className="cart-total-price">₹{product.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="cart-back-link">← Back to product</Link>
          </div>
        </div>
      </main>
      <Footer />

    </>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div style={{paddingTop:"200px", textAlign:"center"}}>Loading Checkout...</div>}>
      <CartPageContent />
    </Suspense>
  );
}
