"use client";

export default function PlanCard({
  plan,
  onInvest,
}: {
  plan: any;
  onInvest: () => void;
}) {
  return (
    <div className="relative rounded-2xl border border-neutral-700 bg-gradient-to-br from-black to-neutral-900 p-6 shadow-lg">
      {plan.recommended && (
        <span className="absolute top-3 right-3 text-xs bg-orange-500 text-black px-2 py-1 rounded-full">
          RECOMMEND
        </span>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-orange-500 font-semibold">{plan.title}</h3>
        <span className="text-sm">{plan.duration}</span>
      </div>

      <p className="text-sm mb-4">Interest Rate: {plan.interest}</p>

      <hr className="border-neutral-700 mb-4" />

      <p className="text-sm mb-2">
        Investment amount limit : <b>{plan.limit}</b>
      </p>

      {plan.note && (
        <p className="text-xs text-neutral-400 mb-2">{plan.note}</p>
      )}

      <p className="text-sm mb-6">
        Total Return : <b>{plan.returnText}</b>
      </p>

      <button
        onClick={onInvest}
        className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 py-2 text-sm"
      >
        Invest Now
      </button>
    </div>
  );
}
