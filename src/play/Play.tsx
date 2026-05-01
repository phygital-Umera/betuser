/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Tv } from 'lucide-react';

interface Odds {
  back: string;
  lay: string;
  isYellow?: boolean;
}

interface Match {
  id: string;
  title: string;
  isLive: boolean;
  hasTv: boolean;
  logoType?: 'bm' | 'f';
  odds: {
    one: Odds;
    x: Odds | null;
    two: Odds;
  };
}

const cricketMatches: Match[] = [
  {
    id: 'c1',
    title: 'Indian Premier League',
    isLive: true,
    hasTv: false,
    logoType: 'bm',
    odds: {
      one: { back: '2500', lay: '0' },
      x: { back: '240', lay: '270' },
      two: { back: '320', lay: '360' }
    }
  },
  {
    id: 'c2',
    title: 'Leicestershire v Nottinghamshire',
    isLive: true,
    hasTv: true,
    logoType: 'f',
    odds: {
      one: { back: '5.8', lay: '10.5' },
      x: null,
      two: { back: '1.11', lay: '1.21' }
    }
  },
  {
    id: 'c3',
    title: 'Middlesex v Durham',
    isLive: true,
    hasTv: true,
    logoType: 'f',
    odds: {
      one: { back: '1.5', lay: '3' },
      x: null,
      two: { back: '1.5', lay: '3' }
    }
  },
  {
    id: 'c4',
    title: 'Surrey v Sussex',
    isLive: true,
    hasTv: true,
    logoType: 'f',
    odds: {
      one: { back: '1.12', lay: '1.14' },
      x: null,
      two: { back: '8', lay: '9.4' }
    }
  }
];

const tennisMatches: Match[] = [
  {
    id: 't1',
    title: 'Arnaldi v Borges',
    isLive: true,
    hasTv: true,
    odds: {
      one: { back: '2.02', lay: '2.04', isYellow: true },
      x: null,
      two: { back: '1.96', lay: '1.97', isYellow: true }
    }
  },
  {
    id: 't2',
    title: 'Sorribes Tormo v Ele Pridankina',
    isLive: true,
    hasTv: true,
    odds: {
      one: { back: '2.44', lay: '2.48' },
      x: null,
      two: { back: '1.68', lay: '1.69' }
    }
  },
  {
    id: 't3',
    title: 'Martin Tiffon v Coppejans',
    isLive: true,
    hasTv: true,
    odds: {
      one: { back: '1.47', lay: '1.51' },
      x: null,
      two: { back: '2.98', lay: '3.15' }
    }
  },
  {
    id: 't4',
    title: 'Jes Ponchet v Golubic',
    isLive: true,
    hasTv: true,
    odds: {
      one: { back: '4.5', lay: '4.7' },
      x: null,
      two: { back: '1.27', lay: '1.28' }
    }
  },
  {
    id: 't5',
    title: 'Neumayer v Djere',
    isLive: true,
    hasTv: true,
    odds: {
      one: { back: '1.94', lay: '1.96' },
      x: null,
      two: { back: '2.04', lay: '2.08' }
    }
  }
];

