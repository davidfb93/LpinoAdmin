"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAuth, User } from "@/lib/auth";

interface LayoutWithNavbarProps {
  children: React.ReactNode;
}

export default function LayoutWithNavbar({ children }: LayoutWithNavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = getAuth();
    setUser(auth.user);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex flex-col h-screen">
      <AdminNavbar user={user || undefined} />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
      </footer>
    </div>
  );
}
