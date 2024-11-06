import React from 'react';
import { ACTIONS } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'


const Todo = ({ todo, dispatch, handleEditClick, taskCompleted, taskDeleted }) => {
    return (
        <>
            <span style={{ color: todo.complete ? 'hsl(0, 0%, 83%)' : '#fff', textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.name}</span>
            <div className="icons">
                <button id="edit" onClick={() => handleEditClick(todo)}><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button id="complete" onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id, taskCompleted: taskCompleted } })}><FontAwesomeIcon icon={faSquareCheck} /></button>
                <button id="delete" onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id, taskDeleted: taskDeleted } })}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
        </>
    );
};

export default Todo;