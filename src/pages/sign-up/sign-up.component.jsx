import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { registerApi } from "../../services/user/register";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirsName] = useState("");

  const register = (event) => {
    event.preventDefault();
    const name = firstname + " " + lastname;
    const response = registerApi.registerUser(name, email, password);
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
          Sign up
        </Typography>
        <ValidatorForm
          onSubmit={register}
          onError={(errors) => console.log(errors)}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                value={firstname}
                validators={["required"]}
                errorMessages={["This field is required"]}
                onChange={(e) => setFirsName(e.target.value)}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastname}
                validators={["required"]}
                errorMessages={["This field is required"]}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                value={password}
                validators={["required"]}
                errorMessages={["This field is required"]}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className="review-link" to={`/login/`}>
                {"Already have an account ? Login"}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
