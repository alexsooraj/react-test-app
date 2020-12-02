import { Container } from "flux/utils";
import { Todo } from "../../ui/todo/todo";
import TodoStore from '../stores/TodoStore';

function getStores() {
    return [TodoStore];
}

function getState() {
    return {
        todoState: TodoStore.getState(),
    };
}

export default Container.createFunctional(Todo, getStores, getState);