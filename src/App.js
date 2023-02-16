import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import HomePage from './containers/HomePage';
import LoginPage from './components/LoginPage';
import ChartPage from './containers/ChartPage';
import ErrorPage from './components/ErrorPage';
import {
  getToken,
  removeUserSession,
  setUserSession,
  PrivateRoute,
} from './helpers/utils';

export default function App() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
      })
      .catch((error) => {
        removeUserSession();
      });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/home"
            roles={['Admin', 'User']}
            component={HomePage}
          />
          <PrivateRoute path="/chart" roles={['Admin']} component={ChartPage} />
          <Route path="/error" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
