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
    images: [
      {
        url: "/icon-512.png?v=2",
        width: 512,
        height: 512,
        alt: "Hopest Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Hopest | Civic Safety & Lost Property Platform (hopest.in)",
    description:
      "A free, verified civic network connecting neighbours to recover lost valuables and protect communities.",
    images: ["/icon-512.png?v=2"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-48x48.png?v=2", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png?v=2" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-192.png?v=2" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon-512.png?v=2" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
      </head>
      <body className={`${inter.variable} antialiased bg-[#080706] text-white selection:bg-[#6b3f23] selection:text-white overflow-x-hidden min-h-screen w-full`}>
        {children}
      </body>
    </html>
  );
}