import React, { useEffect, useState } from "react";
import { Button, makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
}));

export default function FavoriteModal({ restaurant, user, text }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [chosenList, setChosenList] = useState({});
  // userId hardcoder pour l'instant ...
  const userId = "5fa8b39f1a4e510004217bdd";
  // userToken hardcoder pour l'instant...
  const userToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZmE4YjM5ZjFhNGU1MTAwMDQyMTdiZGQiLCJleHAiOjE2MDQ5NzgwMDM5Njh9.fPlvmrb5rclnxTVFW9iIYUPggGGxscr239TIXbIXiBM";

  const URL_BASE = `https://ufoodapi.herokuapp.com/users/${userId}/restaurants/visits`;
  //console.log(restaurant.id)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api.getFavoritesLists().then((list) => {
      const favorites = [];
      for (const item of list) {
        if (!item.name)
          // /!\ Some Lists have no Name /!\
          item.name = "(Anonymous List)";
        favorites.push(item.name);
      }
      setOptions(list);
    });
  }, []);

  const submitComment = (event) => {
    event.preventDefault();
    api.addToFavorite(chosenList.id, restaurant.id).then(() => {
      setShowAlert(true);
      setOpen(false);
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add {restaurant.name} to Favorites </h2>
      <form className={classes.form} onSubmit={submitComment}>
        <Autocomplete
          required
          size="small"
          limitTags={2}
          id="multiple-limit-tags"
          options={options}
          onChange={(e, v) => {
            if (!e || !v) return;
            setChosenList(v);
          }}
          getOptionLabel={(option) => option.name || "(Anonymous List)"}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Choose list"
              required
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Add
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showAlert}
        onClose={() => setShowAlert(false)}
        autoHideDuration={3000}
        message="Note archived"
      >
        <Alert severity="success">Restaurant Added to Favorties</Alert>
      </Snackbar>
      <Button size="small" onClick={handleOpen} color="primary">
        {text}
      </Button>

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
