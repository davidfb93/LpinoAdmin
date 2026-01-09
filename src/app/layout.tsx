
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import "@/styles/globals.css";
import LayoutWithNavbar from "@/components/LayoutWithNavbar";

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
          <LayoutWithNavbar>
            {children}
          </LayoutWithNavbar>
        </Providers>
      </body>
    </html>
  );
}
