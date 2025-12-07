import { useState } from 'react';
import React, { JSX } from 'react';
import { useAppDispatch } from '../../helpers/hooks';
import { addTodo } from '../../store/Slices/TodoSlice';
import type { Todo } from '../../helpers/types';

function AddTodo(): JSX.Element {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleClick = (): void => {
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (inputValue.trim().length > 0) {
      const newTodo: Todo = {
        id: Date.now(),
        name: inputValue,
        completed: false
      };
      dispatch(addTodo(newTodo));
      setInputValue('');
    } else {
      setError('Please enter a todo item');
    }
  };

  return (
    <>
      <form className='AddTodo__form' onSubmit={handleSubmit}>
        <input value={inputValue} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} onChange={handleChange} onClick={handleClick} type='text' placeholder='Add todo' className='AddTodo__form__todo-input' />
        <button type='submit' className='AddTodo__form__submit-button submit-button'>Add</button>
      </form>
      {error && <p className='AddTodo__error-message'>{error}</p>}
    </>
  );
}

export default AddTodo;