import {motion} from 'framer-motion';
import {Monitor, Info} from 'lucide-react';

interface EventData {
  id: string;
  name: string;
  isLive: boolean;
  hasVideo?: boolean;
  hasBM?: boolean;
  oddsX: {back: string; lay: string};
  odds1: {back: string; lay: string};
  odds2: {back: string; lay: string};
}

const LiveBadge = () => (
  <span className="flex items-center gap-1 rounded bg-[#BD2130] px-1 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
    Live
  </span>
);

const Indicator = ({label}: {label: string}) => (
  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8E8E93] text-[10px] font-bold text-white">
    {label}
  </div>
);

const OddsButton = ({value, type}: {value: string; type: 'back' | 'lay'}) => {
  const bgColor = type === 'back' ? 'bg-[#72BBDB]' : 'bg-[#F4A79D]';
  return (
    <button
      id={`odds-${value}-${type}`}
      className={`${bgColor} text-gray-900 flex h-[32px] w-[60px] cursor-pointer flex-col items-center justify-center rounded-sm border border-white/20 font-bold shadow-sm transition-all hover:brightness-95 md:h-[36px] md:w-[70px]`}
      aria-label={`${type} odds ${value}`}
    >
      <span className="text-[13px] leading-none">{value || '-'}</span>
    </button>
  );
};

const EventRow = ({event}: {event: EventData}) => (
  <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    className="border-gray-200 hover:bg-gray-50 flex items-center justify-between border-b bg-white py-2 transition-colors"
  >
    <div className="flex items-center gap-2 pl-2">
      {event.isLive && <LiveBadge />}
      <span className="text-gray-900 max-w-[150px] truncate text-[13px] font-bold md:max-w-none">
        {event.name}
      </span>
    </div>

    <div className="flex items-center gap-2 pr-2">
      {event.hasBM && (
        <div className="border-gray-300 flex h-6 w-6 items-center justify-center rounded-md border bg-[#002D4E] text-[8px] font-bold text-white">
          BM
        </div>
      )}
      {event.hasVideo && (
        <div className="border-gray-300 flex h-6 w-6 items-center justify-center rounded-md border bg-[#000] text-green-500">
          <Monitor size={14} fill="currentColor" />
        </div>
      )}

      <div className="flex gap-1">
        <div className="flex gap-0.5">
          <OddsButton value={event.odds1.back} type="back" />
          <OddsButton value={event.odds1.lay} type="lay" />
        </div>
        <div className="flex gap-0.5">
          <OddsButton value={event.oddsX.back} type="back" />
          <OddsButton value={event.oddsX.lay} type="lay" />
        </div>
        <div className="flex gap-0.5">
          <OddsButton value={event.odds2.back} type="back" />
          <OddsButton value={event.odds2.lay} type="lay" />
        </div>
      </div>
    </div>
  </motion.div>
);

const SportSection = ({
  title,
  events,
  showIndicators = true,
}: {
  title: string;
  events: EventData[];
  showIndicators?: boolean;
}) => (
  <section className="mb-4">
    <div className="flex min-h-[40px] items-center justify-between bg-[#F15A24] px-3 py-1 text-white">
      <h2 className="text-sm font-bold">{title}</h2>
      {showIndicators && (
        <div className="flex gap-12 pr-4 md:pr-12">
          <Indicator label="1" />
          <Indicator label="X" />
          <Indicator label="2" />
        </div>
      )}
    </div>

    <div className="bg-white">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <EventRow event={event} />
          </div>
        ))
      ) : (
        <div className="text-gray-900 flex items-center justify-center bg-white py-12 text-sm font-medium">
          No Active Events Found
        </div>
      )}
    </div>
  </section>
);

export default function Play() {
  const cricketEvents: EventData[] = [
    {
      id: 'cricket-1',
      name: 'Indian Premier League',
      isLive: true,
      hasBM: true,
      odds1: {back: '6500', lay: '0'},
      oddsX: {back: '250', lay: '280'},
      odds2: {back: '280', lay: '310'},
    },
  ];

  const soccerEvents: EventData[] = [];

  const tennisEvents: EventData[] = [
    {
      id: 'tennis-1',
      name: 'Kat Sebov v Jakupovic',
      isLive: true,
      hasVideo: true,
      odds1: {back: '1.19', lay: '1.41'},
      oddsX: {back: '', lay: ''},
      odds2: {back: '3.45', lay: '6.6'},
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-2 font-sans selection:bg-orange-100 md:p-4">
      <div >
        <div className="min-w-[800px]">
          <SportSection title="Cricket" events={cricketEvents} />
          <SportSection
            title="Soccer"
            events={soccerEvents}
            showIndicators={false}
          />
          <SportSection title="Tennis" events={tennisEvents} />
        </div>
      </div>

      {/* Mobile hint if screen is too small and not scrolling nicely */}
      <div className="text-gray-500 mt-4 text-center text-xs md:hidden">
        <Info size={12} className="mr-1 inline" />
        Scroll horizontally to view all odds
      </div>
    </div>
  );
}
