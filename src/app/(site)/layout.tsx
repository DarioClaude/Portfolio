import Navbar from "@/components/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import CursorFollower from "@/components/CursorFollower";
import ImageProtection from "@/components/ImageProtection";
import CarouselPreload from "@/components/CarouselPreload";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-shell">
      <NoiseOverlay />
      <CursorFollower />
      <ImageProtection />
      <CarouselPreload />
      <Navbar />
      <main className="max-w-[1800px] mx-auto relative">{children}</main>
    </div>
  );
}
