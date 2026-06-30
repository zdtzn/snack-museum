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
    default: "鑫安零食博物馆",
    template: "%s | 鑫安零食博物馆",
  },
  description: "精选零食、口感评分、批发拿货和客服对接，一站式浏览鑫安零食博物馆。",
  keywords: ["零食批发", "临沂食品", "零食优选", "鑫安好物", "食品供应链"],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "鑫安零食博物馆",
    description: "精选零食、口感评分、批发拿货和客服对接，一站式浏览鑫安零食博物馆。",
    url: siteUrl,
    siteName: "鑫安零食博物馆",
    locale: "zh_CN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eadb",
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
      <body className="min-h-full flex flex-col bg-background text-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
