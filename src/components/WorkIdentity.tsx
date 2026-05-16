"use client";

import { motion } from "framer-motion";
import AvatarTilt from "./AvatarTilt";
import SocialIcons from "./SocialIcons";

export default function WorkIdentity() {
  return (
    <motion.div
      className="flex flex-col items-start gap-1 md:gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <AvatarTilt showTooltip />
      <div className="flex flex-col items-start leading-none">
        <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#f5f5f5] leading-none">
          Dario Tonini
        </p>
        <p className="text-xs tracking-[0.5px] text-[#9CA3AF] dark:text-[#71717a] leading-none mt-0.5">
          @dariotni
        </p>
      </div>
      <SocialIcons />
    </motion.div>
  );
}
