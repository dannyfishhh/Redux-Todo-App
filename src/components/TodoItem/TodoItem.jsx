import delete_bin from '../../assets/delete_bin.svg'
import edit_square from '../../assets/edit_square.svg'
import tick_circle from '../../assets/tick_circle.svg'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from '../../store/Slices/TodoSlice.jsx'
import React from 'react';

function TodoItem (props) {

  const dispatch = useDispatch()
  const id = props.todo.id;
  const style = props.todo.completed ? { textDecoration: 'line-through', color: 'gray' } : {};
  const handleToggle = () => {
    dispatch(toggleTodo(id))
  }
  const handleDelete = () => {
    dispatch(deleteTodo(id))
  }
  const handleEdit = () => {
    dispatch(editTodo(id))
  }

  return ( 
    <div className='todo-item' data-testid="todo-item">
              <p style={style}>{props.todo.name}</p>
              <div className='buttons'>
                <button onClick={handleToggle} className='done small_button' data-testid="done-button">
                  <img src={tick_circle} alt='Done' />
                </button>
                <button onClick={handleEdit} className='edit small_button' data-testid="edit-button">
                  <img src={edit_square} alt='Edit' />
                </button>
                <button onClick={handleDelete} className='delete small_button' data-testid="delete-button">
                  <img src={delete_bin} alt='Delete' />
                </button>
              </div>
            </div>
  )
}

export default TodoItem