import { ReduceStore } from "flux/utils";
import { TodoViewModel } from "../../models/TodoViewModel";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Action from "../../models/Action";
import { TodoActionTypes } from "../actions/TodoActionTypes";
import produce from "immer";
import { APIUtil } from "../../utils/APIUtil";
import { APIEndpoints } from "../../common/APIEndpoints";
import { TodoActions } from "../actions/TodoActions";

class TodoStore extends ReduceStore<TodoViewModel, Action> {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState(): TodoViewModel {
        return new TodoViewModel();
    }

    reduce(state: TodoViewModel, action: Action) {
        switch (action.type) {
            case TodoActionTypes.LOAD_TODOS: {
                this.loadTodos();
                return produce(state, dState => {
                    dState.loading = true;
                });
            }
            case TodoActionTypes.LOAD_TODOS_COMPLETED: {
                return produce(state, dState => {
                    dState.loading = false;
                    dState.todos = action.payload.todos
                });
            }
            case TodoActionTypes.OPEN_TODO_DIALOG: {
                return produce(state, dState => {
                    dState.currentTodo = action.payload.todoItem
                });
            }
            default:
                return state;
        }
    }

    private loadTodos() {
        APIUtil.get(APIEndpoints.TODOS).then(result => {
            TodoActions.loadTodosCompleted(result);
        })
    }
}

export default new TodoStore();