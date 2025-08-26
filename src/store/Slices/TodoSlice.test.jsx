import { afterEach, beforeEach, describe, it, expect } from "vitest";
import todoSlice from './TodoSlice.jsx';
import { 
    initialState, 
    addTodo,
    clearTodos,
    deleteTodo,
    toggleTodo,
    editTodo,
    submitEdit 
}  from './TodoSlice.jsx';
import { configureStore } from '@reduxjs/toolkit';

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
});

describe("TodoSlice", () => {
  
  it("has the correct initial state", () => {
    const mockInitialState = mockStore.getState().todos;
    expect(mockInitialState).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    const newTodo = { id: 4, name: 'sleep', completed: false };
    mockStore.dispatch(addTodo(newTodo));
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.length).toBe(4);
  });

  it("should handle clearTodos", () => {
    mockStore.dispatch(clearTodos());
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.length).toBe(0);
  });

  it("should handle deleteTodo", () => {
    const todoToDelete = { id: 1, name: 'wake up', completed: false };
    mockStore.dispatch(deleteTodo(todoToDelete.id));
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos).not.toContain(todoToDelete);
  });

  it("should handle toggleTodo", () => {
    const todoToToggle = { id: 1, name: 'wake up', completed: false };
    mockStore.dispatch(toggleTodo(todoToToggle.id));
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.find(todo => todo.id === todoToToggle.id).completed).toBe(true);
  });

  it("should handle editTodo", () => {
    const todoToEdit = { id: 1, name: 'wake up', completed: false };
    mockStore.dispatch(editTodo(todoToEdit.id));
    const updatedState = mockStore.getState().todos;
    expect(updatedState.toggleEdit).toBe(false);
    expect(updatedState.todoToEdit).toEqual(todoToEdit);
  });
  
  it("should handle submitEdit", () => {
    const todoToEdit = { id: 1, name: 'wake up', completed: false };
    mockStore.dispatch(editTodo(todoToEdit.id));
    mockStore.dispatch(submitEdit('new task name'));
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.find(todo => todo.id === todoToEdit.id).name).toBe('new task name');
  });
});