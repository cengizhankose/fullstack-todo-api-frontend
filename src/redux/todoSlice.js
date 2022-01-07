import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodo", async () => {
  const { data } = await axios.get(
    "https://fullstack-todo-app-api.vercel.app/todos",
    {
      "Access-Control-Allow-Origin": "*",
    }
  );
  return { data };
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (payload) => {
    const { data } = await axios.post(
      "https://fullstack-todo-app-api.vercel.app/todos",
      {
        title: payload.title,
      }
    );
    return { data };
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodo",
  async (payload) => {
    const { data } = await axios.patch(
      `https://fullstack-todo-app-api.vercel.app/todos/${payload.id}`,
      {
        completed: payload.completed,
      }
    );
    return { data };
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (payload) => {
    await axios.delete(
      `https://fullstack-todo-app-api.vercel.app/todos/${payload.id}`
    );
    return { id: payload.id };
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        title: action.payload.title,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.data;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.data);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      console.log("action payload", action.payload);
      const index = state.findIndex(
        (todo) => todo.id === action.payload.data.id
      );
      state[index].completed = action.payload.data.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
