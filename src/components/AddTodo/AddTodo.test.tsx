import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import type { EnhancedStore } from "@reduxjs/toolkit";
import todoSlice from '../../store/Slices/TodoSlice';
import { addTodo } from '../../store/Slices/TodoSlice';
import AddTodo from "./AddTodo";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import React from "react";
import userEvent from "@testing-library/user-event";

let mockStore: EnhancedStore;

beforeEach(() => {
  mockStore = configureStore({
    reducer: {
      todos: todoSlice
    }
  });
});

afterEach(() => {
  mockStore = null as any;
  localStorage.clear();
});

const renderComponent = () => {
  render(
    <Provider store={mockStore}>
      <AddTodo />
    </Provider>
  );
};

describe("AddTodo Component", () => {

    it("renders the AddTodo component", () => {

        // render
        renderComponent();

        // set up
        const input = screen.getByPlaceholderText("Add todo");
        const button = screen.getByText("Add");

        // results
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("displays error message when empty input is submitted", async () => {

        // render
        renderComponent();

        // set up
        const button = screen.getByText("Add");

        // simulates user submitting an empty todo
        await userEvent.click(button);

        // results
        const errorMessage = screen.getByText("Please enter a todo item");
        expect(errorMessage).toBeInTheDocument();
    });

    it("displays error message when an input of only spaces is submitted", async () => {

        // render
        renderComponent();

        // set up
        const input = screen.getByPlaceholderText("Add todo");
        const button = screen.getByText("Add");

        // simulates user submitting an empty todo
        await userEvent.type(input, "   ");
        await userEvent.click(button);

        // results
        const errorMessage = screen.getByText("Please enter a todo item");
        expect(errorMessage).toBeInTheDocument();
    });

    it("dispatches addTodo action when valid input is submitted", async () => {

        // render
        renderComponent();

        // set up
        const input = screen.getByPlaceholderText("Add todo");
        const button = screen.getByText("Add");

        // adds a spy to the mockStore.dispatch method to confirm it's been called with the correct data
        const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

        // simulates a user entering and submiting a new todo
        await userEvent.type(input, "New Todo");
        await userEvent.click(button);

        // results
        expect(dispatchSpy).toHaveBeenCalledWith(addTodo({
          id: expect.any(Number),
          name: "New Todo",
          completed: false
        }));
    });

});