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

// sets a mock store that can be created and removed before each test to avoid state changes leaking into one another
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

describe("TodoSlice", () => {
  
  it("has the correct initial state", () => {

    //set up
    const mockInitialState = mockStore.getState().todos;

    //result
    expect(mockInitialState).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    
    // set up
    const newTodo = { id: 4, name: 'sleep', completed: false };

    // dispatch addTodo action
    mockStore.dispatch(addTodo(newTodo));

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.length).toBe(4);
  });

  it("should handle clearTodos", () => {

    // dispatch clearTodos action
    mockStore.dispatch(clearTodos());

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.length).toBe(0);
  });

  it("should handle deleteTodo", () => {

    // set up
    const todoToDelete = { id: 1, name: 'wake up', completed: false };

    // dispatch deleteTodo action
    mockStore.dispatch(deleteTodo(todoToDelete.id));

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos).not.toContain(todoToDelete);
  });

  it("should handle toggleTodo", () => {

    // set up
    const todoToToggle = { id: 1, name: 'wake up', completed: false };

    // dispatch todoToToggle action
    mockStore.dispatch(toggleTodo(todoToToggle.id));

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.find(todo => todo.id === todoToToggle.id).completed).toBe(true);
  });

  it("should handle editTodo", () => {

    // set up
    const todoToEdit = { id: 1, name: 'wake up', completed: false };

    // dispatch editTodo action
    mockStore.dispatch(editTodo(todoToEdit.id));

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.toggleEdit).toBe(false);
    expect(updatedState.todoToEdit).toEqual(todoToEdit);
  });
  
  it("should handle submitEdit", () => {

    // set up
    const todoToEdit = { id: 1, name: 'wake up', completed: false };

    // dispatch editTodo action followed by submitEdit
    mockStore.dispatch(editTodo(todoToEdit.id));
    mockStore.dispatch(submitEdit('new task name'));

    // result
    const updatedState = mockStore.getState().todos;
    expect(updatedState.todos.find(todo => todo.id === todoToEdit.id).name).toBe('new task name');
  });
});