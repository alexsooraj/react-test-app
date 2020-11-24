import { ReduceStore } from "flux/utils";
import { APIEndpoints } from "../../common/APIEndpoints";
import Action from "../../models/Action";
import { AuthData } from "../../models/AuthData";
import { APIUtil } from "../../utils/APIUtil";
import { AuthUtil } from "../../utils/AuthUtil";
import { AuthActions } from "../actions/AuthActions";
import { AuthActionTypes } from "../actions/AuthActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";

class AuthStore extends ReduceStore<AuthData, Action> {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState(): AuthData {
        const authData = new AuthData();
        if (AuthUtil.isLoggedIn()) {
            authData.currentUser = AuthUtil.getUserData();
        }
        return authData;
    }

    reduce(state: AuthData, action: Action) {
        switch (action.type) {
            case AuthActionTypes.LOGIN_USER: {
                this.login(action.payload.userId, action.payload.password);
                return {
                    ...state,
                    isAuthenticating: true,
                    authErrorMsg: undefined
                }
            }
            case AuthActionTypes.LOGGED_IN: {
                AuthUtil.setUserData(action.payload);
                return {
                    ...state,
                    isAuthenticating: false,
                    currentUser: AuthUtil.getUserData(),
                    authErrorMsg: undefined
                };
            }
            case AuthActionTypes.LOGIN_FAILED: {
                alert(action.payload.errorMsg);
                return {
                    ...state,
                    isAuthenticating: false,
                    authErrorMsg: action.payload.errorMsg
                };
            }
            case AuthActionTypes.LOGOUT: {
                AuthUtil.clearUserData();
                return {
                    ...state,
                    currentUser: undefined
                }
            }
            default:
                return state;
        }
    }

    private login(userId: string, password: string) {
        APIUtil.post(APIEndpoints.LOGIN, { userId, password }).then(res => {
            AuthActions.loggedIn(res);
        }).catch(error => {
            AuthActions.loginFailed(error);
        })
    }
}

export default new AuthStore();