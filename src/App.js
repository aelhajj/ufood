import React from 'react';
import './App.css';

import { Switch, Route } from "react-router-dom";

import Homepage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
