import './App.css'
import delete_bin from './assets/delete_bin.svg' 
import edit_square from './assets/edit_square.svg'
import tick_circle from './assets/tick_circle.svg'

function App() {

  return (
      <div className='container'>
        <div className='header'>
          <h1>My Todo List</h1>
        </div>
        <div className='add-todo'>
          <input type='text' placeholder='Add todo' className='todo-input' />
          <button className='submit-button'>Add</button>
        </div>
        <div className='todo-item'>
          <p>wake up</p>
          <div className='buttons'>
            <button className='done small_button'>
              <img src={tick_circle} alt='Done' />
            </button>
            <button className='edit small_button'>
              <img src={edit_square} alt='Edit' />
            </button>
            <button className='delete small_button'>
              <img src={delete_bin} alt='Delete' />
            </button>
          </div>
        </div>
        <div className='todo-item'>
          <p>have coffee</p>
          <div className='buttons'>
            <button className='done small_button'>
              <img src={tick_circle} alt='Done' />
            </button>
            <button className='edit small_button'>
              <img src={edit_square} alt='Edit' />
            </button>
            <button className='delete small_button'>
              <img src={delete_bin} alt='Delete' />
            </button>
          </div>
        </div>
        <div className='todo-item'>
          <p>play tennis</p>
          <div className='buttons'>
            <button className='done small_button'>
              <img src={tick_circle} alt='Done' />
            </button>
            <button className='edit small_button'>
              <img src={edit_square} alt='Edit' />
            </button>
            <button className='delete small_button'>
              <img src={delete_bin} alt='Delete' />
            </button>
          </div>
        </div>
      </div>
  )
}

export default App
