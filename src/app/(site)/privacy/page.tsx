"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import WorkMobileScroll from "@/components/WorkMobileScroll";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <WorkMobileScroll />
      <section
        style={{
        paddingTop: "clamp(96px, 10vw, 112px)",
        paddingBottom: "clamp(48px, 5vw, 80px)",
        padding: "clamp(96px, 10vw, 112px) clamp(20px, 3vw, 40px) clamp(48px, 5vw, 80px)",
      }}
    >
      <motion.div
        className="max-w-[720px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-[#1A1A1A] mb-10">
          {t("privacy.title")}
        </h1>

        <div className="space-y-8 text-[13px] md:text-[15px] leading-relaxed text-[#1A1A1A]">
          <p className="text-[#6B7280]">
            {t("privacy.lastUpdated")}: 26/05/2026
          </p>

          <Block title={t("privacy.s1.title")} body={t("privacy.s1.body")} />
          <Block title={t("privacy.s2.title")} body={t("privacy.s2.body")} />
          <Block title={t("privacy.s3.title")} body={t("privacy.s3.body")} />
          <Block title={t("privacy.s4.title")} body={t("privacy.s4.body")} />
          <Block title={t("privacy.s5.title")} body={t("privacy.s5.body")} />
          <Block title={t("privacy.s6.title")} body={t("privacy.s6.body")} />
          <Block title={t("privacy.s7.title")} body={t("privacy.s7.body")} />
          <Block title={t("privacy.s8.title")} body={t("privacy.s8.body")} />
          <Block title={t("privacy.s9.title")} body={t("privacy.s9.body")} />
          <Block title={t("privacy.s10.title")} body={t("privacy.s10.body")} />

          <div className="pt-4 border-t border-[#e5e7eb]">
            <p className="text-[#6B7280]">{t("privacy.footer")}</p>
          </div>
        </div>
      </motion.div>
    </section>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-[15px] md:text-[17px] font-semibold tracking-tight text-[#1A1A1A] mb-2">
        {title}
      </h2>
      <p className="whitespace-pre-line">{body}</p>
    </div>
  );
}
