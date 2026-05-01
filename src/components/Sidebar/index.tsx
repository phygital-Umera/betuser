import { 
  Home, 
  Play, 
  Vote, 
  Trophy, 
  Dribbble, 
  Gamepad2, 
  Headphones, 
  HelpCircle,
  Menu,
  ChevronDown,
  ChevronLeft,
  Moon,
  Download
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SidebarLinkGroup from './SidebarLinkGroup';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // Using simple navigation state for the demo
  const [pathname, setPathname] = useState('/');
  
  const sidebarRoutes = [
    { label: 'Home', path: '/', icon: <Home size={22} /> },
    { label: 'In-Play', path: '/in-play', icon: <Play size={22} /> },
    { label: 'Election', path: '/election', icon: <Vote size={22} /> },
    { label: 'IPL 2026', path: '/ipl', icon: <Trophy size={22} /> },
    { 
      label: 'Sports', 
      path: '/sports', 
      icon: <Dribbble size={22} />,
      subRoutes: [
        { label: 'Cricket', path: '/sports/cricket' },
        { label: 'Football', path: '/sports/football' },
        { label: 'Tennis', path: '/sports/tennis' },
      ]
    },
    { 
      label: 'Casino', 
      path: '/casino', 
      icon: <Gamepad2 size={22} />,
      subRoutes: [
        { label: 'Live Casino', path: '/casino/live' },
        { label: 'Slot Games', path: '/casino/slots' },
      ]
    },
    { label: 'Supports', path: '/supports', icon: <Headphones size={22} /> },
    { label: 'FAQ\'s', path: '/faq', icon: <HelpCircle size={22} /> },
  ];

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsHovered(true);
    setSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setSidebarOpen(false);
    }, 300);
  };

  // Mobile click outside to close
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const { target } = event;
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // Escape key to close
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebar}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-[#0a0a0a] shadow-2xl transition-all duration-300 ease-in-out dark:bg-boxdark lg:static ${
        sidebarOpen ? 'w-72' : 'w-20'
      } ${
        sidebarOpen || isHovered
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="text-sm font-bold tracking-tight text-white uppercase italic">Swastik</span>
              <span className="text-[10px] text-gray-400 uppercase leading-none">Online Book</span>
            </motion.div>
          )}
        </div>
        
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-white hover:bg-white/10 p-2 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* SIDEBAR MENU */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-1">
        <nav>
          <ul className="space-y-1.5">
            {sidebarRoutes.map((route, index) => {
              const isActive = pathname === route.path || (route.subRoutes && pathname.startsWith(route.path));
              
              return route.subRoutes ? (
                <SidebarLinkGroup
                  key={index}
                  activeCondition={isActive}
                >
                  {(handleClick, open) => (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarOpen) {
                            handleClick();
                          } else {
                            setSidebarOpen(true);
                          }
                          handleMouseEnter();
                        }}
                        className={`group flex w-full items-center gap-3.5 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={`${isActive ? 'text-white' : 'text-orange-500 group-hover:text-white'}`}>
                          {route.icon}
                        </span>
                        {sidebarOpen && (
                          <span className="flex-1 text-left whitespace-nowrap">{route.label}</span>
                        )}
                        {sidebarOpen && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${sidebarOpen && open ? 'max-h-96 mt-1' : 'max-h-0'}`}>
                        <ul className="pl-11 space-y-1">
                          {route.subRoutes.map((subRoute, subIndex) => (
                            <li key={subIndex}>
                              <button
                                onClick={() => setPathname(subRoute.path)}
                                className={`block w-full py-2 text-left text-xs font-medium transition-colors ${
                                  pathname === subRoute.path ? 'text-white' : 'text-gray-500 hover:text-white'
                                }`}
                              >
                                {subRoute.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ) : (
                <li key={index}>
                  <button
                    onClick={() => setPathname(route.path)}
                    className={`group flex w-full items-center gap-3.5 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={`${isActive ? 'text-white' : 'text-orange-500 group-hover:text-white'}`}>
                      {route.icon}
                    </span>
                    {sidebarOpen && <span className="whitespace-nowrap">{route.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="pt-8 space-y-4">
          <button className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900/50 border border-white/5 py-3 hover:bg-gray-800 transition-all ${sidebarOpen ? 'px-4' : 'px-0'}`}>
            <Download size={20} className="text-orange-500" />
            {sidebarOpen && <span className="text-sm font-bold text-white whitespace-nowrap">Download APK</span>}
          </button>

          <div className={`flex items-center gap-3 rounded-xl bg-gray-900/30 p-3 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
               <Moon size={20} className="text-gray-500 shrink-0" />
               {sidebarOpen && <span className="text-sm font-medium text-gray-400 whitespace-nowrap">Dark Theme</span>}
            </div>
            {sidebarOpen && (
              <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-orange-600/30 ring-1 ring-orange-500/50">
                <span className="absolute right-1 leading-none text-orange-500 text-[10px]">ON</span>
                <div className="h-3 w-3 translate-x-5 rounded-full bg-orange-500 shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
