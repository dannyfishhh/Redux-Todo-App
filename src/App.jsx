import AddTodo from './components/AddTodo/AddTodo.jsx';
import EditTodo from './components/EditTodo/EditTodo.jsx';
import TodoItem from './components/TodoItem/TodoItem.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { clearTodos } from './store/Slices/TodoSlice.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';

function App() {

  const todos = useSelector((state) => state.todos.todos);
  const toggleEdit = useSelector((state) => state.todos.toggleEdit);
  const isTodos = todos.length > 0;
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearTodos());
  };

  return (
      <div className='container'>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <div className='header'>
            <h1>My Todo List</h1>
          </div>
          {toggleEdit ? <AddTodo /> : <EditTodo />}
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {isTodos ?
            <button className='clear-button' onClick={handleClear}>Clear</button>
            : null
          }
        </ErrorBoundary>
      </div>
  )
}

export default App
