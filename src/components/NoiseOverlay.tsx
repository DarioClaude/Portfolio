export default function NoiseOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ opacity: 0.05 }}
    >
      <filter id="noise">
        <feTurbulence
          baseFrequency="0.65"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
