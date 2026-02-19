"use client";

import { saveStep1 } from "../../../app/register/actions";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress } from "@mui/material";

export default function RegisterPersonalInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await saveStep1(formData);
      if (res?.success) {
        router.push(`/register/location?rid=${res.id}`);
      } else {
        // @ts-ignore
        setError(res?.error || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-card shadow-2xl p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-foreground font-semibold tracking-wide">
              Noble Vest <span className="text-muted-foreground">INVEST</span>
            </span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-foreground mb-1">
          Join <span className="text-primary">Noble Vest</span>
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-5">
          Start your professional trading journey
        </p>

        {/* Community badge */}
        <div className="flex justify-center mb-6">
          <div className="rounded-lg border border-border bg-accent/50 px-4 py-2 text-xs text-primary">
            👥 1M+ Traders
            <br />
            <span className="text-muted-foreground">Community</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-6">
          <Step number={1} label="Personal Info" active sub="Basic details" />
          <Step number={2} label="Location" sub="Regional settings" />
          <Step number={3} label="Security" sub="Account protection" />
        </div>

        {/* Section header */}
        <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 mb-5 flex gap-3 items-center">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            👤
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Personal Information
            </p>
            <p className="text-xs text-muted-foreground">
              Create your trading profile
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert severity="error">{error}</Alert>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="username"
              label="Trading Username"
              placeholder="Choose username"
            />
            <Input
              name="fullName"
              label="Full Name"
              placeholder="Enter full name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="email"
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
            />
            <Input
              name="phone"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-muted-foreground">Step 1 of 3</span>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <CircularProgress size={16} color="inherit" />}
              {loading ? "Saving..." : "Continue →"}
            </button>
          </div>
        </form>

        {/* Sign in */}
        <p className="text-center text-xs text-muted-foreground mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Sign in here
          </Link>
        </p>

        {/* Security footer */}
        <div className="flex justify-center gap-4 text-[10px] text-muted-foreground mt-6">
          <span>🔒 SSL Secured</span>
          <span>🛡 256-bit Encryption</span>
          <span>🏛 Regulated Platform</span>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/60 mt-4">
          © 2026 Noble Vest Invest. All rights reserved. Licensed and regulated
          trading platform.
        </p>
      </div>
    </div>
  );
}

function Step({
  number,
  label,
  sub,
  active,
}: {
  number: number;
  label: string;
  sub: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}
      >
        {number}
      </div>
      <span className="text-[11px] text-foreground">{label}</span>
      <span className="text-[10px] text-muted-foreground">{sub}</span>
    </div>
  );
}

function Input({
  label,
  placeholder,
  name,
  type = "text",
}: {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-foreground">
        {label} <span className="text-destructive">*</span>
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
