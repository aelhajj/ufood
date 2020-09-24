import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import SearchBox from "../search-box/search-box.component";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className="header">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link className="logo-container" to="/">
            <Logo className={classes.menuButton} />
          </Link>
          <div className="options">
            <div className="search-box">
              {/* La barre de recherche sera implémentée a la remise 2*/}
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
