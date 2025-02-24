import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react"; // Three-dot menu icon

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
    setShowDropdown(false); // Close dropdown when editing starts
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow mb-2 relative">
      {/* Checkbox for completion */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="mr-3 w-5 h-5 cursor-pointer accent-gray-500"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
        />
      ) : (
        <span
          onClick={() => onToggleComplete(todo.id)}
          className={`cursor-pointer flex-1 ${
            todo.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Three-dot menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <MoreVertical size={20} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-8 bg-white border border-gray-300 rounded-md shadow-lg w-28 z-10">
            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-black"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
