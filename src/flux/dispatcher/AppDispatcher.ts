
import { Dispatcher } from "flux";
import Action from "./../../models/Action";

var AppDispatcher: Dispatcher<Action> = new Dispatcher<Action>();

export default AppDispatcher;
