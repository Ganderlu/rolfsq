export default function MissionSection() {
  return (
    <section className="w-full bg-background px-4 pt-20">
      <div className="max-w-6xl mx-auto bg-primary rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <h2 className="text-primary-foreground text-xl md:text-2xl font-semibold mb-2">
            We Offer Financial Strategies & Superior Services
          </h2>
          <p className="text-primary-foreground/80 text-sm md:text-base max-w-xl">
            Our mission is to provide quality guidance, build relationships of
            trust, and develop innovative solutions
          </p>
        </div>

        <button className="bg-background text-foreground font-semibold px-6 py-3 rounded-full text-sm hover:bg-muted transition shadow-lg">
          Open Account
        </button>
      </div>
    </section>
  );
}
