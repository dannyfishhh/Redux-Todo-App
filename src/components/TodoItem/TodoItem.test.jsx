import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from '../../store/Slices/TodoSlice.jsx';
import { toggleTodo, editTodo, deleteTodo }  from '../../store/Slices/TodoSlice.jsx';
import TodoItem from "./TodoItem.jsx";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import React from "react";
import '@testing-library/jest-dom';

let mockStore;
let todoProp;

beforeEach(() => {
    mockStore = configureStore({
        reducer: {
            todos: todoSlice
        }
    });
    todoProp = mockStore.getState().todos.todos[0];
});

afterEach(() => {
    mockStore = null;
    localStorage.clear();
});

describe("TodoItem Component", () => {

    it("renders the TodoItem component", () => {

        render(
            <Provider store={mockStore}>
                <TodoItem key={todoProp.id} todo={todoProp} />
            </Provider>);

        const todoName = screen.getByText("wake up");
        const buttonDone = screen.getByTestId("done-button");
        const buttonEdit = screen.getByTestId("edit-button");
        const buttonDelete = screen.getByTestId("delete-button");

        expect(todoName).toBeInTheDocument();
        expect(buttonDone).toBeInTheDocument();
        expect(buttonEdit).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();
    });

    it("dispatches toggleTodo action on Done button click", async () => {

        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        render(
            <Provider store={mockStore}>
                <TodoItem key={todoProp.id} todo={todoProp} />
            </Provider>);

        const buttonDone = screen.getByTestId("done-button");
        await userEvent.click(buttonDone);
        expect(dispatchSpy).toHaveBeenCalledWith(toggleTodo(1));
    });

    it("dispatches editTodo action on Edit button click", async () => {
        
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
        
        render(
            <Provider store={mockStore}>
                <TodoItem key={todoProp.id} todo={todoProp} />
            </Provider>);

        const buttonEdit = screen.getByTestId("edit-button");

        await userEvent.click(buttonEdit);
        expect(dispatchSpy).toHaveBeenCalledWith(editTodo(1));
    });

    it("dispatches deleteTodo action on Delete button click", async () => {
        
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        render(
            <Provider store={mockStore}>
                <TodoItem key={1} todo={{ id: 1, name: 'wake up', completed: false }} />
            </Provider>);

        const buttonDelete = screen.getByTestId("delete-button");

        await userEvent.click(buttonDelete);
        expect(dispatchSpy).toHaveBeenCalledWith(deleteTodo(1));
    });

});