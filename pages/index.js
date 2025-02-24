import { useState } from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
      <Navbar /> {/* Navbar now blends with the background */}
      <h1 className="text-2xl font-bold text-gray-800 mt-5"></h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} onToggleComplete={handleToggleComplete} />
    </div>
  );
  
}
