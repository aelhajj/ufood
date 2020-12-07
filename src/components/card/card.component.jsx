import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import VisitModal from "../visit-modal/visit-modal.component";
import ViewVisitModal from "../view-visit-modal/view-visit-modal.component";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
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
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  removeIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    color: "white",
  },
}));

export default function CardResto({ data, visited, deleteCard }) {
  const classes = useStyles();
  if (data.length === 0) {
    return <span>No restaurant</span>;
  }
  return (
    <Card className={classes.card}>
      {deleteCard ? (
        <CloseIcon
          onClick={() => deleteCard(data.id)}
          className={classes.removeIcon}
        />
      ) : null}

      <CssBaseline />
      <CardMedia
        className={classes.cardMedia}
        image={data.pictures[0]}
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
        {localStorage.getItem("token") ? (
          <span>
            {visited ? (
              <ViewVisitModal
                restaurant={data}
                text="View Rating"
                visited={visited}
              />
            ) : (
              <VisitModal restaurant={data} text="Rate" visited={visited} />
            )}
          </span>
        ) : null}
      </CardActions>
    </Card>
  );
}
