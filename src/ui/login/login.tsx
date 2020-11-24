import React, { useState } from 'react';
import { AuthActions } from '../../flux/actions/AuthActions';
import { AuthData } from '../../models/AuthData';

import './login.css'

export const Login = (props: any) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const authState: AuthData = props.authState;

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        AuthActions.login(userId, password);
    }

    return <div className="login-container">
        <div className="form-container">
            <h4>Simple Login</h4>
            <form onSubmit={event => onFormSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="txtUserId">User ID</label><br />
                    <input required id="txtUserId" type="text" value={userId} onChange={event => setUserId(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="txtPassword">Password</label><br />
                    <input required id="txtPassword" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <button disabled={authState.isAuthenticating} type="submit" className="btn btn-primary">{authState.isAuthenticating ? 'Logging you in...' : 'Login'}</button>
                </div>
            </form>
        </div>
    </div>
}
