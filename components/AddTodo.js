import { useState } from "react";
import { motion } from "framer-motion";

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onAdd(text);
      setText("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl mx-auto space-x-2 md:space-x-3 mb-8"
    >
      {/* Input Box */}
      <motion.input
        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 12px rgba(0, 255, 136, 0.2)" }}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your todos..."
        className="flex-grow p-3.5 md:p-4 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm focus:outline-none border-transparent focus:border-[#00ff88] dark:focus:border-[#00ff88] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white/50 dark:bg-white/5 backdrop-blur-md transition-all text-base md:text-lg font-medium"
      />

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-4 md:px-6 py-3.5 md:py-4 bg-[#00ff88] text-black rounded-xl font-bold flex items-center justify-center space-x-0 md:space-x-2 shadow-lg shadow-green-500/20 active:bg-green-400 transition-colors"
      >
        <span className="text-xl md:text-lg">➕</span>
        <span className="hidden md:inline">Add Task</span>
      </motion.button>
    </motion.form>

  );
}

