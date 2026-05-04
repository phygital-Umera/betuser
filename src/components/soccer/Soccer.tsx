import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OddsValue {
  price: string;
  size: string;
}

interface MarketOdds {
  id: string;
  name: string;
  back: [OddsValue, OddsValue, OddsValue];
  lay: [OddsValue, OddsValue, OddsValue];
}

const MATCH_ODDS_DATA: MarketOdds[] = [
  {
    id: '1',
    name: 'Everton',
    back: [
      { price: '6.6', size: '1.6K' },
      { price: '6.8', size: '2.4K' },
      { price: '7.0', size: '1.3K' },
    ],
    lay: [
      { price: '7.2', size: '708.30' },
      { price: '7.4', size: '1.5K' },
      { price: '7.6', size: '4.2K' },
    ],
  },
  {
    id: '2',
    name: 'Man City',
    back: [
      { price: '1.51', size: '8.8K' },
      { price: '1.52', size: '13.5K' },
      { price: '1.53', size: '450.30' },
    ],
    lay: [
      { price: '1.54', size: '4.9K' },
      { price: '1.55', size: '14.1K' },
      { price: '1.56', size: '6.6K' },
    ],
  },
  {
    id: '3',
    name: 'The Draw',
    back: [
      { price: '4.6', size: '2.0K' },
      { price: '4.7', size: '2.6K' },
      { price: '4.8', size: '1.6K' },
    ],
    lay: [
      { price: '4.9', size: '1.0K' },
      { price: '5.0', size: '3.0K' },
      { price: '5.1', size: '3.7K' },
    ],
  },
];

const OVER_UNDER_05_DATA: MarketOdds[] = [
  {
    id: '1',
    name: 'Under 0.5 Goals',
    back: [
      { price: '19.5', size: '27.30' },
      { price: '20.0', size: '2.00' },
      { price: '21.0', size: '129.76' },
    ],
    lay: [
      { price: '22.0', size: '1.81' },
      { price: '23.0', size: '145.10' },
      { price: '24.0', size: '55.13' },
    ],
  },
  {
    id: '2',
    name: 'Over 0.5 Goals',
    back: [
      { price: '1.02', size: '15.6K' },
      { price: '1.03', size: '37.8K' },
      { price: '1.04', size: '49.3K' },
    ],
    lay: [
      { price: '1.05', size: '2.6K' },
      { price: '1.06', size: '18.0K' },
      { price: '1.07', size: '7.5K' },
    ],
  },
];

const OVER_UNDER_15_DATA: MarketOdds[] = [
  {
    id: '1',
    name: 'Under 1.5 Goals',
    back: [
      { price: '5.0', size: '287.51' },
      { price: '5.1', size: '845.17' },
      { price: '5.2', size: '117.58' },
    ],
    lay: [
      { price: '5.4', size: '420.81' },
      { price: '5.5', size: '52.39' },
      { price: '5.6', size: '1.0K' },
    ],
  },
  {
    id: '2',
    name: 'Over 1.5 Goals',
    back: [
      { price: '1.20', size: '1.2K' },
      { price: '1.21', size: '720.59' },
      { price: '1.22', size: '6.7K' },
    ],
    lay: [
      { price: '1.24', size: '860.08' },
      { price: '1.25', size: '4.2K' },
      { price: '1.26', size: '1.0K' },
    ],
  },
];

const OVER_UNDER_25_DATA: MarketOdds[] = [
  {
    id: '1',
    name: 'Under 2.5 Goals',
    back: [
      { price: '2.40', size: '111.52' },
      { price: '2.42', size: '233.61' },
      { price: '2.44', size: '8.35' },
    ],
    lay: [
      { price: '2.46', size: '39.95' },
      { price: '2.48', size: '764.45' },
      { price: '2.50', size: '706.64' },
    ],
  },
  {
    id: '2',
    name: 'Over 2.5 Goals',
    back: [
      { price: '1.67', size: '1.2K' },
      { price: '1.68', size: '610.68' },
      { price: '1.69', size: '23.18' },
    ],
    lay: [
      { price: '1.70', size: '116.54' },
      { price: '1.71', size: '299.66' },
      { price: '1.72', size: '709.75' },
    ],
  },
];

