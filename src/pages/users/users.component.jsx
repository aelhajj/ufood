import React from "react";

import { LinearProgress, CssBaseline, Button } from "@material-ui/core";

import Gravatar from "react-gravatar";
import FollowCard from "../../components/follow-card/follow-card.component";

import { users } from "../../services/user/users";
import { user } from "../../services/user";
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
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const myid = user.getIdUser();
    if (id === myid) {
      window.location = "/profile";
    }
    users
      .getUser(user.getIdUser())
      .then((result) => {
        if (result.following.some((user) => user.id === id)) {
          this.setState({ followed: true });
        }
      })
      .catch(() => {
        console.log("Error");
      });
    users
      .getUser(id)
      .then((result) => {
        if (result.errorCode) {
          this.setState({ error: true, loading: false });
          return;
        }
        this.setState({ user: result });
        this.setState({ followers: result.followers });
        this.setState({ following: result.following });
        this.setState({ error: false, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  }

  followRequest = () => {
    const { id } = this.props.match.params;
    if (this.state.followed) {
      followApi.unfollowUser(id).then((res) => {
        console.log(res);
        this.setState({ followed: false });
      });
    } else {
      followApi.followUser(id).then((res) => {
        console.log(res);
        this.setState({ followed: true });
      });
    }
  };

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return (
        <div className="homepage">
          <LinearProgress />
        </div>
      );
    }
    if (error) {
      return (
        <div style={{ padding: "30px", textAlign: "center" }}>
          <h2> L'utilisateur n'existe pas! </h2>
        </div>
      );
    }
    return (
      <div style={{ padding: "30px" }}>
        <div style={{ textAlign: "center" }}>
          <Gravatar
            alt="avatar"
            email={user.email}
            size={300}
            rating="g"
            default="mp"
            className="avatar"
            style={{ margin: "10px", borderRadius: "50%" }}
            protocol="https://"
            width={200}
            height={200}
          />
          <h1>{user.name}</h1>
          <h2>SCORE: {user.rating || 0}</h2>
          <Button
            size="small"
            onClick={this.followRequest}
            variant="outlined"
            color="secondary"
            style={{ marginBottom: "18px" }}
          >
            {this.state.followed ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <CssBaseline />
        <FollowCard
          followers={this.state.followers}
          following={this.state.following}
        />
      </div>
    );
  }
}

export default Users;
