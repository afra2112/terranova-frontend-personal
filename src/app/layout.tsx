import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Terranova — Marketplace rural de fincas, tierras y ganado",
    template: "%s | Terranova",
  },
  description:
    "Terranova conecta compradores y vendedores rurales. Descubre fincas, tierras y ganado, y agenda visitas a las propiedades de forma sencilla.",
  applicationName: "Terranova",
  keywords: [
    "marketplace rural",
    "fincas",
    "tierras",
    "ganado",
    "agendar visitas",
    "Terranova",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2a20" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${geistMono.variable} h-full bg-background antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
