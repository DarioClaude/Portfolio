import type { Project } from "@/lib/projects";

export default function ProjectCardVisual({ project }: { project: Project }) {
  return (
    <div className={`relative w-full h-full ${project.bg} flex items-center justify-center`}>
      {/* Decorative SVG elements per project */}
      {project.slug === "marlay" && (
        <>
          {/* Clouds */}
          <svg className="absolute top-8 left-8 opacity-40" width="80" height="40" viewBox="0 0 80 40">
            <ellipse cx="30" cy="25" rx="25" ry="12" fill="white" />
            <ellipse cx="55" cy="20" rx="20" ry="15" fill="white" />
            <ellipse cx="45" cy="28" rx="22" ry="10" fill="white" />
          </svg>
          <svg className="absolute top-12 right-16 opacity-30" width="60" height="30" viewBox="0 0 60 30">
            <ellipse cx="25" cy="18" rx="20" ry="10" fill="white" />
            <ellipse cx="40" cy="15" rx="15" ry="12" fill="white" />
          </svg>
          {/* Pixel logo center */}
          <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5 w-8 h-8">
              <div className="bg-sky-400" /><div className="bg-sky-300" /><div />
              <div /><div className="bg-sky-400" /><div className="bg-sky-300" />
              <div className="bg-sky-300" /><div /><div className="bg-sky-400" />
            </div>
          </div>
        </>
      )}

      {project.slug === "garden" && (
        <>
          {/* Flowers */}
          <svg className="absolute top-6 right-10 opacity-60" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="10" r="6" fill="#86efac" />
            <circle cx="10" cy="20" r="6" fill="#86efac" />
            <circle cx="30" cy="20" r="6" fill="#86efac" />
            <circle cx="20" cy="30" r="6" fill="#86efac" />
            <circle cx="20" cy="20" r="5" fill="#fbbf24" />
          </svg>
          <svg className="absolute bottom-10 left-12 opacity-40" width="30" height="50" viewBox="0 0 30 50">
            <line x1="15" y1="50" x2="15" y2="15" stroke="#86efac" strokeWidth="2" />
            <ellipse cx="15" cy="12" rx="8" ry="5" fill="#86efac" />
          </svg>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 tracking-tight">Garden</p>
            <div className="mt-1 flex justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#22c55e">
                <path d="M8 0l2.35 5.64L16 6.47l-4 4.13L13 16 8 13.14 3 16l1-5.4-4-4.13 5.65-.83z" />
              </svg>
            </div>
          </div>
        </>
      )}

      {project.slug === "studio-arct" && (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="#1A1A1A" className="opacity-80">
          <path d="M30 5 L50 45 L10 45 Z" />
          <circle cx="30" cy="35" r="6" fill="white" />
        </svg>
      )}

      {project.slug === "kora" && (
        <>
          {/* Matrix data pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="text-[10px] font-mono text-green-400 whitespace-nowrap" style={{ transform: `translateY(${i * 38}px) translateX(${(i % 3) * 20}px)` }}>
                {Array.from({ length: 40 }).map((_, j) => (
                  <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
                ))}
              </div>
            ))}
          </div>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="white">
            <path d="M25 2 L45 15 L45 35 L25 48 L5 35 L5 15 Z" fill="none" stroke="white" strokeWidth="2" />
            <path d="M25 12 L35 19 L35 31 L25 38 L15 31 L15 19 Z" />
          </svg>
        </>
      )}

      {project.slug === "studio-17" && (
        <p className="text-4xl font-black text-white tracking-tighter">
          Studio 17
        </p>
      )}

      {project.slug === "ship-studio" && (
        <div className="w-48 h-28 bg-gray-800 rounded-t-lg relative">
          <div className="absolute inset-2 bg-gray-600 rounded-sm" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-2 bg-gray-500 rounded-b-lg" />
        </div>
      )}

      {project.slug === "cirro" && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A]" />
          <p className="text-2xl font-bold text-gray-800 tracking-tight">Cirro</p>
        </div>
      )}

      {project.slug === "volumaker" && (
        <>
          <div className="absolute top-6 right-6 w-32 h-20 bg-white/20 rounded-lg p-2">
            <div className="flex gap-1 h-full items-end">
              {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
                <div key={i} className="flex-1 bg-white/40 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-md">
              Export
            </div>
          </div>
          <p className="text-2xl font-black text-white tracking-tight">VOLUMAKER</p>
        </>
      )}

      {project.slug === "para-bellum" && (
        <>
          {/* Purple glows */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl" />
          <p className="text-3xl font-black text-white tracking-tight relative z-10">
            PARA BELLUM
          </p>
        </>
      )}
    </div>
  );
}
