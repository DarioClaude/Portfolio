import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import CursorFollower from "@/components/CursorFollower";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Marlay — Creative Portfolio",
  description:
    "Creative Developer & Co-founder of Studio Arct — Bordeaux, FR. I help brands translate strategy into clear, impactful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-white text-[#1A1A1A]`}
        style={{ fontFamily: "var(--font-geist-sans), Inter, -apple-system, sans-serif" }}
      >
        <NoiseOverlay />
        <CursorFollower />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
