import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-app",
  subsets: ["latin"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-app",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlipLedger — Reseller finance, made simple",
  description:
    "Track profit, COGS, platform fees, taxes, and cash flow for your reselling business. Built for eBay, StockX, Amazon FBA, Whatnot, Depop, and more. Free to start.",
  keywords:
    "reseller finance, profit tracker, COGS tracker, eBay profit calculator, StockX fees, Amazon FBA tracker, reselling taxes, flip profit, Depop seller tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
