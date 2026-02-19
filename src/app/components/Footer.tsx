import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border text-muted-foreground px-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* LEFT – LOGO + DESCRIPTION */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/nature3.jpg" // replace with your logo
                alt="Noble Vest"
                width={48}
                height={48}
              />
              <h2 className="text-2xl text-primary font-bold">Noble Vest</h2>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-md text-foreground">
              We are everything a traditional financial institution is not. We
              set out to give investors better, simpler and more profitable ways
              to become financially successful and secure.
            </p>

            <h4 className="text-foreground font-semibold mb-2">
              General Risk Disclaimer
            </h4>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Nothing on this website or in our services constitutes a
              solicitation, advice, endorsement, or offer to buy or sell
              financial instruments by Noble Vest GROUP, its agents, employees,
              contractors, or affiliated entities. You are solely responsible
              for evaluating the benefits and risks of using any information or
              content on this website. All investments carry substantial risk,
              and investment decisions are solely your responsibility.
              Information on the website is provided “as is,” without guarantees
              of completeness, accuracy, timeliness, or results.
            </p>
          </div>

          {/* MIDDLE – SOCIAL LINKS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-foreground font-semibold mb-4">
                Social Links
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Company PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Get Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-4 opacity-0 md:opacity-100">
                Links
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Certification
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BROKERAGE SERVICES */}
        <div className="mb-12">
          <h4 className="text-foreground font-semibold mb-2">
            Brokerage Services
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-5xl">
            Our brokerage services include margin-based products, which carry
            the risk of losing your initial deposit. Before trading, consider
            your investment objectives, risk tolerance, and experience level.
            Trading with high leverage can result in significant gains or
            losses. Margin products may not suit all investors, and you should
            fully understand the risks involved. Seek independent financial
            advice if necessary.
          </p>
        </div>

        {/* REGULATORY LOGOS */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
          <div className="flex items-center gap-4">
            <Image
              src="/images/financial.png"
              alt="Financial Commission"
              width={48}
              height={48}
            />
            <p className="text-xs text-gray-400 max-w-md">
              Noble Vest is a member of The Financial Commission, an
              international organization engaged in the resolution of disputes
              within the financial services industry in the Forex market.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src="/images/exchange.png"
              alt="SEC"
              width={48}
              height={48}
            />
            <p className="text-xs text-gray-400 max-w-md">
              Noble Vest is regulated by the UK/US Securities and Exchange
              Commission. Investing involves risk and may result in loss.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>© 2025 Noble Vest. All Rights Reserved.</span>

          <div className="flex gap-4">
            <Link href="#">About</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Buy Digital Currency</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
