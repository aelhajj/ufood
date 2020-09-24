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

export default function CardList({ items }) {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {items
          /*.filter((item, idx) => idx < 5)*/
          .map(({ id, ...otherItemProps }) => (
            <Grid item key={CardResto} xs={6} sm={6} md={4}>
              <CardResto key={id} {...otherItemProps} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
