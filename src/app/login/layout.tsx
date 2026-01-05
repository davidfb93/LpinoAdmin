"use client";

import { ReactNode } from "react";
import { Providers } from "../providers";

export default function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="hide-scrollbar h-screen">
      <head />
      <body className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 hide-scrollbar overflow-hidden">
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <div className="h-screen flex items-center justify-center p-4 relative hide-scrollbar">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}