"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/bia-control/dashboard");
        router.refresh();
      } else {
        setError("Invalid credentials. Please try again.");
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
        setPassword("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="admin-login-bg__gradient" />
        <div className="admin-login-bg__pattern" />
      </div>

      <div className={`admin-login-card${shaking ? " admin-login-card--shake" : ""}`}>
        <div className="admin-login-logo" aria-hidden="true">
          <Image
            src="/logo-rekalture.jpg"
            alt="REकलture"
            width={68}
            height={68}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h1 className="admin-login-title">REकलture</h1>
        <p className="admin-login-sub">Enter your credentials to continue</p>

        {error && (
          <div className="admin-login-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="input-group">
            <label className="input-label" htmlFor="bia-username">
              Username
            </label>
            <input
              id="bia-username"
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="bia-password">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="bia-password"
                type={showPassword ? "text" : "password"}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                disabled={loading}
                style={{ paddingRight: "52px" }}
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              marginTop: "8px",
              borderRadius: "12px",
              fontSize: "15px",
              letterSpacing: "0.08em",
            }}
            disabled={loading || !username || !password}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
