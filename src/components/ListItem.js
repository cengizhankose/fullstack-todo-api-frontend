import React from "react";
import "./ListItem.css";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, toggleCompleteAsync } from "../redux/todoSlice";

function ListItem({ title, completed, id }) {
  const dispatch = useDispatch();
  const handleComplete = async (todoCompleted, todoId) => {
    dispatch(toggleCompleteAsync({ completed: !todoCompleted, id: todoId }));
  };
  const handleDelete = (todoId) => {
    dispatch(deleteTodoAsync({ id: todoId }));
  };
  return (
    <li data-testid="todo-list-item">
      <div className="list-item-container">
        <div>
          <input
            data-testid="todo-list-item-checkbox"
            className="list-item-checkbox"
            type="checkbox"
            checked={completed}
            onChange={() => handleComplete(completed, id)}
          ></input>
          <span data-testid="todo-list-item-title">{title}</span>
        </div>
        <button
          data-testid="todo-list-item-delete"
          className="list-item-delete-button"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ListItem;
