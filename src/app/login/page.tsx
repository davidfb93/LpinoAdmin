"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuth } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Simulación de autenticación
    setTimeout(() => {
      // Validación simple (puedes cambiar esto por tu API real)
      if (email && password.length >= 4) {
        // Guardar autenticación
        setAuth({
          email,
          name: email.split('@')[0] // Extraer nombre del email
        });
        
        // Redirigir al home (panel administrativo)
        router.push("/");
      } else {
        setError("Credenciales inválidas. Intenta nuevamente.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen flex flex-col justify-start pt-1 px-4 relative overflow-auto hide-scrollbar">
      {/* Fondo decorativo responsive */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Bolas animadas - visibles solo en desktop */}
        <div className="hidden lg:block absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="hidden lg:block absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Version móvil de las bolas - más pequeñas */}
        <div className="lg:hidden absolute -top-20 -right-20 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="lg:hidden absolute -bottom-20 -left-20 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Tarjeta principal responsive */}
      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
        {/* Header con logo responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Bienvenido a Lpino Admin</h1>
          <p className="text-gray-600 text-sm sm:text-base px-2">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Formulario responsive */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Campo de email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" onClick={toggleVisibility} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                  {isVisible ? (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Opciones adicionales responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors text-left sm:text-right">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de submit responsive */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Footer responsive */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-gray-600 px-2">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
              Contacta al administrador
            </a>
          </p>
        </div>
      </div>

      {/* Copyright responsive */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-4">
        <p className="text-xs text-gray-500"> 2024 Panel de Administración. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}