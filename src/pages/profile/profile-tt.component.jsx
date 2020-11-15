import React from "react";

import CardList from "../../components/card-list/card-list.component";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { api } from "../../services/api/index";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: [],
      favorites: [],
      visited: [],
      visitedRestaurants: [],
      restaurant: [],
    };
  }

  componentDidMount() {
    const restos = [];
    api.getUser().then((result) => {
      this.setState({ user: result });
    });
    api.getUserVisited().then((result) => {
      this.setState({ visited: result });
      const resto_id = [];
      result.map((it) => resto_id.push(it.restaurant_id));
      for (const resto of Array.from(new Set(resto_id))) {
        api.getRestaurantByID(resto).then((resto) => restos.push(resto));
      }
      this.setState({ visitedRestaurants: restos });
    });
    /*api.getUserFavorites().then((result) => {
      this.setState({ favorites: result });
    });
    */
    fetch(
      "https://ufoodapi.herokuapp.com/unsecure/users/5fac0ba5fed821000485521f/favorites"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.items);
      });
  }

  render() {
    const { user, favorites, visited, visitedRestaurants } = this.state;
    // console.log(visited);
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
        {favorites > 0 ? (
          <div style={{ textAlign: "center" }}>
            <h2>RECENTLY VISITED:</h2>
            <CardList visited items={visited} />
          </div>
        ) : (
          <Typography style={{ textAlign: "center" }}>
            Seems you don't have favorites
          </Typography>
        )}
        {visitedRestaurants.length > 0 ? (
          <div style={{ textAlign: "center" }}>
            <h2>RECENTLY VISITED:</h2>
            <CardList visited items={visitedRestaurants} />
          </div>
        ) : (
          <Typography style={{ textAlign: "center" }}>
            Seems you never visited a restaurant, check them out on the{" "}
            <Link to={`/`} style={{ fontWeight: "bold" }}>
              HomePage
            </Link>
          </Typography>
        )}
      </div>
    );
  }
}

export default Profile;
