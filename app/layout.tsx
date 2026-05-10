import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-app",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bolt Resell AI — Smart Reselling Analytics",
  description:
    "Track your reselling inventory across eBay, Depop, StockX & more. AI-powered insights, profit analytics, market research, and vendor sourcing — all in one platform.",
  keywords:
    "reselling tracker, reseller analytics, eBay profit tracker, Depop analytics, reselling AI, inventory management, flip tracker, reseller tools",
  openGraph: {
    title: "Bolt Resell AI — Smart Reselling Analytics",
    description:
      "AI-powered reselling dashboard. Track inventory, analyze profits, research markets, and grow your reselling business.",
    type: "website",
    siteName: "Bolt Resell AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolt Resell AI — Smart Reselling Analytics",
    description:
      "AI-powered analytics for resellers. Track profits across eBay, Depop, StockX and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
