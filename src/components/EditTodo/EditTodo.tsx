import React, { JSX } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { submitEdit } from '../../store/Slices/TodoSlice';
import type { Todo } from '../../helpers/types';

function EditTodo(): JSX.Element {
  const dispatch = useAppDispatch();

  const todoToEdit = useAppSelector((state) => state.todos.todoToEdit) as Todo;

  const [inputValue, setInputValue] = useState<string>(todoToEdit.name || '');
  const [error, setError] = useState<string>('');

  const handleClick = (): void => {
    setError('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.length > 0) {
      dispatch(submitEdit(inputValue));
    } else {
      setError('Please enter a todo item');
    }
  };

  return (
    <>
      <form className='EditTodo__form' onSubmit={handleOnSubmit}>
        <input value={inputValue} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} onClick={handleClick} onChange={handleOnChange} type='text' placeholder='Edit todo' className='EditTodo__form__todo-input'></input>
        <button type='submit' className='EditTodo__form__submit-button'>Save</button>
      </form>
      {error && <p className='EditTodo__error-message'>{error}</p>}
    </>
  );
}

export default EditTodo;