import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://snack-museum.onrender.com";

export const metadata: Metadata = {
  title: {
    default: "鑫安好物优选",
    template: "%s | 鑫安好物优选",
  },
  description: "精选好物，品质生活。30年食品批发老店，发现值得购买的美味零食！",
  keywords: ["零食批发", "临沂食品城", "零食优选", "鑫安好物", "食品供应链"],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "鑫安好物优选",
    description: "精选好物，品质生活。30年食品批发老店，发现值得购买的美味零食！",
    url: siteUrl,
    siteName: "鑫安好物优选",
    locale: "zh_CN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5ede0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
