import { User } from "./User";

export class AuthData {
    currentUser?: User;
    isAuthenticating: boolean;
    authErrorMsg?:string;
    constructor() {
        this.isAuthenticating = false;
    }
}
