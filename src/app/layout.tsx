import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mikire-checker.vercel.app"),
  title: "見切れチェッカー｜画像の表示範囲・安全領域確認ツール",
  description:
    "画像をアップロードして、YouTube、X（旧Twitter）、Discord、noteなどの表示範囲や安全領域をブラウザ内で確認できるWebツールです。",
  openGraph: {
    title: "見切れチェッカー｜画像の表示範囲・安全領域確認ツール",
    description:
      "画像をアップロードして、YouTube、X（旧Twitter）、Discord、noteなどの表示範囲や安全領域をブラウザ内で確認できるWebツールです。",
    url: "https://mikire-checker.vercel.app",
    siteName: "見切れチェッカー",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "見切れチェッカー",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "見切れチェッカー｜画像の表示範囲・安全領域確認ツール",
    description:
      "画像をアップロードして、YouTube、X（旧Twitter）、Discord、noteなどの表示範囲や安全領域をブラウザ内で確認できるWebツールです。",
    images: ["/twitter-image.png"],
  },
};

const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {adsenseClient && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      )}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
