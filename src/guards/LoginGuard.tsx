import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthUtil } from "../utils/AuthUtil";

const LoginGuard: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    if (!Component) return null;
    return (
        <Route
            {...rest}
            render={(props: any) =>
                !AuthUtil.isLoggedIn ? (<Component {...props} />) : (<Redirect to="/" />)}
        />
    );
};

export default LoginGuard;