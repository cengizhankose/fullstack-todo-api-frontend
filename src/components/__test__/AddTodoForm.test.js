import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../AddTodoForm.js";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

afterEach(() => {
  cleanup();
});

describe("<AddTodoForm/>", () => {
  it("Renders without crashing", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    const mockOnSubmit = jest.fn();
    let store = mockStore(initialState);

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AddTodoForm onSubmit={mockOnSubmit} />
      </Provider>
    );
    const addTodoElement = screen.getByTestId("add-todo");
    expect(addTodoElement).toBeInTheDocument();
  });

  it("Has an input field", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    const mockOnSubmit = jest.fn();
    let store = mockStore(initialState);

    store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <AddTodoForm onSubmit={mockOnSubmit} />
      </Provider>
    );
    expect(getByTestId("todo-input")).toBeInTheDocument();
  });

  it("Has an add button", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    const mockOnSubmit = jest.fn();
    let store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTodoForm onSubmit={mockOnSubmit} />
      </Provider>
    );
    expect(getByTestId("add-todo-button").defaultValue).toBe("Submit");
  });
});

describe("Adding items", () => {
  it("When the add button is pressed, if the input field is empty, prevent item from being added", () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    const mockOnSubmit = jest.fn();
    let store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTodoForm onSubmit={mockOnSubmit} />
      </Provider>
    );
    window.alert = jest.fn();
    fireEvent.click(getByTestId("add-todo-button"));
    expect(window.alert).toHaveBeenCalled();
  });

  it("When the add button is pressed, if the input field has text, it creates a new todo item", () => {
    const initialState = { output: 10 };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const mockOnSubmit = jest.fn();
    let store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AddTodoForm onSubmit={mockOnSubmit} />
      </Provider>
    );

    const event = { target: { value: "Create more tests" } };
    fireEvent.change(getByTestId("todo-input"), event);
    expect(getByTestId("todo-input").value).toBe("Create more tests");
    fireEvent.click(getByTestId("add-todo-button"));
    expect(store.getActions()[0].meta.arg).toEqual({
      title: "Create more tests",
    });
  });
});
