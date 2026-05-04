import React from 'react';
import { motion } from 'framer-motion';
import { MdHome, MdSupportAgent } from 'react-icons/md';
import { FaDice, FaFutbol, FaMicrophone } from 'react-icons/fa';
import { useNavigate, useLocation } from '@tanstack/react-router';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    
    { 
      label: 'Sports', 
      id: 'sports', 
      icon: <FaFutbol size={24} color="#f97316" />, 
      path: '/sports' 
    },
    { 
      label: 'Home', 
      id: 'home', 
      icon: <MdHome size={32} color="#ffffff" />, 
      isMain: true,
      path: '/' 
    },
    { 
      label: 'Inplay', 
      id: 'inplay', 
      icon: <FaMicrophone size={24} color="#dc2626" />, 
      badge: 'LIVE',
      path: '/play/play' 
    },
    // { 
    //   label: 'Support', 
    //   id: 'support', 
    //   icon: <img src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" className="h-6 w-6" alt="WA" />,
    //   path: '/support' 
    // },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-[#0F0F1B] px-2 pb-3 pt-2 lg:hidden rounded-t-2xl border-t border-white/10 shadow-2xl">
      <div className="flex items-end justify-around px-2 max-w-md mx-auto">
        {items.map((item) => (
          <div key={item.id} className="relative flex flex-col items-center justify-center">
            {item.isMain ? (
              <div className="relative -top-7">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavigation(item.path)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_8px_20px_rgba(234,88,12,0.5)] border-4 border-[#0F0F1B]"
                >
                  {item.icon}
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center gap-1 px-3 py-1 transition-all duration-200"
              >
                <div className="relative">
                  <div className={`transition-all duration-200 ${isActive(item.path) ? 'scale-110' : 'scale-100'}`}>
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="absolute -right-3 -top-2 rounded-full bg-red-600 px-1 py-0.5 text-[8px] font-bold text-white animate-pulse shadow-lg">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold capitalize transition-all duration-200 ${
                  isActive(item.path) ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;