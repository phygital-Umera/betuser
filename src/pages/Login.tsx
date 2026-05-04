import React, { useState } from 'react';
import { Eye, EyeOff, X, MessageCircle, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('ak91');
  const [password, setPassword] = useState('password');

  const orangeColor = '#ff4d00';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border-2 border-[#ff4d00] overflow-hidden relative"
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-black hover:bg-gray-100 p-1 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pt-6 pb-2 text-center">
          <h1 className="text-2xl font-bold text-[#ff4d00]">Login</h1>
          <div className="w-full h-1 bg-[#ff4d00] mt-4 shadow-sm" />
        </div>

        <div className="p-8 space-y-6">
          {/* User ID Field */}
          <div className="space-y-1">
            <div className="relative border-b border-gray-100 pb-1">
              <label className="text-xs text-gray-500 font-medium ml-3">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-[#eef2ff] border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="relative">
              <label className="text-xs text-gray-500 font-medium ml-3">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#eef2ff] border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d00] transition-all pr-10"
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
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 border-2 border-slate-800 rounded checked:bg-[#ff4d00] transition-all cursor-pointer accent-[#ff4d00]"
            />
            <label htmlFor="remember" className="text-sm font-medium text-slate-800 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0f172a] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0f172a] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all"
            >
              Demo ID
            </motion.button>
          </div>

          {/* Separator */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dotted border-[#ff4d00]"></div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-slate-700">Connect with us</p>
            <div className="flex justify-center flex-wrap gap-2">
              <SocialIcon icon={<MessageCircle className="w-5 h-5 text-green-500 fill-green-500/20" />} />
              <SocialIcon icon={<Send className="w-5 h-5 text-sky-500" />} />
              <SocialIcon icon={<Facebook className="w-5 h-5 text-blue-600 fill-blue-600" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5 text-pink-600" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5 text-black" />} />
              <SocialIcon icon={<Youtube className="w-5 h-5 text-red-600 fill-red-600" />} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-gray-50 hover:border-slate-400 transition-all">
    {icon}
  </button>
);

export default Login;
