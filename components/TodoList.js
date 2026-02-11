import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete, onDeleteCompleted, onToggleAll }) => {
  const completedCount = todos.filter(t => t.completed).length;
  const isAllSelected = todos.length > 0 && todos.every(t => t.completed);

  return (
    <div className="w-full max-w-2xl mx-auto mt-5">
      <AnimatePresence>
        {completedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            className="flex items-center justify-between mb-4 md:mb-6 px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => onToggleAll(!isAllSelected)}
                className={`w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center transition-all relative overflow-hidden ${isAllSelected
                  ? "bg-[#033487] dark:bg-[#00ff88] border-[#033487] dark:border-[#00ff88]"
                  : "border-gray-200 dark:border-white/20 hover:border-[#033487] dark:hover:border-[#00ff88]"
                  }`}
              >
                <AnimatePresence>
                  {isAllSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 700, damping: 20 }}
                    >
                      <Check size={12} className="text-white dark:text-black md:hidden" />
                      <Check size={14} className="text-white dark:text-black hidden md:block" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex flex-col">
                <motion.h2
                  layout
                  className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center"
                >
                  Selected
                  <motion.span
                    key={completedCount}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 rounded-full ml-1.5 md:ml-2 bg-green-500/20 text-green-600 dark:text-[#00ff88]"
                  >
                    {completedCount}
                  </motion.span>
                </motion.h2>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDeleteCompleted}
              className="flex items-center space-x-0 md:space-x-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors px-3 md:px-4 py-2 md:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
            >
              <Trash2 size={16} />
              <span className="hidden md:inline">Delete Selected</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1">
        <AnimatePresence mode="popLayout" initial={false}>
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 px-4"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold dark:text-white mb-2">Clean Slate</h3>
              <p className="text-gray-500 dark:text-gray-400">All tasks completed! Take a moment to breathe.</p>
            </motion.div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleComplete={onToggleComplete}
                onDeleteCompleted={onDeleteCompleted}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;
