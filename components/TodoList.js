import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-5">
      <AnimatePresence mode="popLayout">
        {todos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-10"
          >
            No tasks added yet. ✨
          </motion.p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;

