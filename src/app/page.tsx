import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, CalendarCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/shared/components/layout";
import { routes } from "@/lib/routes";

const productTypes = [
  { label: "Tierras", href: `${routes.marketplace}?tipo=LAND` },
  { label: "Fincas", href: `${routes.marketplace}?tipo=FARM` },
  { label: "Ganado", href: `${routes.marketplace}?tipo=CATTLE` },
];

const valueProps = [
  {
    icon: Search,
    title: "Descubre oportunidades",
    body: "Explora fincas, tierras y ganado con fotos reales y la información que importa.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda visitas",
    body: "Reserva una cita para conocer la propiedad. Sin trámites complicados.",
  },
  {
    icon: ShieldCheck,
    title: "Compra con confianza",
    body: "Conecta directamente con vendedores y conoce quién está detrás de cada producto.",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero-rural.png"
          alt="Paisaje rural con campos verdes, una finca y ganado al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/55" aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-20 md:py-28">
          <span className="w-fit rounded-full bg-background/15 px-3 py-1 text-sm font-medium text-background backdrop-blur">
            Marketplace rural
          </span>
          <h1 className="max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-background md:text-5xl">
            Encuentra tierras, fincas y ganado. Agenda tu visita.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-background/90">
            Terranova conecta a compradores y vendedores rurales y hace que
            agendar una visita a la propiedad sea simple.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href={routes.marketplace} />} size="lg">
              <Search data-icon="inline-start" />
              Explorar productos
            </Button>
            <Button
              render={<Link href={routes.register} />}
              size="lg"
              variant="secondary"
            >
              Crear cuenta
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {productTypes.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="rounded-full border border-background/30 bg-background/10 px-4 py-1.5 text-sm font-medium text-background backdrop-blur transition-colors hover:bg-background/20"
              >
                {type.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <article
                key={prop.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold text-card-foreground">
                  {prop.title}
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {prop.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Seller CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-balance">
              ¿Tienes una propiedad para vender?
            </h2>
            <p className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="size-4" aria-hidden="true" />
              Publica tu finca, tierra o ganado y recibe compradores
              interesados.
            </p>
          </div>
          <Button
            render={<Link href={routes.register} />}
            size="lg"
            variant="secondary"
            className="shrink-0"
          >
            Empezar a vender
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
