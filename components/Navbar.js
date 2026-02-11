import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { LayoutDashboard, UsersRound, Clock, Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Workspace", icon: <LayoutDashboard size={18} />, action: () => console.log('Workspace clicked') },
    { name: "Team", icon: <UsersRound size={18} />, action: () => console.log('Team clicked') },
    { name: "History", icon: <Clock size={18} />, action: () => console.log('History clicked') },
    { name: "Streaks", icon: <Zap size={18} />, action: () => console.log('Streaks clicked') },
  ];

  return (
    <nav className="bg-white/70 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-[100] border-b border-gray-100/50 dark:border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" passHref legacyBehavior>
            <a aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a] flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-green-500/20">
                  <svg className="w-6 h-6 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a] bg-clip-text text-transparent tracking-tighter">
                  Tasker
                </h1>
              </motion.div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.action}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-[#033487] dark:hover:text-[#00ff88] hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2"
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-100 dark:border-white/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-black/90 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-lg font-bold text-gray-600 dark:text-gray-300 hover:bg-[#033487]/5 dark:hover:bg-[#00ff88]/5 hover:text-[#033487] dark:hover:text-[#00ff88] transition-all border border-transparent hover:border-[#033487]/10 dark:hover:border-[#00ff88]/10"
                >
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5">
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
            <div className="p-6 bg-gray-50/50 dark:bg-white/5 flex items-center justify-between mt-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</p>
              <div className="scale-125 origin-right">
                {/* ThemeToggle is already in the header bar for better accessibility */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
