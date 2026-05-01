

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, Clock, ExternalLink } from 'lucide-react';

// Types for the interface
interface OddsData {
  back: { price: string; size: string }[];
  lay: { price: string; size: string }[];
}

interface MarketRowProps {
  title: string;
  odds: OddsData;
  isSuspended?: boolean;
}

const MarketRow: React.FC<MarketRowProps> = ({ title, odds, isSuspended }) => {
  return (
    <div className="grid grid-cols-[1fr,60px,60px,60px,60px,60px,60px] border-b border-gray-200 items-center py-2 bg-white">
      <div className="pl-4 font-semibold text-gray-800 text-sm">{title}</div>
      {isSuspended ? (
        <div className="col-span-6 bg-gray-600 h-full flex items-center justify-center text-xs text-white font-bold tracking-widest">
          — SUSPENDED —
        </div>
      ) : (
        <>
          {/* Back columns */}
          {odds.back.map((item, idx) => (
            <div
              key={`back-${idx}`}
              className={`flex flex-col items-center justify-center h-10 border border-gray-100 cursor-pointer transition-colors ${
                idx === 2 ? 'bg-[#93c5fd] hover:bg-blue-400' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-[13px] font-bold leading-tight">{item.price}</span>
              <span className="text-[9px] text-gray-600 leading-tight">{item.size}</span>
            </div>
          ))}
          {/* Lay columns */}
          {odds.lay.map((item, idx) => (
            <div
              key={`lay-${idx}`}
              className={`flex flex-col items-center justify-center h-10 border border-gray-100 cursor-pointer transition-colors ${
                idx === 0 ? 'bg-[#fecaca] hover:bg-red-300' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-[13px] font-bold leading-tight">{item.price}</span>
              <span className="text-[9px] text-gray-600 leading-tight">{item.size}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; minMax?: string; showCashOut?: boolean }> = ({ 
  title, 
  minMax, 
  showCashOut = true 
}) => {
  return (
    <div className="w-full">
      <div className="bg-[#ea580c] text-white px-3 py-1.5 flex justify-between items-center text-sm font-semibold">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {showCashOut && (
            <div className="flex items-center gap-0 bg-[#262626] rounded px-2 py-0.5 cursor-pointer">
              <span className="text-[11px] font-bold mr-1">Cash Out</span>
              <ChevronDown size={14} />
            </div>
          )}
          <ChevronDown size={14} className="cursor-pointer" />
        </div>
      </div>
      {minMax && (
        <div className="bg-gray-50 px-4 py-1 flex items-center justify-between text-[10px] text-gray-500 border-b border-gray-200">
          <span>{minMax}</span>
          <div className="flex gap-12">
            <span className="text-blue-600 font-bold uppercase w-[180px] text-center tracking-wider">Back</span>
            <span className="text-pink-600 font-bold uppercase w-[180px] text-center tracking-wider">Lay</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CricketEvent2() {
  const [activeFancyTab, setActiveFancyTab] = useState('All');

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans selection:bg-orange-200">
      {/* Site Header */}
      <header className="bg-[#1a1a1a] text-white p-3 flex justify-between items-center border-b border-orange-600 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm tracking-tight">Rajasthan Royals v Delhi Capitals - Indian Premier League</span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-90">
          <Clock size={12} />
          <span>01/05/2026 19:30</span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-4 p-4 max-w-[1600px] mx-auto">
        {/* Left Column: Markets */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Match Odds Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="shadow-md rounded overflow-hidden"
          >
            <SectionHeader title="Match Odds" minMax="Min 1.00 | Max: 0.00" />
            <MarketRow 
              title="Rajasthan Royals" 
              odds={{
                back: [{ price: '1.73', size: '11.9K' }, { price: '1.74', size: '5.9K' }, { price: '1.75', size: '635.10' }],
                lay: [{ price: '1.76', size: '1.5K' }, { price: '1.77', size: '6.2K' }, { price: '1.78', size: '11.3K' }]
              }}
            />
            <MarketRow 
              title="Delhi Capitals" 
              odds={{
                back: [{ price: '2.28', size: '13.4K' }, { price: '2.3', size: '2.5K' }, { price: '2.32', size: '566.52' }],
                lay: [{ price: '2.34', size: '1.2K' }, { price: '2.36', size: '3.8K' }, { price: '2.38', size: '8.6K' }]
              }}
            />
            <div className="bg-white p-2 text-[10px] text-red-600 font-medium flex items-center gap-1">
               <Info size={10} />
               <span>Stop Watching, Start Winning — Place Your Bet Now.</span>
            </div>
          </motion.div>

          {/* To Win The Toss 1 Section */}
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="shadow-md rounded overflow-hidden"
          >
            <SectionHeader title="To Win The Toss 1" minMax="Min 100.00 | Max: 10000.00" />
            <MarketRow 
              title="Rajasthan Royals" 
              odds={{
                back: [{ price: '96', size: '-' }, { price: '97', size: '-' }, { price: '98', size: '-' }],
                lay: [{ price: '-', size: '-' }, { price: '-', size: '-' }, { price: '-', size: '-' }]
              }}
            />
            <MarketRow 
              title="Delhi Capitals" 
              odds={{
                back: [{ price: '96', size: '-' }, { price: '97', size: '-' }, { price: '98', size: '-' }],
                lay: [{ price: '-', size: '-' }, { price: '-', size: '-' }, { price: '-', size: '-' }]
              }}
            />
          </motion.div>

          {/* Bookmaker 0 Commission Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="shadow-md rounded overflow-hidden"
          >
            <SectionHeader title="Bookmaker 0 Commission" minMax="Min 100.00 | Max: 100000.00" />
            <MarketRow 
              title="Rajasthan Royals" 
              odds={{
                back: [{ price: '72', size: '-' }, { price: '73', size: '-' }, { price: '74', size: '-' }],
                lay: [{ price: '78', size: '-' }, { price: '79', size: '-' }, { price: '80', size: '-' }]
              }}
            />
            <MarketRow 
              title="Delhi Capitals" 
              odds={{
                back: [],
                lay: []
              }}
              isSuspended
            />
            <div className="bg-white p-2 text-[10px] text-red-600 font-medium flex items-center justify-center gap-1">
               <Info size={10} />
               <span>Think Smart, Bet Smarter — This Match Is Going All The Way!</span>
            </div>
          </motion.div>

          {/* Fancy Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="shadow-md rounded overflow-hidden"
          >
            <SectionHeader title="Fancy" showCashOut={false} />
            <div className="bg-white border-b border-gray-200 flex gap-4 px-2 pt-2">
              {['All', 'OVERS(13)', 'BATSMAN(78)'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFancyTab(tab)}
                  className={`px-3 py-1 text-[11px] font-bold uppercase transition-all border-b-2 ${
                    activeFancyTab === tab ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="bg-white">
              {/* Fancy Odds Header */}
              <div className="grid grid-cols-[1fr,120px,120px,120px] bg-gray-50 items-center border-b border-gray-100">
                <div className="px-4 py-1 text-[10px] text-gray-400">Fancy Market</div>
                <div className="flex bg-red-200 h-full items-center justify-center text-[10px] font-bold text-gray-700">No</div>
                <div className="flex bg-blue-200 h-full items-center justify-center text-[10px] font-bold text-gray-700">Yes</div>
                <div className="px-4 py-1 text-[10px] text-gray-400 text-center">Min / Max</div>
              </div>

              {/* Fancy Rows Example */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFancyTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="divide-y divide-gray-100"
                >
                  {[
                    { title: activeFancyTab === 'BATSMAN(78)' ? '1st WKT RR ADV.' : 'Lunch Favourite ADV.', no: '27', yes: '27', low: '110', high: '90' },
                    { title: activeFancyTab === 'BATSMAN(78)' ? '1st WKT DC ADV.' : '4 Over RR ADV.', no: '23', yes: '23', low: '110', high: '90' },
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr,120px,120px,120px] items-center py-2 h-14">
                      <div className="px-4 font-bold text-[13px] text-gray-800">{row.title}</div>
                      <div className="flex flex-col items-center justify-center h-full bg-red-100 border-l border-white cursor-pointer hover:bg-red-200 transition-colors">
                        <span className="text-sm font-bold">{row.no}</span>
                        <span className="text-[10px] text-gray-500">{row.low}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center h-full bg-blue-100 border-l border-white cursor-pointer hover:bg-blue-200 transition-colors">
                        <span className="text-sm font-bold">{row.yes}</span>
                        <span className="text-[10px] text-gray-500">{row.high}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-[10px] text-gray-400">
                        <span>Min / Max</span>
                        <span className="font-semibold text-gray-500">100.00 / 25K</span>
                      </div>
                    </div>
                  ))}
                  
                  {activeFancyTab === 'BATSMAN(78)' && (
                    <div className="grid grid-cols-[1fr,120px,120px,120px] items-center py-2 h-14">
                      <div className="px-4 font-bold text-[13px] text-gray-800">1st 2 WKT RR ADV.</div>
                      <div className="flex flex-col items-center justify-center h-full bg-red-100 border-l border-white cursor-pointer hover:bg-red-200 transition-colors">
                        <span className="text-sm font-bold">65</span>
                        <span className="text-[10px] text-gray-500">110</span>
                      </div>
                      <div className="flex flex-col items-center justify-center h-full bg-blue-100 border-l border-white cursor-pointer hover:bg-blue-200 transition-colors">
                        <span className="text-sm font-bold">65</span>
                        <span className="text-[10px] text-gray-500">90</span>
                      </div>
                       <div className="flex flex-col items-center justify-center text-[10px] text-gray-400">
                        <span>Min / Max</span>
                        <span className="font-semibold text-gray-500">100.00 / 25K</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="bg-white p-2 text-[10px] text-green-700 font-medium flex items-center justify-center gap-1 border-t border-gray-100">
               <Info size={10} />
               <span>IPL Winner Cup Bookmaker Bets Started In Our Exchange 🎉🏏🎉</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-80 flex flex-col gap-4">
          <div className="bg-white shadow-md rounded overflow-hidden">
            <div className="bg-orange-600 text-white px-3 py-2 text-sm font-bold flex justify-between items-center">
              <span>Matched Bet</span>
            </div>
            <div className="p-12 flex items-center justify-center bg-white">
              <span className="text-sm text-gray-400 font-medium">No open bets</span>
            </div>
          </div>

          <div className="bg-white shadow-md rounded p-4 border border-gray-200">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase">Live Support</span>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
             </div>
             <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
               Need help with your bets? Our specialist team is online 24/7.
             </p>
             <button className="w-full bg-[#1a1a1a] text-white py-2 rounded text-[11px] font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                Join Chat <ExternalLink size={12} />
             </button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer Placeholder if needed, but the image shows a desktop view */}
      <footer className="mt-12 py-8 bg-[#1a1a1a] text-gray-400 text-center text-[11px]">
        <div className="max-w-4xl mx-auto px-4">
          <p>© 2026 Cricket Exchange. All Rights Reserved. Please gamble responsibly.</p>
        </div>
      </footer>
    </div>
  );
}
