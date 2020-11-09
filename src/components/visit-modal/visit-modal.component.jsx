import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const ratings = [
  { id: 0, rating: "☆☆☆☆☆" },
  { id: 1, rating: "★☆☆☆☆" },
  { id: 2, rating: "★★☆☆☆" },
  { id: 3, rating: "★★★☆☆" },
  { id: 4, rating: "★★★★☆" },
  { id: 5, rating: "★★★★★" },
];

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

export default function VisitModal({ restaurant, user, text}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  // userId hardcoder pour l'instant ...
  const userId = "5fa8b39f1a4e510004217bdd";
  // userToken hardcoder pour l'instant...
  const userToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZmE4YjM5ZjFhNGU1MTAwMDQyMTdiZGQiLCJleHAiOjE2MDQ5NzgwMDM5Njh9.fPlvmrb5rclnxTVFW9iIYUPggGGxscr239TIXbIXiBM";
  
  const URL_BASE = `https://ufoodapi.herokuapp.com/users/${userId}/restaurants/visits`;
  //console.log(restaurant.id)
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitComment = (event) => {
    event.preventDefault();
    const response = fetch(URL_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken,
      },
      body: JSON.stringify({
        restaurant_id: restaurant.id,
        comment: comment,
        rating: rating,
        date: selectedDate,
      }),
    }).then((resp) => console.log(resp.json()));
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Write comment for {restaurant.name} </h2>
      <form className={classes.form} onSubmit={submitComment}>
        <Autocomplete
          className={classes.form}
          id="size-small-filled"
          size="small"
          required
          options={ratings}
          getOptionLabel={(option) => option.rating}
          onChange={(e, v) => setRating(v.id)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Give rating"
              required
            />
          )}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.form}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={e => setSelectedDate(e)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          className={classes.form}
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={6}
          defaultValue="Write comment here..."
          variant="outlined"
          margin="normal"
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          required
        />{" "}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Post comment !
        </Button>
      </form>
    </div>
  );

  return (
    <div>
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
