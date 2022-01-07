import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListItem from "../ListItem.js";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

afterEach(() => {
  cleanup();
});

describe("<ListItem/>", () => {
  it("Renders without crashing", () => {
    const initialState = {};
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <ListItem />
      </Provider>
    );
    expect(getByTestId("todo-list-item")).toBeInTheDocument();
  });

  it("Has a checkbox field", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <ListItem />
      </Provider>
    );
    expect(getByTestId("todo-list-item-checkbox")).toBeInTheDocument();
  });

  it("Has a title", () => {
    const initialState = { title: "Todo Title", completed: false, id: 1 };
    const mockStore = configureStore();
    let store = mockStore(initialState);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ListItem
          title={initialState.title}
          completed={initialState.completed}
          id={initialState.id}
        />
      </Provider>
    );
    expect(getByText("Todo Title")).toBeInTheDocument();
  });

  it("Has a delete button", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store = mockStore(initialState);
    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <ListItem />
      </Provider>
    );
    expect(getByTestId("todo-list-item-delete").innerHTML).toBe("Delete");
  });
});

describe("Check a todos checkbox", () => {
  it("When the checkbox is selected, renders a checked todo item", () => {
    const initialState = { title: "Todo Title", completed: false, id: 1 };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);
    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <ListItem
          title={initialState.title}
          completed={initialState.completed}
          id={initialState.id}
        />
      </Provider>
    );

    fireEvent.click(getByTestId("todo-list-item-checkbox"));
    expect(store.getActions()[0].meta.arg).toEqual({
      completed: !initialState.completed,
      id: initialState.id,
    });
  });
});

describe("Delete a todo", () => {
  it("When the delete button is pressed, deletes the todo item", () => {
    const initialState = { title: "Todo Title", completed: false, id: 1 };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialState);
    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <ListItem
          title={initialState.title}
          completed={initialState.completed}
          id={initialState.id}
        />
      </Provider>
    );

    fireEvent.click(getByTestId("todo-list-item-delete"));
    expect(store.getActions()[0].meta.arg).toEqual({
      id: initialState.id,
    });
  });
});
