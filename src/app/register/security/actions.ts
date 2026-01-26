// src/app/register/security/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function createTradingAccount(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const captcha = formData.get("captcha") as string;
  const accepted = formData.get("terms");

  // ✅ Basic validation
  if (!password || !confirmPassword) {
    throw new Error("Password is required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (captcha !== "4258AB") {
    throw new Error("Invalid security code");
  }

  if (!accepted) {
    throw new Error("You must accept the terms");
  }

  /**
   * 🔐 PLACE FIREBASE / DB LOGIC HERE
   * createUserWithEmailAndPassword(auth, email, password)
   * save user record
   */

  // ✅ Redirect after success
  redirect("/dashboard");
}
