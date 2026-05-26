"use client";

import { motion } from "framer-motion";

export default function WorkCopyright() {
  return (
    <motion.div
      className="flex flex-col items-start max-w-[280px] md:max-w-[320px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <p className="text-[11px] md:text-[13px] font-normal leading-snug tracking-tight text-[#1A1A1A]">
        © {new Date().getFullYear()} Dario Tonini. All rights reserved. All photographs on this site are the exclusive property of Dario Tonini and may not be reproduced, distributed, or used in any form without prior written consent.
      </p>
      <p className="text-[11px] md:text-[13px] font-normal leading-snug tracking-tight text-[#6B7280] mt-1">
        Politique de confidentialité
      </p>
    </motion.div>
  );
}
