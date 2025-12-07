import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../helpers/functions';
import todoSlice from './Slices/TodoSlice';

export const storeCreator = () => {

  const localStorageState = loadState();

  const store = configureStore({
    reducer: {
      todos: todoSlice
    },
    preloadedState: localStorageState ? { todos: localStorageState } : undefined
  });

  // every time a change to the store occurs, the todos slice is saved to localStorage
  store.subscribe(() => {
    const state = store.getState().todos;
    saveState(state);
  });

  return store;
};

const store = storeCreator();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
