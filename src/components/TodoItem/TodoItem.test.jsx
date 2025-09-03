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


// sets a mock store that can be created and removed before each test to avoid state changes leaking into one another

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

// helper function to render the component with the provider

const renderComponent = () => {
    render(
        <Provider store={mockStore}>
            <TodoItem key={todoProp.id} todo={todoProp} />
        </Provider>
    );
}

describe("TodoItem Component", () => {

    it("renders the TodoItem component", () => {

        // render
        renderComponent();

        // set up
        const todoName = screen.getByText("wake up");
        const buttonDone = screen.getByTestId("done-button");
        const buttonEdit = screen.getByTestId("edit-button");
        const buttonDelete = screen.getByTestId("delete-button");

        // results
        expect(todoName).toBeInTheDocument();
        expect(buttonDone).toBeInTheDocument();
        expect(buttonEdit).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();
    });

    it("dispatches toggleTodo action on Done button click", async () => {

        // a spy is set on the dispatch method for mockStore.dispatch to confirm its being sent
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        // render
        renderComponent();

        // set up
        const buttonDone = screen.getByTestId("done-button");

        // simulate user clicking on the done button
        await userEvent.click(buttonDone);

        // results
        expect(dispatchSpy).toHaveBeenCalledWith(toggleTodo(1));
    });

    it("dispatches editTodo action on Edit button click", async () => {
        
        // a spy is set on the dispatch method for mockStore.dispatch to confirm its being sent
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
        
        // render
        renderComponent();

        // set up
        const buttonEdit = screen.getByTestId("edit-button");

        // simulate user clicking on the edit button
        await userEvent.click(buttonEdit);

        // results
        expect(dispatchSpy).toHaveBeenCalledWith(editTodo(1));
    });

    it("dispatches deleteTodo action on Delete button click", async () => {
        
        // a spy is set on the dispatch method for mockStore.dispatch to confirm its being sent
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        // render
        renderComponent();

        // set up
        const buttonDelete = screen.getByTestId("delete-button");

        // simulate user clicking on the delete button
        await userEvent.click(buttonDelete);

        // results
        expect(dispatchSpy).toHaveBeenCalledWith(deleteTodo(1));
    });

});