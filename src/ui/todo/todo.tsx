import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { TodoActions } from '../../flux/actions/TodoActions';
import { Categories } from '../../models/Categories';
import { TodoModel } from '../../models/Todo';
import { TodoViewModel } from '../../models/TodoViewModel';
import './todo.css';

const TodoComponent = (props: any) => {
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    useEffect(() => {
        const category = new URLSearchParams(history.location.search).get('category');
        setCurrentCategory(category === null ? '' : category);
        if (category !== null)
            TodoActions.loadTodos(category);
        else
            TodoActions.loadTodos();
    }, []);
    const todoState: TodoViewModel = props.todoState;
    const openTodoDialog = (todoItem?: TodoModel) => {
        todoItem === undefined ? setEditMode(true) : setEditMode(false);
        TodoActions.openTodoDialog(todoItem);
    };
    const handleClose = () => {
        TodoActions.closeDialog();
    };
    const switchToEditMode = () => {
        setEditMode(true);
    };
    const fieldChange = (fieldName: string, newValue: string) => {
        TodoActions.fieldChange(fieldName, newValue);
    };
    const saveChanges = () => {
        TodoActions.saveChanges();
    }
    const handleDelete = () => {
        TodoActions.deleteTodo();
    }
    return <div className="todo-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h4>Todo</h4>
            {currentCategory === '' ? null : <span className="badge badge-secondary">{currentCategory}</span>}
        </div><Button onClick={() => openTodoDialog()} variant="primary">+ Add todo</Button></div>
        <div style={{ paddingTop: '15px' }}>
            {todoState.loading === true ? <div>Loading...</div> : <ul className="list-group">
                {todoState.todos.map((todo, index) => <li onClick={() => { openTodoDialog(todo) }} className="list-group-item pointer-link" key={index}>{todo.title}</li>)}
            </ul>}
        </div>
        <Modal show={todoState.currentTodo !== undefined} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{todoState.currentTodo === undefined ? null : editMode ? <input onChange={(event) => fieldChange('title', event.target.value)} placeholder="Title" className="form-control" type="text" value={todoState.currentTodo.title} /> : todoState.currentTodo.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    {todoState.currentTodo !== undefined ? <Form.Control value={todoState.currentTodo?.category?.name || ''} onChange={(event) => fieldChange('category', event.target.value)} disabled={!editMode} as="select">
                        <option value="" disabled>Select</option>
                        {Categories.map((category, index) => <option key={index} value={category.name}>{category.displayName}</option>)}
                    </Form.Control> : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    {todoState.currentTodo === undefined ? null : <div>
                        {editMode ? <textarea placeholder="Description" className="form-control" style={{ width: '100%' }} onChange={(event) => fieldChange('description', event.target.value)} value={todoState.currentTodo.description} /> : <p>{todoState.currentTodo.description}</p>}
                    </div>}
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger mr-auto" onClick={handleDelete}>Delete</Button>
                {editMode ? null : <Button onClick={() => switchToEditMode()}>Edit</Button>}
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button onClick={() => saveChanges()} disabled={!editMode} variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    </div>
}

const Todo = (props: any) => <TodoComponent {...props} />;

export { Todo }