import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './store/Slices/TodoSlice.jsx'
import App from './App.jsx';
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import React from "react";
import '@testing-library/jest-dom';

describe("App Component", () => {

    let mockStore;

    beforeEach(() => {
        mockStore = configureStore({
            reducer: { todos: todoSlice }
        })
    });

    afterEach(() => {
        mockStore = null;
    });

    const renderApp = () => {
        return render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
    };

    describe("Rendering", () => {

        it("Should render the heading", () => {
            renderApp();
            const heading = screen.getByText(/My Todo List/i);
            expect(heading).toBeInTheDocument();
        });

        it("Should render the AddTodo component", () => {
            renderApp();
            const input = screen.getByPlaceholderText("Add todo");
            expect(input).toBeInTheDocument();
        });

        it("Should render the EditTodo component", () => {
            const preloadedState = {
                todos: {
                    todos: [
                    { id: 1, name: 'wake up', completed: false },
                    { id: 2, name: 'have a coffee', completed: false },
                    { id: 3, name: 'play tennis', completed: false }
                    ],
                    toggleEdit: false,
                    todoToEdit: {}
                }
            };

            mockStore = configureStore({
                reducer: {
                    todos: todoSlice
                },
                preloadedState: preloadedState
            });

            renderApp();
            const input = screen.getByPlaceholderText("Edit todo");
            expect(input).toBeInTheDocument();
        });

        it("Should render a list of todos", () => {
            renderApp();
            const todoItems = screen.getAllByTestId("todo-item");
            expect(todoItems).toHaveLength(3);
        });

        it("Should render the Clear button", () => {
            renderApp();
            const clearButton = screen.getByRole("button", { name: /clear/i });
            expect(clearButton).toBeInTheDocument();
        });
    });

    describe("Interactions", () => {

        it("Should add a new todo", async () => {
            renderApp();
            const input = screen.getByPlaceholderText("Add todo");
            const addButton = screen.getByRole("button", { name: /add/i });
            await userEvent.type(input, "New Todo");
            await userEvent.click(addButton);
            const todoItems = screen.getAllByTestId("todo-item");
            expect(todoItems).toHaveLength(4);
        });

        it("Should clear todos", async () => {
            renderApp();
            const clearButton = screen.getByRole("button", { name: /clear/i });
            await userEvent.click(clearButton);
            const todoItems = screen.queryByTestId("todo-item");
            expect(todoItems).not.toBeInTheDocument();
        });

        it("Should delete a specific todo", async () => {
            renderApp();
            const deleteButtons = screen.getAllByTestId("delete-button");
            const todo1 = screen.getByText("wake up");
            await userEvent.click(deleteButtons[0]);
            expect(todo1).not.toBeInTheDocument();
        });

        it("Should mark a todo as completed", async () => {
            renderApp();
            const doneButtons = screen.getAllByTestId("done-button");
            const todo1 = screen.getByText("wake up");
            await userEvent.click(doneButtons[0]);
            expect(todo1).toHaveStyle("text-decoration: line-through");
        });

        it("Should submit a todo for editing", async () => {
            renderApp();
            const editButtons = screen.getAllByTestId("edit-button");
            await userEvent.click(editButtons[0]);
            const input = screen.getByRole("textbox");
            expect(input).toHaveValue("wake up");
        });

        it("Should edit a todo", async () => {
            renderApp();
            const editButtons = screen.getAllByTestId("edit-button");
            await userEvent.click(editButtons[0]);
            const input = screen.getByRole("textbox");
            await userEvent.type(input, " and turn off alarms");
            const saveButton = screen.getByRole("button", { name: /save/i });
            await userEvent.click(saveButton);
            const todo1 = screen.getByText("wake up and turn off alarms");
            expect(todo1).toBeInTheDocument();
        });
    });

});