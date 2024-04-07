import { useEffect, useRef, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem, TodoTimer } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [timeOut , setTimeOut] = useState(null)

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((PrevTodo) => (PrevTodo.id === id ? todo : PrevTodo))
    );
  };

  const deleteConfirmRef = useRef(deleteConfirm);
  const deleteTodoRef = useRef(todoToDelete);
  const timeOutRef = useRef(timeOut)

  useEffect(() => {
    deleteConfirmRef.current = deleteConfirm;
    deleteTodoRef.current = todoToDelete;
    timeOutRef.current = timeOut;
    if (deleteConfirmRef.current === false) {
      // console.log("UseEffect",timeOutRef.current);
      clearTimeout(timeOutRef.current)
      // console.log(timeOutRef.current, "clear");
    }
  }, [deleteConfirm, todoToDelete, timeOut ]);

  const deleteTodo = (id) => {
    setDeleted(true);
    setTodoToDelete(id);
    setDeleteConfirm(true);
    const timeoutId =  setTimeout(() => {
      if (deleteConfirmRef.current) {
        // If deleteConfirmation is still true after 5 seconds, delete the todo
        // console.log("TODO DELETED");
        deleteThisTodo(deleteTodoRef.current);
        setDeleted(false);
      } else {
        setTodoToDelete(null);
      }
      // console.log(deleteConfirm);
      // If deleteConfirmation is false, clear the todoToDelete state
    }, 5000);
    setTimeOut(timeoutId)
    // console.log("DeleteTODO :", timeoutId);
    // console.log(timeOutRef.current);
  };

  const deleteThisTodo = (id) => {
    setTodos((prev) => prev.filter((PrevTodo) => PrevTodo.id !== id));
    setDeleteConfirm(false);
    setTodoToDelete(null);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((PrevTodo) =>
        PrevTodo.id === id
          ? { ...PrevTodo, completed: !PrevTodo.completed }
          : PrevTodo
      )
    );
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
    setTodoToDelete(null);
    setDeleted(false);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        {deleted && <TodoTimer time={5} deleteCancle={cancelDelete} />}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
export default App;
