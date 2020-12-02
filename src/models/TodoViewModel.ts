import { immerable } from "immer";
import { TodoModel } from "./Todo";

export class TodoViewModel {
    todos: TodoModel[];
    loading: boolean;
    currentTodo?: TodoModel;
    [immerable] = true;
    constructor() {
        this.todos = [];
        this.loading = false;
    }
}