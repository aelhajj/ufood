import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import SearchBox from "../search-box/search-box.component";
import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

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
  const [logged, setLogged] = useState(false);

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
            {
              logged ?
                <div style={{ cursor: "pointer" }}>
                  <Link className="review-link" to={`/profile/john`}>
                    <Avatar
                      alt="avatar"
                      src={`https://images-na.ssl-images-amazon.com/images/I/61xvCroB3EL._AC_SL1000_.jpg`}
                    />
                  </Link>
                </div>
                :
                null
            }
            {
              logged ?
                <Box ml={1}>
                  <Link to={`/`}>
                    <Button
                      className="auth"
                      onClick={() => { setLogged(false) }}
                    >Sign Off</Button>
                  </Link>
                </Box>
                :
                <Link>
                  <Button
                    className="auth"
                    onClick={() => { setLogged(true) }}
                  >Sign In</Button>
                </Link>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

