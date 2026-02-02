"use client";

export default function PlanCard({
  plan,
  onInvest,
}: {
  plan: any;
  onInvest: () => void;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 shadow-lg">
      {plan.recommended && (
        <span className="absolute top-3 right-3 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">
          RECOMMEND
        </span>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-primary font-semibold">{plan.title}</h3>
        <span className="text-sm text-muted-foreground">{plan.duration}</span>
      </div>

      <p className="text-sm text-foreground mb-4">Interest Rate: {plan.interest}</p>

      <hr className="border-border mb-4" />

      <p className="text-sm text-foreground mb-2">
        Investment amount limit : <b>{plan.limit}</b>
      </p>

      {plan.note && (
        <p className="text-xs text-muted-foreground mb-2">{plan.note}</p>
      )}

      <p className="text-sm text-foreground mb-6">
        Total Return : <b>{plan.returnText}</b>
      </p>

      <button
        onClick={onInvest}
        className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
      >
        Invest Now
      </button>
    </div>
  );
}
