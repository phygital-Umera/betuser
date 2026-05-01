import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import {motion, AnimatePresence} from 'framer-motion';

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
    new Set(['Sports', 'Cricket', 'Indian Premier League']),
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

  const toggleSubmenu = (label: string) => {
    if (isCollapsed) return;
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  const handleLinkClick = () => {
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

  // Complete menu structure matching HTML
  const allMenuItems: MenuItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/home-icon.png"
          alt="home"
          className="h-5 w-5"
        />
      ),
    },
    {
      label: 'In-Play',
      path: '/in-play',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/inplay-icon.png"
          alt="inplay"
          className="h-5 w-5"
        />
      ),
    },
    {
      label: 'Election',
      path: '/election',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/election-icon.png"
          alt="election"
          className="h-5 w-5"
        />
      ),
    },
    {
      label: 'IPL 2026',
      path: '/ipl',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/winner-icon.png"
          alt="ipl"
          className="h-5 w-5"
        />
      ),
    },
    {
      label: 'Sports',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/sports-icon.png"
          alt="sports"
          className="h-5 w-5"
        />
      ),
      subroutes: [
        {
          label: 'Cricket',
          path: '/sports/cricket',
          icon: (
            <img
              src="https://images.rajabet.fun/newtheme/common/cricket-icon.png"
              alt="cricket"
              className="h-4 w-4"
            />
          ),
          subroutes: [
            {
              label: 'Indian Premier League',
              path: '/sports/cricket/ipl',
              icon: (
                <i className="fa fa-minus-square text-gray-500 text-xs"></i>
              ),
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
            {label: 'County Championship', path: '/sports/cricket/county'},
            {
              label: 'International Twenty20 Matches',
              path: '/sports/cricket/t20',
            },
            {label: 'Pakistan Super League', path: '/sports/cricket/psl'},
            {
              label: 'Womens International Twenty20 Matches',
              path: '/sports/cricket/womens-t20',
            },
          ],
        },
        {
          label: 'Soccer',
          path: '/sports/soccer',
          icon: (
            <img
              src="https://images.rajabet.fun/newtheme/common/soccer-icon.png"
              alt="soccer"
              className="h-4 w-4"
            />
          ),
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
          icon: (
            <img
              src="https://images.rajabet.fun/newtheme/common/tennis-icon.png"
              alt="tennis"
              className="h-4 w-4"
            />
          ),
          subroutes: [
            {label: 'ATP Tour', path: '/sports/tennis/atp'},
            {label: 'WTA Tour', path: '/sports/tennis/wta'},
            {label: 'Grand Slams', path: '/sports/tennis/grand-slams'},
          ],
        },
        {
          label: 'Horse',
          path: '/sports/horse',
          icon: (
            <img
              src="https://images.rajabet.fun/newtheme/common/horse-icon.png"
              alt="horse"
              className="h-4 w-4"
            />
          ),
        },
        {
          label: 'Greyhound',
          path: '/sports/greyhound',
          icon: (
            <img
              src="https://images.rajabet.fun/newtheme/common/greyhound-icon.png"
              alt="greyhound"
              className="h-4 w-4"
            />
          ),
        },
      ],
    },
    {
      label: 'Casino',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/casino-icon.png"
          alt="casino"
          className="h-5 w-5"
        />
      ),
      subroutes: [
        {label: 'Live Casino', path: '/casino/live'},
        {label: 'Slots', path: '/casino/slots'},
        {label: 'Table Games', path: '/casino/table'},
      ],
    },
    {
      label: 'Supports',
      path: '/support',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/support-icon.png"
          alt="support"
          className="h-5 w-5"
        />
      ),
    },
    {
      label: "FAQ's",
      path: '/faq',
      icon: (
        <img
          src="https://images.rajabet.fun/newtheme/common/faq-icon.png"
          alt="faq"
          className="h-5 w-5"
        />
      ),
    },
  ];

  const menuItems = allMenuItems;

  const isActive = (itemPath: string) => {
    if (itemPath === '/') return pathname === itemPath;
    return pathname.startsWith(itemPath);
  };

  const isSubrouteActive = (subroutePath: string) => {
    return pathname === subroutePath || pathname.startsWith(subroutePath + '/');
  };

  // Recursive function to render nested subroutes
  const renderSubRoutes = (subroutes: SubMenuItem[], level: number = 0) => {
    const marginLeft = level === 0 ? 'ml-6' : 'ml-4';

    return (
      <ul
        className={`tree-node-group border-gray-200 space-y-0.5 border-l pl-2 ${marginLeft}`}
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
                  onClick={() => toggleSubmenu(subroute.label)}
                  className={`tree-node tree-node__branch flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                    isSubActive
                      ? 'text-orange-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="treeview-icon inline-flex h-4 w-4 items-center justify-center">
                      <i
                        className={`fa fa-${isExpanded ? 'minus' : 'plus'}-square text-gray-500 text-xs`}
                      ></i>
                    </span>
                    <span className="innertext">{subroute.label}</span>
                  </div>
                  <i className="fa fa-caret-down text-gray-400 text-xs transition-transform duration-300"></i>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={{height: 0, opacity: 0}}
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
                onClick={handleLinkClick}
                className={`tree-node tree-node__leaf flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                  isSubActive
                    ? 'tree-node--selected bg-orange-50 font-medium text-orange-600'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
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
            onClick={() => toggleSubmenu(item.label)}
            className={`group flex w-full items-center justify-between px-3 py-2.5 transition-all duration-200 ${
              isItemActive || isAnySubrouteActive
                ? 'active bg-gradient-to-r from-orange-500 to-red-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="sports-icon sideiconbg inline-flex h-6 w-6 items-center justify-center">
                {item.icon}
              </span>
              {(!isActuallyCollapsed || isMobileDevice) && (
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              )}
            </div>
            {(!isActuallyCollapsed || isMobileDevice) && (
              <span className="sidearrow">
                <i
                  className={`fa fa-caret-down text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                ></i>
              </span>
            )}
          </button>

          <AnimatePresence>
            {!isActuallyCollapsed && isExpanded && (
              <motion.div
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
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
          onClick={handleLinkClick}
          className={`group flex w-full items-center gap-3 px-3 py-2.5 transition-all duration-200 ${
            isActive(item.path!)
              ? 'active bg-gradient-to-r from-orange-500 to-red-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="sports-icon sideiconbg inline-flex h-6 w-6 items-center justify-center">
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
        <ul className="space-y-1 px-2 py-3">
          {menuItems.map(renderMenuItem)}

          {/* Download APK Button */}
          <li className="mb-2 mt-2">
            <button className="loginbtn w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90">
              Download APK
            </button>
          </li>

          {/* Dark Theme Toggle */}
          <li className="mb-2 mt-2">
            <div className="align-items-baseline flex w-full items-center justify-between rounded-lg px-3 py-2.5">
              <div className="align-items-center flex w-3/4 items-center gap-3">
                <span className="sports-icon casino sideiconbg inline-flex h-6 w-6 items-center justify-center">
                  <img
                    alt="darkmode"
                    src="https://images.rajabet.fun/newtheme/common/darktheme-icon.png"
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span className="text-gray-700 text-sm">Dark Theme</span>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input switch-bigger bg-gray-300 h-5 w-9 cursor-pointer rounded-full transition-colors checked:bg-orange-500"
                  id="mySwitch"
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
              </div>
            </div>
          </li>
        </ul>
      </aside>

      {/* CSS for sidebar styles matching HTML */}
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
        
        .form-check-input:checked {
          background-color: #ff7e00;
          border-color: #ff7e00;
        }
        
        .form-check-input {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: center;
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
        
        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #ff4500;
        }
        
        /* Animation for tree nodes */
        .tree-node-group {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
