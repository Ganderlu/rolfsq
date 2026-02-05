"use server";

import { adminDb } from "../firebase/firebaseAdmin";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  await adminDb.collection("contacts").add({
    name,
    email,
    subject: subject || "No Subject",
    message,
    status: "new",
    createdAt: new Date(),
  });

  return { success: true };
}
