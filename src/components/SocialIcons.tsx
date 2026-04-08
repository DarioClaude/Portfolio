"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialIcons() {
  const [showInstaPreview, setShowInstaPreview] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* Instagram */}
      <div
        className="relative"
        onMouseEnter={() => setShowInstaPreview(true)}
        onMouseLeave={() => setShowInstaPreview(false)}
      >
        <a
          href="https://www.instagram.com/dariotni/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          data-cursor-hover
          aria-label="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* Instagram hover preview tooltip */}
        <AnimatePresence>
          {showInstaPreview && (
            <motion.div
              className="absolute bottom-full left-1/2 mb-3 w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-none"
              style={{ transform: "translateX(-50%)" }}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Profile header */}
              <div className="flex items-center gap-2.5 p-3 pb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <div className="w-[33px] h-[33px] rounded-full bg-white flex items-center justify-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600">
                      DT
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-tight">dariotni</p>
                  <p className="text-[10px] text-[#6B7280] leading-tight">Dario Tonini</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between px-3 pb-2 text-[10px] text-[#6B7280]">
                <span><strong className="text-[#1A1A1A]">42</strong> posts</span>
                <span><strong className="text-[#1A1A1A]">1.2k</strong> followers</span>
                <span><strong className="text-[#1A1A1A]">384</strong> following</span>
              </div>

              {/* Mini image grid 3x2 */}
              <div className="grid grid-cols-3 gap-px bg-gray-200">
                {[
                  "bg-sky-300",
                  "bg-amber-50",
                  "bg-gray-200",
                  "bg-gray-900",
                  "bg-amber-800",
                  "bg-gray-700",
                ].map((bg, i) => (
                  <div key={i} className={`${bg} aspect-square`} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/dario-tonini-686799252/"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        data-cursor-hover
        aria-label="LinkedIn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}
