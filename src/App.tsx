import React from 'react';
import './App.css';
import { BrowserRouter, Switch, NavLink } from "react-router-dom";
import AuthGuard from './guards/AuthGuard';
import { Login } from './ui/login/login';
import LoginGuard from './guards/LoginGuard';
import { AuthActions } from './flux/actions/AuthActions';
import DashboardContainer from './flux/containers/DashboardContainer';
import DetailsContainer from './flux/containers/DetailsContainer';
import TodoContainer from './flux/containers/TodoContainer';

function App(props: any) {
  const logout = () => {
    AuthActions.logout();
  }
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <NavLink to="/" className="navbar-brand">App</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {props.authState.currentUser !== undefined ?
            <div className="navbar-collapse collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link pointer-link" activeClassName="active" to="/todo">Todo</NavLink>
                </li>
                <li className="nav-item">
                  <a onClick={() => logout()} className="nav-link pointer-link">Logout ({props.authState.currentUser.userName})</a>
                </li>
              </ul>
            </div> : null}
        </nav>
        <div style={{ paddingTop: '20px' }}>
          <Switch>
            <LoginGuard path="/login" component={Login} {...props} />
            <AuthGuard exact path="/" component={DashboardContainer} {...props} />
            <AuthGuard exact path="/details" component={DetailsContainer} {...props} />
            <AuthGuard exact path="/todo" component={TodoContainer} {...props} />
          </Switch>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;
