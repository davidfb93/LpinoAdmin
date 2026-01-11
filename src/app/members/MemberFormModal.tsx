"use client";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function MemberFormModal({ open, onClose, onSave }: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [membresia, setMembresia] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ cedula, nombre, posicion, codigo, membresia, foto });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form className="flex flex-col gap-2 min-w-[300px]" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-2">Nuevo Miembro</h2>
        <label className="font-medium">Cédula</label>
        <input className="border rounded px-2 py-1" value={cedula} onChange={e => setCedula(e.target.value)} required />
        <label className="font-medium">Nombre</label>
        <input className="border rounded px-2 py-1" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <label className="font-medium">Posición</label>
        <input className="border rounded px-2 py-1" value={posicion} onChange={e => setPosicion(e.target.value)} required />
        <label className="font-medium">Código de descuento</label>
        <input className="border rounded px-2 py-1" value={codigo} onChange={e => setCodigo(e.target.value)} />
        <label className="font-medium">Número de membresía</label>
        <input className="border rounded px-2 py-1" value={membresia} onChange={e => setMembresia(e.target.value)} />
        <label className="font-medium">Foto de perfil</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {foto && <img src={foto} alt="preview" className="h-20 object-contain mt-1" />}
        <button type="submit" className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded px-4 py-2">Guardar</button>
      </form>
    </Modal>
  );
}
