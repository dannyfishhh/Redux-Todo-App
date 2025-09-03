import { storeCreator } from "./Store";
import { beforeEach, describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import { addTodo } from "./Slices/TodoSlice";

// ensures that any local storage is cleared to avoid leaking into testing
beforeEach(() => {
  localStorage.clear();
});

describe('Store', () => {
    it("dispatching persists todos", () => {
        // set up
        const store = storeCreator();
        const mockTodo = { id: 4, name: 'sleep', completed: false };

        // simulates an extra todo being added to the store
        store.dispatch(addTodo(mockTodo));

        // checks localStorage
        const saved = localStorage.getItem("todos");
        const parsed = JSON.parse(saved);

        // results
        expect(parsed.todos.length).toBe(4);
    });

    it("preloadedState hydrates from localStorage", () => {
        // sends mock data to localStorage
        localStorage.setItem(
            "todos",
            JSON.stringify({
            todos: [{ id: 1, name: "Hydrated", completed: false }],
            toggleEdit: true,
            todoToEdit: {}
            })
        );

        // creates the store after the localStorage has been updated
        const store = storeCreator();

        // results
        expect(store.getState().todos.todos[0].name).toBe("Hydrated");
        });
    });