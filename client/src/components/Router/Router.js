import React, { Component } from "react";
// React Router
import { Switch, Route } from "react-router-dom";
// Routes
import HomePage from "../../pages/HomePage/HomePage";
import SummonerDetails from "../../pages/SummonerDetails/SummonerDetails";

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/summoner/:summonerName"
          render={(routeProps) => <SummonerDetails {...routeProps} />}
        />
      </Switch>
    );
  }
}
