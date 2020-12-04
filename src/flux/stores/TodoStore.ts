import { ReduceStore } from "flux/utils";
import { TodoViewModel } from "../../models/TodoViewModel";
import AppDispatcher from "../dispatcher/AppDispatcher";
import Action from "../../models/Action";
import { TodoActionTypes } from "../actions/TodoActionTypes";
import produce from "immer";
import { APIUtil } from "../../utils/APIUtil";
import { APIEndpoints } from "../../common/APIEndpoints";
import { TodoActions } from "../actions/TodoActions";
import { TodoModel } from "../../models/Todo";
import { Categories } from "../../models/Categories";

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
                this.loadTodos(action.payload.category);
                return produce(state, dState => {
                    dState.loading = true;
                });
            }
            case TodoActionTypes.LOAD_TODOS_COMPLETED: {
                return produce(state, dState => {
                    dState.loading = false;
                    dState.todos = action.payload.todos.map((todo: any) => ({
                        ...todo,
                        category: Categories.find(cat => cat.name === todo.category)
                    }))
                });
            }
            case TodoActionTypes.OPEN_TODO_DIALOG: {
                return produce(state, dState => {
                    dState.currentTodo = action.payload.todoItem !== undefined ? action.payload.todoItem : { description: '', title: '', category: undefined }
                });
            }
            case TodoActionTypes.CLOSE_DIALOG: {
                return produce(state, dState => {
                    dState.currentTodo = undefined;
                });
            }
            case TodoActionTypes.FIELD_CHANGE: {
                return produce(state, dState => {
                    if (action.payload.fieldName === 'category') {
                        (dState.currentTodo as any)[action.payload.fieldName] = Categories.find(cat => cat.name === action.payload.newValue);
                    } else {
                        (dState.currentTodo as any)[action.payload.fieldName] = action.payload.newValue;
                    }
                })
            }
            case TodoActionTypes.SAVE_CHANGES: {
                this.saveTodo(state.currentTodo);
                return produce(state, dState => {
                    dState.saving = true;
                });
            }
            case TodoActionTypes.SAVE_CHANGES_COMPLETED: {
                setTimeout(() => TodoActions.loadTodos());
                return produce(state, dState => {
                    dState.saving = false;
                    dState.currentTodo = undefined;
                });
            }
            case TodoActionTypes.DELETE_TODO: {
                this.deleteTodo(state.currentTodo);
                return state;
            }
            case TodoActionTypes.DELETE_TODO_COMPLETED: {
                setTimeout(() => TodoActions.loadTodos());
                return produce(state, dState => {
                    dState.currentTodo = undefined;
                });
            }
            default:
                return state;
        }
    }

    private loadTodos(category?: string) {
        let query = '';
        if (category !== undefined) {
            query = '?category=' + category;
        }
        APIUtil.get(APIEndpoints.TODOS + query).then(result => {
            TodoActions.loadTodosCompleted(result);
        })
    }

    private deleteTodo(todo?: TodoModel) {
        APIUtil.delete(APIEndpoints.TODOS + '?id=' + todo?.id).then(res => {
            TodoActions.deleteTodoCompleted();
        });
    }

    private saveTodo(todo?: TodoModel) {
        const newTodo: any = {
            ...todo,
            category: todo?.category.name
        };
        const promise = todo?.id === undefined ? APIUtil.post(APIEndpoints.TODOS, newTodo) : APIUtil.put(APIEndpoints.TODOS, newTodo)
        promise.then(res => {
            TodoActions.saveChangesCompleted();
        });
    }
}

export default new TodoStore();