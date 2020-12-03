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

    public static openTodoDialog(todoItem?: TodoModel) {
        AppDispatcher.dispatch({
            type: TodoActionTypes.OPEN_TODO_DIALOG,
            payload: { todoItem }
        });
    }

    public static closeDialog() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.CLOSE_DIALOG
        });
    }

    public static fieldChange(fieldName: string, newValue: string) {
        AppDispatcher.dispatch({
            type: TodoActionTypes.FIELD_CHANGE,
            payload: { fieldName, newValue }
        });
    }

    public static saveChanges() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.SAVE_CHANGES
        });
    }

    public static saveChangesCompleted() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.SAVE_CHANGES_COMPLETED
        });
    }

    public static deleteTodo() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.DELETE_TODO
        });
    }

    public static deleteTodoCompleted() {
        AppDispatcher.dispatch({
            type: TodoActionTypes.DELETE_TODO_COMPLETED
        });
    }
}