import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto space-x-3">
      {/* Input Box */}
      <input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Add your todo’s"
  className="flex-grow p-3 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
/>

      {/* Add Task Button */}
      <button
  type="submit"
  className="px-5 py-3 bg-[#033487] text-white rounded-lg font-medium flex items-center space-x-2 shadow-md hover:bg-[#022866] transition"
>
        <span>➕ Add Task</span>
      </button>
    </form>
  );
}
