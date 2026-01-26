"use client";

import { ShieldCheck, MapPin, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { completeRegistration} from "../../../app/register/actions";

export default function RegisterSecurityStep() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  if (!rid) {
    return <p className="text-red-500 text-center">Invalid session</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B18] px-4">
      <form
        action={completeRegistration}
        className="w-full max-w-[420px] rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4"
      >
        {/* REQUIRED */}
        <input type="hidden" name="rid" value={rid} />

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-white">
            Join Prime Max Capital
          </h1>
          <p className="text-sm text-white/60">
            Secure your trading account
          </p>
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
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
          required
        />

        {/* Terms */}
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
          <label className="flex gap-2 text-xs text-white/80">
            <input type="checkbox" name="terms" required />
            <span>
              I agree to the{" "}
              <span className="text-indigo-400">
                Terms and Conditions
              </span>
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <a
            href={`/register/location?rid=${rid}`}
            className="text-xs text-white/60 hover:text-white"
          >
            ← Previous Step
          </a>

          <button
            type="submit"
            className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2"
          >
            Create Trading Account
          </button>
        </div>
      </form>
    </div>
  );
}

function Lead({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center ${
          active ? "bg-emerald-500 text-black" : "bg-white/10 text-white/60"
        }`}
      >
        {icon}
      </div>
      <span className="text-[10px] text-white/60">{label}</span>
    </div>
  );
}


