import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { getAuth, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const LpinoLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

interface AdminNavbarProps {
  user?: {
    name: string;
    email: string;
  };
}

export default function AdminNavbar({ user }: AdminNavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Miembros", href: "/users" },
    { name: "Tienda", href: "/store" },
    { name: "Onboarding", href: "/onboarding" },
    { name: "Reportes", href: "/reports" },
    { name: "Configuración", href: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white shadow-sm border-b border-gray-200">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <LpinoLogo />
          <p className="font-bold text-inherit">Lpino Admin</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link 
              color="foreground" 
              href={item.href}
              className="hover:text-emerald-600 transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="success"
                name={user.name}
                size="sm"
                src=""
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesión activa</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                Configuración
              </DropdownItem>
              <DropdownItem key="help_and_feedback">
                Ayuda y Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="flat">
                Iniciar sesión
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {user && (
          <NavbarMenuItem key="logout">
            <Link
              className="w-full text-danger"
              href="#"
              size="lg"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
