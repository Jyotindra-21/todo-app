import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a project' },
    // Add more todos as needed
  ]);

  const [todoToDelete, setTodoToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setDeleteConfirmation(true);

    setTimeout(() => {
      if (deleteConfirmation) {
        // If deleteConfirmation is still true after 5 seconds, delete the todo
        deleteTodo();
      } else {
        // If deleteConfirmation is false, clear the todoToDelete state
        setTodoToDelete(null);
      }
    }, 5000);
  };

  const deleteTodo = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete.id);
    setTodos(updatedTodos);
    setDeleteConfirmation(false);
    setTodoToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setTodoToDelete(null);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </li>
        ))}
      </ul>
      {deleteConfirmation && (
        <div>
          <p>Are you sure you want to delete "{todoToDelete.text}"?</p>
          <button onClick={deleteTodo}>Confirm</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;