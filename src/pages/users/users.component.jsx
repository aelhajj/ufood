import React from "react";

import {
  LinearProgress,
  CssBaseline,
  Button,
} from "@material-ui/core";

import FollowCard from "../../components/follow-card/follow-card.component";

import { users } from "../../services/user/users";
import { followApi } from "../../services/user/follow";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      following: [],
      followers: [],
      mainfollow: [],
      followed: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    users.getUser(localStorage.getItem("userid")).then((result) => {
      if (result.following.some((user) => user.id === id)) {
        this.setState({ followed: true });
      }
    });
    users.getUser(id).then((result) => {
      this.setState({ user: result });
      this.setState({ followers: result.followers });
      this.setState({ following: result.following });
    });
  }

  followRequest = () => {
    const { id } = this.props.match.params;
    if (this.state.followed) {
      followApi.unfollowUser(id).then((res) => {
          console.log(res);
          this.setState({followed : false });
        });
    } else {
      followApi.followUser(id).then((res) => {
        console.log(res);
        this.setState({ followed: true });
      });;
    }
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return (
        <div class="homepage">
          <LinearProgress />
        </div>
      );
    }
    return (
      <div style={{ padding: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <img
            alt="avatar"
            src={`https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png`}
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
          <h1>{user.name}</h1>
          <h2>SCORE: {user.rating}</h2>
          <Button
            size="small"
            onClick={this.followRequest}
            variant="outlined"
            color="secondary"
          >
            {this.state.followed ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <CssBaseline />
        <FollowCard followers={this.state.followers} following={this.state.following} />
      </div>
    );
  }
}

export default Users;
