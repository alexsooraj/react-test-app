import React, { useEffect } from 'react';
import { TodoActions } from '../../flux/actions/TodoActions';
import { TodoModel } from '../../models/Todo';
import { TodoViewModel } from '../../models/TodoViewModel';
import './todo.css';

const TodoComponent = (props: any) => {
    useEffect(() => {
        TodoActions.loadTodos();
    }, []);
    const todoState: TodoViewModel = props.todoState;
    const openTodoDialog = (todoItem: TodoModel) => {
        TodoActions.openTodoDialog(todoItem);
    };
    return <div className="todo-container"><h4>Todo</h4>
        <div>
            {todoState.loading === true ? <div>Loading...</div> : <ul className="list-group">
                {todoState.todos.map((todo, index) => <li onClick={() => { openTodoDialog(todo) }} className="list-group-item pointer-link" key={index}>{todo.title}</li>)}
            </ul>}
        </div>
        {todoState.currentTodo === undefined ? null : <div>
        <h5>Title : {todoState.currentTodo.title}</h5>
        <h6>Description : {todoState.currentTodo.description}</h6>
        </div>}
    </div>
}

const Todo = (props: any) => <TodoComponent {...props} />;

export { Todo }