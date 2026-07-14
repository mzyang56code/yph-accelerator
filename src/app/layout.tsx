import type { Metadata } from "next";
import { Manrope, Libre_Franklin, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ChromeGate from "@/components/ChromeGate";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Display: Libre Franklin — a warm Franklin-Gothic humanist sans; credible and
// legible, set heavy and tight for titles. Replaces Inter site-wide.
const display = Libre_Franklin({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

// Body: geometric humanist sans — clean, friendly, easy on younger readers.
const body = Manrope({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

// Utility: mono for eyebrow labels and data — echoes the epidemiology motif.
// Spline Sans Mono replaces IBM Plex Mono (also a reflex default) site-wide.
const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-mono",
  display: "swap",
});

const description =
  "A Stanford program training high-school students in the tools of public health — epidemiology, data, and equity — through workshops, mentorship, and community projects.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s · Stanford YPHA",
  },
  description,
  openGraph: {
    title: SITE_NAME,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ChromeGate nav={<SiteNav />} footer={<SiteFooter />}>
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}
