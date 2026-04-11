import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import CursorFollower from "@/components/CursorFollower";
import ImageProtection from "@/components/ImageProtection";
import { LanguageProvider } from "@/context/LanguageContext";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-hydration theme boot to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased transition-colors duration-500 ease-out`}
        style={{ fontFamily: "var(--font-montserrat), -apple-system, sans-serif" }}
      >
        <LanguageProvider>
          <NoiseOverlay />
          <CursorFollower />
          <ImageProtection />
          <Navbar />
          <main className="max-w-[1800px] mx-auto relative">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
