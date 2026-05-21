import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import PlanForm from "@/components/PlanForm";

export const dynamic = "force-dynamic";

export default async function NewPlan() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  return (
    <AdminShell name={session.adminName || "Admin"}>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "0.5rem" }}>Create New Plan</h1>
        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "2.5rem" }}>Add a new travel package for customers to book.</p>
        <PlanForm mode="create" />
      </div>
    </AdminShell>
  );
}
