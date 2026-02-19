"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function MissionSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background px-4 pt-20">
      <div className="max-w-6xl mx-auto bg-primary rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <h2 className="text-primary-foreground text-xl md:text-2xl font-semibold mb-2">
            {t("mission.heading")}
          </h2>
          <p className="text-primary-foreground/80 text-sm md:text-base max-w-xl">
            {t("mission.text")}
          </p>
        </div>

        <button className="bg-background text-foreground font-semibold px-6 py-3 rounded-full text-sm hover:bg-muted transition shadow-lg">
          {t("mission.cta")}
        </button>
      </div>
    </section>
  );
}
