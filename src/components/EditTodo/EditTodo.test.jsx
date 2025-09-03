import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from '../../store/Slices/TodoSlice.jsx';
import { submitEdit }  from '../../store/Slices/TodoSlice.jsx';
import EditTodo from "./EditTodo.jsx";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import React from "react";
import '@testing-library/jest-dom';

let mockStore;

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
    mockStore = null;
    localStorage.clear();
});

describe("EditTodo Component", () => {

    it("renders the EditTodo component", async () => {
        render(
            <Provider store={mockStore}>
                <EditTodo />
            </Provider>
        );
        const input = screen.getByRole('textbox');
        const actualInputValue = screen.getByDisplayValue("wake up");
        const button = screen.getByText("Save");
        expect(input).toBeInTheDocument();
        expect(actualInputValue).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("displays error message when empty input is submitted", async () => {
        render(
        <Provider store={mockStore}>
            <EditTodo />
        </Provider>);
        const button = screen.getByText("Save");
        const input = screen.getByRole('textbox');
        await userEvent.clear(input);
        await userEvent.click(button);
        const errorMessage = await screen.findByText("Please enter a todo item");
        expect(errorMessage).toBeInTheDocument();
    });

    it("dispatches addTodo action when valid input is submitted", async () => {
        render(
        <Provider store={mockStore}>
            <EditTodo />
        </Provider>);
        const input = screen.getByPlaceholderText("Edit todo");
        const button = screen.getByText("Save");
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
        await userEvent.type(input, " and turn off alarm");
        await userEvent.click(button);
        expect(dispatchSpy).toHaveBeenCalledWith(submitEdit("wake up and turn off alarm"));
    });

});