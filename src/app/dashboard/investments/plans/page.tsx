"use client";

import { useState } from "react";
import InvestModal from "@/app/components/invest/InvestModal";
import { useAuth } from "@/context/AuthContext";
import PlanCard from "@/app/components/invest/PlanCard";

export default function InvestmentPlansPage() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { currentUser } = useAuth();

  const plans = [
    {
      title: "Student Plan",
      duration: "5 Days",
      interest: "2%",
      limit: "$100 - $4,999",
      returnText: "10% + capital",
    },
    {
      title: "Professional Plan",
      duration: "5 Days",
      interest: "3%",
      limit: "$5,000 - $14,999",
      returnText: "15% + capital",
      recommended: true,
    },
    {
      title: "Gold Plan",
      duration: "7 Days",
      interest: "3.5%",
      limit: "$15,000 - $49,999",
      returnText: "24.5% + capital",
    },
    {
      title: "Real Estate Plan",
      duration: "1 Month",
      interest: "28%",
      limit: "$50,000 - $500,000",
      returnText: "28% + capital",
      note: "For Enterprise and Large Investors",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">
          Enhancing Capital through Binary Investments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.slice(0, 3).map((plan) => (
            <PlanCard
              key={plan.title}
              plan={plan}
              onInvest={() => {
                setSelectedPlan(plan);
                setOpen(true);
              }}
            />
          ))}
        </div>

        <div className="max-w-md">
          <PlanCard
            plan={plans[3]}
            onInvest={() => {
              setSelectedPlan(plans[3]);
              setOpen(true);
            }}
          />
        </div>
      </div>

      {selectedPlan && currentUser && (
        <InvestModal
          open={open}
          onClose={() => setOpen(false)}
          plan={selectedPlan}
          userId={currentUser.uid}
        />
      )}
    </>
  );
}
