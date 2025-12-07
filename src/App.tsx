import React, { JSX } from 'react';
import { useAppDispatch, useAppSelector } from './helpers/hooks';

import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import TodoItem from './components/TodoItem/TodoItem';
import Completed from './components/Completed/Completed';
import { clearTodos } from './store/Slices/TodoSlice';

function App(): JSX.Element {
  const todos = useAppSelector((state) => state.todos.todos);
  const toggleEdit = useAppSelector((state) => state.todos.toggleEdit);

  const isTodos = todos.length > 0;

  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearTodos());
  };

  return (
    <div className='app__container'>
      <div className='app__container__header'>
        <h1>My Todo List</h1>
      </div>
      {toggleEdit ? <AddTodo /> : <EditTodo />}
      {todos.map((todo: any) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {isTodos ? (
        <button className='app__container__clear-button' onClick={handleClear}>Clear</button>
      ) : (
        <Completed />
      )}
    </div>
  );
}

export default App;
