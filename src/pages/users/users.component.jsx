import React from "react";

import {
  Typography,
  LinearProgress,
  List,
  CssBaseline,
  Divider,
  Card,
  CardContent,
  Button,
  ListItem,
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import { users } from "../../services/user/users";
import { followApi } from "../../services/user/follow";

const styles = (theme) => ({
  card: {
    position: "relative",
    display: "flex",
    height: "100%",
    flexDirection: "row",
  },
  cardContent: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
});

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
    const { classes } = this.props;

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
        <Card className={classes.card}>
          <List>
            <Typography
              gutterBottom
              className={classes.title}
              variant="overline"
              component="h2"
            >
              Followers :
            </Typography>
            <CardContent className={classes.cardContent}>
              {this.state.followers.map((index) => {
                return <ListItem key={index.id}>{index.name}</ListItem>;
              })}
            </CardContent>
            <Divider />
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="overline"
                component="h2"
              >
                Following :
              </Typography>
              {this.state.following.map((index) => {
                return <ListItem key={index.id}>{index.name}</ListItem>;
              })}
            </CardContent>
          </List>
        </Card>
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Users);
