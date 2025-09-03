import todoSlice from './Slices/TodoSlice.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../helpers/functions.js';

const localStorageState = loadState();

const store = configureStore({
  reducer: {
    todos: todoSlice
  },
  preloadedState: localStorageState
});

store.subscribe(() => {
  const state = store.getState().todos;
  saveState(state);
})

export default store;
