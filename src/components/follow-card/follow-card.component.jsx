import React from "react";

import {
  Card,
  CardContent,
  CssBaseline,
  List,
  makeStyles,
  ListItem,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
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

export default function FollowCard({ followers, following }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CssBaseline />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Followers
        </Typography>
        {followers && followers.length > 0 ? (
          <List>
            {followers.map((index) => {
              return <ListItem key={index.id}>{index.name}</ListItem>;
            })}
          </List>
        ) : (
            <span>No followers</span>
          )}
        <Typography gutterBottom variant="h5" component="h2">
          Following
        </Typography>
        {followers && followers.length > 0 ? (
          <List>
            {following.map((index) => {
              return <ListItem key={index.id}>{index.name}</ListItem>;
            })}
          </List>
        ) : (
            <span>No following</span>
          )}
      </CardContent>
    </Card>
  );
}
