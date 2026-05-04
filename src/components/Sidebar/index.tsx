import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
  MdHome,
  MdPlayArrow,
  MdHowToVote,
  MdEmojiEvents,
  MdSportsCricket,
  MdCasino,
  MdSupportAgent,
  MdHelp,
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import {FaFutbol, FaHorseHead, FaDog} from 'react-icons/fa';
import {GiCricketBat, GiTennisRacket} from 'react-icons/gi';
import {useNavigate, useLocation} from '@tanstack/react-router';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

interface MenuItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
  isLive?: boolean;
  path?: string;
  subroutes?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
  path?: string;
  subroutes?: SubMenuItem[];
}

const Sidebar = ({
  onCollapseChange,
  isMobile: isMobileProp,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    new Set(['Sports']),
  );
  const [activeItemId, setActiveItemId] = useState('home');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 1024;
      setIsMobile(mobile);
      if (width < 1024 && !isCollapsed) {
        setIsCollapsed(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed]);

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const toggleSubmenu = (label: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isCollapsed && !isMobile) return;
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  const handleNavigation = (path: string, id: string) => {
    setActiveItemId(id);
    if (isMobile && setSidebarOpen) {
      setSidebarOpen(false);
    }
    if (path) navigate({to: path});
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      id: 'home',
      icon: <MdHome size={22} className="text-orange-500" />,
      path: '/',
    },
    {
      label: 'In-Play',
      id: 'in-play',
      isLive: true,
      icon: <MdPlayArrow size={22} className="text-red-500" />,
      path: '/play/play',
    },

    {
      label: 'Sports',
      id: 'sports',
      path: '/sports',
      icon: <MdSportsCricket size={22} className="text-green-600" />,
      subroutes: [
        {
          label: 'Cricket',
          id: 'cricket',
          icon: <GiCricketBat size={18} className="text-red-600" />,
          path: '/cricket/indian',
        },
        {
          label: 'Soccer',
          id: 'soccer',
          icon: <FaFutbol size={18} className="text-black" />,
          path: '/soccer',
        },
        {
          label: 'Tennis',
          id: 'tennis',
          icon: <GiTennisRacket size={18} className="text-lime-600" />,
          path: '/tennis',
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const hasSubroutes = item.subroutes && item.subroutes.length > 0;
    const isExpanded = expandedMenus.has(item.label);
    const isActive = activeItemId === item.id || item.path === currentPath;
    const isActuallyCollapsed = isCollapsed && !isMobile;

    return (
      <li key={item.id} className="w-full">
        <div
          onClick={() => {
            if (hasSubroutes) {
              toggleSubmenu(item.label);
            } else if (item.path) {
              handleNavigation(item.path, item.id);
            }
          }}
          className={`group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 ${
            isActive
              ? 'border-r-4 border-orange-600 bg-gradient-to-r from-orange-500/10 to-orange-500/5 text-orange-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-6 w-6 items-center justify-center">
              {item.icon}
              {item.isLive && (
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </span>
            {(!isActuallyCollapsed || isMobile) && (
              <span className="text-sm font-bold tracking-tight">
                {item.label}
              </span>
            )}
          </div>
          {hasSubroutes && (!isActuallyCollapsed || isMobile) && (
            <MdExpandMore
              className={`text-gray-400 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>

        <AnimatePresence>
          {hasSubroutes && isExpanded && (!isActuallyCollapsed || isMobile) && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="bg-gray-50/50 overflow-hidden"
            >
              <ul className="border-gray-200 ml-9 mt-1 space-y-1 border-l py-1">
                {item.subroutes?.map((sub) => (
                  <li key={sub.id}>
                    <div
                      onClick={() =>
                        sub.path && handleNavigation(sub.path, sub.id)
                      }
                      className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-xs font-bold transition-colors ${
                        activeItemId === sub.id || currentPath === sub.path
                          ? 'text-orange-600'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {sub.icon && <span>{sub.icon}</span>}
                      {sub.label}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  };

  // Desktop sidebar width
  const getSidebarWidth = () => {
    if (isMobile) return 'w-64';
    return isCollapsed ? 'w-20' : 'w-64';
  };

  return (
    <>
      {/* Mobile overlay - only shows when sidebar is open on mobile */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setSidebarOpen && setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Slides from left on mobile */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (sidebarOpen ? 0 : -320) : 0,
          width: isMobile ? 256 : isCollapsed ? 80 : 256,
        }}
        transition={{duration: 0.3, ease: 'easeInOut'}}
        className={`fixed left-0 top-20 z-50 flex h-[calc(100vh-5rem)] flex-col overflow-y-auto bg-white shadow-2xl lg:top-24 lg:h-[calc(100vh-6rem)] ${
          isMobile ? 'w-64' : isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">{menuItems.map(renderMenuItem)}</ul>
        </div>

       

        {/* Collapse toggle (Desktop only) */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="border-gray-200 hover:bg-gray-50 absolute -right-3 top-4 rounded-full border bg-white p-1 shadow-sm"
          >
            {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
          </button>
        )}
      </motion.aside>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
