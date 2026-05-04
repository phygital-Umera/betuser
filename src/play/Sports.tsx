import {motion} from 'framer-motion';
import {Monitor, Tv, Flame, Trophy} from 'lucide-react';

interface MatchOdds {
  one: [number | null, number | null];
  x: [number | null, number | null];
  two: [number | null, number | null];
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  isLive?: boolean;
  hasBM?: boolean;
  hasF?: boolean;
  hasTV?: boolean;
  odds: MatchOdds;
}

const matches: Match[] = [
  {
    id: '1',
    date: '01 May 15:30',
    teamA: 'Leicestershire',
    teamB: 'Nottinghamshire',
    hasF: true,
    hasTV: true,
    odds: {
      one: [50, 400],
      x: [null, null],
      two: [1.01, 1.02],
    },
  },
  {
    id: '2',
    date: '01 May 15:30',
    teamA: 'Middlesex',
    teamB: 'Durham',
    hasF: true,
    hasTV: true,
    odds: {
      one: [2.82, 6],
      x: [null, null],
      two: [1.2, 1.55],
    },
  },
  {
    id: '3',
    date: '01 May 15:30',
    teamA: 'Surrey',
    teamB: 'Sussex',
    hasF: true,
    hasTV: true,
    odds: {
      one: [null, 1.02],
      x: [null, null],
      two: [100, null],
    },
  },
  {
    id: '4',
    date: '04 May 16:00',
    teamA: 'Pakistan W',
    teamB: 'Zimbabwe W',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.05, 1.06],
      x: [null, null],
      two: [17.5, 18.5],
    },
  },
  {
    id: '5',
    date: '04 May 19:30',
    teamA: 'Mumbai Indians',
    teamB: 'Lucknow Super Giants',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.67, 1.68],
      x: [null, null],
      two: [2.48, 2.5],
    },
  },
  {
    id: '6',
    date: '05 May 19:30',
    teamA: 'Delhi Capitals',
    teamB: 'Chennai Super Kings',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.9, 1.96],
      x: [null, null],
      two: [2.04, 2.12],
    },
  },
  {
    id: '7',
    date: '06 May 19:30',
    teamA: 'Sunrisers Hyderabad',
    teamB: 'Punjab Kings',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [2, 2.1],
      x: [null, null],
      two: [1.91, 2],
    },
  },
  {
    id: '8',
    date: '08 May 09:30',
    teamA: 'Bangladesh',
    teamB: 'Pakistan',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [3, 3.5],
      x: [7.8, 10.5],
      two: [1.67, 1.8],
    },
  },
  {
    id: '9',
    date: '09 May 19:30',
    teamA: 'Rajasthan Royals',
    teamB: 'Gujarat Titans',
    hasBM: true,
    hasF: true,
    hasTV: true,
    odds: {
      one: [1.86, 1.88],
      x: [null, null],
      two: [2.14, 2.18],
    },
  },
];

export default function Sports() {
  return (
    <div className="min-h-screen w-full bg-[#f0f0f0] font-sans text-[#1a1a1a]">
      {/* Top Header */}
      <div className="flex items-center gap-2 bg-[#e65100] px-4 py-2 text-white shadow-md">
        <Trophy className="h-5 w-5" />
        <h1 className="text-lg font-bold tracking-tight">Cricket</h1>
      </div>

      <div className="mx-auto max-w-[1400px] p-0 sm:p-2">
        {/* Table Container */}
        <div className="overflow-x-auto bg-white shadow-sm">
          {/* Section Header */}
          <div className="border-gray-200 flex min-w-[800px] items-center border-b">
            <div className="flex flex-[3] items-center gap-2 p-3">
              <span className="flex items-center gap-1 rounded bg-[#d32f2f] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                <Flame className="h-3 w-3" />
                Live
              </span>
              <h2 className="text-sm font-bold">Indian Premier League</h2>
            </div>

            {/* Headers for Odds columns */}
            <div className="flex flex-[2] justify-end">
              <div className="grid w-full max-w-[450px] grid-cols-3 gap-1 px-3">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    1
                  </div>
                  <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    X
                  </div>
                  <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-400 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    2
                  </div>
                  <div className="h-6 w-full rounded-t-sm bg-[#64b5f6]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Match Rows */}
          <div className="min-w-[800px]">
            {matches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{opacity: 0, y: 5}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: idx * 0.05}}
                className="border-gray-100 hover:bg-gray-50 flex items-center border-b transition-colors"
              >
                {/* Match Info */}
                <div className="flex flex-[3] items-center gap-3 p-3">
                  <div className="min-w-[120px] whitespace-nowrap text-xs font-bold">
                    <span className="text-gray-800">{match.date}</span>
                    <span className="text-gray-300 mx-2">|</span>
                    <span className="font-extrabold text-black">
                      {match.teamA} v {match.teamB}
                    </span>
                  </div>

                  {/* Badges / Icons */}
                  <div className="ml-auto flex items-center gap-1.5">
                    {match.hasBM && (
                      <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#1a237e] px-1 text-[10px] font-bold text-white">
                        BM
                      </div>
                    )}
                    {match.hasF && (
                      <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#7b1fa2] px-1 text-[10px] font-bold italic text-white">
                        F
                      </div>
                    )}
                    {match.hasTV && (
                      <div className="flex h-5 min-w-[20px] items-center justify-center rounded bg-[#2e7d32] px-1 text-[10px] font-bold text-white">
                        <Tv className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Odds Buttons */}
                <div className="flex flex-[2] justify-end">
                  <div className="grid w-full max-w-[450px] grid-cols-3 gap-1 p-2">
                    <OddsPair
                      val1={match.odds.one[0]}
                      val2={match.odds.one[1]}
                    />
                    <OddsPair val1={match.odds.x[0]} val2={match.odds.x[1]} />
                    <OddsPair
                      val1={match.odds.two[0]}
                      val2={match.odds.two[1]}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar {
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

function OddsPair({val1, val2}: {val1: number | null; val2: number | null}) {
  return (
    <div className="flex gap-1">
      <button
        className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
          val1
            ? 'bg-[#90caf9] text-black shadow-sm hover:bg-[#64b5f6] active:scale-95'
            : 'cursor-default bg-[#e3f2fd] opacity-40'
        }`}
      >
        {val1 || '-'}
      </button>
      <button
        className={`flex h-9 flex-1 items-center justify-center rounded-sm text-xs font-bold transition-all ${
          val2
            ? 'bg-[#f48fb1] text-black shadow-sm hover:bg-[#f06292] active:scale-95'
            : 'cursor-default bg-[#fce4ec] opacity-40'
        }`}
      >
        {val2 || '-'}
      </button>
    </div>
  );
}
