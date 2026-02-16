import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

console.log("🔥 Firebase Admin Env Check:");
console.log("   Project ID  →", projectId ? "✅ OK" : "❌ MISSING");
console.log("   Client Email →", clientEmail ? "✅ OK" : "❌ MISSING");
console.log("   Private Key  →", privateKey ? `✅ OK (${privateKey.length} chars)` : "❌ MISSING");

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Missing Firebase Admin environment variables!");
}

const adminApp = projectId && clientEmail && privateKey
  ? getApps().length === 0
    ? initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      })
    : getApps()[0]
  : null;

export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;

if (adminApp) {
  console.log("✅ Firebase Admin SDK Initialized Successfully");
} else {
  console.error("❌ Firebase Admin failed to initialize");
}