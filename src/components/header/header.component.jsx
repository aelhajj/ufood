import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import SearchBox from "../search-box/search-box.component";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

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
    // vertical padding + font size from searchIcon
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
            <div className="search-box" style={{ marginRight: "20px" }}>
              {/* La barre de recherche sera implémentée a la remise 2*/}
              <SearchBox
                className={classes.search}
                aria-label="search"
                color="inherit"
                placeholder="search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div style={{ cursor: "pointer" }}>
              <Link className="review-link" to={`/profile/john`}>
                <Avatar
                  alt="avatar"
                  src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
                />
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

/*
const Header = () => (
  <div className="header">
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <div className="search-box">
            {/* La barre de recherche sera implémentée a la remise 2 }
            <SearchBox placeholder="search" />
          </div>
          <Link className="option" to="/">
            Page d'acceuil
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

*/
