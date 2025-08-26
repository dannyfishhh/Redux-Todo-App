import { addTodo } from "../../store/Slices/TodoSlice";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from "react";

function AddTodo() {

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleClick = () => {
    setError('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) {
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
      <form className='add-todo' onSubmit={handleSubmit}>
          <input value={inputValue} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} onChange={handleChange} onClick={handleClick} type='text' placeholder='Add todo' className='todo-input' />
          <button type='submit' className='submit-button'>Add</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
    </>
   )
}

export default AddTodo;