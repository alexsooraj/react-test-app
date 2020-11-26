import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import AuthGuard from './guards/AuthGuard';
import { Login } from './ui/login/login';
import LoginGuard from './guards/LoginGuard';
import { AuthActions } from './flux/actions/AuthActions';
import DashboardContainer from './flux/containers/DashboardContainer';

function App(props: any) {
  const logout = () => {
    AuthActions.logout();
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">App</a>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {props.authState.currentUser !== undefined ? <a onClick={() => logout()} className="nav-link pointer-link">Logout ({props.authState.currentUser.userName})</a> : null}
            </li>
          </ul>
        </div>
      </nav>
      <BrowserRouter>
        <Switch>
          <LoginGuard path="/login" component={Login} {...props} />
          <AuthGuard exact path="/" component={DashboardContainer} {...props} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
