import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { loginApi } from "../../services/user/login";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",

    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const history = useHistory();

  const login = (event) => {
    setMessage({
      data: "Login is in progress...",
      type: "info",
    });
    event.preventDefault();
    const response = loginApi.registerUser(email, password).then((res) => {
      if (res === 1) {
        setMessage({
          data: "Logged in successfully, redirecting...",
          type: "success",
        });
        setTimeout(() => {
          // localStorage.setItem("token", data.token);
          history.push("/");
        }, 3000);
        event.target.reset();
      } else {
        setMessage({
          data: "Sorry could not login.. Email / Password unrecognized",
          type: "error",
        });
      }
    });
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {message && (
          <Alert severity={message.type}>
            {message.data}
            <span aria-hidden="true" onClick={() => setMessage(null)}></span>
          </Alert>
        )}
        <ValidatorForm
          onSubmit={login}
          onError={(errors) => console.log(errors)}
          className={classes.form}
        >
          <TextValidator
            variant="outlined"
            fullWidth
            id="email"
            className={classes.form}
            label="Email Address"
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is not valid"]}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
          />
          <TextValidator
            variant="outlined"
            fullWidth
            name="password"
            className={classes.form}
            label="Password"
            value={password}
            validators={["required"]}
            errorMessages={["This field is required"]}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link className="review-link" to={`/signup/`} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
