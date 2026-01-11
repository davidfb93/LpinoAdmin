"use client";
import { useState } from "react";

interface Product {
  nombre: string;
  precio: number;
  descuentoActivo: boolean;
  descuento: number;
  unidades: number;
  imagenes: string[];
  imagenPrincipal: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function parseCurrency(value: string): number {
  const cleanValue = value.replace(/[^0-9]/g, '');
  return cleanValue ? parseInt(cleanValue, 10) : 0;
}

export default function AdminProducts({ onAdd }: { onAdd: (p: Product) => void }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [precioDisplay, setPrecioDisplay] = useState(formatCurrency(0));
  const [descuentoActivo, setDescuentoActivo] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenPrincipal, setImagenPrincipal] = useState(0);
  const [preview, setPreview] = useState<string[]>([]);

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrecioDisplay(value);
    const parsedValue = parseCurrency(value);
    setPrecio(parsedValue);
    if (descuentoActivo && descuento > 100) {
      setDescuento(100);
    }
  };
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files);
    Promise.all(
      arr.map(file => {
        return new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.onload = ev => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        });
      })
    ).then(imgs => {
      setImagenes(imgs);
      setPreview(imgs);
      setImagenPrincipal(0);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({ nombre, precio, descuentoActivo, descuento, unidades, imagenes, imagenPrincipal });
    setNombre(""); 
    setPrecio(0); 
    setPrecioDisplay(formatCurrency(0));
    setDescuentoActivo(false); 
    setDescuento(0); 
    setUnidades(0); 
    setImagenes([]); 
    setPreview([]); 
    setImagenPrincipal(0);
  }

  const handleDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100) {
      setDescuento(value);
    }
  };

  const precioFinal = descuentoActivo ? precio * (1 - descuento / 100) : precio;

  return (
    <form className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 max-w-xl w-full" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Agregar producto</h2>
      <label>Nombre</label>
      <input className="border rounded px-2 py-1" value={nombre} onChange={e => setNombre(e.target.value)} required />
      <label>Precio</label>
      <input 
        className="border rounded px-2 py-1" 
        type="text" 
        value={precioDisplay} 
        onChange={handlePrecioChange} 
        placeholder="$0"
        required 
      />
      <div className="flex items-center gap-2">
        <label>Activar descuento</label>
        <input type="checkbox" checked={descuentoActivo} onChange={e => setDescuentoActivo(e.target.checked)} />
      </div>
      {descuentoActivo && (
        <>
          <label>Descuento (%)</label>
          <input 
            className="border rounded px-2 py-1" 
            type="number" 
            min={0} 
            max={100} 
            value={descuento} 
            onChange={handleDescuentoChange} 
          />
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 line-through">{formatCurrency(precio)}</span>
            <span className="text-emerald-700 font-bold">{formatCurrency(precioFinal)}</span>
            {descuento > 0 && (
              <span className="text-sm text-red-600">-{descuento}%</span>
            )}
          </div>
        </>
      )}
      <label>Unidades disponibles</label>
      <input className="border rounded px-2 py-1" type="number" min={0} value={unidades} onChange={e => setUnidades(Number(e.target.value))} required />
      <label>Imágenes</label>
      <button
        type="button"
        className="mb-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-1 rounded shadow"
        onClick={() => document.getElementById('product-image-input')?.click()}
      >
        Añadir imágenes
      </button>
      <input
        id="product-image-input"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <div className="flex gap-2 mt-2">
        {preview.map((img, idx) => (
          <div key={idx} className="relative group">
            <img
              src={img}
              alt="img"
              className={`h-16 w-16 object-cover rounded border-2 ${imagenPrincipal === idx ? "border-emerald-600" : "border-gray-300"}`}
              onClick={() => setImagenPrincipal(idx)}
            />
            {imagenPrincipal === idx && (
              <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-xs px-1 rounded">Principal</span>
            )}
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100 group-hover:block hidden"
              onClick={() => {
                const newImgs = preview.filter((_, i) => i !== idx);
                setPreview(newImgs);
                setImagenes(newImgs);
                if (imagenPrincipal === idx) setImagenPrincipal(0);
                else if (imagenPrincipal > idx) setImagenPrincipal(imagenPrincipal - 1);
              }}
              title="Eliminar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg shadow transition-colors">Agregar</button>
    </form>
  );
}
