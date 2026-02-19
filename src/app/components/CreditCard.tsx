import Image from "next/image";

export default function CreditCard() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT – IMAGE */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/credit.png" // replace with your image path
            alt="Credit Card"
            width={900}
            height={700}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold tracking-wide text-emerald-500 uppercase mb-4">
            Benefits
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            Noble Vest Card
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
            This partnership aims to fill a gap in the traditional financial
            system that has left many without access to essential banking
            products. According to a 2017 survey by the FDIC, 25 percent of U.S
            and UK households are unbanked or underbanked, while global numbers
            have reached a staggering 1.7 billion, according to data released by
            the World Bank. Through our Card, Noble Vest investors can have a
            virtual card issued to them while a physical card is mailed to them.
            The card has a minimum of $2,000 balance needed. It can be used at
            over 45 million merchants and ATMs – anywhere in the world where
            major credit cards are accepted.
          </p>

          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-8 py-4 rounded-lg shadow-md">
            Request Card
          </button>
        </div>
      </div>
    </section>
  );
}
