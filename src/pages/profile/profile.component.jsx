import React from "react";
import Gravatar from "react-gravatar";
import CardList from "../../components/card-list/card-list.component";
import {
  Button,
  TextField,
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

import FollowCard from "../../components/follow-card/follow-card.component";


import { createToast } from "../../components/Toast/Toast";
import { api } from "../../services/api/index";
import { followApi } from "../../services/user/follow";

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
      following: [],
      followers: [],
      rowData: [],
      restaurants: [],
      selectedList: null,
      selectedListIndex: 0,
      visitedRestaurants: [],
    };
  }

  getUserFavorites = () => {
    const createData = (id, name, restaurants) => {
      return { id, name, restaurants };
    };
    return api.getUserFavorites().then((restaurants) => {
      const rows = [];
      restaurants.map((item) => {
        rows.push(createData(item.id, item.name, item.restaurants));
      });
      this.setState({ rowData: rows });
      if (rows.length > 0) this.setState({ tempName: rows[0].name });
      else this.setState({ restaurants: [] });
      return Promise.resolve();
    });
  };

  viewContent = (index) => {
    const resto_id = [];
    this.setState({ restaurants: [] });
    this.state.rowData[index].restaurants.map((it) => resto_id.push(it.id));
    Array.from(new Set(resto_id)).map((item) => {
      api.getRestaurantByID(item).then((restaurant) => {
        this.setState({
          selectedList: this.state.rowData[index].id,
          selectedListIndex: index,
        });
        this.setState({ restaurants: [...this.state.restaurants, restaurant] });
      });
    });
  };

  createFavorite = () => {
    api.addUserFavorite(this.state.favName).then(() => {
      createToast({ message: "Created new Favorite List" });
      this.getUserFavorites();
    });
  };

  deleteFavorite = (id) => {
    api.deleteUserFavorite(id).then(() => {
      createToast({ message: "Deleted List" });
      this.getUserFavorites();
    });
  };

  updateFavorite = (id) => {
    api.editUserFavorite(id, this.state.tempName).then(() => {
      createToast({ message: "Changed List Name" });
      this.getUserFavorites();
    });
  };

  deleteCard = (idRestaurant) => {
    api.removeFromFavorite(this.state.selectedList, idRestaurant).then(() => {
      createToast({ message: "Removed Restaurant From List" });
      this.getUserFavorites().then(() => {
        this.viewContent(this.state.selectedListIndex);
      });
    });
  };

  componentDidMount() {
    api.getUser().then((result) => {
      this.setState({ user: result });
    });
    this.getUserFavorites();
    followApi.getFollowers().then((res) => {
      this.setState({ followers: res.followers });
      this.setState({ following: res.following });
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div style={{ padding: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <Gravatar
            alt="avatar"
            email={this.state.user.email}
            size={300}
            rating="g"
            default="mp"
            className="avatar"
            style={{ margin: "10px" }}
            protocol="https://"
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
          <h1>{user.name}</h1>
          <h2>SCORE: {user.rating}</h2>
        </div>
        <FollowCard
          followers={this.state.followers}
          following={this.state.following}
        />

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
        <CardList
          items={this.state.restaurants}
          visited={true}
          deleteCard={this.deleteCard}
        />
      </div>
    );
  }
}

export default Profile;
