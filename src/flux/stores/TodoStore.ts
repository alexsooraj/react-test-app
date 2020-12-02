import { ReduceStore } from "flux/utils";
import { TodoViewModel } from "../../models/TodoViewModel";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Action from "../../models/Action";

class TodoStore extends ReduceStore<TodoViewModel, Action> {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState(): TodoViewModel {
        return new TodoViewModel();
    }

    reduce(state: TodoViewModel, action: Action) {
        return state;
    }
}

export default new TodoStore();