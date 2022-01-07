import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TotalTodoItems from "../TotalTodoItems";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

afterEach(() => {
  cleanup();
});

describe("<TotalTodoItems/>", () => {
  it("Renders without crashing", () => {
    const initialState = {
      todos: [
        {
          id: 0,
          title: "todo 1",
          completed: true,
        },
        {
          id: 1,
          title: "todo 2",
          completed: false,
        },
        {
          id: 2,
          title: "todo 3",
          completed: true,
        },
      ],
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <TotalTodoItems />
      </Provider>
    );
    expect(getByTestId("total-todo-count")).toBeInTheDocument();
  });
  it("Renders the true todo count", () => {
    const initialState = {
      todos: [
        {
          id: 0,
          title: "todo 1",
          completed: true,
        },
        {
          id: 1,
          title: "todo 2",
          completed: false,
        },
        {
          id: 2,
          title: "todo 3",
          completed: true,
        },
      ],
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <TotalTodoItems />
      </Provider>
    );
    expect(getByText("Total Complete Items: 3")).toBeInTheDocument();
  });
});

describe("Update the todo count", () => {
  it("When a todo added, updates the todo count", () => {
    const initialState = {
      todos: [
        {
          id: 0,
          title: "todo 1",
          completed: true,
        },
        {
          id: 1,
          title: "todo 2",
          completed: false,
        },
        {
          id: 2,
          title: "todo 3",
          completed: true,
        },
      ],
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <TotalTodoItems />
      </Provider>
    );

    expect(getByText("Total Complete Items: 3")).toBeInTheDocument();
    initialState.todos.push({
      id: 3,
      title: "todo 4",
      completed: false,
    });
    render(
      <Provider store={store}>
        <TotalTodoItems />
      </Provider>
    );
    expect(getByText("Total Complete Items: 4")).toBeInTheDocument();
  });
});
