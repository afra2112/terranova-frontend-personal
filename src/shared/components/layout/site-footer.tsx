import Link from "next/link";
import { Logo } from "@/shared/components/brand/logo";
import { routes } from "@/lib/routes";

/**
 * Site footer. Hidden on small screens (where the bottom nav serves
 * navigation) and shown from md+ as supporting desktop chrome.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto hidden border-t border-border bg-sidebar md:block">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-3">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            El marketplace rural para descubrir fincas, tierras y ganado, y
            agendar visitas con confianza.
          </p>
        </div>
        <nav
          className="flex flex-col gap-2 text-sm"
          aria-label="Enlaces del pie de página"
        >
          <span className="font-medium text-foreground">Explorar</span>
          <Link
            href={routes.marketplace}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver productos
          </Link>
          <Link
            href={routes.register}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Crear cuenta
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          {`© ${new Date().getFullYear()} Terranova. Todos los derechos reservados.`}
        </p>
      </div>
    </footer>
  );
}
