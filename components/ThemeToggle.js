import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-colors border border-transparent">
                <div className="h-3.5 w-3.5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
            </div>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#033487] dark:focus:ring-blue-400"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: 20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {isDark ? (
                        <Moon className="w-3.5 h-3.5 text-[#00ff88]" />
                    ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
