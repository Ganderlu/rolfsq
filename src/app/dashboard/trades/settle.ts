"use server";

import { adminDb } from "../../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function settleTrade(tradeId: string, closePrice: number) {
  const tradeRef = adminDb.doc(`trades/${tradeId}`);
  const tradeSnap = await tradeRef.get();
  const trade = tradeSnap.data();

  if (!trade) return;
  if (trade.status !== "open") return;

  const won =
    (trade.direction === "call" && closePrice > trade.openPrice) ||
    (trade.direction === "put" && closePrice < trade.openPrice);

  const profit = won ? trade.amount * trade.payout : 0;

  const userRef = adminDb.doc(`users/${trade.uid}`);
  const balanceField = trade.mode === "demo" ? "balanceDemo" : "usdtBalance";

  if (won) {
    await userRef.update({
      [balanceField]: FieldValue.increment(trade.amount + profit),
    });
  }

  await tradeRef.update({
    closePrice,
    status: won ? "won" : "lost",
  });
}
