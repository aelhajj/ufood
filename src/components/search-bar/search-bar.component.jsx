import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchBox from "../search-box/search-box.component";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {  Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const types = [
  { id: 0, type: "Mexican" },
  { id: 1, type: "Fastfood" },
  { id: 2, type: "Italian" },
  { id: 3, type: "Coffee" },
  { id: 4, type: "Thai" },
  { id: 5, type: "Lebanese" },
];

const ratings = [
  { id: 0, rating: "☆☆☆☆☆" },
  { id: 1, rating: "★☆☆☆☆" },
  { id: 2, rating: "★★☆☆☆" },
  { id: 3, rating: "★★★☆☆" },
  { id: 4, rating: "★★★★☆" },
  { id: 5, rating: "★★★★★" },
];

export default function SearchBar({ placeholder, handleChange }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.paper} container spacing={3}>
      <Grid item xs={12}>
        <SearchBox
          className={classes.paper}
          placeholder="search restaurants"
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} button>
        <Autocomplete
          className={classes.paper}
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={ratings}
          getOptionLabel={(option) => option.rating}
          defaultValue={[ratings[5], ratings[4]]}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Filter Ratings" />
          )}
        />
      </Grid>
      <Grid item xs={6} button>
        <Autocomplete
          className={classes.paper}
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={types}
          getOptionLabel={(option) => option.type}
          defaultValue={[types[1], types[2]]}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Filter Genres" />
          )}
        />
      </Grid>
    </Grid>
  );
}
