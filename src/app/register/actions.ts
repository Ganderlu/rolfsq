
// "use server";

// import { redirect } from "next/navigation";
// import { adminAuth, adminDb } from "../firebase/firebaseAdmin";

// /* =========================
//    STEP 1 — PERSONAL INFO
// ========================= */
// export async function saveStep1(formData: FormData) {
//   const username = formData.get("username") as string;
//   const fullName = formData.get("fullName") as string;
//   const email = formData.get("email") as string;
//   const phone = formData.get("phone") as string;

//   if (!username || !fullName || !email) {
//     throw new Error("Missing required fields");
//   }

//   const ref = adminDb.collection("registrations").doc();

//   await ref.set({
//     step1: {
//       username,
//       fullName,
//       email,
//       phone,
//     },
//     step: 1,
//     createdAt: new Date(),
//   });

//   redirect(`/register/location?rid=${ref.id}`);
// }

// /* =========================
//    STEP 2 — LOCATION
// ========================= */
// export async function saveStep2(formData: FormData) {
//   const rid = formData.get("rid") as string;
//   const country = formData.get("country") as string;

//   if (!rid || !country) {
//     throw new Error("Invalid registration session");
//   }

//   const ref = adminDb.collection("registrations").doc(rid);

//   await ref.update({
//     step2: { country },
//     step: 2,
//   });

//   redirect(`/register/security?rid=${rid}`);
// }

// /* =========================
//    STEP 3 — SECURITY
// ========================= */
// export async function completeRegistration(formData: FormData) {
//   const rid = formData.get("rid") as string;
//   const password = formData.get("password") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;
//   const pin = formData.get("pin") as string;
//   const enable2FA = formData.get("enable2FA") === "on";

//   if (!rid) throw new Error("Missing registration ID");
//   if (password !== confirmPassword) throw new Error("Passwords do not match");
//   if (password.length < 8) throw new Error("Password must be at least 8 characters");

//   const ref = adminDb.collection("registrations").doc(rid);
//   const snap = await ref.get();

//   if (!snap.exists) {
//     throw new Error("Registration not found");
//   }

//   const data = snap.data()!;

//   // 🔐 CREATE AUTH USER
//   const userRecord = await adminAuth.createUser({
//     email: data.step1.email,
//     password,
//     displayName: data.step1.fullName,
//   });

//   // 👤 CREATE USER PROFILE
//   await adminDb.collection("users").doc(userRecord.uid).set({
//     uid: userRecord.uid,
//     email: data.step1.email,
//     username: data.step1.username,
//     fullName: data.step1.fullName,
//     phone: data.step1.phone,
//     country: data.step2.country,
//     pinHash: pin, // hash later
//     enable2FA,
//     role: "user",
//     createdAt: new Date(),
//   });

//   // 🧹 CLEANUP
//   await ref.delete();

//   redirect("/dashboard");
// }

"use server";


import { db } from "../lib/firebaseAdmin";
import { redirect } from "next/navigation";
// import { getAuth } from "firebase-admin/auth";
import { adminAuth, adminDb } from "../firebase/firebaseAdmin";
// import { doc, getDoc, setDoc, deleteDoc } from "firebase-admin/firestore";

/* =========================
   STEP 1 — PERSONAL INFO
========================= */
export async function saveStep1(formData: FormData) {
  const data = {
    username: formData.get("username"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    step: 1,
    createdAt: new Date(),
  };

  const docRef = await db.collection("registration_steps").add(data);

  redirect(`/register/location?rid=${docRef.id}`);
}

/* =========================
   STEP 2 — LOCATION
========================= */
export async function saveStep2(formData: FormData) {
  const registrationId = formData.get("rid") as string;

  if (!registrationId) {
    throw new Error("Registration ID missing");
  }

  await db
    .collection("registration_steps")
    .doc(registrationId)
    .update({
      country: formData.get("country"),
      step: 2,
    });

  redirect(`/register/security?rid=${registrationId}`);
}

/* =========================
   STEP 3 — COMPLETE REGISTRATION
========================= */

export async function completeRegistration(formData: FormData) {
  const rid = formData.get("rid") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms");

  // 🛑 VALIDATIONS
  if (!rid) throw new Error("Invalid registration session");
  if (!terms) throw new Error("You must accept the terms");
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // 🔹 FETCH TEMP REGISTRATION DATA
  const ref = adminDb.collection("registration_steps").doc(rid);
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Registration not found");
  }

  const data = snapshot.data() as {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
  };

  // 🔐 CREATE AUTH USER (ADMIN SDK)
  const user = await adminAuth.createUser({
    email: data.email,
    password,
    displayName: data.fullName,
  });

  // 👤 CREATE USER PROFILE
  await adminDb.collection("users").doc(user.uid).set({
    uid: user.uid,
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    country: data.country,
    balance: 0,
    role: "user",
    createdAt: new Date(),
  });

  // 🧹 CLEAN TEMP REGISTRATION DATA
  await ref.delete();

  // 🚀 REDIRECT TO DASHBOARD
  redirect("/dashboard");
}


