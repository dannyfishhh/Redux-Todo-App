import { createSlice } from '@reduxjs/toolkit';

// sets a standard set of todos for the application
export const initialState = {
  todos: [
    { id: 1, name: 'wake up', completed: false },
    { id: 2, name: 'have a coffee', completed: false },
    { id: 3, name: 'play tennis', completed: false }
  ],
  toggleEdit: true,
  todoToEdit: {}
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    // pushes new todo to the todos array
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },  
    // clears the todos array
    clearTodos: (state) => {
      state.todos = [];
    },
    // finds a todo by Id and filters it out of the todos array
    // also checks if the deleted todo is the one being edited and resets edit state if so
    deleteTodo: (state, action) => {
      if (state.todoToEdit.id === action.payload) {
        state.toggleEdit = true;
        state.todoToEdit = {};
      }
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    // finds a todo by id and changes it's completed status
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // finds a todo by id and sets the todoToEdit property to the todo with matching id and changes the status of toggleEdit 
    editTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        state.todoToEdit = todo;
        state.toggleEdit = !state.toggleEdit;
      }
    },
    // uses the id of todoToEdit to find the matching todo in the todos array and update it's name with the payload
    submitEdit: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === state.todoToEdit.id);
      if (index !== -1) {
        state.todos[index].name = action.payload;
        state.toggleEdit = !state.toggleEdit;
        state.todoToEdit = {};
      }
    }
  }
});

export const {
  addTodo,
  clearTodos,
  deleteTodo,
  toggleTodo,
  editTodo,
  submitEdit
} = todoSlice.actions;

export default todoSlice.reducer;