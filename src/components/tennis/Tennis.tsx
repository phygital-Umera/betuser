import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OddsValue {
  price: string;
  size: string;
}

interface TennisOdds {
  id: string;
  name: string;
  back: [OddsValue, OddsValue, OddsValue];
  lay: [OddsValue, OddsValue, OddsValue];
}

const MATCH_ODDS_DATA: TennisOdds[] = [
  {
    id: '1',
    name: 'Katherine Sebov',
    back: [
      { price: '1.29', size: '276.83' },
      { price: '1.30', size: '279.83' },
      { price: '1.31', size: '5.95' },
    ],
    lay: [
      { price: '1.46', size: '10.85' },
      { price: '1.47', size: '76.74' },
      { price: '1.48', size: '28.49' },
    ],
  },
  {
    id: '2',
    name: 'Dalila Jakupovic',
    back: [
      { price: '3.10', size: '13.60' },
      { price: '3.15', size: '35.81' },
      { price: '3.20', size: '4.95' },
    ],
    lay: [
      { price: '4.30', size: '1.81' },
      { price: '4.40', size: '82.68' },
      { price: '4.50', size: '79.36' },
    ],
  },
];

const SET_BETTING_DATA: TennisOdds[] = [
  {
    id: '1',
    name: 'Katherine Sebov to win 1st Set',
    back: [
      { price: '1.85', size: '124.50' },
      { price: '1.86', size: '98.30' },
      { price: '1.87', size: '45.20' },
    ],
    lay: [
      { price: '1.88', size: '67.80' },
      { price: '1.89', size: '112.40' },
      { price: '1.90', size: '89.30' },
    ],
  },
  {
    id: '2',
    name: 'Dalila Jakupovic to win 1st Set',
    back: [
      { price: '2.10', size: '87.60' },
      { price: '2.11', size: '54.20' },
      { price: '2.12', size: '32.10' },
    ],
    lay: [
      { price: '2.13', size: '45.80' },
      { price: '2.14', size: '78.90' },
      { price: '2.15', size: '92.40' },
    ],
  },
];

export default function Tennis() {
  const [isMatchOddsOpen, setIsMatchOddsOpen] = useState(true);
  const [isSetBettingOpen, setIsSetBettingOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333]">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#2C110C] px-4 py-2 text-sm font-semibold text-white gap-2">
        <div className="flex items-center gap-2">
          <span>Kat Sebov v Jakupovic - WTA Istanbul 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span>04/05/2026 12:30</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
        {/* Main Content Area */}
        <main className="flex-1 space-y-4">
          {/* Market Section: Match Odds */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsMatchOddsOpen(!isMatchOddsOpen)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Match Odds
              </h2>
              <div className="flex items-center gap-2">
                <button className="bg-black text-green-400 px-3 py-0.5 rounded text-[10px] font-bold hover:bg-gray-800 transition-colors">
                  Cash Out
                </button>
                <motion.div
                  animate={{rotate: isMatchOddsOpen ? 0 : 180}}
                  transition={{duration: 0.2}}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </header>

            <AnimatePresence>
              {isMatchOddsOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="text-gray-500 flex items-center justify-between border-b bg-[#F8F9FA] px-4 py-1 text-[10px] font-medium">
                    <div>Min 100.00 | Max: 10000.00</div>
                    <div className="flex gap-1 md:gap-0">
                      <div className="flex w-[180px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center text-white">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center text-white">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-gray-100 divide-y">
                    {MATCH_ODDS_DATA.map((player) => (
                      <div
                        key={player.id}
                        className="hover:bg-gray-50 flex items-stretch transition-colors"
                      >
                        <div className="flex flex-1 items-center px-4 py-3 text-sm font-bold">
                          {player.name}
                        </div>
                        <div className="flex">
                          <div className="flex w-[180px] md:w-[240px]">
                            {/* Back Column */}
                            <div className="flex flex-1 gap-[2px] p-[2px]">
                              {player.back.map((odds, idx) => (
                                <button
                                  key={`back-${idx}`}
                                  className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 2 ? 'bg-[#72BBF4]' : 'bg-[#E0F0FE]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] leading-tight">
                                    {odds.size}
                                  </span>
                                </button>
                              ))}
                            </div>
                            {/* Lay Column */}
                            <div className="flex flex-1 gap-[2px] p-[2px]">
                              {player.lay.map((odds, idx) => (
                                <button
                                  key={`lay-${idx}`}
                                  className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 0 ? 'bg-[#FAA9BA]' : 'bg-[#FEEBF0]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] leading-tight">
                                    {odds.size}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Market Section: Set Betting */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsSetBettingOpen(!isSetBettingOpen)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Set Betting
              </h2>
              <motion.div
                animate={{rotate: isSetBettingOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isSetBettingOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="text-gray-500 flex items-center justify-between border-b bg-[#F8F9FA] px-4 py-1 text-[10px] font-medium">
                    <div>Min 100.00 | Max: 10000.00</div>
                    <div className="flex gap-1 md:gap-0">
                      <div className="flex w-[180px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center text-white">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center text-white">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-gray-100 divide-y">
                    {SET_BETTING_DATA.map((market) => (
                      <div
                        key={market.id}
                        className="hover:bg-gray-50 flex items-stretch transition-colors"
                      >
                        <div className="flex flex-1 items-center px-4 py-3 text-sm font-bold">
                          {market.name}
                        </div>
                        <div className="flex">
                          <div className="flex w-[180px] md:w-[240px]">
                            <div className="flex flex-1 gap-[2px] p-[2px]">
                              {market.back.map((odds, idx) => (
                                <button
                                  key={`back-${idx}`}
                                  className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 2 ? 'bg-[#72BBF4]' : 'bg-[#E0F0FE]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] leading-tight">
                                    {odds.size}
                                  </span>
                                </button>
                              ))}
                            </div>
                            <div className="flex flex-1 gap-[2px] p-[2px]">
                              {market.lay.map((odds, idx) => (
                                <button
                                  key={`lay-${idx}`}
                                  className={`flex min-h-[44px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 0 ? 'bg-[#FAA9BA]' : 'bg-[#FEEBF0]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] leading-tight">
                                    {odds.size}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Info Message */}
          <div className="bg-white rounded border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] md:text-xs">
              <Info size={14} />
              <span>WRONG TRADE BETS ONLY PROFIT BETS VOID HOGI</span>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full space-y-4 lg:w-[320px]">
          <div className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header className="bg-[#ED6B31] px-4 py-2 text-white">
              <h2 className="text-base font-bold uppercase tracking-tight">
                Matched Bet
              </h2>
            </header>
            <div className="text-gray-600 p-12 text-center text-lg">
              No open bets
            </div>
          </div>

          {/* Quick Help/Info card */}
          <div className="border-gray-200 rounded border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-[#ED6B31]">
              <Info size={18} />
              <h3 className="font-bold">Rules & Info</h3>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              Place your bets on the tennis match outcome. Back (Blue) means you think it
              will happen. Lay (Pink) means you think it won't. Odd values are
              updated periodically based on market liquidity.
            </p>
          </div>
        </aside>
      </div>

      {/* Basic Mobile Navigation if needed */}
      <footer className="h-12 lg:hidden"></footer>
    </div>
  );
}