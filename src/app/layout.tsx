import type { Metadata, Viewport } from "next";
import { Acme, Agbalumo, Grenze_Gotisch, Manrope } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const grenze = Grenze_Gotisch({ variable: "--font-grenze", subsets: ["latin"], display: "swap" });
const acme = Acme({ variable: "--font-acme", weight: "400", subsets: ["latin"], display: "swap" });
const agbalumo = Agbalumo({ variable: "--font-agbalumo", weight: "400", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  authors: [{ name: site.name, url: "https://github.com/Racer-95" }],
  keywords: ["Aditya Shankar", "full-stack developer", "React", "Next.js", "Node.js", "TypeScript", "MongoDB", "data analytics", "portfolio"],
  openGraph: {
    type: "website",
    title,
    description: site.description,
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grenze.variable} ${acme.variable} ${agbalumo.variable} ${manrope.variable} antialiased`}
    >
      <body className="grain min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
