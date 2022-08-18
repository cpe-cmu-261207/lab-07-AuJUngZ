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
  const [all, setAll] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const todo = localStorage.getItem("react-todos");
    if (todo === null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todo));
      setAll(JSON.parse(todo).length);
      setCompleted(JSON.parse(todo).filter((todo) => todo.completed).length);
      setPending(JSON.parse(todo).filter((todo) => !todo.completed).length);
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
        setPending(pending + 1);
        setAll(all + 1);
        setTodos(
          [...todos, { title: e.target.value, completed: false }].reverse()
        );
        setNewTodo("");
      }
    }
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    setAll(all - 1);
    setPending(pending - 1);
    if (completed == 0) {
      setCompleted(0);
    } else {
      setCompleted(completed - 1);
    }
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    if (todos[idx].completed) {
      setCompleted(completed + 1);
      setPending(pending - 1);
    } else {
      setCompleted(completed - 1);
      setPending(pending + 1);
    }
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
          <span className="text-primary">All ({all}) </span>
          <span className="text-warning">Pending ({pending}) </span>
          <span className="text-success">Completed ({completed})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Natthaphong Thepphithak 640610634
        </p>
      </div>
    </div>
  );
}
