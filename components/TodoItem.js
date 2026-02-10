import { useState, useRef, useEffect } from "react";
import { MoreVertical, Check, Trash2, Edit3, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
      className="flex justify-between items-center bg-white dark:bg-[#0a0a0a] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-[#1a1a1a] mb-3 relative group hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center flex-1">
        {/* Custom Checkbox */}
        <motion.div
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleComplete(todo.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleComplete(todo.id);
            }
          }}
          tabIndex={0}
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-[#1a1a1a] hover:border-[#033487] dark:hover:border-[#00ff88]"
            }`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </motion.div>

        {isEditing ? (
          <motion.input
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="ml-3 w-full px-3 py-1.5 border border-[#033487] dark:border-[#00ff88] rounded-lg bg-white dark:bg-[#0a0a0a] text-black dark:text-white focus:outline-none shadow-sm"
          />
        ) : (
          <span
            onClick={() => onToggleComplete(todo.id)}
            className={`ml-3 cursor-pointer text-lg transition-all ${todo.completed ? "line-through text-gray-400 dark:text-gray-500 opacity-60" : "text-gray-700 dark:text-gray-200 font-medium"
              }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Three-dot menu */}
      <div className="relative ml-4" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <MoreVertical size={20} />
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute right-0 mt-2 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-xl shadow-xl w-36 z-20 py-1 overflow-hidden transition-colors"
            >
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-blue-600 dark:text-[#00ff88] transition-colors"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEditClick}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

  );
};

export default TodoItem;

