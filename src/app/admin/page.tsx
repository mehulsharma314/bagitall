export const dynamic = 'force-dynamic';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const orders = await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    totalRevenue: orders.filter((o: any) => o.status === "PAID").reduce((sum: number, o: any) => sum + (o.product?.price || 0), 0),
    totalOrders: orders.length,
    paidOrders: orders.filter((o: any) => o.status === "PAID").length,
    availableProducts: products.filter((p: any) => p.status === "AVAILABLE").length,
  };

  return (
    <>
      <Navbar />
      <main className="admin-layout-main">
        <div className="container">
          <div className="admin-header">
            <h1 className="font-display admin-title">Admin Panel</h1>
            <Link href="/admin/products/new" className="btn-primary">Add New Piece</Link>
          </div>

          {/* Stats Grid */}
          <div className="admin-grid-stats">
            {[
              { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, color: "var(--blue-brand)" },
              { label: "Paid Orders", value: stats.paidOrders, color: "#10b981" },
              { label: "Available Pieces", value: stats.availableProducts, color: "#f59e0b" },
              { label: "Total Orders", value: stats.totalOrders, color: "#6366f1" },
            ].map((stat) => (
              <div key={stat.label} className="admin-stat-box">
                <p className="admin-stat-label">{stat.label}</p>
                <p className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Main Content Sections */}
          <div className="admin-sections-wrap">
            {/* Recent Orders */}
            <section className="admin-panel-section">
              <h2 className="font-display admin-panel-title">Recent Orders</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => (
                      <tr key={order.id}>
                        <td style={{ fontSize: "14px" }}>#{order.id.slice(-6)}</td>
                        <td>
                          <div style={{ fontWeight: "600" }}>{order.customerName}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{order.email}</div>
                        </td>
                        <td style={{ fontSize: "14px" }}>{order.product?.title || "Deleted Product"}</td>
                        <td>
                          <span className={`admin-status-badge ${order.status === "PAID" ? "admin-status--success" : order.status === "PENDING" ? "admin-status--warning" : "admin-status--danger"}`}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Inventory Management */}
            <section className="admin-panel-section">
              <h2 className="font-display admin-panel-title">Inventory Lifecycle</h2>
              <div className="admin-inv-grid">
                {products.map((product: any) => (
                  <div key={product.id} className="admin-inv-card">
                    <div className="admin-inv-img">
                      {Array.isArray(product.images) && product.images[0] ? (
                        <img src={product.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                         <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>No Img</div>
                      )}
                    </div>
                    <div className="admin-inv-info">
                      <h4 className="admin-inv-title">{product.title}</h4>
                      <p className="admin-inv-meta">₹{product.price.toLocaleString()} · {product.type}</p>
                      <div className="admin-inv-actions">
                        <span className={`admin-status-badge ${product.status === "SOLD" ? "admin-status--neutral" : product.status === "RESERVED" ? "admin-status--warning" : "admin-status--success"}`}>
                          {product.status}
                        </span>
                        <Link href={`/admin/products/edit/${product.id}`} style={{ fontSize: "11px", color: "var(--blue-brand)", textDecoration: "none" }}>Edit Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
