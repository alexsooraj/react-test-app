import { immerable } from "immer";
import { TodoModel } from "./Todo";

export class TodoViewModel {
    todos: TodoModel[];
    loading: boolean;
    currentTodo?: TodoModel;
    saving: boolean;
    currentCategory: string;
    [immerable] = true;
    constructor() {
        this.todos = [];
        this.loading = false;
        this.saving = false;
        this.currentCategory = ''
    }
}