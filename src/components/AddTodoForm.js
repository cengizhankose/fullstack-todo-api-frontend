import React, { useState, useEffect } from "react";
import "./AddTodoForm.css";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todoSlice";

function AddTodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("You should give your todo a title");
    } else {
      dispatch(addTodoAsync({ title }));
      setTitle("");
    }
  };
  return (
    <form data-testid="add-todo" onSubmit={handleAddTodo}>
      <input
        className="add-todo-input"
        type="text"
        name="name"
        placeholder="Add todo..."
        data-testid="todo-input"
        value={title}
        onChange={(i) => setTitle(i.target.value)}
      />
      <div>
        <input
          data-testid="add-todo-button"
          className="add-todo-submit"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}

export default AddTodoForm;
