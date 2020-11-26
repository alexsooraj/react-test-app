import { User } from "./User";
import { immerable } from "immer";

export class AuthData {
    currentUser?: User;
    isAuthenticating: boolean;
    authErrorMsg?:string;
    [immerable] = true;
    constructor() {
        this.isAuthenticating = false;
    }
}
