import React from "react";

import {
  Typography,
  LinearProgress,
  Paper,
  List,
  Divider,
  ListItem,
} from "@material-ui/core";
import { users } from "../../services/user/users";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      following: [],
      followers: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    users.getUser(id).then((result) => {
      this.setState({ user: result });
      this.setState({ followers: result.followers });
      this.setState({ following: result.following });
    });
  }

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
        </div>
        <List component={Paper}>
          <Typography variant="overline" component="h2">
            Followers :
          </Typography>
          {this.state.followers.map((index) => {
            return <ListItem>{index.name}</ListItem>;
          })}
          <Divider />
          <Typography variant="overline" component="h2">
            Following :
          </Typography>
          {this.state.following.map((index) => {
            return <ListItem>{index.name}</ListItem>;
          })}
        </List>
      </div>
    );
  }
}

export default Users;
