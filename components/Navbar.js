import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="py-6 px-8 flex justify-between items-center bg-white/50 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/50 dark:border-[#1a1a1a] transition-colors">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer flex items-center space-x-2"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a] flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a] bg-clip-text text-transparent">
          Tasker
        </h1>
      </motion.div>
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          <span className="hover:text-[#033487] dark:hover:text-[#00ff88] cursor-pointer transition-colors">Workspace</span>
          <span className="hover:text-[#033487] dark:hover:text-[#00ff88] cursor-pointer transition-colors">Team</span>
          <span className="hover:text-[#033487] dark:hover:text-[#00ff88] cursor-pointer transition-colors">Archive</span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}



