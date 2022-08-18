import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const todo = localStorage.getItem("react-todos");
    if (todo === null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todo));
    }
  }, []);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    } else {
      saveTodo();
    }
  }, [todos]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value == "") {
        alert("To do cannot be empty");
      } else {
        setTodos(
          [...todos, { title: e.target.value, completed: false }].reverse()
        );
        setNewTodo("");
      }
    }
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx > 0) {
      const newTodos = [...todos];
      const temp = newTodos[idx];
      newTodos[idx] = newTodos[idx - 1];
      newTodos[idx - 1] = temp;
      setTodos(newTodos);
    }
  };

  const moveDown = (idx) => {
    if (idx < todos.length - 1) {
      const newTodos = [...todos];
      const temp = newTodos[idx];
      newTodos[idx] = newTodos[idx + 1];
      newTodos[idx + 1] = temp;
      setTodos(newTodos);
    }
  };

  const saveTodo = () => {
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todosStr);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          value={newTodo}
        />
        {/* Todos */}

        <div>
          {todos.map((todo, idx) => (
            <Todo
              key={idx}
              title={todo.title}
              completed={todo.completed}
              onMark={() => markTodo(idx)}
              onDelete={() => deleteTodo(idx)}
              onMoveUp={() => moveUp(idx)}
              onMoveDown={() => moveDown(idx)}
            />
          ))}
        </div>

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((todo) => !todo.completed).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((todo) => todo.completed).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Natthaphong Thepphithak 640610634
        </p>
      </div>
    </div>
  );
}
