"use client";

import { useState } from "react";
import Image from "next/image";
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

        {/* Instagram hover preview — real screenshot */}
        <AnimatePresence>
          {showInstaPreview && (
            <motion.div
              className="absolute bottom-full right-0 mb-3 w-[120px] rounded-lg shadow-2xl border border-gray-100 overflow-hidden pointer-events-none"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/insta-preview.jpg"
                alt="@dariotni on Instagram"
                width={120}
                height={138}
                className="w-full h-auto"
                quality={90}
                draggable={false}
              />
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
