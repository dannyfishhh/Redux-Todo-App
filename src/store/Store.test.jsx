import { storeCreator } from "./Store";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import { addTodo } from "./Slices/TodoSlice";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});

describe('Store', () => {
    it("dispatching persists todos", () => {
        const store = storeCreator();
        const mockTodo = { id: 4, name: 'sleep', completed: false };
        store.dispatch(addTodo(mockTodo));
        const saved = localStorage.getItem("todos");
        const parsed = JSON.parse(saved);
        expect(parsed.todos.length).toBe(4);
    });

    it("preloadedState hydrates from localStorage", () => {
        localStorage.setItem(
            "todos",
            JSON.stringify({
            todos: [{ id: 1, name: "Hydrated", completed: false }],
            toggleEdit: true,
            todoToEdit: {}
            })
        );

        const store = storeCreator();

        expect(store.getState().todos.todos[0].name).toBe("Hydrated");
        });
    });