import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
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
  MdLogout,
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight,
  MdAccountBalanceWallet,
  MdHistory,
  MdTrendingUp,
  MdSettings,
  MdBuild,
  MdCategory,
  MdGamepad,
} from 'react-icons/md';
import {
  FaFutbol,
  FaHorseHead,
  FaDog,
  FaPlus,
  FaGamepad,
  FaTennisBall,
} from 'react-icons/fa';
import {GiCricketBat, GiTennisRacket} from 'react-icons/gi';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

interface MenuItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  subroutes?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  subroutes?: SubMenuItem[];
}

const Sidebar = ({
  onCollapseChange,
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const location = useLocation();
  const {pathname} = location;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    new Set(['Sports']),
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isMobileDevice = isMobile !== undefined ? isMobile : isMobileState;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileState(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      if (width >= 640 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (setSidebarOpen) setSidebarOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileDevice) {
      setIsMobileMenuOpen(false);
      if (setSidebarOpen) setSidebarOpen(false);
    }
  }, [pathname, isMobileDevice]);

  // Sync with parent sidebarOpen state
  useEffect(() => {
    if (sidebarOpen !== undefined) {
      setIsMobileMenuOpen(sidebarOpen);
    }
  }, [sidebarOpen]);

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    if (onCollapseChange) onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const toggleSubmenu = (label: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isCollapsed && !isMobileDevice) return;
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  const handleLinkClick = (path: string) => {
    if (isMobileDevice) {
      setIsMobileMenuOpen(false);
      if (setSidebarOpen) setSidebarOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  // Simplified menu structure - only Home, In-Play, and Sports with subroutes
  const allMenuItems: MenuItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: <MdHome size={22} className="text-orange-500" />,
    },
    {
      label: 'In-Play',
      path: '/in-play',
      icon: <MdPlayArrow size={22} className="text-red-500" />,
    },
    {
      label: 'Sports',
      icon: <MdSportsCricket size={22} className="text-green-600" />,
      subroutes: [
        {
          label: 'Cricket',
          path: '/sports/cricket',
          icon: <GiCricketBat size={18} className="text-red-600" />,
          subroutes: [
            {
              label: 'Indian Premier League',
              path: '/cricket/indian',
              icon: <MdEmojiEvents size={16} className="text-yellow-600" />,
              subroutes: [
                {
                  label: 'Indian Premier League',
                  path: '/sports/cricket/ipl/overview',
                },
                {
                  label: 'Rajasthan Royals v Delhi Capitals',
                  path: '/sports/cricket/ipl/rr-vs-dc',
                },
                {
                  label: 'Chennai Super Kings v Mumbai Indians',
                  path: '/sports/cricket/ipl/csk-vs-mi',
                },
                {
                  label: 'Sunrisers Hyderabad v Kolkata Knight Riders',
                  path: '/sports/cricket/ipl/srh-vs-kkr',
                },
                {
                  label: 'Gujarat Titans v Punjab Kings',
                  path: '/sports/cricket/ipl/gt-vs-pbks',
                },
              ],
            },
            {
              label: 'County Championship',
              path: '/sports/cricket/county',
              icon: <MdCategory size={16} />,
            },
            {
              label: 'International Twenty20 Matches',
              path: '/sports/cricket/t20',
              icon: <MdGamepad size={16} />,
            },
            {
              label: 'Pakistan Super League',
              path: '/sports/cricket/psl',
              icon: <MdEmojiEvents size={16} />,
            },
            {
              label: 'Womens International Twenty20 Matches',
              path: '/sports/cricket/womens-t20',
              icon: <MdGamepad size={16} />,
            },
          ],
        },
        {
          label: 'Soccer',
          path: '/sports/soccer',
          icon: <FaFutbol size={18} className="text-gray-700" />,
          subroutes: [
            {label: 'Italian Serie A', path: '/sports/soccer/serie-a'},
            {label: 'Spanish La Liga', path: '/sports/soccer/la-liga'},
            {label: 'Danish Superliga', path: '/sports/soccer/superliga'},
            {
              label: 'Turkish Super League',
              path: '/sports/soccer/super-league',
            },
            {label: 'Spanish Segunda Division', path: '/sports/soccer/segunda'},
          ],
        },
        {
          label: 'Tennis',
          path: '/sports/tennis',
          icon: <GiTennisRacket size={18} className="text-lime-600" />,
          subroutes: [
            {label: 'ATP Tour', path: '/sports/tennis/atp'},
            {label: 'WTA Tour', path: '/sports/tennis/wta'},
            {label: 'Grand Slams', path: '/sports/tennis/grand-slams'},
          ],
        },
        {
          label: 'Horse Racing',
          path: '/sports/horse',
          icon: <FaHorseHead size={18} className="text-amber-800" />,
        },
        {
          label: 'Greyhound',
          path: '/sports/greyhound',
          icon: <FaDog size={18} className="text-amber-900" />,
        },
      ],
    },
  ];

  const menuItems = allMenuItems;

  const isActive = (itemPath: string) => {
    if (itemPath === '/') return pathname === itemPath;
    return pathname === itemPath || pathname.startsWith(itemPath + '/');
  };

  const isSubrouteActive = (subroutePath: string) => {
    return pathname === subroutePath || pathname.startsWith(subroutePath + '/');
  };

  // Recursive function to render nested subroutes
  const renderSubRoutes = (subroutes: SubMenuItem[], level: number = 0) => {
    const marginLeft = level === 0 ? 'ml-6' : 'ml-4';
    const paddingLeft = level === 0 ? 'pl-2' : 'pl-4';

    return (
      <ul
        className={`tree-node-group space-y-0.5 border-l border-stroke ${marginLeft} ${paddingLeft}`}
      >
        {subroutes.map((subroute) => {
          const hasSubRoutes =
            subroute.subroutes && subroute.subroutes.length > 0;
          const isExpanded = expandedMenus.has(subroute.label);
          const isSubActive = isSubrouteActive(subroute.path);

          if (hasSubRoutes) {
            return (
              <li
                key={subroute.label}
                role="treeitem"
                className="tree-branch-wrapper"
              >
                <button
                  onClick={(e) => toggleSubmenu(subroute.label, e)}
                  className={`tree-node tree-node__branch flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                    isSubActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {subroute.icon && (
                      <span className="inline-flex h-5 w-5 items-center justify-center">
                        {subroute.icon}
                      </span>
                    )}
                    <span className="innertext">{subroute.label}</span>
                  </div>
                  <MdExpandMore
                    className={`text-gray-400 text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={{height: 0, opacity: 0}}
                      transition={{duration: 0.2}}
                      className="overflow-hidden"
                    >
                      {subroute.subroutes &&
                        renderSubRoutes(subroute.subroutes, level + 1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          }

          return (
            <li
              key={subroute.label}
              role="none"
              className="tree-leaf-list-item"
            >
              <Link
                to={subroute.path}
                onClick={() => handleLinkClick(subroute.path)}
                className={`tree-node tree-node__leaf flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                  isSubActive
                    ? 'tree-node--selected bg-orange-100 font-medium text-orange-600'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {subroute.icon && (
                  <span className="inline-flex h-4 w-4 items-center justify-center">
                    {subroute.icon}
                  </span>
                )}
                <span className="innertext">{subroute.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasSubroutes = item.subroutes && item.subroutes.length > 0;
    const isExpanded = expandedMenus.has(item.label);
    const isItemActive = item.path ? isActive(item.path) : false;
    const isAnySubrouteActive =
      hasSubroutes && checkAnySubrouteActive(item.subroutes!);
    const isActuallyCollapsed = isCollapsed && !isMobileDevice;

    if (hasSubroutes) {
      return (
        <li key={item.label} className="w-full">
          <button
            onClick={(e) => {
              if (isActuallyCollapsed && !isMobileDevice) {
                // Don't expand submenu when collapsed
                return;
              }
              toggleSubmenu(item.label, e);
            }}
            className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 ${
              isItemActive || isAnySubrouteActive
                ? 'active bg-gradient-to-r from-orange-500 to-red-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center">
                {item.icon}
              </span>
              {(!isActuallyCollapsed || isMobileDevice) && (
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              )}
            </div>
            {(!isActuallyCollapsed || isMobileDevice) && (
              <MdExpandMore
                className={`text-gray-400 text-base transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            )}
          </button>

          <AnimatePresence>
            {!isActuallyCollapsed && isExpanded && (
              <motion.div
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
                transition={{duration: 0.2}}
                className="sidetree overflow-hidden"
              >
                {item.subroutes && renderSubRoutes(item.subroutes, 0)}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      );
    }

    return (
      <li key={item.label} className="w-full">
        <Link
          to={item.path!}
          onClick={() => handleLinkClick(item.path!)}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
            isActive(item.path!)
              ? 'active bg-gradient-to-r from-orange-500 to-red-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center">
            {item.icon}
          </span>
          {(!isCollapsed || isMobileDevice) && (
            <span className="text-sm font-semibold tracking-tight">
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  // Helper function to check if any subroute is active
  const checkAnySubrouteActive = (subroutes: SubMenuItem[]): boolean => {
    for (const subroute of subroutes) {
      if (isSubrouteActive(subroute.path)) return true;
      if (subroute.subroutes && checkAnySubrouteActive(subroute.subroutes))
        return true;
    }
    return false;
  };

  const getSidebarWidth = () => {
    if (isMobileDevice) return 'w-72';
    if (isTablet) return 'w-64';
    return isCollapsed ? 'w-20' : 'w-64';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileDevice && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (setSidebarOpen) setSidebarOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`sidebar fixed left-0 top-0 z-50 flex h-full flex-col bg-white shadow-xl transition-all duration-300 ${getSidebarWidth()} ${
          isMobileDevice && !isMobileMenuOpen
            ? '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Logo Header */}
        <div className="border-b border-stroke px-4 py-4">
          {isCollapsed && !isMobileDevice ? (
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                <span className="font-serif text-lg font-bold text-white">
                  F
                </span>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif text-xl font-bold text-transparent">
                Fairexch
              </h1>
              <p className="text-gray-400 mt-1 text-[8px] uppercase tracking-[0.2em]">
                Online Betting Platform
              </p>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        {!isMobileDevice && !isTablet && (
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-20 z-10 rounded-full bg-orange-500 p-1 text-white shadow-md transition-all hover:bg-orange-600"
          >
            {isCollapsed ? (
              <MdChevronRight size={16} />
            ) : (
              <MdChevronLeft size={16} />
            )}
          </button>
        )}

        {/* Navigation - with proper scrolling */}
        <div className="scrollbar-hide flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">{menuItems.map(renderMenuItem)}</ul>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 border-t border-stroke p-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-gray-600 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all hover:bg-red-50 hover:text-red-600"
          >
            <MdLogout size={18} />
            {(!isCollapsed || isMobileDevice) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* CSS for sidebar styles */}
      <style>{`
        .sidebar {
          background-color: #ffffff;
        }
        
        .sidebar .active {
          background: linear-gradient(135deg, #ff7e00 0%, #ff4500 100%);
        }
        
        .sidebar .tree-node--selected {
          background-color: #fff7ed;
          color: #ff7e00;
          font-weight: 500;
        }
        
        .sidebar .tree-node__branch {
          cursor: pointer;
        }
        
        /* Custom scrollbar */
        .sidebar::-webkit-scrollbar {
          width: 4px;
        }
        
        .sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .sidebar::-webkit-scrollbar-thumb {
          background: #ff7e00;
          border-radius: 4px;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-hide::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: #ff7e00;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
