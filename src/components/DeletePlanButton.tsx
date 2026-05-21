"use client";
import { useRouter } from "next/navigation";

export default function DeletePlanButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this plan? This cannot be undone.")) return;
    await fetch(`/api/plans/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button onClick={handleDelete} style={{ fontSize: "0.75rem", color: "#f87171", background: "none", border: "1px solid rgba(248,113,113,0.25)", padding: "0.3rem 0.6rem", cursor: "pointer", fontFamily: "inherit" }}>
      Delete
    </button>
  );
}
