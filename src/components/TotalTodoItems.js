import React from "react";
import "./TotalTodoItems.css";
import { useSelector } from "react-redux";

function TotalTodoItems() {
  const todos = useSelector((state) => state.todos);
  return (
    <h4 data-testid="total-todo-count" className="total-todo-count">
      Total Complete Items: {todos.length}
    </h4>
  );
}

export default TotalTodoItems;
