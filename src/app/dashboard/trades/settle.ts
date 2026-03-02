"use server";

import { adminDb } from "../../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function settleTrade(tradeId: string, closePrice: number) {
  if (!adminDb) {
    throw new Error(
      "Firebase Admin not initialized. Check .env.local and restart the server.",
    );
  }

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

    // 💰 REFERRAL COMMISSION ON PROFITS (Live mode only)
    if (trade.mode === "live" && trade.uid) {
      const userSnap = await userRef.get();
      const userData = userSnap.data();
      
      if (userData?.referredBy) {
        const commissionRate = 0.02; // 2% commission on trade profits
        const commissionAmount = profit * commissionRate;

        if (commissionAmount > 0) {
          // Update Referrer Balance
          await adminDb.doc(`users/${userData.referredBy}`).update({
            usdtBalance: FieldValue.increment(commissionAmount)
          });

          // Log Reward Transaction
          await adminDb.collection("referralRewards").add({
            userId: userData.referredBy,
            referredUserId: trade.uid,
            referredUserEmail: userData.email || "",
            amount: commissionAmount,
            type: "trade_commission",
            tradeId: tradeId,
            profitAmount: profit,
            timestamp: new Date()
          });
        }
      }
    }
  }

  await tradeRef.update({
    closePrice,
    status: won ? "won" : "lost",
  });
}