// export async function completeRegistration(formData: FormData) {
//   const rid = formData.get("rid") as string;
//   const password = formData.get("password") as string;

//   if (!rid || !password) {
//     throw new Error("Missing registration data");
//   }

//   const snap = await adminDb.collection("registration_steps").doc(rid).get();

//   if (!snap.exists) {
//     throw new Error("Registration not found");
//   }

//   const data = snap.data()!;

//   // 🔐 CREATE AUTH USER (ADMIN SDK — CORRECT)
//   const user = await adminAuth.createUser({
//     email: data.email,
//     password,
//     displayName: data.fullName,
//   });

//   // 👤 SAVE USER PROFILE
//   await adminDb.collection("users").doc(user.uid).set({
//     uid: user.uid,
//     username: data.username,
//     fullName: data.fullName,
//     email: data.email,
//     phone: data.phone,
//     country: data.country,
//     role: "user",
//     createdAt: new Date(),
//   });

//   // 🧹 CLEAN TEMP DATA
//   await adminDb.collection("registration_steps").doc(rid).delete();

//   redirect("/dashboard");
// }

// export async function completeRegistration(formData: FormData) {
//   const registrationId = formData.get("rid") as string;
//   const password = formData.get("password") as string;

//   if (!registrationId || !password) {
//     throw new Error("Missing data");
//   }

//   const snap = await db
//     .collection("registration_steps")
//     .doc(registrationId)
//     .get();

//   if (!snap.exists) {
//     throw new Error("Invalid registration session");
//   }

//   const data = snap.data()!;

//   const user = await adminAuth.createUser({
//     email: data.email,
//     password,
//     displayName: data.fullName,
//   });

//   // 💾 Save final user profile
//   await db.collection("users").doc(user.uid).set({
//     uid: user.uid,
//     username: data.username,
//     fullName: data.fullName,
//     email: data.email,
//     phone: data.phone,
//     country: data.country,
//     createdAt: new Date(),
//   });

//   // 🧹 Cleanup temp data
//   await db.collection("registration_steps").doc(registrationId).delete();

//   redirect("/dashboard");
// }

// export async function createTradingAccount(formData: FormData) {
//   const rid = formData.get("rid") as string;
//   const password = formData.get("password") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;
//   const terms = formData.get("terms");

//   if (!rid) throw new Error("Missing registration ID");
//   if (!terms) throw new Error("You must accept the terms");
//   if (password !== confirmPassword) {
//     throw new Error("Passwords do not match");
//   }
//   if (password.length < 8) {
//     throw new Error("Password must be at least 8 characters");
//   }

//   // 🔹 Get saved Step 1 + Step 2 data
//   const docRef = db.collection("registrations").doc(rid);
//   const snapshot = await docRef.get();

//   if (!snapshot.exists) {
//     throw new Error("Registration not found");
//   }

//   const data = snapshot.data();

//  // 🔐 CREATE AUTH USER (ADMIN SDK — CORRECT)
//   const user = await adminAuth.createUser({
//     email: data.email,
//     password,
//     displayName: data.fullName,
//   });

//   // 📦 Save final user profile
//   await db.collection("users").doc(user.uid).set({
//     uid: user.uid,
//     username: data?.username,
//     fullName: data?.fullName,
//     email: data?.email,
//     phone: data?.phone,
//     country: data?.country,
//     createdAt: new Date(),
//   });

//   // 🧹 Cleanup temp registration
//   await docRef.delete();

//   redirect("/dashboard");
// }

// export async function completeRegistration(
//   email: string,
//   password: string,
//   pin: string,
//   enable2FA: boolean
// ) {
//   const ref = adminDb.doc(`registrations/${email}`);
//   const snapshot = await ref.get();

//   if (!snapshot.exists) {
//     throw new Error("Registration not found");
//   }

//   const data = snapshot.data();

//   // 🔐 CREATE AUTH USER (ADMIN SDK)
//   const userRecord = await adminAuth.createUser({
//     email,
//     password,
//     emailVerified: false,
//   });

//   // 👤 CREATE USER PROFILE
//   await adminDb.doc(`users/${userRecord.uid}`).set({
//     email,
//     username: data.step1.username,
//     fullName: data.step1.fullName,
//     country: data.step2.country,
//     pinHash: pin, // hash later
//     enable2FA,
//     role: "user",
//     createdAt: new Date(),
//   });

//   // 🧹 CLEAN TEMP REGISTRATION
//   await ref.delete();

//   return { uid: userRecord.uid };
// }
