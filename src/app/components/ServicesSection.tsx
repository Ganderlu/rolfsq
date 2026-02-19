"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    title: "Real State",
    image: "/images/real.jpg",
  },
  {
    title: "Gold",
    image: "/images/gold.webp",
  },
  {
    title: "Cannabis",
    image: "/images/cannabis.webp",
  },
  {
    title: "Forex",
    image: "/images/fforex.jpg",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-12">
          {t("services.heading")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-lg border border-border"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-4">
                <span className="text-white font-semibold text-sm md:text-base">
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
