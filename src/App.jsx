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
      <div className='app__container'>
        <div className='app__container__header'>
          <h1>My Todo List</h1>
        </div>
        {toggleEdit ? <AddTodo /> : <EditTodo />}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
        {isTodos ?
          <button className='app__container__clear-button' onClick={handleClear}>Clear</button>
          : <Completed />
        }
      </div>
  )
}

export default App
