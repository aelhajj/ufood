import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  makeStyles,
  Paper,
  Typography,
  GridList,
  GridListTile,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Rating from "@material-ui/lab/Rating";

import { api } from "../../services/api";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  gridList: {
    height: 450,
    transform: "translateZ(0)",
  },
}));

export default function ViewVisitModal({ restaurant, user, text, visited }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [visits, setVisits] = useState([]);

  const updateView = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    api.getRestaurantVisit(restaurant.id).then((list) => {
      const visitsForm = [];
      for (const item of list) {
        item.date = new Date(item.date).toLocaleDateString("en-CA", options);
        visitsForm.push(item);
      }
      setVisits(visitsForm);
    });
  };

  const handleOpen = () => {
    updateView();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Visits of {restaurant.name}</h2>
      <GridList cols={1} className={classes.gridList}>
        {visits.map((visit, index) => (
          <GridListTile key={index} cols={1} style={{ height: "auto" }}>
            <Paper elevation={1} className={classes.listItem}>
              <Typography gutterBottom variant="body1">
                {visit.date}
              </Typography>
              <Rating
                name="half-rating-read"
                value={visit.rating}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2" gutterBottom>
                {visit.comment}
              </Typography>
            </Paper>
          </GridListTile>
        ))}
      </GridList>
      <Button size="small" onClick={handleClose} color="primary">
        Close
      </Button>
    </div>
  );

  useEffect(() => {
    updateView();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {visited ? (
        <Badge badgeContent={visits.length} color="secondary">
          <Button size="small" onClick={handleOpen} color="primary">
            {text}
          </Button>
        </Badge>
      ) : (
        <Button size="small" onClick={handleOpen} color="primary">
          {text}
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
