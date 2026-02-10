import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { motion } from "framer-motion";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-green-500/20 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            Stay <span className="text-[#033487] dark:text-[#00ff88]">Productive</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto"
          >
            Organize your day, track your progress, and achieve your goals with our premium task management solution.
          </motion.p>
        </header>

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#1a1a1a] mb-8 flex items-center justify-between transition-colors duration-300"
          >
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</span>
                <span className="text-2xl font-bold text-[#033487] dark:text-[#00ff88]">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-[#1a1a1a] h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.percentage}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={stats.percentage}
                  aria-label={`${stats.percentage}% of tasks completed`}
                  className="h-full bg-gradient-to-r from-[#033487] to-[#1e40af] dark:from-[#00ff88] dark:to-[#00cc6a]"
                />
              </div>
            </div>
            <div className="ml-8 text-right hidden sm:block">
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold dark:text-white">{stats.completed}/{stats.total}</p>
            </div>
          </motion.div>
        )}

        <AddTodo onAdd={handleAddTodo} />

        <div className="relative">
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-green-500/5 rounded-3xl -z-10 blur-3xl" />
          <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} onToggleComplete={handleToggleComplete} />
        </div>
      </main>

      <footer className="py-12 text-center text-gray-400 dark:text-gray-600 text-sm">
        <p>© 2026 Hexadecimal Software. All rights reserved.</p>
      </footer>
    </div>

  );
}

