import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import Detail from "./pages/detail";
import Profile from "./pages/profile";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/resturaunt/:id/:edit" component={Detail} />
        <Route exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
