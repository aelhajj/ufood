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

export default function CardList({ items, visited, deleteCard }) {
  const classes = useStyles();
  if (items.length > 0) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.name} xs={6} sm={6} md={4}>
              <span>
                <CardResto
                  data={item}
                  visited={visited}
                  deleteCard={deleteCard}
                />
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
