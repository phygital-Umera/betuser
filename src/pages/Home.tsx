import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, PlayCircle } from 'lucide-react';

export type SportType = 'CRICKET' | 'SOCCER' | 'TENNIS';

export const MATCH_DATA: Record<SportType, Match[]> = {
  CRICKET: [
    {
      id: 'c1',
      time: 'Live',
      teams: 'Indian Premier League',
      isLive: true,
      odds: {
        one: 6500,
        draw: 250,
        two: 280,
        oneLay: 0,
        drawLay: 280,
        twoLay: 310,
      },
    },
    {
      id: 'c2',
      time: '01 May 15:30',
      teams: 'Leicestershire v Nottinghamshire',
      odds: {
        one: 50,
        draw: 0,
        two: 1.01,
        oneLay: 400,
        drawLay: 0,
        twoLay: 1.02,
      },
    },
    {
      id: 'c3',
      time: '01 May 15:30',
      teams: 'Middlesex v Durham',
      odds: {
        one: 2.82,
        draw: 0,
        two: 1.11,
        oneLay: 11,
        drawLay: 0,
        twoLay: 1.55,
      },
    },
  ],
  SOCCER: [
    {
      id: 's1',
      time: '05 May 00:00',
      teams: 'Almeria v Mirandes',
      odds: {
        one: 1.5,
        draw: 5.1,
        two: 6.8,
        oneLay: 1.51,
        drawLay: 5.2,
        twoLay: 7.2,
      },
    },
    {
      id: 's2',
      time: '05 May 00:15',
      teams: 'Roma v Fiorentina',
      odds: {
        one: 1.63,
        draw: 4.3,
        two: 6.2,
        oneLay: 1.64,
        drawLay: 4.4,
        twoLay: 6.6,
      },
    },
    {
      id: 's3',
      time: '05 May 00:30',
      teams: 'Everton v Man City',
      odds: {
        one: 7,
        draw: 4.8,
        two: 1.53,
        oneLay: 7.2,
        drawLay: 4.9,
        twoLay: 1.54,
      },
    },
  ],
  TENNIS: [
    {
      id: 't1',
      time: 'Live',
      teams: 'Kat Sebov v Jakupovic',
      isLive: true,
      odds: {
        one: 1.19,
        draw: 0,
        two: 3.45,
        oneLay: 1.41,
        drawLay: 0,
        twoLay: 6.6,
      },
    },
    {
      id: 't2',
      time: '04 May 12:30',
      teams: 'Mia Ristic v Cortez Llorca',
      odds: { one: 1.25, draw: 0, two: 4.8, oneLay: 1.27, drawLay: 0, twoLay: 5 },
    },
    {
      id: 't3',
      time: '04 May 12:30',
      teams: 'Serban v Sara Popa',
      odds: {
        one: 1.71,
        draw: 0,
        two: 2.36,
        oneLay: 1.74,
        drawLay: 0,
        twoLay: 2.4,
      },
    },
  ],
};

export interface BettingOdds {
  one: number;
  draw?: number;
  two: number;
  oneLay?: number;
  drawLay?: number;
  twoLay?: number;
}

export interface Match {
  id: string;
  time: string;
  teams: string;
  league?: string;
  isLive?: boolean;
  odds: BettingOdds;
}

const IMAGES = {
  CRICKET: '/src/assets/images/cricket_hero_1777878237393.png',
  SOCCER: '/src/assets/images/soccer_hero_1777878254824.png',
  TENNIS: '/src/assets/images/tennis_hero_1777878273813.png',
};

// Odds Button with IndianPremium theme colors (dark blue)
const OddButton = ({
  value,
  type,
  idx,
  disabled,
}: {
  value?: number;
  type: 'back' | 'lay';
  idx?: number;
  disabled?: boolean;
}) => {
  const getButtonStyle = () => {
    if (type === 'back') {
      // Dark blue for third column (idx === 2), light blue for others
      if (idx === 2) {
        return 'bg-[#72BBF4] hover:bg-[#5aaae6] text-white';
      }
      return 'bg-[#E0F0FE] hover:bg-[#cbe3f7] text-gray-800';
    } else {
      // Dark pink for first column (idx === 0), light pink for others
      if (idx === 0) {
        return 'bg-[#FAA9BA] hover:bg-[#f386a1] text-white';
      }
      return 'bg-[#FEEBF0] hover:bg-[#fcdde6] text-gray-800';
    }
  };

  if (disabled || value === undefined || value === 0) {
    return <div className="h-8 w-12 rounded bg-gray-100 border border-gray-200" />;
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`h-8 w-12 rounded ${getButtonStyle()} flex flex-col items-center justify-center transition-all duration-150`}
    >
      <span className="text-xs font-bold">{value === 0 ? '-' : value}</span>
    </motion.button>
  );
};

