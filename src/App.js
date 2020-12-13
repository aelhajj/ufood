import React from "react";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout, { Root } from "@mui-treasury/layout";

import { Switch, Route, Redirect } from "react-router-dom";
import Toast from "./components/toast/toast.component";
import Homepage from "./pages/homepage/homepage.component";
import Restaurant from "./components/restaurant/restaurant.component";
import Profile from "./pages/profile/profile.component";
import HeaderFood from "./components/header/header.component";
import Login from "./pages/login/login.component";
import SignUp from "./pages/sign-up/sign-up.component";
import Users from "./pages/users/users.component";
import { user } from "./services/user";

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
  function AuthGuard({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user.getAuthToken() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  return (
    <Root scheme={scheme}>
      <Toast />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderFood />
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/restaurant/:id/:edit" component={Restaurant} />
            <AuthGuard exact path="/profile/" component={Profile} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/signup/" component={SignUp} />
            <AuthGuard exact path="/users/:id" component={Users} />
          </Switch>
        </main>
      </MuiThemeProvider>
    </Root>
  );
}

export default App;
