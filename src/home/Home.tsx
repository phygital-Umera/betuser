import React from 'react';
import { Play, Tv, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

// Types
interface Odds {
  back: string;
  lay: string;
}

interface MarketOdds {
  one: Odds;
  x: Odds;
  two: Odds;
}

interface Match {
  id: string;
  isLive: boolean;
  time?: string;
  teams: string;
  league?: string;
  streamingAvailable: boolean;
  tvAvailable: boolean;
  odds: MarketOdds;
}

interface Category {
  title: string;
  matches: Match[];
}

// Mock Data
const MOCK_DATA: Category[] = [
  {
    title: 'Cricket',
    matches: [
      {
        id: 'c1',
        isLive: true,
        teams: 'Indian Premier League',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: { back: '2500', lay: '0' },
          x: { back: '240', lay: '270' },
          two: { back: '320', lay: '360' }
        }
      },
      {
        id: 'c2',
        isLive: true,
        teams: 'Leicestershire v Nottinghamshire',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: { back: '6.2', lay: '10.5' },
          x: { back: '', lay: '' },
          two: { back: '1.11', lay: '1.19' }
        }
      },
      {
        id: 'c3',
        isLive: true,
        teams: 'Middlesex v Durham',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: { back: '1.54', lay: '3' },
          x: { back: '', lay: '' },
          two: { back: '1.5', lay: '2.86' }
        }
      },
      {
        id: 'c4',
        isLive: true,
        teams: 'Surrey v Sussex',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: { back: '1.1', lay: '1.12' },
          x: { back: '', lay: '' },
          two: { back: '9.2', lay: '11' }
        }
      },
      {
        id: 'c5',
        isLive: false,
        time: '01 May 19:30',
        teams: 'Islamabad United v Hyderabad Kingsmen',
        streamingAvailable: true,
        tvAvailable: true,
        odds: {
          one: { back: '1.98', lay: '2.02' },
          x: { back: '', lay: '' },
          two: { back: '1.98', lay: '2.02' }
        }
      }
    ]
  },
  {
    title: 'Soccer',
    matches: [
      {
        id: 's1',
        isLive: false,
        time: '01 May 19:30',
        teams: 'Rizespor v Konyaspor',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: { back: '1.94', lay: '1.95' },
          x: { back: '4', lay: '4.1' },
          two: { back: '4.2', lay: '4.3' }
        }
      },
      {
        id: 's2',
        isLive: false,
        time: '01 May 19:45',
        teams: 'FC Andorra v Albacete',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: { back: '1.63', lay: '1.65' },
          x: { back: '4.4', lay: '4.7' },
          two: { back: '5.7', lay: '6' }
        }
      },
      {
        id: 's3',
        isLive: false,
        time: '01 May 22:00',
        teams: 'Deportivo v Leganes',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: { back: '1.58', lay: '1.6' },
          x: { back: '4.4', lay: '4.5' },
          two: { back: '6.6', lay: '7' }
        }
      },
      {
        id: 's4',
        isLive: false,
        time: '01 May 22:30',
        teams: 'Brondby v FC Nordsjaelland',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: { back: '2.22', lay: '2.26' },
          x: { back: '4.1', lay: '4.3' },
          two: { back: '3.15', lay: '3.2' }
        }
      },
      {
        id: 's5',
        isLive: false,
        time: '01 May 22:30',
        teams: 'Gaziantep FK v Besiktas',
        streamingAvailable: false,
        tvAvailable: false,
        odds: {
          one: { back: '3.45', lay: '3.55' },
          x: { back: '4', lay: '4.1' },
          two: { back: '2.14', lay: '2.16' }
        }
      }
    ]
  },
  {
    title: 'Tennis',
    matches: [
      {
        id: 't1',
        isLive: true,
        teams: 'Arnaldi v Borges',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: { back: '6.4', lay: '7' },
          x: { back: '', lay: '' },
          two: { back: '1.17', lay: '1.18' }
        }
      },
      {
        id: 't2',
        isLive: true,
        teams: 'Sorribes Tormo v Ele Pridankina',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: { back: '1.98', lay: '2.06' },
          x: { back: '', lay: '' },
          two: { back: '1.95', lay: '2.04' }
        }
      },
      {
        id: 't3',
        isLive: true,
        teams: 'Martin Tiffon v Coppejans',
        streamingAvailable: true,
        tvAvailable: false,
        odds: {
          one: { back: '1.94', lay: '1.95' },
          x: { back: '', lay: '' },
          two: { back: '2.04', lay: '2.08' }
        }
      }
    ]
  }
];

