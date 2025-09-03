import todoSlice from './Slices/TodoSlice.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../helpers/functions.js';


export const storeCreator = () => {

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
  });

  return store;
};

const store = storeCreator();

export default store;
