import { create } from "zustand";

interface MarketState {
  symbol: string;
  price: number;
  setSymbol: (symbol: string) => void;
  setPrice: (price: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  symbol: "BINANCE:BTCUSDT",
  price: 0,
  setSymbol: (symbol) => set({ symbol }),
  setPrice: (price) => set({ price }),
}));
