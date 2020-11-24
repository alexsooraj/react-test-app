import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthGuard from './guards/AuthGuard';
import { Dashboard } from './ui/dashboard/dashboard';
import { Login } from './ui/login/login';
import LoginGuard from './guards/LoginGuard';
import { AuthActions } from './flux/actions/AuthActions';

function App(props: any) {
  const logout = () => {
    AuthActions.logout();
  }
  return (
    <div className="App">
      {props.authState.currentUser !== undefined ? <button onClick={() => logout()}>Logout</button> : null}
      <BrowserRouter>
        <Switch>
          <LoginGuard path="/login" component={Login} {...props} />
          <AuthGuard exact path="/" component={Dashboard} {...props} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
