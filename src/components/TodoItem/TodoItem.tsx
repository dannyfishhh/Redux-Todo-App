import React, { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';

import delete_bin from '../../assets/delete_bin.svg?url';
import edit_square from '../../assets/edit_square.svg?url';
import tick_circle from '../../assets/tick_circle.svg?url';
import { toggleTodo, deleteTodo, editTodo } from '../../store/Slices/TodoSlice';
import type { Todo } from '../../helpers/types';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const todoToEdit = useAppSelector((state) => state.todos.todoToEdit) as Todo;
  const toggleEdit = useAppSelector((state) => state.todos.toggleEdit);

  const id = todo.id;

  const textStyle = todo.completed ? { textDecoration: 'line-through', color: 'gray' } : {};
  const itemStyle = todoToEdit.id === id && !toggleEdit ? { backgroundColor: '#b393dd' } : {};

  const handleToggle = (): void => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (): void => {
    dispatch(editTodo(id));
  };

  const handleDelete = (): void => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className='TodoItem__item' style={itemStyle} data-testid='todo-item'>
      <p style={textStyle}>{todo.name}</p>
      <div className='TodoItem__buttons'>
        <button onClick={handleToggle} className='TodoItem__buttons__small-button done' data-testid='done-button'>
          <img src={tick_circle} alt='Done' />
        </button>
        <button onClick={handleEdit} className='TodoItem__buttons__small-button edit' data-testid='edit-button'>
          <img src={edit_square} alt='Edit' />
        </button>
        <button onClick={handleDelete} className='TodoItem__buttons__small-button delete' data-testid='delete-button'>
          <img src={delete_bin} alt='Delete' />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;