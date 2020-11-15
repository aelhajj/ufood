import React from "react";
import CardList from "../../components/card-list/card-list.component";
import {
  Button,
  TextField,
  Typography,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Clear";
import UpdateIcon from "@material-ui/icons/Update";
import ViewIcon from "@material-ui/icons/ViewComfy";

import { api } from "../../services/api/index";

const CssTextField = withStyles({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      color: "white",
      height: "30px",
      "& fieldset": {
        borderColor: "#46647F",
      },
      "&:hover fieldset": {
        borderColor: "#46647F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#46647F",
      },
    },
  },
})(TextField);

const StyledTableCell = withStyles((theme) => ({
  head: {
    //backgroundColor: '#06233F',
    border: "1px solid black",
    color: theme.palette.common.white,
  },
  body: {
    border: "1px solid black",
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "& .MuiTableCell-body": {
      height: "50px",
      color: "white",
    },
    "& .MuiTableCell-root": {
      border: "1",
      padding: "8px",
    },
  },
}))(TableRow);

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: [],
      favName: "",
      tempName: "",
      rowData: [],
      restaurants: [],

      visitedRestaurants: [],
    };
  }

  getUserFavorites = () => {
    const createData = (id, name, restaurants) => {
      return { id, name, restaurants };
    };

    fetch(
      "https://ufoodapi.herokuapp.com/unsecure/users/5fac0ba5fed821000485521f/favorites"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.items);
        const rows = [];
        result.items.map((item) => {
          rows.push(createData(item.id, item.name, item.restaurants));
        });
        this.setState({ rowData: rows });
        if (rows.length > 0) {
          //this.getRestaurants();
          this.setState({ tempName: rows[0].name });
        } else {
          this.setState({ restaurants: [] });
        }
      });
  };

  viewContent = (index) => {
    this.setState({ restaurants: [] });
    this.state.rowData[index].restaurants.map((item) => {
      //console.log(item.id);
      fetch("https://ufoodapi.herokuapp.com/unsecure/restaurants/" + item.id)
        .then((res) => res.json())
        .then((result) => {
          //console.log(result);
          const temp = this.state.restaurants;
          temp.push(result);
          this.setState({ restaurants: temp });
          //this.getUserVisits();
        });
    });
  };

  createFavorite = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.favName,
        owner: "john@gmail.com",
      }),
    };

    fetch("https://ufoodapi.herokuapp.com/unsecure/favorites", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.id);
        this.getUserFavorites();
        this.setState({ favName: "" });
      });
  };

  deleteFavorite = (id) => {
    const requestOptions = {
      method: "DELETE",
    };

    fetch(
      "https://ufoodapi.herokuapp.com/unsecure/favorites/" + id,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.getUserFavorites();
      });
  };

  updateFavorite = (id) => {
    console.log(this.state.tempName);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.tempName,
        owner: "john@gmail.com",
      }),
    };

    fetch(
      "https://ufoodapi.herokuapp.com/unsecure/favorites/" + id,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.getUserFavorites();
      });
  };

  componentDidMount() {
    api.getUser().then((result) => {
      this.setState({ user: result });
    });
    this.getUserFavorites();
  }

  render() {
    const { user } = this.state;

    return (
      <div style={{ padding: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <img
            alt="avatar"
            src={`https://images-na.ssl-images-amazon.com/images/I/61xvCroB3EL._AC_SL1000_.jpg`}
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
          <h1>{user.name}</h1>
          <h2>SCORE: {user.rating}</h2>
        </div>

        <div>
          <TextField
            label="favoris nom"
            value={this.state.favName}
            onChange={(ev) => this.setState({ favName: ev.target.value })}
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.createFavorite}
          >
            Create
          </Button>
        </div>

        <TableContainer component={Paper} style={{ marginTop: 10 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ color: "black", fontSize: 20 }}>
                  List name
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: "black", fontSize: 20 }}
                >
                  Rename
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: "black", fontSize: 20 }}
                >
                  Delete
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: "black", fontSize: 20 }}
                >
                  View Content
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rowData.map((row, index) => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      <CssTextField
                        defaultValue={row.name}
                        onChange={(e, v) =>
                          this.setState({ tempName: e.target.value })
                        }
                        variant="outlined"
                        id="txtName"
                        spellCheck="false"
                        style={{ color: "white" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => this.updateFavorite(row.id)}>
                        <UpdateIcon style={{ color: "#00FF00" }} />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => this.deleteFavorite(row.id)}>
                        <DeleteIcon style={{ color: "#FF0000" }} />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button onClick={() => this.viewContent(index)}>
                        <ViewIcon style={{ color: "#0000FF" }} />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CardList items={this.state.restaurants} visited={true} />
      </div>
    );
  }
}

export default Profile;
