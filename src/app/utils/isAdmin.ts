import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

export const isAdmin = async (uid: string) => {
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists();
};
