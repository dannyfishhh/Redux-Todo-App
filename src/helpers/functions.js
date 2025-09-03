// helper functions for getting the localStorage
// if it fails or is empty, returns undefined
// if it's there, it returns the stored data in the form of an object that the configureStore method recognises

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
        return undefined;
    } else {
        const parsedState = JSON.parse(serializedState);
        return {todos: parsedState}
    }
  } catch (e) {
    console.warn("Failed to load state:", e);
    return undefined;
  }
};

const saveState = (state) => {
    localStorage.setItem('todos', JSON.stringify(state));
}


export { loadState, saveState };