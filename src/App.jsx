import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodo from './components/AddTodo/AddTodo.jsx';
import EditTodo from './components/EditTodo/EditTodo.jsx';
import TodoItem from './components/TodoItem/TodoItem.jsx';
import Completed from './components/Completed/Completed.jsx';
import { clearTodos } from './store/Slices/TodoSlice.jsx';

function App() {

  // selectors for todos information
  const todos = useSelector((state) => state.todos.todos);
  const toggleEdit = useSelector((state) => state.todos.toggleEdit);

  // conditional for whether I render a clear button or completed message
  const isTodos = todos.length > 0;

  const dispatch = useDispatch();

  // event listener for clear button
  const handleClear = () => {
    dispatch(clearTodos());
  };

  // returns components based on the store state
  return (
    // Classnames get complicated with big apps, its good to be specific as you might ahve lots of containers
    // So <component>__<section>__<name> is a simple way to distinguish e.g.
    // app__container
    // app__container__header
      <div className='container'>
        <div className='header'>
          <h1>My Todo List</h1>
        </div>
        {toggleEdit ? <AddTodo /> : <EditTodo />}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
        {isTodos ?
          <button className='clear-button' onClick={handleClear}>Clear</button>
          : <Completed />
        }
      </div>
  )
}

export default App
