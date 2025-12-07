import { storeCreator } from "./store";
import { beforeEach, describe, it, expect } from "vitest";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { Todo } from "../helpers/types";
import '@testing-library/jest-dom';
import { addTodo } from "./Slices/TodoSlice";

beforeEach(() => {
  localStorage.clear();
});

describe('Store', () => {
  it("dispatching persists todos", () => {
    const store: EnhancedStore = storeCreator();
    const mockTodo: Todo = { id: 4, name: 'sleep', completed: false };

    store.dispatch(addTodo(mockTodo));

    const saved = localStorage.getItem("todos");
    const parsed = JSON.parse(saved!);

    expect(parsed.todos.length).toBe(4);
  });

  it("preloadedState hydrates from localStorage", () => {
    localStorage.setItem("todos", JSON.stringify([{ id: 1, name: "Hydrated", completed: false }]));

    const store: EnhancedStore = storeCreator();

    expect(store.getState().todos.todos[0]?.name).toBe("Hydrated");
  });
});