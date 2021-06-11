import React, { Component } from 'react';
// React Router
import { Switch, Route } from 'react-router-dom';
// Routes
import HomePage from '../../pages/HomePage/HomePage';
import SummonerDetails from '../../pages/SummonerDetails/SummonerDetails';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          exact
          path='/:region/summoner/:summonerName'
          render={(routeProps) => <SummonerDetails {...routeProps} />}
        />
        <Route exact path='/Error' component={ErrorPage} />
      </Switch>
    );
  }
}
