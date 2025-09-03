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

    // sets a mock store that can be created and removed before each test to avoid state changes leaking into one another

    let mockStore;

    beforeEach(() => {
        mockStore = configureStore({
            reducer: { todos: todoSlice }
        })
    });

    afterEach(() => {
        mockStore = null;
        localStorage.clear();
    });

    // helper function for rendering component with provider

    const renderApp = () => {
        return render(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
    };

    describe("Rendering", () => {

        // these tests all check whether components appear under the correct state of the store

        it("Should render the heading", () => {
            // render
            renderApp();

            // set up
            const heading = screen.getByText(/My Todo List/i);

            // result
            expect(heading).toBeInTheDocument();
        });

        it("Should render the AddTodo component", () => {
            // render
            renderApp();

            // set up
            const input = screen.getByPlaceholderText("Add todo");

            // result
            expect(input).toBeInTheDocument();
        });

        it("Should render the EditTodo component", () => {

            // sets a mock preLoaded state to ensure EditTodo is rendered rather than add todo, without firing user actions
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

            // render
            renderApp();

            // set up
            const input = screen.getByPlaceholderText("Edit todo");

            // result
            expect(input).toBeInTheDocument();
        });

        it("Should render a list of todos", () => {

            // render 
            renderApp();

            // set up
            const todoItems = screen.getAllByTestId("todo-item");

            // result
            // the initialState for the TodoSlice contains 3 todo items
            expect(todoItems).toHaveLength(3);
        });

        it("Should render the Clear button", () => {
            // render
            renderApp();

            // set up
            const clearButton = screen.getByRole("button", { name: /clear/i });

            // result
            expect(clearButton).toBeInTheDocument();
        });

        it("Should render the completed component", () => {

            // sets a mock preLoaded state to ensure Completed is rendered rather than TodoItem's, without firing user actions
            const preloadedState = {
                todos: {
                    todos: [],
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

            // render
            renderApp();

            // set up
            const completed = screen.getByText("Congratulations!");

            // completed
            expect(completed).toBeInTheDocument();
        });

    });

    describe("Interactions", () => {

        // these tests all check the integration of components and the redux store

        it("Should add a new todo", async () => {

            // render 
            renderApp();

            // set up
            const input = screen.getByPlaceholderText("Add todo");
            const addButton = screen.getByRole("button", { name: /add/i });

            // simulating user text input and submission
            await userEvent.type(input, "New Todo");
            await userEvent.click(addButton);

            // results
            // original length is 3, hence 4 after adding.
            const todoItems = screen.getAllByTestId("todo-item");
            expect(todoItems).toHaveLength(4);
        });

        it("Should clear todos", async () => {

            // render
            renderApp();

            // set up
            const clearButton = screen.getByRole("button", { name: /clear/i });

            // simulating clear button click
            await userEvent.click(clearButton);

            // results
            const todoItems = screen.queryByTestId("todo-item");
            expect(todoItems).not.toBeInTheDocument();
        });

        it("Should delete a specific todo", async () => {

            // render
            renderApp();

            // set up
            const deleteButtons = screen.getAllByTestId("delete-button");
            const todo1 = screen.getByText("wake up");

            // simulates user clicking the delete button from the first todo
            await userEvent.click(deleteButtons[0]);

            // results
            expect(todo1).not.toBeInTheDocument();
        });

        it("Should mark a todo as completed", async () => {

            // render 
            renderApp();

            // set up
            const doneButtons = screen.getAllByTestId("done-button");
            const todo1 = screen.getByText("wake up");

            // simulates user clicking the done button from the first todo
            await userEvent.click(doneButtons[0]);

            // results
            expect(todo1).toHaveStyle("text-decoration: line-through");
        });

        it("Should submit a todo for editing", async () => {

            // render
            renderApp();

            // set up
            const editButtons = screen.getAllByTestId("edit-button");

            // simulates user clicking the edit button from the first todo
            await userEvent.click(editButtons[0]);

            // results
            const input = screen.getByRole("textbox");
            expect(input).toHaveValue("wake up");
        });

        it("Should edit a todo", async () => {

            // render 
            renderApp();

            // set up
            const editButtons = screen.getAllByTestId("edit-button");

            // simulates user clicking the edit button from the first todo
            await userEvent.click(editButtons[0]);

            // simulates user editing said todo in the textbox and submitting this
            const input = screen.getByRole("textbox");
            await userEvent.type(input, " and turn off alarms");
            const saveButton = screen.getByRole("button", { name: /save/i });
            await userEvent.click(saveButton);

            // results
            const todo1 = screen.getByText("wake up and turn off alarms");
            expect(todo1).toBeInTheDocument();
        });
    });

});