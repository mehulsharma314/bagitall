import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import AdminLoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function BiaControlPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bia_session")?.value;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
      await jwtVerify(token, secret);
      redirect("/bia-control/dashboard");
    } catch {
      // Token invalid — fall through to show login form
    }
  }

  return <AdminLoginForm />;
}
