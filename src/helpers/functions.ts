import type { TodosState } from './types';

const loadState = (): TodosState | undefined => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return undefined;
    } else {
      const parsedState = JSON.parse(serializedState);
      return parsedState as TodosState;
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
    return undefined;
  }
};

const saveState = (state: TodosState | any): void => {
  localStorage.setItem('todos', JSON.stringify(state));
};


export { loadState, saveState };