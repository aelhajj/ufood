import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import Restaurant from "./components/restaurant/restaurant.component";
import Profile from "./pages/profile/profile.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/restaurant/:id/:edit" component={Restaurant} />
        <Route exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
