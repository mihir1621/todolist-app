import { useState, useRef, useEffect } from "react";
import { MoreVertical, Check, Trash2, Edit3, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete, onDeleteCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        backgroundColor: todo.completed ? "rgba(0, 255, 136, 0.03)" : "var(--card-bg)"
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        transition: { duration: 0.2, ease: "easeIn" }
      }}
      layout
      whileHover={{ y: -2 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        backgroundColor: { duration: 0.3 }
      }}
      className={`flex justify-between items-center bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-[#1a1a1a] mb-4 relative group transition-all duration-300 ${todo.completed ? "border-green-500/30 dark:border-[#00ff88]/20" : ""
        }`}
    >
      <div className="flex items-center flex-1">
        {/* Custom Checkbox */}
        <motion.div
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggleComplete(todo.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleComplete(todo.id);
            }

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              const checkboxes = Array.from(document.querySelectorAll('[role="checkbox"]'));
              const index = checkboxes.indexOf(e.currentTarget);
              const nextIndex = e.key === 'ArrowDown' ? index + 1 : index - 1;

              if (checkboxes[nextIndex]) {
                e.preventDefault();
                checkboxes[nextIndex].focus();
                if (e.shiftKey) checkboxes[nextIndex].click();
              }
            }

            if (e.key === 'Delete' && todo.completed) {
              e.preventDefault();
              onDeleteCompleted();
            }
          }}
          tabIndex={0}
          role="checkbox"
          aria-checked={todo.completed}
          className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all relative overflow-hidden ${todo.completed
              ? "bg-[#033487] dark:bg-[#00ff88] border-[#033487] dark:border-[#00ff88] shadow-lg shadow-green-500/20"
              : "border-gray-300 dark:border-[#1a1a1a] hover:border-[#033487] dark:hover:border-[#00ff88] bg-transparent"
            }`}
        >
          <AnimatePresence>
            {todo.completed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white flex items-center justify-center"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.1
                    }}
                  />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {isEditing ? (
          <motion.input
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="ml-4 w-full px-4 py-2 border-2 border-[#033487] dark:border-[#00ff88] rounded-xl bg-white dark:bg-[#0a0a0a] text-black dark:text-white focus:outline-none shadow-sm"
            autoFocus
          />
        ) : (
          <motion.span
            layout
            onClick={() => onToggleComplete(todo.id)}
            className={`ml-4 cursor-pointer text-lg tracking-tight transition-all duration-500 select-none ${todo.completed
                ? "line-through text-gray-400 dark:text-gray-500 opacity-50 italic translate-x-1"
                : "text-gray-700 dark:text-gray-200 font-semibold"
              }`}
          >
            {todo.text}
          </motion.span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="relative ml-4 flex items-center space-x-2">
        <AnimatePresence mode="wait">
          {todo.completed ? (
            <motion.button
              key="trash"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(todo.id)}
              className="p-2.5 rounded-xl text-red-500 dark:text-red-400 transition-colors"
              title="Delete Task"
            >
              <Trash2 size={20} />
            </motion.button>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              ref={dropdownRef}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <MoreVertical size={20} />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" }}
                    className="absolute right-0 mt-3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-100 dark:border-[#1a1a1a] rounded-2xl shadow-2xl w-40 z-30 py-2 overflow-hidden shadow-black/10"
                  >
                    {isEditing ? (
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 text-blue-600 dark:text-[#00ff88] font-medium transition-colors"
                      >
                        <Save size={18} />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleEditClick}
                        className="flex items-center space-x-3 w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                      >
                        <Edit3 size={18} />
                        <span>Edit</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TodoItem;
