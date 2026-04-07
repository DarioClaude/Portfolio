export default function PixelLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect width="32" height="32" rx="4" fill="white" />
      {/* Top block */}
      <rect x="8" y="4" width="8" height="8" fill="#1A1A1A" />
      <rect x="16" y="4" width="8" height="8" fill="#1A1A1A" />
      {/* Middle block */}
      <rect x="4" y="12" width="8" height="8" fill="#1A1A1A" />
      <rect x="12" y="12" width="8" height="8" fill="#1A1A1A" />
      {/* Bottom block */}
      <rect x="12" y="20" width="8" height="8" fill="#1A1A1A" />
      <rect x="20" y="20" width="8" height="8" fill="#1A1A1A" />
    </svg>
  );
}
