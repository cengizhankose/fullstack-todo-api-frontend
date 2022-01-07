import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <ul data-testid="todo-list" className="list-group">
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          id={todo.id}
        />
      ))}
    </ul>
  );
}

export default TodoList;
