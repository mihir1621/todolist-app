import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-5">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks added yet.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleComplete={onToggleComplete} // Ensuring completion toggle works
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
