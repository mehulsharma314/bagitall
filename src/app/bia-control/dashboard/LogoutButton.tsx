"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/admin-logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button className="admin-logout-btn" onClick={handleLogout} type="button">
      Sign Out
    </button>
  );
}