const LogoIcon = ({ type }: { type: 'bm' | 'f' }) => {
  if (type === 'bm') {
    return (
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-cyan-600 rounded flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold">
        BM
      </div>
    );
  }
  return (
    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-700 rounded flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold italic">
      F
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-[#ec4d16] text-white px-2 py-1 text-sm sm:text-base font-semibold sticky top-0 z-10">
    {title}
  </div>
);

const ColumnLabel = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-500 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold mb-1">
      {label}
    </div>
  </div>
);

const OddsButton = ({ value, type, isYellow }: { value: string; type: 'back' | 'lay'; isYellow?: boolean }) => {
  const bgColor = isYellow 
    ? 'bg-[#ffee58] text-black' 
    : type === 'back' 
      ? 'bg-[#73c2fb] text-black' 
      : 'bg-[#f48fb1] text-black';
  
  return (
    <div className={`${bgColor} w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-bold rounded-sm cursor-pointer hover:opacity-80 transition-opacity`}>
      {value}
    </div>
  );
};

const MatchRow: React.FC<{ match: Match }> = ({ match }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 py-3 px-2 sm:px-4 bg-white gap-3 sm:gap-0">
    <div className="flex items-center gap-2 flex-grow w-full sm:w-auto">
      {match.isLive && (
        <span className="bg-red-600 text-white text-[8px] sm:text-[10px] font-bold px-1 rounded uppercase whitespace-nowrap">Live</span>
      )}
      <span className="font-bold text-xs sm:text-sm text-gray-800 break-words flex-1">{match.title}</span>
    </div>

    <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
      <div className="flex items-center gap-2 sm:mr-4">
        {match.logoType && <LogoIcon type={match.logoType} />}
        {match.hasTv && (
          <div className="bg-green-700 p-0.5 sm:p-1 rounded">
             <Tv size={14} color="white" className="sm:w-4 sm:h-4" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
        {/* Column 1 */}
        <div className="flex gap-0.5 sm:gap-1">
          <OddsButton value={match.odds.one.back} type="back" isYellow={match.odds.one.isYellow} />
          <OddsButton value={match.odds.one.lay} type="lay" isYellow={match.odds.one.isYellow} />
        </div>

        {/* Column X */}
        <div className="flex gap-0.5 sm:gap-1">
          {match.odds.x ? (
            <>
              <OddsButton value={match.odds.x.back} type="back" />
              <OddsButton value={match.odds.x.lay} type="lay" />
            </>
          ) : (
            <>
              <div className="w-12 sm:w-16 h-8 sm:h-10 bg-[#73c2fb]/30 rounded-sm" />
              <div className="w-12 sm:w-16 h-8 sm:h-10 bg-[#f48fb1]/30 rounded-sm" />
            </>
          )}
        </div>

        {/* Column 2 */}
        <div className="flex gap-0.5 sm:gap-1">
          <OddsButton value={match.odds.two.back} type="back" isYellow={match.odds.two.isYellow} />
          <OddsButton value={match.odds.two.lay} type="lay" isYellow={match.odds.two.isYellow} />
        </div>
      </div>
    </div>
  </div>
);

function Play() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans pt-5">
      <div className="shadow-lg overflow-hidden">
        {/* Cricket Section */}
        <div className="mb-0">
          <SectionHeader title="Cricket" />
          {/* Legend Headers for Odds */}
          <div className="flex justify-end pr-2 sm:pr-4 py-2 bg-white border-b border-gray-100">
             <div className="grid grid-cols-3 gap-0.5 sm:gap-1 w-[calc(100%-120px)] sm:w-[412px] min-w-[200px] sm:min-w-[412px]">
               <ColumnLabel label="1" />
               <ColumnLabel label="X" />
               <ColumnLabel label="2" />
             </div>
          </div>
          <div>
            {cricketMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Soccer Section */}
        <div className="mb-0">
          <SectionHeader title="Soccer" />
          <div className="bg-white py-8 sm:py-12 flex items-center justify-center text-base sm:text-lg font-medium text-gray-800 border-b border-gray-100 px-4">
            No Active Events Found
          </div>
        </div>

        {/* Tennis Section */}
        <div className="mb-0">
          <SectionHeader title="Tennis" />
          <div className="flex justify-end pr-2 sm:pr-4 py-2 bg-white border-b border-gray-100">
             <div className="grid grid-cols-3 gap-0.5 sm:gap-1 w-[calc(100%-120px)] sm:w-[412px] min-w-[200px] sm:min-w-[412px]">
               <ColumnLabel label="1" />
               <ColumnLabel label="X" />
               <ColumnLabel label="2" />
             </div>
          </div>
          <div>
            {tennisMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Horse Racing Section - Empty as per original */}
        <div className="mb-0">
          <SectionHeader title="Horse Racing" />
          <div className="bg-white py-8 sm:py-12 flex items-center justify-center text-base sm:text-lg font-medium text-gray-800 border-b border-gray-100 px-4">
            No Active Events Found
          </div>
        </div>
      </div>
    </div>
  );
}

export default Play;