const SportsDashboard = () => {
  const [activeSport, setActiveSport] = useState<SportType>('CRICKET');
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    CRICKET: true,
    SOCCER: true,
    TENNIS: true,
  });

  const toggleSport = (sportId: string) => {
    setOpenSections(prev => ({ ...prev, [sportId]: !prev[sportId] }));
  };

  const sports = [
    { id: 'CRICKET', label: 'CRICKET', image: IMAGES.CRICKET, icon: '🏏' },
    { id: 'SOCCER', label: 'SOCCER', image: IMAGES.SOCCER, icon: '⚽' },
    { id: 'TENNIS', label: 'TENNIS', image: IMAGES.TENNIS, icon: '🎾' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 md:pb-8 font-sans">
      <main className="mx-auto max-w-[1600px] mt-4 md:mt-6 space-y-4 px-3 md:px-4">
        
        {/* Sport Sections with IndianPremium Design */}
        {sports.map((sport) => (
          <section key={sport.id} className="border-gray-200 overflow-hidden rounded border bg-white shadow-sm">
            <header
              className="flex cursor-pointer select-none items-center justify-between bg-[#ED6B31] px-4 py-2 text-white"
              onClick={() => toggleSport(sport.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{sport.icon}</span>
                <h2 className="text-base font-bold uppercase tracking-tight">
                  {sport.label}
                </h2>
              </div>
              <motion.div
                animate={{rotate: openSections[sport.id] ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={20} />
              </motion.div>
            </header>

            <AnimatePresence>
              {openSections[sport.id] && (
                <motion.div
                  initial={{height: 0}}
                  animate={{height: 'auto'}}
                  exit={{height: 0}}
                  className="overflow-hidden"
                >
                  {/* Header with Back/Lay labels */}
                  <div className="text-gray-500 flex items-center justify-between border-b bg-[#F8F9FA] px-4 py-1 text-[10px] font-medium">
                    <div>Min 100.00 | Max: 10000.00</div>
                    <div className="flex gap-1 md:gap-0">
                      <div className="flex w-[180px] md:w-[240px]">
                        <div className="flex-1 rounded-bl rounded-tl bg-[#72BBF4] py-1 text-center text-white text-[10px] font-bold">
                          Back
                        </div>
                        <div className="ml-[2px] flex-1 rounded-br rounded-tr bg-[#FAA9BA] py-1 text-center text-white text-[10px] font-bold">
                          Lay
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Odds Table */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-full">
                      {MATCH_DATA[sport.id as SportType].map((match, idx) => (
                        <div
                          key={match.id}
                          className="hover:bg-gray-50 flex items-stretch transition-colors border-b border-gray-100"
                        >
                          {/* Event Details */}
                          <div className="flex flex-1 items-center px-4 py-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                                {match.isLive && (
                                  <span className="flex animate-pulse items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] md:text-[10px] font-bold text-white whitespace-nowrap">
                                    <PlayCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                    LIVE
                                  </span>
                                )}
                                <span className={`whitespace-nowrap text-[10px] md:text-xs font-bold ${
                                  match.isLive ? 'text-red-600' : 'text-slate-500'
                                }`}>
                                  {match.time}
                                </span>
                                <span className="text-slate-300 hidden sm:inline">|</span>
                                <span className="text-xs md:text-sm font-bold text-gray-800 break-words">
                                  {match.teams}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Odds Cells */}
                          <div className="flex">
                            <div className="flex w-[180px] md:w-[240px]">
                              {/* 1 - Home/Player 1 */}
                              <div className="flex flex-1 gap-[2px] p-[2px]">
                                <OddButton value={match.odds.one} type="back" idx={0} />
                                <OddButton value={match.odds.oneLay} type="lay" idx={0} />
                              </div>
                              
                              {/* X - Draw (only if exists and not 0) */}
                              {match.odds.draw !== undefined && match.odds.draw !== 0 && (
                                <div className="flex flex-1 gap-[2px] p-[2px]">
                                  <OddButton value={match.odds.draw} type="back" idx={1} />
                                  <OddButton value={match.odds.drawLay} type="lay" idx={1} />
                                </div>
                              )}
                              
                              {/* 2 - Away/Player 2 */}
                              <div className="flex flex-1 gap-[2px] p-[2px]">
                                <OddButton value={match.odds.two} type="back" idx={2} />
                                <OddButton value={match.odds.twoLay} type="lay" idx={2} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Footer */}
                  <div className="bg-white p-2 text-[10px] text-red-600 font-medium flex items-center gap-1 border-t border-gray-100">
                    <Info size={12} />
                    <span>Stop Watching, Start Winning — Place Your Bet Now.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return <SportsDashboard />;
}