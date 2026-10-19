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
    icon: [
      { url: "/logo.png?v=2", sizes: "any", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "48x48", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "256x256", type: "image/png" },
      { url: "/logo.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/logo.png?v=2",
    apple: "/logo.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png?v=2" sizes="any" type="image/png" />
        <link rel="icon" href="/logo.png?v=2" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logo.png?v=2" sizes="16x16" type="image/png" />
        <link rel="shortcut icon" href="/logo.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png?v=2" />
      </head>
      <body className={`${inter.variable} antialiased bg-[#090807] text-stone-100 selection:bg-[#d89b52]/30 selection:text-[#f8d7a4]`}>
        {children}
      </body>
    </html>
  );
}