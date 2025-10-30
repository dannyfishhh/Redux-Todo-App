import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

import delete_bin from '../../assets/delete_bin.svg'
import edit_square from '../../assets/edit_square.svg'
import tick_circle from '../../assets/tick_circle.svg'
import { toggleTodo, deleteTodo, editTodo } from '../../store/Slices/TodoSlice.jsx'

function TodoItem (props) {

  const dispatch = useDispatch()
  const todoToEdit = useSelector((state) => state.todos.todoToEdit)
  const toggleEdit = useSelector((state) => state.todos.toggleEdit)

  // destructures for cleaner code in the return section
  const id = props.todo.id;

  // conditional styles for completed todos and the todo being edited
  const textStyle = props.todo.completed ? { textDecoration: 'line-through', color: 'gray' } : {};
  const itemStyle = todoToEdit.id === id && !toggleEdit ? { backgroundColor: '#b393dd' } : {};

  // event listeners for the 3 buttons on a todo item (done / edit/ delete)
  const handleToggle = () => {
    dispatch(toggleTodo(id)) 
  }
  const handleEdit = () => {
    dispatch(editTodo(id))
  }
  const handleDelete = () => {
    dispatch(deleteTodo(id))
  }
  

  return ( 
    <div className='TodoItem__item' style={itemStyle} data-testid="todo-item">
              <p style={textStyle}>{props.todo.name}</p>
              <div className='TodoItem__buttons'>
                <button onClick={handleToggle} className='TodoItem__buttons__small-button done' data-testid="done-button">
                  <img src={tick_circle} alt='Done' />
                </button>
                <button onClick={handleEdit} className='TodoItem__buttons__small-button edit' data-testid="edit-button">
                  <img src={edit_square} alt='Edit' />
                </button>
                <button onClick={handleDelete} className='TodoItem__buttons__small-button delete' data-testid="delete-button">
                  <img src={delete_bin} alt='Delete' />
                </button>
              </div>
            </div>
  )
}

export default TodoItem