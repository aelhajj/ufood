import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", 
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

export default function CardResto({ data }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CssBaseline />
      <CardMedia
        className={classes.cardMedia}
        image={data.photos[0]}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {data.name}
        </Typography>
        <Rating
          name="half-rating-read"
          value={data.rating}
          precision={0.1}
          readOnly
          size="small"
        />
      </CardContent>
      <CardActions>
        <Link className="review-link" to={`/restaurant/${data.id}/view`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
        <Link className="review-link">
          <Button size="small" color="primary">
            Directions
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
