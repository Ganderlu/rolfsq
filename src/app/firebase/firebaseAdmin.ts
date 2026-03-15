import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  // 1. Check for single JSON string (often used in local .env)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", e);
    }
  }

  // 2. Check for individual variables (highly recommended for production like Vercel)
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  }

  return null;
}

const serviceAccount = getServiceAccount();

console.log("🔥 [Firebase Admin] Initialization Check:");
if (!serviceAccount) {
  console.error("   ❌ Missing required Firebase Admin credentials!");
  console.log("   Required: FIREBASE_SERVICE_ACCOUNT (JSON) OR");
  console.log(
    "   Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY",
  );
} else {
  console.log("   ✅ Service Account credentials loaded");
}

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