"use client";
import { useState } from "react";
import Modal from "@/components/Modal";

const activeMembers = [
  { cedula: "xxxxxxxx", nombre: "Ramiro Perez", posicion: "Delantero", codigo: "Ramiro01", membresia: 1, foto: "https://examplepic1.com" },
  { cedula: "xxxxxxxx", nombre: "Eloy Garcia", posicion: "Arquero", codigo: "Eloy02", membresia: 2, foto: "https://examplepic2.com" },
  { cedula: "xxxxxxxx", nombre: "Elver Gomez", posicion: "Defensa", codigo: "Elver03", membresia: 3, foto: "https://examplepic3.com" },
  { cedula: "xxxxxxxx", nombre: "Tony Stark", posicion: "Defensa", codigo: "Tony04", membresia: 4, foto: "https://examplepic4.com" },
];

interface Member {
  cedula: string;
  nombre: string;
  posicion: string;
  foto: string;
  codigo?: string;
  membresia?: number;
}

const pendingMembers: Member[] = [
  { cedula: "xxxxxxxx", nombre: "David Bañol", posicion: "Volante", foto: "https://examplepic5.com" },
  { cedula: "xxxxxxxx", nombre: "Jose Valencia", posicion: "Volante", foto: "https://examplepic6.com" },
];

export default function MembersTable({ type }: { type: "active" | "pending" }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const members = type === "active" ? activeMembers : pendingMembers;

  function handleView(member: Member) {
    setSelected(member);
    setModalOpen(true);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-green-200">
        <thead>
          <tr className="bg-green-100 text-green-900">
            <th className="border px-2 py-1">Cédula</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Posición</th>
            {type === "active" && <th className="border px-2 py-1">Código de descuento</th>}
            {type === "active" && <th className="border px-2 py-1">Número de membresía</th>}
            <th className="border px-2 py-1">Foto</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, idx) => (
            <tr key={idx} className="even:bg-green-50">
              <td className="border px-2 py-1">{m.cedula}</td>
              <td className="border px-2 py-1">{m.nombre}</td>
              <td className="border px-2 py-1">{m.posicion}</td>
              {type === "active" && <td className="border px-2 py-1">{m.codigo}</td>}
              {type === "active" && <td className="border px-2 py-1">{m.membresia}</td>}
              <td className="border px-2 py-1 text-xs"><a href={m.foto} target="_blank" rel="noopener noreferrer" className="underline">{m.foto}</a></td>
              <td className="border px-2 py-1 text-center">
                <button onClick={() => handleView(m)} className="text-emerald-600 hover:text-emerald-800 text-xl">🔍</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selected && (
          <div className="flex flex-col gap-2">
            {Object.entries(selected).map(([k, v]) => (
              <div key={k} className="flex gap-2 items-center">
                <span className="font-semibold capitalize">{k}:</span>
                <span>{String(v)}</span>
              </div>
            ))}
            {type === "pending" && (
              <div className="flex gap-4 mt-4 justify-center">
                <button
                  className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => { setModalOpen(false); /* lógica de aprobar */ }}
                >
                  Aprobar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => { setModalOpen(false); /* lógica de rechazar */ }}
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
