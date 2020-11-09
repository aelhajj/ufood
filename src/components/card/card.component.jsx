import React from "react";
import { Link } from "react-router-dom";

import {
  Badge,
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
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

export default function CardResto({ data, visited }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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

        <VisitModal restaurant={data} />

        {visited ? (
          <Badge color="error" badgeContent={true} className={classes.margin}>
            <Button
              size="small"
              color="primary"
              disableRipple
              style={{ cursor: "unset" }}
            >
              Visited
            </Button>
          </Badge>
        ) : null}
      </CardActions>
    </Card>
  );
}
