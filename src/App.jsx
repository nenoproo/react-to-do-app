import React, { useState, useReducer } from 'react';
import logo from './images/logo.png';
import Todo from './components/Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  EDIT_TODO: 'edit-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      if (action.payload.name.length >= 2) {
        return [...todos, newTodo(action.payload.name)];
      }
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        else {
          return todo;
        }
      })
    case ACTIONS.EDIT_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name }
        }
        else {
          return todo;
        }
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}

const App = () => {

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const date = new Date();
  const day = date.getDay();
  const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = dayList[day];

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  }

  function handleEditClick(todo) {
    setEditId(todo.id);
    setEditName(todo.name);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: editId, name: editName } });
    setEditId(null);
    setEditName('');
  }

  return (
    <>
      <div className="App">
        <img src={logo} className="logo" alt="logo" />
        <h1>TO DO APP</h1>
        <h4 className="greeting">Hi there! 👋 Today is <span>{today}.</span></h4>
        <h4 className="blinker">What are your tasks for today?</h4>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input type="text" className="todo-input" placeholder="✍ Add new task..." value={name} onChange={e => setName(e.target.value)} />
          <button className="todo-button"><FontAwesomeIcon icon={faSquarePlus} /></button>
        </form>

        {todos.map(todo => {
          return (
            <div className="todo-row">

              {editId === todo.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" className="edit-input" value={editName} onChange={e => setEditName(e.target.value)} />
                  <button type="submit" className="edit-submit">SAVE</button>
                </form>
              ) :
                <Todo key={todo.id}
                  todo={todo}
                  dispatch={dispatch}
                  handleEditClick={handleEditClick}
                />
              }
            </div>
          );
        })}
        <p>Designed & developed by <a href="https://nenadprokopiev.com" target="_blank">Neshko</a></p>
      </div>
    </>
  )
}

export default App;