const BOTH_TEAMS_SCORE_DATA: MarketOdds[] = [
  {
    id: '1',
    name: 'Yes',
    back: [
      { price: '1.80', size: '5.2K' },
      { price: '1.81', size: '3.4K' },
      { price: '1.82', size: '2.1K' },
    ],
    lay: [
      { price: '1.83', size: '1.8K' },
      { price: '1.84', size: '4.2K' },
      { price: '1.85', size: '3.9K' },
    ],
  },
  {
    id: '2',
    name: 'No',
    back: [
      { price: '2.05', size: '3.8K' },
      { price: '2.06', size: '2.4K' },
      { price: '2.07', size: '1.5K' },
    ],
    lay: [
      { price: '2.08', size: '1.2K' },
      { price: '2.09', size: '2.8K' },
      { price: '2.10', size: '3.1K' },
    ],
  },
];

export default function Soccer() {
  const [isMatchOddsOpen, setIsMatchOddsOpen] = useState(true);
  const [isOverUnder05Open, setIsOverUnder05Open] = useState(true);
  const [isOverUnder15Open, setIsOverUnder15Open] = useState(true);
  const [isOverUnder25Open, setIsOverUnder25Open] = useState(true);
  const [isBothTeamsScoreOpen, setIsBothTeamsScoreOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333]">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#2C110C] px-4 py-2 text-sm font-semibold text-white gap-2">
        <div className="flex items-center gap-2">
          <span>Everton v Man City - English Premier League</span>
        </div>
        <div className="flex items-center gap-4">
          <span>05/05/2026 00:30</span>
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
              <motion.div
                animate={{rotate: isMatchOddsOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
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
                    {MATCH_ODDS_DATA.map((team) => (
                      <div
                        key={team.id}
                        className="hover:bg-gray-50 flex items-stretch transition-colors"
                      >
                        <div className="flex flex-1 items-center px-4 py-3 text-sm font-bold">
                          {team.name}
                        </div>
                        <div className="flex">
                          <div className="flex w-[180px] md:w-[240px]">
                            {/* Back Column */}
                            <div className="flex flex-1 gap-[2px] p-[2px]">
                              {team.back.map((odds, idx) => (
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
                              {team.lay.map((odds, idx) => (
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

          {/* Market Section: Over/Under 0.5 Goals */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsOverUnder05Open(!isOverUnder05Open)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Over/Under 0.5 Goals
              </h2>
              <motion.div
                animate={{rotate: isOverUnder05Open ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isOverUnder05Open && (
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
                    {OVER_UNDER_05_DATA.map((market) => (
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

          {/* Market Section: Over/Under 1.5 Goals */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsOverUnder15Open(!isOverUnder15Open)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Over/Under 1.5 Goals
              </h2>
              <motion.div
                animate={{rotate: isOverUnder15Open ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isOverUnder15Open && (
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
                    {OVER_UNDER_15_DATA.map((market) => (
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

          {/* Market Section: Over/Under 2.5 Goals */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsOverUnder25Open(!isOverUnder25Open)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Over/Under 2.5 Goals
              </h2>
              <motion.div
                animate={{rotate: isOverUnder25Open ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isOverUnder25Open && (
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
                    {OVER_UNDER_25_DATA.map((market) => (
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

          {/* Market Section: Both Teams to Score */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsBothTeamsScoreOpen(!isBothTeamsScoreOpen)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Both Teams to Score
              </h2>
              <motion.div
                animate={{rotate: isBothTeamsScoreOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isBothTeamsScoreOpen && (
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
                    {BOTH_TEAMS_SCORE_DATA.map((market) => (
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
              Place your bets on the soccer match outcome. Back (Blue) means you think it
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