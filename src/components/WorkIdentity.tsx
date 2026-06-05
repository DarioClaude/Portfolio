"use client";

import { motion } from "framer-motion";
import AvatarTilt from "./AvatarTilt";
import SocialIcons from "./SocialIcons";

export default function WorkIdentity() {
  return (
    <motion.div
      className="flex flex-col items-end gap-2 flex-shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <AvatarTilt showTooltip />
      <div className="flex flex-col items-end leading-none">
        <p className="text-lg font-normal tracking-tight text-[#1A1A1A] leading-none">
          Dario Tonini
        </p>
        <p className="text-xs tracking-[0.5px] text-[#6B7280] leading-none mt-0.5">
          @dariotni
        </p>
      </div>
      <SocialIcons />
    </motion.div>
  );
}
