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
      className="flex w-full max-w-2xl mx-auto space-x-3 mb-8"
    >
      {/* Input Box */}
      <motion.input
        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(0, 255, 136, 0.3)" }}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your todos..."
        className="flex-grow p-4 rounded-xl border border-gray-200 dark:border-[#1a1a1a] shadow-sm focus:outline-none focus:border-[#00ff88] dark:focus:border-[#00ff88] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm transition-all"
      />

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#00cc6a" }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-6 py-4 bg-[#033487] text-black rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-colors"
      >
        <span className="text-lg">➕</span>
        <span>Add Task</span>
      </motion.button>
    </motion.form>

  );
}

