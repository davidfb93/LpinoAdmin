"use client";
import { useState } from "react";
import Modal from "@/components/Modal";

const pages = [
  { value: "home", label: "Home" },
  { value: "dashboard", label: "Dashboard" },
  { value: "profile", label: "Perfil" },
  { value: "store", label: "Tienda" },
];

function OnboardingCard({ index }: { index: number }) {
  const [title, setTitle] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonPage, setButtonPage] = useState(pages[0].value);
  const [cardState, setCardState] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    setModalOpen(true);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 w-full max-w-xs border border-gray-200">
      <h2 className="font-bold text-lg mb-2">Onboarding {index + 1}</h2>
      <div className="flex flex-col items-center gap-2">
        <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-100 rounded-lg h-32 w-full mb-2 border border-dashed border-emerald-300 hover:bg-emerald-50 transition-colors">
          {image ? (
            <img src={image} alt="preview" className="h-28 object-contain" />
          ) : (
            <span className="text-gray-400">IMAGEN</span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <span className="text-xs text-emerald-500 mt-1">Subir imagen</span>
        </label>
      </div>
      <label className="block text-sm font-medium text-gray-700">Título</label>
      <input
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
      />
      <div className="flex items-center gap-2 mt-2">
        <label className="text-sm font-medium text-gray-700">Activar botón</label>
        <input
          type="checkbox"
          checked={buttonActive}
          onChange={e => setButtonActive(e.target.checked)}
          className="accent-emerald-500 w-5 h-5"
        />
      </div>
      {buttonActive && (
        <div className="flex flex-col gap-2">
          <label className="block text-xs font-medium text-gray-600">Título Botón</label>
          <input
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={buttonTitle}
            onChange={e => setButtonTitle(e.target.value)}
            placeholder="Título del botón"
          />
          <label className="block text-xs font-medium text-gray-600">Página de destino</label>
          <select
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={buttonPage}
            onChange={e => setButtonPage(e.target.value)}
          >
            {pages.map(page => (
              <option key={page.value} value={page.value}>{page.label}</option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center gap-2 mt-2">
        <label className="text-sm font-medium text-gray-700">Estado de la tarjeta</label>
        <input
          type="checkbox"
          checked={cardState}
          onChange={e => setCardState(e.target.checked)}
          className="accent-emerald-500 w-5 h-5"
        />
      </div>
      <button
        className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg shadow transition-colors"
        onClick={handleSave}
      >
        Guardar
      </button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-emerald-600 text-3xl">✔️</span>
          <p className="text-lg font-semibold">Tarjeta guardada on exito</p>
          <button
            className="mt-2 px-4 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
            onClick={() => setModalOpen(false)}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-10 px-4">
      <div className="flex flex-wrap gap-8 justify-center">
        {[0, 1, 2].map(i => (
          <OnboardingCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}