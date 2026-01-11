
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "@/styles/globals.css";
import NavbarClientWrapper from "@/components/NavbarClientWrapper";

export const metadata: Metadata = {
  title: "Lpino Admin",
  description: "Admin Panel for Lpino",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  // Si estamos en /login, solo renderiza los children (sin navbar)
  const isLogin = pathname === "/login";
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "white" }}>
          <NavbarClientWrapper>
            {children}
          </NavbarClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