const OddsButton = ({ back, lay }: { back: string; lay: string }) => {
  return (
    <div className="flex gap-[2px] w-full max-w-[200px] h-full sm:h-9">
      <button 
        id="odds-back-btn"
        className={`flex-1 flex items-center justify-center font-mono font-medium rounded-sm text-sm transition-colors cursor-pointer ${
          back ? 'bg-[#72c1e8] hover:bg-[#5dafd6] text-black' : 'bg-gray-100'
        }`}
      >
        {back}
      </button>
      <button 
        id="odds-lay-btn"
        className={`flex-1 flex items-center justify-center font-mono font-medium rounded-sm text-sm transition-colors cursor-pointer ${
          lay ? 'bg-[#f48fb1] hover:bg-[#f06292] text-black' : 'bg-gray-100'
        }`}
      >
        {lay}
      </button>
    </div>
  );
};

const MatchRow: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-200 py-3 sm:py-2 px-4 bg-white hover:bg-gray-50 transition-colors"
      id={`match-${match.id}`}
    >
      {/* Left Info Column */}
      <div className="flex-1 w-full sm:w-auto mb-3 sm:mb-0">
        <div className="flex items-center gap-2 flex-wrap">
          {match.isLive && (
            <span className="bg-[#ee4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
              Live
            </span>
          )}
          {!match.isLive && match.time && (
            <span className="text-gray-600 text-xs font-mono font-medium whitespace-nowrap">
              {match.time}
            </span>
          )}
          <span className="font-bold text-gray-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
             {match.teams}
          </span>
        </div>
      </div>

      {/* Middle Icons Column */}
      <div className="flex items-center gap-1.5 min-w-[100px] mb-3 sm:mb-0 mr-4">
        {match.streamingAvailable && (
          <div className="bg-[#2e7d32] text-white p-1 rounded-sm flex items-center justify-center">
            <MonitorPlay size={14} fill="currentColor" />
          </div>
        )}
        {match.tvAvailable && (
          <div className="bg-[#4a148c] text-white p-1 rounded-sm flex items-center justify-center">
            <Tv size={14} fill="currentColor" />
          </div>
        )}
        {/* Placeholder for specific brand icons */}
        <div className="bg-cyan-800 text-white p-1 rounded-sm text-[8px] font-bold h-6 w-7 flex items-center justify-center">
          8M
        </div>
        <div className="bg-purple-800 text-white p-1 rounded-sm text-[8px] font-bold h-6 w-7 flex items-center justify-center">
          F
        </div>
      </div>

      {/* Odds Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto">
        <div className="w-full lg:w-44">
           <OddsButton {...match.odds.one} />
        </div>
        <div className="w-full lg:w-44">
           <OddsButton {...match.odds.x} />
        </div>
        <div className="w-full lg:w-44">
           <OddsButton {...match.odds.two} />
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div className="mb-6 w-full shadow-sm rounded-t-lg overflow-hidden" id={`category-${category.title.toLowerCase()}`}>
      <div className="bg-[#f05a28] text-white px-4 py-2 font-bold text-sm tracking-wide">
        {category.title}
      </div>
      
      {/* Odds Header Labels - hidden on mobile, aligned on sm+ */}
      <div className="hidden sm:grid grid-cols-[1fr_100px_488px] sm:grid-cols-[1fr_100px_540px] lg:grid-cols-[1fr_100px_576px] px-4 py-2 bg-white border-b border-gray-100">
        <div className="flex-1"></div>
        <div className="min-w-[100px] mr-4"></div>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full">
           <div className="flex justify-center">
             <div className="bg-[#999] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
           </div>
           <div className="flex justify-center">
             <div className="bg-[#999] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">X</div>
           </div>
           <div className="flex justify-center">
             <div className="bg-[#999] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
           </div>
        </div>
      </div>

      <div className="flex flex-col">
        {category.matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]" id="home-container">
      <main className="max-w-7xl mx-auto py-6 px-0 sm:px-4">
        {MOCK_DATA.map((category) => (
          <CategorySection key={category.title} category={category} />
        ))}
      </main>

      {/* Responsive Info Note */}
      <div className="p-8 text-center text-gray-400 text-xs">
        <div className="max-w-md mx-auto">
          <p>This dashboard displays the latest odds and live markets. Click on a selection to add it to your betslip.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
