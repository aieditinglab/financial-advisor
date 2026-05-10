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
  title: "Meridian Wealth Advisors — Fee-Only Financial Planning",
  description:
    "Meridian Wealth Advisors is a fee-only, fiduciary financial advisory firm serving high-net-worth individuals and families. Transparent flat-fee advice with no commissions, no conflicts.",
  keywords:
    "fee-only financial advisor, fiduciary advisor, wealth management, retirement planning, tax strategy, estate planning, independent financial advisor, flat-fee financial planning",
  openGraph: {
    title: "Meridian Wealth Advisors — Fee-Only Financial Planning",
    description:
      "Fee-only, fiduciary wealth management for high-net-worth individuals. 20 years of trusted, independent advice with no commissions.",
    type: "website",
    siteName: "Meridian Wealth Advisors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Wealth Advisors — Fee-Only Financial Planning",
    description:
      "Fee-only, fiduciary wealth management with no commissions and no conflicts of interest.",
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
