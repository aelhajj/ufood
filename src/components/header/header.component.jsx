import React  from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import {
  AppBar,
  Button,
  Toolbar,
  CssBaseline,
  makeStyles,
  Box,
} from "@material-ui/core";

import Gravatar from "react-gravatar";

import { loginApi } from "../../services/user/login";
import { ChargedSearchBar } from "../charged-search-bar/charged-search-bar";
import { user } from "../../services/user";
import { users } from "../../services/user/users";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          className={classes.toolbar}
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link className="logo-container" to="/">
            <Logo className={classes.menuButton} width="60" height="60" />
          </Link>
          <div className="options" style={{ display: "flex" }}>
            {user.getAuthToken() ? (
              <div style={{ display: "flex" }}>
                <div className="search-box" style={{ marginRight: "20px" }}>
                  <ChargedSearchBar
                    label={"Search User"}
                    query={users.getUsersSearch.bind(users)}
                  />
                </div>
                <div style={{ cursor: "pointer" }}>
                  <Link className="review-link" to={`/profile/`}>
                    <Gravatar
                      alt="avatar"
                      email={user.getEmail()}
                      size={40}
                      rating="g"
                      default="mp"
                      className="avatar"
                      protocol="https://"
                      style={{ borderRadius: "50%" }}
                    />
                  </Link>
                </div>
              </div>
            ) : null}
            {user.getAuthToken() ? (
              <Box ml={1}>
                <Link to={`/`}>
                  <Button
                    className="auth"
                    onClick={() => {
                      loginApi.logoutUser()
                      .then(() => {
                        window.location.reload(false);
                      });
                    }}
                  >
                    Sign Off
                  </Button>
                </Link>
              </Box>
            ) : (
              <Link className="review-link" to={`/login/`}>
                <Button
                  className="auth"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
