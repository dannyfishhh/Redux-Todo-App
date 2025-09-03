import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitEdit } from '../../store/Slices/TodoSlice';
import React from 'react';

// a very similar component to AddTodo, but seperated for cleaner code

function EditTodo() {

      const dispatch = useDispatch();

      // selector to improve rendering ease based on store state
      const todoToEdit = useSelector((state) => state.todos.todoToEdit);

      // local state for the input value and error message handling
      const [inputValue, setInputValue] = useState(todoToEdit.name || '');
      const [error, setError] = useState('');

      // event listeners 
      const handleClick = () => {
            setError('');
      }

      const handleOnChange = (e) => {
            setInputValue(e.target.value);
      }

      // if valid todo entered, dispatch the submitEdit action with the inputValue, or display error message
      const handleOnSubmit = (e) => {
            e.preventDefault();
            if (inputValue.length > 0) {
                  dispatch(submitEdit(inputValue));
            } else {
                  setError('Please enter a todo item');
            }
      }

      return (
            <>
                  <form className='add-todo' onSubmit={handleOnSubmit}>
                        <input value={inputValue} style={error ? { borderColor: 'red', borderWidth: '2px', borderStyle: 'solid' } : {}} onClick={handleClick} onChange={handleOnChange} type='text' placeholder='Edit todo' className='todo-input'></input>
                        <button type='submit' className='submit-button'>Save</button>
                  </form>
                  {error && <p className='error-message'>{error}</p>}
            </>
      );
}

export default EditTodo;