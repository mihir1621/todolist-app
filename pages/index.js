import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDeleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const handleToggleComplete = (id) => {
    setTodos(prev => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleToggleAll = (completed) => {
    setTodos(prev => prev.map(todo => ({ ...todo, completed })));
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-green-500/20 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <header className="text-center mb-10 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 dark:text-white mb-4 sm:mb-6"
          >
            Stay <span className="text-[#033487] dark:text-[#00ff88]">Productive</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto px-4"
          >
            Organize your day, track your progress, and achieve your goals with our premium task management solution.
          </motion.p>
        </header>

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-white/5 p-5 md:p-8 rounded-3xl shadow-xl shadow-black/5 dark:shadow-none border border-gray-100 dark:border-white/5 mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl"
          >
            <div className="w-full sm:flex-1">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Growth Progress</span>
                <span className="text-2xl md:text-3xl font-black text-[#033487] dark:text-[#00ff88]">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/10 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.percentage}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="h-full bg-gradient-to-r from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a]"
                />
              </div>
            </div>
            <div className="text-center sm:text-right sm:pl-8 sm:border-l border-gray-100 dark:border-white/10 w-full sm:w-auto">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-2xl font-black dark:text-white leading-none">
                {stats.completed}<span className="text-gray-400 dark:text-gray-600 mx-1">/</span>{stats.total}
              </p>
            </div>
          </motion.div>
        )}

        <div className="px-0 md:px-4">
          <AddTodo onAdd={handleAddTodo} />
        </div>

        <div className="relative mt-8 md:mt-12">
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-green-500/5 rounded-3xl -z-10 blur-3xl" />
          <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} onToggleComplete={handleToggleComplete} onDeleteCompleted={handleDeleteCompleted} onToggleAll={handleToggleAll} />
        </div>
      </main>

      <footer className="py-16 text-center">
        <div className="w-12 h-1 bg-gray-200 dark:bg-white/10 mx-auto mb-8 rounded-full opacity-50" />
        <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">© 2026 Tasker Ecosystem</p>
      </footer>
    </div>

  );
}

