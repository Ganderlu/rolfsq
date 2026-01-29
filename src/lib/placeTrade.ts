import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db} from "../firebase/firebaseClient";

export async function placeTrade(trade: any) {
  return addDoc(collection(db, "trades"), {
    ...trade,
    status: "OPEN",
    createdAt: serverTimestamp(),
  });
}
