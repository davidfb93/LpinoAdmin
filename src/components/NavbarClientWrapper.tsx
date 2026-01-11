"use client";
import { usePathname } from "next/navigation";
import LayoutWithNavbar from "@/components/LayoutWithNavbar";

export default function NavbarClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return <>{children}</>;
  }
  return <LayoutWithNavbar>{children}</LayoutWithNavbar>;
}
