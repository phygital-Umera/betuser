import React, {useState} from 'react';
import {
  Zap,
  Trophy,
  Vote,
  Activity,
  Plane,
  Bird,
  Dices,
  Coins,
  Gamepad2,
  Search,
  Menu,
  X,
  Eye,
  EyeOff,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { GiCricketBat, GiTennisRacket } from 'react-icons/gi';
import { FaFutbol } from 'react-icons/fa';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isLive?: boolean;
  color?: string;
  path?: string;
  onClick?: () => void;
}

const NavItem = (props: NavItemProps) => {
  const {icon, label, isLive, color = 'bg-gray-800', onClick} = props;
  return (
    <motion.div
      whileHover={{y: -2}}
      onClick={onClick}
      className="group flex min-w-[70px] cursor-pointer flex-col items-center justify-center"
    >
      <div
        className={`relative h-10 w-10 ${color} mb-1 flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all group-hover:ring-2 group-hover:ring-orange-500`}
      >
        {isLive && (
          <div className="absolute right-0 top-0 z-10 rounded-bl-md border-b border-l border-white/20 bg-red-600 px-1 text-[8px] font-bold">
            LIVE
          </div>
        )}
        <div className="text-white transition-transform group-hover:scale-110">
          {icon}
        </div>
      </div>
      <span className="whitespace-nowrap text-center text-[10px] font-bold uppercase leading-tight tracking-tight text-white">
        {label}
      </span>
    </motion.div>
  );
};

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

// Social Icon Component for Login Modal
const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-gray-50 hover:border-slate-400 transition-all">
    {icon}
  </button>
);

// Login Modal Component
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('ak91');
  const [password, setPassword] = useState('password');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          
          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border-2 border-[#ff4d00] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Right Side Top */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 text-gray-500 hover:text-black hover:bg-gray-100 p-1.5 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="pt-6 pb-2 text-center">
                <h1 className="text-2xl font-bold text-[#ff4d00]">Login</h1>
                <div className="w-full h-1 bg-[#ff4d00] mt-4 shadow-sm" />
              </div>

              <div className="p-6 md:p-8 space-y-5">
                {/* User ID Field */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">User ID</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-[#eef2ff] border border-slate-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00] transition-all"
                    placeholder="Enter User ID"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#eef2ff] border border-slate-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d00] transition-all pr-10"
                      placeholder="Enter Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-2 border-slate-800 rounded checked:bg-[#ff4d00] transition-all cursor-pointer accent-[#ff4d00]"
                  />
                  <label htmlFor="remember" className="text-xs font-medium text-slate-800 cursor-pointer">
                    Remember me
                  </label>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      console.log('Login clicked', { userId, password });
                      onClose();
                    }}
                    className="bg-[#0f172a] text-white font-bold py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all text-sm"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setUserId('demo123');
                      setPassword('demo123');
                    }}
                    className="bg-[#0f172a] text-white font-bold py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all text-sm"
                  >
                    Demo ID
                  </motion.button>
                </div>

                {/* Separator */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dotted border-[#ff4d00]"></div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="text-center space-y-3">
                  <p className="text-xs font-semibold text-slate-700">Connect with us</p>
                  <div className="flex justify-center flex-wrap gap-2">
                    <SocialIcon icon={<MessageCircle className="w-5 h-5 text-green-500" />} />
                    <SocialIcon icon={<Send className="w-5 h-5 text-sky-500" />} />
                    <SocialIcon icon={<Facebook className="w-5 h-5 text-blue-600" />} />
                    <SocialIcon icon={<Instagram className="w-5 h-5 text-pink-600" />} />
                    <SocialIcon icon={<Twitter className="w-5 h-5 text-black" />} />
                    <SocialIcon icon={<Youtube className="w-5 h-5 text-red-600" />} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = ({sidebarOpen, setSidebarOpen}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
    {
      icon: <GiCricketBat size={20} className="text-red-500" />,
      label: 'Cricket',
      color: 'bg-slate-800',
      path: '/cricket/indian',
    },
    {
      icon: <FaFutbol size={20} className="text-white" />,
      label: 'Soccer',
      color: 'bg-slate-800',
      path: '/soccer',
    },
    {
      icon: <GiTennisRacket size={20} className="text-lime-500" />,
      label: 'Tennis',
      color: 'bg-slate-800',
      path: '/tennis',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header className="border-gray-800 sticky top-0 z-50 w-full border-b bg-[#000000]">
        <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between gap-4 px-4">
          {/* Left Section - Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="text-red-600">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 5V35M20 5H10V15M20 35H30V25M5 20H35M5 20V10H15M35 20V30H25"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="10" r="2" fill="white" />
                <circle cx="30" cy="30" r="2" fill="white" />
                <circle cx="10" cy="30" r="2" fill="white" />
                <circle cx="30" cy="10" r="2" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-black italic tracking-tighter text-white">
                SWASTIK
              </h1>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Online Book
              </span>
            </div>
          </div>

          {/* Center Section - Navigation Items (Centered) - Desktop Only */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="no-scrollbar flex items-center gap-6 overflow-x-auto">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isLive={item.isLive}
                  color={item.color}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex shrink-0 items-center gap-4">
            {/* Search Icon */}
            <div className="hidden sm:block">
              <Search
                size={20}
                className="text-gray-400 cursor-pointer transition-colors hover:text-white"
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={handleLogin}
              className="relative rounded-full border-2 border-orange-500 bg-[#1A1A1A] px-6 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] sm:px-8 sm:py-2 sm:text-sm"
            >
              Login
            </motion.button>

            {/* ONLY Mobile Menu Toggle - Shows on mobile/tablet (below lg) */}
            <button
              className="text-white lg:hidden"
              onClick={() => setSidebarOpen && setSidebarOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Horizontal Nav for Mobile/Tablet - CENTERED */}
        <div className="border-gray-900 w-full border-t bg-[#050505] lg:hidden">
          <div className="flex items-center justify-center overflow-x-auto scroll-smooth px-4 py-3">
            <div className="no-scrollbar flex items-center gap-6">
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isLive={item.isLive}
                  color={item.color}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Right Drawer Menu - Additional options */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'spring', damping: 25, stiffness: 200}}
              className="fixed inset-0 z-50 flex flex-col bg-black p-6 pt-20 lg:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-red-600">
                      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        <path
                          d="M20 5V35M20 5H10V15M20 35H30V25M5 20H35M5 20V10H15M35 20V30H25"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="10" cy="10" r="2" fill="white" />
                        <circle cx="30" cy="30" r="2" fill="white" />
                        <circle cx="10" cy="30" r="2" fill="white" />
                        <circle cx="30" cy="10" r="2" fill="white" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-white">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="bg-gray-800 h-px" />
                <button className="w-full rounded-xl bg-orange-600 py-4 font-bold text-white shadow-lg shadow-orange-600/30 transition hover:bg-orange-500">
                  Deposit Now
                </button>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <button className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-bold transition hover:bg-white/10">
                    My Bets
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-bold transition hover:bg-white/10">
                    Promotions
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Header;