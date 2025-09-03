import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from '../../store/Slices/TodoSlice.jsx';
import { addTodo }  from '../../store/Slices/TodoSlice.jsx';
import AddTodo from "./AddTodo.jsx";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import React from "react";
import userEvent from "@testing-library/user-event";

let mockStore;

beforeEach(() => {
    mockStore = configureStore({
        reducer: {
            todos: todoSlice
        }
    });
});

afterEach(() => {
    mockStore = null;
    localStorage.clear();
});

describe("AddTodo Component", () => {

    it("renders the AddTodo component", () => {
        render(
        <Provider store={mockStore}>
            <AddTodo />
        </Provider>);
        const input = screen.getByPlaceholderText("Add todo");
        const button = screen.getByText("Add");
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("displays error message when empty input is submitted", async () => {
        render(
        <Provider store={mockStore}>
            <AddTodo />
        </Provider>);
        const button = screen.getByText("Add");
        await userEvent.click(button);
        const errorMessage = screen.getByText("Please enter a todo item");
        expect(errorMessage).toBeInTheDocument();
    });

    it("dispatches addTodo action when valid input is submitted", async () => {
        render(
        <Provider store={mockStore}>
            <AddTodo />
        </Provider>);
        const input = screen.getByPlaceholderText("Add todo");
        const button = screen.getByText("Add");
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
        await userEvent.type(input, "New Todo");
        await userEvent.click(button);
        expect(dispatchSpy).toHaveBeenCalledWith(addTodo({
          id: expect.any(Number),
          name: "New Todo",
          completed: false
        }));
    });

});