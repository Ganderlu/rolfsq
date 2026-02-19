"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function advisor() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background py-16 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/adam.jpeg"
            alt="Trading community event"
            width={900}
            height={900}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase mb-4">
            {t("advisor.badge")}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            ADAM KHOO <br className="hidden md:block" /> FINANCIAL ADVISER
          </h2>

          <button className="bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-semibold px-8 py-4 rounded-lg shadow-md">
            {t("advisor.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}
