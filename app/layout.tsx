import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hopest | Civic Safety & Lost Property Platform (hopest.in)",
  description:
    "Hopest (hopest.in) is a free community-powered platform to report lost belongings, found items, local theft alerts, and missing person appeals.",
  keywords: [
    "Hopest",
    "hopest.in",
    "lost and found",
    "lost item recovery",
    "community safety",
    "theft alert",
    "missing persons",
    "Kerala",
    "civic goodwill",
  ],
  metadataBase: new URL("https://hopest.in"),
  openGraph: {
    title: "Hopest | Civic Safety & Lost Property Platform (hopest.in)",
    description:
      "A free, verified civic network connecting neighbours to recover lost valuables and protect communities.",
    url: "https://hopest.in",
    siteName: "Hopest",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#090807] text-stone-100 selection:bg-[#d89b52]/30 selection:text-[#f8d7a4]`}>
        {children}
      </body>
    </html>
  );
}