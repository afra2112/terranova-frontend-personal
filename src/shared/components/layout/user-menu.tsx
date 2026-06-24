"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, CalendarCheck, LayoutDashboard, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/lib/routes";
import { useAuth } from "@/features/auth";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Authenticated user menu / signed-out CTAs. Renders login + register buttons
 * for guests and a role-aware dropdown for signed-in users.
 */
export function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, isBuyer, isSeller, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href={routes.login}>Ingresar</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={routes.register}>Crear cuenta</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="size-10 rounded-full p-0"
          aria-label="Abrir menú de usuario"
        >
          <Avatar className="size-9">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback>{initials(user.fullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate font-medium">{user.fullName}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isBuyer ? (
            <>
              <DropdownMenuItem asChild>
                <Link href={routes.favorites}>
                  <Heart data-icon="inline-start" />
                  Favoritos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={routes.myAppointments}>
                  <CalendarCheck data-icon="inline-start" />
                  Mis citas
                </Link>
              </DropdownMenuItem>
            </>
          ) : null}
          {isSeller ? (
            <DropdownMenuItem asChild>
              <Link href={routes.dashboard}>
                <LayoutDashboard data-icon="inline-start" />
                Panel de vendedor
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild>
            <Link href={routes.dashboardProfile}>
              <User data-icon="inline-start" />
              Mi perfil
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await logout();
            router.push(routes.home);
          }}
        >
          <LogOut data-icon="inline-start" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
