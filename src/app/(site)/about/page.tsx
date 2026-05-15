"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

const spring = { type: "spring" as const, stiffness: 100, damping: 22 };

/* ---------- small UI atoms ---------- */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center font-sans"
      style={{
        padding: "6px 14px",
        borderRadius: 9999,
        border: "1px solid rgba(0, 0, 255, 0.25)",
        color: "#0000ff",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.01em",
        background: "#fff",
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      className="flex-1 mx-3 md:mx-5"
      style={{ height: 1, background: "rgba(25, 29, 35, 0.12)", minWidth: 24 }}
    />
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0000ff"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0000ff"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ---------- page ---------- */
export default function AboutPage() {
  const { t } = useTranslation();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const d = new Date();
      let hh = d.getHours();
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      const ampm = hh >= 12 ? "PM" : "AM";
      hh = hh % 12 || 12;
      return `${String(hh).padStart(2, "0")}:${mm}:${ss} ${ampm}`;
    };
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32 px-5 md:px-10 bg-white text-[#191D23]">
      <div className="max-w-[1280px] mx-auto">
        {/* ======================================================
            TOP — bio (left) + portrait (right)
           ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            className="flex flex-col gap-8 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div>
              <Pill>{t("about.pill.aboutMe")}</Pill>
            </div>

            {/* Big bio heading */}
            <h1
              className="font-sans"
              style={{
                fontSize: "clamp(24px, 2.6vw, 36px)",
                lineHeight: 1.3,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "#191D23",
              }}
            >
              {t("about.heading")}
            </h1>

            {/* Stats row */}
            <div className="flex items-center flex-wrap font-sans" style={{ rowGap: 8 }}>
              <Stat
                value={t("about.stats.years.value")}
                label={t("about.stats.years.label")}
              />
              <Divider />
              <Stat
                value={t("about.stats.projects.value")}
                label={t("about.stats.projects.label")}
              />
              <Divider />
              <Stat
                value={t("about.stats.clients.value")}
                label={t("about.stats.clients.label")}
              />
            </div>

            {/* Location + Time rows */}
            <div className="flex flex-col gap-3">
              <MetaRow icon={<GlobeIcon />} text={t("about.location.line")} />
              <MetaRow icon={<ClockIcon />} text={time || "—:—:—"} />
            </div>

            {/* CTA */}
            <a
              href="mailto:toninidario@yahoo.fr"
              data-cursor-hover
              className="inline-flex items-center justify-center font-sans transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "#191D23",
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 22px",
                borderRadius: 4,
                width: "fit-content",
                textDecoration: "none",
              }}
            >
              {t("about.cta")}
            </a>
          </motion.div>

          {/* RIGHT — portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="relative w-full overflow-hidden rounded-xl bg-black/5"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src="/images/portrait.jpg"
              alt="Dario Tonini"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 640px"
              quality={88}
              priority
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ======================================================
            EXPERIENCE
           ====================================================== */}
        <motion.div
          className="mt-24 md:mt-32 flex flex-col gap-10 md:gap-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
        >
          <div>
            <Pill>{t("about.pill.experience")}</Pill>
          </div>

          <ExperienceItem
            company={t("about.exp1.company")}
            role={t("about.exp1.role")}
            years={t("about.exp1.years")}
            description={t("about.exp1.desc")}
          />
          <ExperienceItem
            company={t("about.exp2.company")}
            role={t("about.exp2.role")}
            years={t("about.exp2.years")}
            description={t("about.exp2.desc")}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- internal pieces ---------- */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 flex-shrink-0">
      <span
        style={{
          color: "#0000ff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </span>
      <span style={{ color: "#191D23", fontSize: 14, fontWeight: 400 }}>
        {label}
      </span>
    </span>
  );
}

function MetaRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center">
      <span className="flex items-center gap-2.5 flex-shrink-0">
        {icon}
        <span style={{ fontSize: 13, fontWeight: 400, color: "#191D23" }}>
          {text}
        </span>
      </span>
      <span
        aria-hidden
        className="flex-1 ml-4"
        style={{ height: 1, background: "rgba(25, 29, 35, 0.12)" }}
      />
    </div>
  );
}

function ExperienceItem({
  company,
  role,
  years,
  description,
}: {
  company: string;
  role: string;
  years: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center flex-wrap" style={{ rowGap: 6 }}>
        <span
          style={{
            color: "#191D23",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {company}
        </span>
        <span className="mx-2.5" style={{ color: "rgba(25,29,35,0.35)" }}>
          •
        </span>
        <span style={{ color: "rgba(25,29,35,0.65)", fontSize: 14 }}>
          {role}
        </span>
        <span
          aria-hidden
          className="flex-1 mx-4"
          style={{
            height: 1,
            background: "rgba(25, 29, 35, 0.12)",
            minWidth: 24,
          }}
        />
        <span style={{ color: "rgba(25,29,35,0.65)", fontSize: 13 }}>
          {years}
        </span>
      </div>
      <p
        style={{
          color: "rgba(25,29,35,0.65)",
          fontSize: 14,
          lineHeight: 1.65,
          maxWidth: 640,
        }}
      >
        {description}
      </p>
    </div>
  );
}
