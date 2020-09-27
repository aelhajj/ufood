import React from "react";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";

import Layout, {
  Root
} from "@mui-treasury/layout";

import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import Restaurant from "./components/restaurant/restaurant.component";
import Profile from "./pages/profile/profile.component";
import HeaderFood from "./components/header/header.component";


const scheme = Layout();

scheme.configureHeader((builder) => {
  builder.registerConfig("xs", {
    position: "sticky",
  });
});

scheme.configureInsetSidebar((builder) => {
  builder.create("insetSidebar", { anchor: "left" }).registerFixedConfig("sm", {
    width: 256,
  });
});

function App() {
  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <HeaderFood />
      <main>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/restaurant/:id/:edit" component={Restaurant} />
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>
      </main>
    </Root>
  );
}

export default App;
