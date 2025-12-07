import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import type { EnhancedStore } from "@reduxjs/toolkit";
import todoSlice from '../../store/Slices/TodoSlice';
import { submitEdit } from '../../store/Slices/TodoSlice';
import EditTodo from "./EditTodo";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import React from "react";
import '@testing-library/jest-dom';

let mockStore: EnhancedStore;

const preloadedState = {
  todos: {
    todos: [
      { id: 1, name: 'wake up', completed: false },
      { id: 2, name: 'have a coffee', completed: false },
      { id: 3, name: 'play tennis', completed: false }
    ],
    toggleEdit: false,
    todoToEdit: { id: 1, name: 'wake up', completed: false }
  }
};

beforeEach(() => {
  mockStore = configureStore({
    reducer: {
      todos: todoSlice
    },
    preloadedState: preloadedState
  });
});

afterEach(() => {
  mockStore = null as any;
  localStorage.clear();
});

const renderComponent = () => {
  render(
    <Provider store={mockStore}>
      <EditTodo />
    </Provider>
  );
};

describe("EditTodo Component", () => {

    it("renders the EditTodo component", async () => {

        // render
        renderComponent();

        // set up
        const input = screen.getByRole('textbox');
        const actualInputValue = screen.getByDisplayValue("wake up");
        const button = screen.getByText("Save");

        // results
        expect(input).toBeInTheDocument();
        expect(actualInputValue).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("displays error message when empty input is submitted", async () => {

        // render
        renderComponent();

        // set up
        const button = screen.getByText("Save");
        const input = screen.getByRole('textbox');

        // simulates an empty todo being submitted
        await userEvent.clear(input);
        await userEvent.click(button);

        // result
        const errorMessage = await screen.findByText("Please enter a todo item");
        expect(errorMessage).toBeInTheDocument();
    });

    it("dispatches addTodo action when valid input is submitted", async () => {

        // render
        renderComponent();

        // set up
        const input = screen.getByPlaceholderText("Edit todo");
        const button = screen.getByText("Save");

        // a spy is set on the dispatch method for mockStore.dispatch to confirm its being sent
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        // simulates a valid todo being entered and submitted
        await userEvent.type(input, " and turn off alarm");
        await userEvent.click(button);

        // results
        expect(dispatchSpy).toHaveBeenCalledWith(submitEdit("wake up and turn off alarm"));
    });

});