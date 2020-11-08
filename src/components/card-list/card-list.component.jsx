import React from "react";

import CardResto from "../card/card.component";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    flexDirection: "column",
  },
}));



export default function CardList({ items, visited }) {
  const classes = useStyles();
  if (items.length > 0) {
    console.log("PAs vide");
    /*.filter((item, idx) => idx < 5)<CardResto data={item} visited={visited} />
            <Grid item key={item.name} xs={6} sm={6} md={4}></Grid> */
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.name} xs={6} sm={6} md={4}>
              <span>
                <CardResto data={item} visited={visited} />
              </span>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <span>No restaurants</span>;
  }
}
