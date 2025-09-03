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