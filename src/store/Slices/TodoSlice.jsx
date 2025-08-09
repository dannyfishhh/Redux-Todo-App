import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },  
    clearTodos: (state) => {
      state.todos = [];
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        state.todoToEdit = todo;
        state.toggleEdit = !state.toggleEdit;
      }
    },
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