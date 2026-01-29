export default function MissionSection() {
  return (
    <section className="w-full bg-black px-4 pt-20">
      <div className="max-w-6xl mx-auto bg-purple-700 rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
            We Offer Financial Strategies & Superior Services
          </h2>
          <p className="text-purple-100 text-sm md:text-base max-w-xl">
            Our mission is to provide quality guidance, build relationships of
            trust, and develop innovative solutions
          </p>
        </div>

        <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-purple-100 transition">
          Open Account
        </button>
      </div>
    </section>
  );
}
