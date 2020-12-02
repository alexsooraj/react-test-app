import { TodoModel } from "../../models/Todo";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { TodoActionTypes } from "./TodoActionTypes";

export class TodoActions {
    public static loadTodos() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.LOAD_TODOS
        });
    }

    public static loadTodosCompleted(todos: TodoModel[]) {
        AppDispatcher.dispatch({
            type: TodoActionTypes.LOAD_TODOS_COMPLETED,
            payload: { todos }
        });
    }

    public static openTodoDialog(todoItem: TodoModel) {
        AppDispatcher.dispatch({
            type: TodoActionTypes.OPEN_TODO_DIALOG,
            payload: { todoItem }
        });
    }
}