"use client";
import { useState } from "react";
import MembersTable from "./MembersTable";
import MemberFormModal from "./MemberFormModal";

export default function MembersPage() {
  const [tab, setTab] = useState<"active" | "pending">("active");
  const [modalOpen, setModalOpen] = useState(false);

  function handleSaveMember(data: any) {
    // Aquí puedes agregar lógica para guardar el miembro
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="mb-6">
        <button
          className="bg-white border border-gray-400 px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-emerald-50 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          Crear nuevo miembro
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-semibold border-b-2 ${tab === "active" ? "bg-white border-emerald-600 text-emerald-700" : "bg-gray-100 border-transparent text-gray-400"}`}
          onClick={() => setTab("active")}
        >
          Miembros activos
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-semibold border-b-2 ${tab === "pending" ? "bg-white border-emerald-600 text-emerald-700" : "bg-gray-100 border-transparent text-gray-400"}`}
          onClick={() => setTab("pending")}
        >
          Miembros por aprobar
        </button>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-b-lg p-4 shadow-md">
        <MembersTable type={tab} />
      </div>
      <MemberFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveMember} />
    </div>
  );
}