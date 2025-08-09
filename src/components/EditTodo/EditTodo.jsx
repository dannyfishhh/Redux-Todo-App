import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitEdit } from '../../store/Slices/TodoSlice';


function EditTodo() {

      const dispatch = useDispatch();
      const todoToEdit = useSelector((state) => state.todos.todoToEdit);
      const [inputValue, setInputValue] = useState(todoToEdit.name || '');
      const [error, setError] = useState('');
      const handleClick = () => {
            setError('');
      }

      

      const handleOnChange = (e) => {
            setInputValue(e.target.value);
      }

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