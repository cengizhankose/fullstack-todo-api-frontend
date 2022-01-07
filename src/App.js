import "./App.css";
import React from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalTodoItems from "./components/TotalTodoItems";

function App() {
  return (
    <div className="form-container">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalTodoItems />
    </div>
  );
}

export default App;
