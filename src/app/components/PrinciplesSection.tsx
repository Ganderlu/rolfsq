import { Target, Eye } from "lucide-react";

export default function PrinciplesSection() {
  return (
    <section className="w-full bg-background py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-foreground text-4xl md:text-5xl font-semibold mb-6">
          OUR PRINCIPLES
        </h2>

        <span className="inline-block text-xs md:text-sm text-emerald-500 border border-emerald-500/40 rounded-full px-4 py-2 mb-16">
          TRANSPARENCY · INTEGRITY · PERFORMANCE · COLLABORATION · SUPPORT
        </span>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Mission */}
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
            <Target className="text-foreground mb-6" size={28} />

            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Our Mission
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              To be the best partner for skilled investors worldwide. We
              understand that access to resources can be the biggest barrier to
              success in the investment industry. At OFL (Prime Max Capital),
              we offer diverse investment options, including forex, gold,
              cannabis, and real estate, so you can choose the solutions that
              best fit your goals.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
            <Eye className="text-foreground mb-6" size={28} />

            <h3 className="text-foreground text-2xl font-semibold mb-4">
              Our Vision
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              To be a leading force in investment innovation, constantly pushing
              the boundaries of what’s possible in financial markets. We’re
              building a global community of investors, providing the tools,
              resources, and support needed to achieve success. At OFL, we’re
              creating a space where every investor can thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
