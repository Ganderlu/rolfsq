"use client";

import { Target, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrinciplesSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-foreground text-4xl md:text-5xl font-semibold mb-6">
          {t("principles.heading")}
        </h2>

        <span className="inline-block text-xs md:text-sm text-emerald-500 border border-emerald-500/40 rounded-full px-4 py-2 mb-16">
          {t("principles.chips")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
            <Target className="text-foreground mb-6" size={28} />

            <h3 className="text-foreground text-2xl font-semibold mb-4">
              {t("principles.missionTitle")}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {t("principles.missionText")}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
            <Eye className="text-foreground mb-6" size={28} />

            <h3 className="text-foreground text-2xl font-semibold mb-4">
              {t("principles.visionTitle")}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {t("principles.visionText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
