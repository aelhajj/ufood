import React from "react";

import { Grid, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import SearchBox from "../search-box/search-box.component";

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

const ratings = [
  { id: 0, rating: "☆☆☆☆☆" },
  { id: 1, rating: "★☆☆☆☆" },
  { id: 2, rating: "★★☆☆☆" },
  { id: 3, rating: "★★★☆☆" },
  { id: 4, rating: "★★★★☆" },
  { id: 5, rating: "★★★★★" },
];

export default function SearchBar({
  handleChange,
  genres,
  searchGenres,
  searchRatings,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.paper} spacing={3}>
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
          onChange={searchRatings}
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
          options={genres}
          getOptionLabel={(option) => option}
          onChange={searchGenres}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Filter Genres" />
          )}
        />
      </Grid>
    </Grid>
  );
}
