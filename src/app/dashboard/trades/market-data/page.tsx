"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export default function MarketDataPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (error) {
        console.error("Market fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="bg-[#0b0b0b] border border-neutral-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800">
          <h2 className="text-white font-semibold text-lg">
            Market Data
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#111] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left">Asset</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">24h Change</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-b border-neutral-800 hover:bg-[#121212]"
                >
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img src={coin.image} className="w-7 h-7" />
                    <div>
                      <p className="text-white font-medium uppercase">
                        {coin.symbol}
                      </p>
                      <p className="text-xs text-gray-500">
                        {coin.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-white">
                    ${coin.current_price.toLocaleString()}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-400">
                      Crypto
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right text-gray-500">
                    {new Date(coin.last_updated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-neutral-800">
          {coins.map((coin) => (
            <div key={coin.id} className="p-4 flex justify-between">
              <div className="flex gap-3">
                <img src={coin.image} className="w-8 h-8" />
                <div>
                  <p className="text-white uppercase font-medium">
                    {coin.symbol}
                  </p>
                  <p className="text-xs text-gray-500">{coin.name}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded text-xs bg-orange-500/20 text-orange-400">
                    Crypto
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-medium">
                  ${coin.current_price.toLocaleString()}
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                    coin.price_change_percentage_24h >= 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="p-6 text-center text-gray-500">
            Loading market data...
          </div>
        )}
      </div>
    </div>
  );
}
