import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from "react";
import { addTodo } from "../../store/Slices/TodoSlice";

function AddTodo() {

  const dispatch = useDispatch();

  // sets state for the text input
  const [inputValue, setInputValue] = useState('');

  // sets state for displaying error message
  const [error, setError] = useState('');


  // event listeners
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleClick = () => {
    setError('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // if input is not empty, create a new todo payload to dispatch with addTodo, or display error message
    if (inputValue.trim().length > 0) {
      const newTodo = {
        id: Date.now(),
        name: inputValue,
        completed: false
      };
      dispatch(addTodo(newTodo));
      setInputValue('');
      } else {
      setError('Please enter a todo item');
    }
  }

  return (
    <>
      <form className='AddTodo__form' onSubmit={handleSubmit}>
          <input value={inputValue} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} onChange={handleChange} onClick={handleClick} type='text' placeholder='Add todo' className='AddTodo__form__todo-input' />
          <button type='submit' className='AddTodo__form__submit-button submit-button'>Add</button>
      </form>
      {error && <p className='AddTodo__error-message'>{error}</p>}
    </>
   )
}

export default AddTodo;