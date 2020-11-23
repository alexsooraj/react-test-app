import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthGuard from './guards/AuthGuard';
import { Dashboard } from './ui/dashboard/dashboard';
import { Login } from './ui/login/login';
import LoginGuard from './guards/LoginGuard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthGuard exact path="/" component={Dashboard} />
          <LoginGuard path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
