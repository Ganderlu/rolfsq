import Image from "next/image";

export default function advisor() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT – IMAGE */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/adam.jpeg" // replace with your image path
            alt="Trading community event"
            width={900}
            height={900}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold tracking-wide text-emerald-500 uppercase mb-4">
            ONE OF OUR ADVISORS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            ADAM KHOO <br className="hidden md:block" /> FINANCIAL ADVISER
          </h2>

          {/* <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
            Become part of our community of traders and educators continually
            pushing for the best results in the markets. We believe supporting
            our traders, providing you with the resources and support you need
            to succeed.
          </p> */}

          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-8 py-4 rounded-lg shadow-md">
            Join Us Today
          </button>
        </div>
      </div>
    </section>
  );
}
