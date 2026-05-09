import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlipLedger | Reseller Finance Tracker",
  description:
    "Track profit, COGS, platform fees, taxes, and cash flow for your reselling business. Built for eBay, StockX, Amazon FBA, Whatnot, and more. Free to start.",
  keywords: "reseller finance, profit tracker, COGS tracker, eBay profit calculator, StockX fees, Amazon FBA tracker, reselling taxes, flip profit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
