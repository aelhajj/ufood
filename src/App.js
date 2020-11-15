import React from "react";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout, { Root } from "@mui-treasury/layout";

import { Switch, Route } from "react-router-dom";
import Toast from './components/Toast/Toast';
import Homepage from "./pages/homepage/homepage.component";
import Restaurant from "./components/restaurant/restaurant.component";
import Profile from "./pages/profile/profile.component";
import HeaderFood from "./components/header/header.component";

const scheme = Layout();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#e5989b",
      dark: "#000",
    },
    secondary: {
      main: "#b5838d",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <Root scheme={scheme}>
      <Toast/>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderFood />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/restaurant/:id/:edit" component={Restaurant} />
            <Route exact path="/profile/" component={Profile} />
          </Switch>
        </main>
      </MuiThemeProvider>
    </Root>
  );
}

export default App;
