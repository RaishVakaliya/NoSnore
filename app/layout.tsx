import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "NoSnore",
  description: "Keep your backend alive while you sleep. NoSnore pings your services to prevent cold starts and ensures 24/7 availability.",
  url: "https://no-snore.vercel.app",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Keep Your Backend Alive`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "NoSnore",
    "Uptime Monitoring",
    "Cold Start Prevention",
    "Backend Pinger",
    "SaaS Monitoring",
    "Developer Tools",
  ],
  authors: [
    {
      name: "NoSnore Team",
      url: siteConfig.url,
    },
  ],
  creator: "NoSnore",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@nosnore",
  },
  metadataBase: new URL(siteConfig.url),
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
