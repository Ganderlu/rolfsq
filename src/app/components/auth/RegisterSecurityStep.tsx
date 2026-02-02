"use client";

import { ShieldCheck, MapPin, User } from "lucide-react";
import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { completeRegistration } from "../../../app/register/actions";

export default function RegisterSecurityStep() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  if (!rid) {
    return <p className="text-red-500 text-center">Invalid session</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        action={completeRegistration}
        className="w-full max-w-[420px] rounded-2xl bg-card border border-border p-6 space-y-4"
      >
        {/* REQUIRED */}
        <input type="hidden" name="rid" value={rid} />

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-foreground">Join ROLFSQ</h1>
          <p className="text-sm text-muted-foreground">Secure your trading account</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-6">
          <Lead icon={<User size={16} />} label="Personal Info" active />
          <Lead icon={<MapPin size={16} />} label="Location" active />
          <Lead icon={<ShieldCheck size={16} />} label="Security" active />
        </div>

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Create strong password"
          className="w-full rounded-lg bg-background border border-input px-3 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="w-full rounded-lg bg-background border border-input px-3 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          required
        />

        {/* Terms */}
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
          <label className="flex gap-2 text-sm text-foreground/90 cursor-pointer">
            <input type="checkbox" name="terms" required className="mt-1" />
            <span>
              I agree to the{" "}
              <span className="text-primary hover:underline">Terms and Conditions</span>
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <a
            href={`/register/location?rid=${rid}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Previous Step
          </a>

          <button
            type="submit"
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-6 py-2.5 transition-colors shadow-lg shadow-primary/20"
          >
            Create Trading Account
          </button>
        </div>
      </form>
    </div>
  );
}

function Lead({
  icon,
  label,
  active,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center ${
          active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <span className={`text-[10px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}
