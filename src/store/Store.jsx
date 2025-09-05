import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../helpers/functions.js';
import todoSlice from './Slices/TodoSlice.jsx';

// the store creation has been refactored to a factory for easier testing of the localStorage functionality
export const storeCreator = () => {

  const localStorageState = loadState();

  // if the localStorageState is undefined, it will render as standard with the initialState of the TodoSlice
  const store = configureStore({
    reducer: {
      todos: todoSlice
    },
    preloadedState: localStorageState
  });

  // every time a change to the store occurs, the todos slice is saved to localStorage
  store.subscribe(() => {
    const state = store.getState().todos;
    saveState(state);
  });

  return store;
};

// this is the actual instance of the real store being used in the application being created
const store = storeCreator();

export default store;
