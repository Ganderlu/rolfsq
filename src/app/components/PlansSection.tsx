const plans = [
  {
    name: "Student Plan",
    rate: "2% / Daily",
    price: "$100/$4,999",
    features: [
      "Access to a real-time dashboard",
      "Standard customer support (response within 24 hours)",
      "Free training on the basics of investing",
      "Loyalty bonus: +3% yield after 5 days",
      "Referral program: 5% bonus on referrals’ investments",
    ],
  },
  {
    name: "Professional Plan",
    rate: "3% / Daily",
    price: "$5,000/$14,999",
    features: [
      "All the benefits of the Starter Plan",
      "Priority customer support (response within 24 hours)",
      "Access to a monthly analysis of your portfolio",
      "Exclusive webinars with financial experts",
      "2% cashback on new deposits",
      "Loyalty bonus: +5% yield after 7 days",
      "Improved referral program: 5% bonus return",
    ],
  },
  {
    name: "Gold Plan",
    rate: "3.5% / Daily",
    price: "$15,000/$49,999",
    features: [
      "All the benefits of the Growth Plan",
      "Dedicated account manager",
      "Access to private investment opportunities",
      "Personalized wealth management coaching",
      "Invitation to exclusive events (networking, VIP conferences)",
      "5% cashback on new deposits",
      "Loyalty bonus: +10% return after 7 days",
      "VIP referral program: 5% bonus",
      "24-hour premium support",
    ],
  },
  {
    name: "Real Estate Plan",
    rate: "28% / Daily",
    price: "$50,000/$ and more",
    features: [
      "All the advantages of the Elite Plan",
      "Dedicated account manager",
      "Access to private real estate investment opportunities",
      "Personalized wealth management coaching",
      "Invitation to exclusive events",
      "5% cashback on new deposits",
      "Loyalty bonus: +5% return after 1 month",
      "VIP referral program",
      "24-hour premium support",
      "Investors earn 28% of their initial capital after one month of investing in real estate plan",
    ],
  },
];

export default function PlansSection() {
  return (
    <section className="w-full bg-background px-4 py-20 border-t border-border">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-3">
          The Right Plan for every Business
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          Discover flexible and transparent pricing options designed to meet the
          diverse needs of businesses, whether you’re a startup, small business,
          or enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-foreground text-lg font-semibold mb-2">
              {plan.name}
            </h3>

            <p className="text-primary font-semibold text-sm mb-1">
              {plan.rate}
            </p>

            <p className="text-foreground text-sm mb-4">{plan.price}</p>

            <button className="bg-primary hover:bg-primary/90 transition text-primary-foreground text-sm font-semibold py-2 rounded-lg mb-2">
              Apply for this plan
            </button>

            <p className="text-muted-foreground text-xs text-center mb-4">
              *No Credit Card required
            </p>

            <p className="text-white text-sm font-semibold mb-3">
              Benefits Included:
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-purple-500 mt-1">●</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
