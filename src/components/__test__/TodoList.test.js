import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

afterEach(() => {
  cleanup();
});

describe("<TodoList/>", () => {
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
        <TodoList />
      </Provider>
    );
    expect(getByTestId("todo-list")).toBeInTheDocument();
  });
});
