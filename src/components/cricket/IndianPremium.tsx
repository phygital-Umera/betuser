import React, {useState} from 'react';
import {ChevronDown, ChevronUp, Search, Info} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

interface OddsValue {
  price: string;
  size: string;
}

interface TeamOdds {
  id: string;
  name: string;
  back: [OddsValue, OddsValue, OddsValue];
  lay: [OddsValue, OddsValue, OddsValue];
}

const TEAMS_DATA: TeamOdds[] = [
  {
    id: '1',
    name: 'Mumbai Indians',
    back: [
      {price: '2498', size: ''},
      {price: '2499', size: ''},
      {price: '2500', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '2',
    name: 'Royal Challengers Bengaluru',
    back: [
      {price: '318', size: ''},
      {price: '319', size: ''},
      {price: '320', size: ''},
    ],
    lay: [
      {price: '360', size: ''},
      {price: '361', size: ''},
      {price: '362', size: ''},
    ],
  },
  {
    id: '3',
    name: 'Punjab Kings',
    back: [
      {price: '238', size: ''},
      {price: '239', size: ''},
      {price: '240', size: ''},
    ],
    lay: [
      {price: '270', size: ''},
      {price: '271', size: ''},
      {price: '272', size: ''},
    ],
  },
  {
    id: '4',
    name: 'Gujarat Titans',
    back: [
      {price: '1098', size: ''},
      {price: '1099', size: ''},
      {price: '1100', size: ''},
    ],
    lay: [
      {price: '1300', size: ''},
      {price: '1301', size: ''},
      {price: '1302', size: ''},
    ],
  },
  {
    id: '5',
    name: 'Sunrisers Hyderabad',
    back: [
      {price: '448', size: ''},
      {price: '449', size: ''},
      {price: '450', size: ''},
    ],
    lay: [
      {price: '500', size: ''},
      {price: '501', size: ''},
      {price: '502', size: ''},
    ],
  },
  {
    id: '6',
    name: 'Lucknow Super Giants',
    back: [
      {price: '9998', size: ''},
      {price: '9999', size: ''},
      {price: '10000', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '7',
    name: 'Delhi Capitals',
    back: [
      {price: '3498', size: ''},
      {price: '3499', size: ''},
      {price: '3500', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '8',
    name: 'Kolkata Knight Riders',
    back: [
      {price: '7998', size: ''},
      {price: '7999', size: ''},
      {price: '8000', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '9',
    name: 'Chennai Super Kings',
    back: [
      {price: '2198', size: ''},
      {price: '2199', size: ''},
      {price: '2200', size: ''},
    ],
    lay: [
      {price: '0', size: ''},
      {price: '0', size: ''},
      {price: '0', size: ''},
    ],
  },
  {
    id: '10',
    name: 'Rajasthan Royals',
    back: [
      {price: '473', size: ''},
      {price: '474', size: ''},
      {price: '475', size: ''},
    ],
    lay: [
      {price: '550', size: ''},
      {price: '551', size: ''},
      {price: '552', size: ''},
    ],
  },
];

const WINNER_DATA: TeamOdds[] = [
  {
    id: 'w1',
    name: 'Punjab Kings',
    back: [
      {price: '3.3', size: '231.43'},
      {price: '3.35', size: '222.88'},
      {price: '3.4', size: '310.24'},
    ],
    lay: [
      {price: '3.45', size: '546.42'},
      {price: '3.5', size: '764.42'},
      {price: '3.55', size: '330.93'},
    ],
  },
  {
    id: 'w2',
    name: 'Royal Challengers Bengaluru',
    back: [
      {price: '4.1', size: '200.06'},
      {price: '4.2', size: '173.38'},
      {price: '4.3', size: '279.29'},
    ],
    lay: [
      {price: '4.5', size: '1.3K'},
      {price: '4.6', size: '212.25'},
      {price: '4.7', size: '174.68'},
    ],
  },
  {
    id: 'w3',
    name: 'Sunrisers Hyderabad',
    back: [
      {price: '5.4', size: '128.13'},
      {price: '5.5', size: '186.54'},
      {price: '5.6', size: '351.23'},
    ],
    lay: [
      {price: '5.7', size: '1.1K'},
      {price: '5.8', size: '1.3K'},
      {price: '5.9', size: '458.90'},
    ],
  },
  {
    id: 'w4',
    name: 'Rajasthan Royals',
    back: [
      {price: '5.6', size: '43.88'},
      {price: '5.8', size: '1.1K'},
      {price: '5.9', size: '1.2K'},
    ],
    lay: [
      {price: '6', size: '52.90'},
      {price: '6.2', size: '1.1K'},
      {price: '6.4', size: '82.54'},
    ],
  },
];

export default function IndianPremium() {
  const [isBookmakerOpen, setIsBookmakerOpen] = useState(true);
  const [isWinnerOpen, setIsWinnerOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333]">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#2C110C] px-4 py-2 text-sm font-semibold text-white">
        <div className="flex items-center gap-2">
          <span>Indian Premier League - Indian Premier League</span>
        </div>
        <div className="flex items-center gap-4">
          <span>28/03/2026 19:30</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 lg:flex-row">
        {/* Main Content Area */}
        <main className="flex-1 space-y-4">
          {/* Market Section: IPL Winner Cup Bookmaker */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsBookmakerOpen(!isBookmakerOpen)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                IPL Winner Cup Bookmaker
              </h2>
              <motion.div
                animate={{rotate: isBookmakerOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isBookmakerOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="text-gray-500 flex items-center justify-between border-b bg-[#F8F9FA] px-4 py-1 text-[10px] font-medium">
                    <div>Min 100.00 | Max: 25000.00</div>
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
                    {TEAMS_DATA.map((team) => (
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

          {/* Market Section: Winner */}
          <section className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => setIsWinnerOpen(!isWinnerOpen)}
            >
              <h2 className="text-base font-bold uppercase tracking-tight">
                Winner
              </h2>
              <motion.div
                animate={{rotate: isWinnerOpen ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {isWinnerOpen && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  <div className="text-gray-500 flex items-center justify-between border-b bg-[#F8F9FA] px-4 py-1 text-[10px] font-medium">
                    <div>Min 0.00 | Max: 0.00</div>
                    <div className="flex gap-1 md:gap-0">
                      <div className="flex w-[180px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center font-bold text-white">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center font-bold text-white">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-gray-100 divide-y">
                    {WINNER_DATA.map((team) => (
                      <div
                        key={team.id}
                        className="hover:bg-gray-50 border-gray-100 flex items-stretch border-b transition-colors"
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
                                  className={`flex min-h-[48px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 2 ? 'bg-[#72BBF4]' : 'bg-[#E0F0FE]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] font-bold">
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
                                  className={`flex min-h-[48px] flex-1 flex-col items-center justify-center transition-all hover:bg-opacity-80 ${idx === 0 ? 'bg-[#FAA9BA]' : 'bg-[#FEEBF0]'}`}
                                >
                                  <span className="text-xs font-bold">
                                    {odds.price}
                                  </span>
                                  <span className="text-gray-600 text-[9px] font-bold">
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

          {/* Quick Help/Info card could go here */}
          <div className="border-gray-200 rounded border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-[#ED6B31]">
              <Info size={18} />
              <h3 className="font-bold">Rules & Info</h3>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              Place your bets on the IPL outcome. Back (Blue) means you think it
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
