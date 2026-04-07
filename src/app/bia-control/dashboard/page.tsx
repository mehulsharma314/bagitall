import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [products, orders] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.order.findMany({
      include: { product: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);
  return { products, orders };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    AVAILABLE: "admin-status--success",
    RESERVED: "admin-status--warning",
    SOLD: "admin-status--danger",
    PAID: "admin-status--success",
    PENDING: "admin-status--warning",
    FAILED: "admin-status--danger",
  };
  return `admin-status-badge ${map[status] ?? "admin-status--neutral"}`;
}

export default async function BiaControlDashboard() {
  const { products, orders } = await getDashboardData();

  const available = products.filter((p) => p.status === "AVAILABLE").length;
  const sold = products.filter((p) => p.status === "SOLD").length;
  const revenue = orders
    .filter((o) => o.status === "PAID")
    .reduce((acc, o) => acc + o.product.price, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)" }}>
      {/* Top Bar */}
      <div
        style={{
          background: "var(--blue-deep)",
          padding: "0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(147,197,253,0.3)", flexShrink: 0 }}>
              <Image src="/logo-rekalture.jpg" alt="REकलture" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
              Control Panel
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/bia-control/products/new" className="btn-primary" style={{ fontSize: "13px", padding: "10px 20px" }}>
              + Add New Piece
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Header */}
        <div className="bia-dashboard-header">
          <div>
            <h1 className="bia-dashboard-title">Dashboard</h1>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "14px" }}>
              Manage your REकलture inventory and orders
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {[
            { label: "Total Revenue", value: formatCurrency(revenue), color: "var(--blue-mid)" },
            { label: "Available Pieces", value: available, color: "#16a34a" },
            { label: "Sold Pieces", value: sold, color: "#dc2626" },
            { label: "Total Listings", value: products.length, color: "var(--text-primary)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "var(--white)", padding: "24px", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                {label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ background: "var(--white)", padding: "32px", borderRadius: "18px", border: "1.5px solid var(--border)", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--text-primary)" }}>
              Recent Orders
            </h2>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>
              {orders.length} total
            </span>
          </div>
          {orders.length === 0 ? (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "14px", textAlign: "center", padding: "32px 0" }}>
              No orders yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} style={{ fontFamily: "var(--font-body)", padding: "10px 14px", color: "var(--text-muted)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "left", borderBottom: "2px solid var(--off-white)", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ padding: "14px", fontSize: "14px", fontFamily: "var(--font-body)", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>{order.email}</div>
                      </td>
                      <td style={{ padding: "14px", fontSize: "14px", fontFamily: "var(--font-body)", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                        {order.product.title}
                      </td>
                      <td style={{ padding: "14px", fontSize: "14px", fontFamily: "var(--font-body)", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--blue-mid)" }}>
                        {formatCurrency(order.product.price)}
                      </td>
                      <td style={{ padding: "14px", borderBottom: "1px solid var(--border)" }}>
                        <span className={statusBadge(order.status)}>{order.status}</span>
                      </td>
                      <td style={{ padding: "14px", fontSize: "13px", fontFamily: "var(--font-body)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inventory Grid */}
        <div style={{ background: "var(--white)", padding: "32px", borderRadius: "18px", border: "1.5px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--text-primary)" }}>
              Inventory
            </h2>
            <Link href="/bia-control/products/new" className="btn-outline" style={{ fontSize: "13px", padding: "8px 20px" }}>
              + Add Piece
            </Link>
          </div>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", marginBottom: "20px" }}>
                No products listed yet.
              </p>
              <Link href="/bia-control/products/new" className="btn-primary">
                Add Your First Piece
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "20px" }}>
              {products.map((product) => {
                const images = Array.isArray(product.images) ? product.images : [];
                const firstImg = typeof images[0] === "string" ? images[0] : null;
                return (
                  <div key={product.id} style={{ display: "flex", gap: "16px", padding: "18px", border: "1.5px solid var(--border)", borderRadius: "14px", background: "var(--white)", transition: "var(--transition)" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", background: "var(--off-white)", flexShrink: 0, position: "relative" }}>
                      {firstImg ? (
                        <Image src={firstImg} alt={product.title} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {product.title}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--blue-mid)", fontWeight: 700, marginBottom: "10px" }}>
                        {formatCurrency(product.price)}
                      </p>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span className={statusBadge(product.status)}>{product.status}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--text-muted)", background: "var(--off-white)", padding: "2px 8px", borderRadius: "4px" }}>
                          {product.type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
