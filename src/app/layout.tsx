
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import "@/styles/globals.css";



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
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "white" }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
