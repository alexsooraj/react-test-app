import { User } from "../../models/User";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { AuthActionTypes } from "./AuthActionTypes";

export class AuthActions {
    public static login(userId: string, password: string) {
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGIN_USER,
            payload: { userId, password },
        });
    }
    public static loggedIn(userData: User) {
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGGED_IN,
            payload: userData
        });
    }
    public static logout() {
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGOUT,
        });
    }
    public static loginFailed(error: any) {
        AppDispatcher.dispatch({
            type: AuthActionTypes.LOGIN_FAILED,
            payload: {
                errorMsg: error
            }
        })
    }
}