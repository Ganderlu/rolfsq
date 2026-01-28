import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.warn("🔥 Firebase Admin env vars are missing");
}

const adminApp =
  projectId && clientEmail && privateKey
    ? (getApps().length === 0
        ? initializeApp({
            credential: cert({
              projectId,
              clientEmail,
              privateKey,
            }),
          })
        : getApps()[0])
    : null;

export const adminAuth = adminApp ? getAuth(adminApp) : ({} as any);
export const adminDb = adminApp ? getFirestore(adminApp) : ({} as any);
