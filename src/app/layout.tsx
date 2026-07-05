import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import SplashCursorWrapper from "@/components/SplashCursorWrapper";
import ThemedNav from "@/components/ThemedNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My dynamic developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col relative"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* Themed fixed nav — changes color per visible section */}
        <ThemedNav />
        {/* Full-screen fluid splash cursor */}
        <SplashCursorWrapper />
        {children}
      </body>
    </html>
  );
}
