"use client";
import { useState } from "react";
import AdminProducts from "./AdminProducts";

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

export default function StorePage() {
  const [productos, setProductos] = useState<Product[]>([]);

  function handleAdd(p: Product) {
    setProductos(prev => [...prev, p]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-10 px-4 flex flex-col items-center">
      <AdminProducts onAdd={handleAdd} />
      <div className="w-full max-w-5xl mt-10">
        <h2 className="text-xl font-bold mb-4">Productos agregados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p, idx) => {
            const precioFinal = p.descuentoActivo ? p.precio * (1 - p.descuento / 100) : p.precio;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-200">
                <div className="flex gap-2 mb-2 overflow-x-auto">
                  {p.imagenes.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={p.nombre}
                      className={`h-16 w-16 object-cover rounded border-2 ${p.imagenPrincipal === i ? "border-emerald-600" : "border-gray-300"}`}
                    />
                  ))}
                </div>
                <h3 className="font-bold text-lg">{p.nombre}</h3>
                <div className="flex gap-2 items-center">
                  {p.descuentoActivo && (
                    <span className="text-gray-500 line-through">{formatCurrency(p.precio)}</span>
                  )}
                  <span className="text-emerald-700 font-bold">{formatCurrency(precioFinal)}</span>
                  {p.descuentoActivo && p.descuento > 0 && (
                    <span className="text-sm text-red-600">-{p.descuento}%</span>
                  )}
                </div>
                <span className="text-sm text-gray-600">Unidades: {p.unidades}</span>
              </div>
            );
          })}
          {productos.length === 0 && <span className="text-gray-500">No hay productos agregados.</span>}
        </div>
      </div>
    </div>
  );
}