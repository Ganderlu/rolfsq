import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

console.log("🔥 [Firebase Admin] Env Check:");
console.log("   Service Account →", serviceAccount ? "✅ LOADED" : "❌ MISSING");

const adminApp =
  serviceAccount && getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0] || null;

export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;

if (adminApp) {
  console.log("✅ Firebase Admin SDK Initialized Successfully");
} else {
  console.error("❌ Firebase Admin failed to initialize");
}