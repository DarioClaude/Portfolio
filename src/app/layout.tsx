import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import CursorFollower from "@/components/CursorFollower";

const montserrat = localFont({
  src: "./fonts/Montserrat.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dario Tonini — Photographer",
  description:
    "French photographer dedicated to capturing raw emotions and minimalist digital aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-white text-[#1A1A1A]`}
        style={{ fontFamily: "var(--font-montserrat), -apple-system, sans-serif" }}
      >
        <NoiseOverlay />
        <CursorFollower />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
