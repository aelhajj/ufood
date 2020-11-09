import React from "react";

import Gallery from "react-photo-gallery";
import RestaurantEdit from "../restaurant-edit/restaurant-edit.component";
import Chip from "@material-ui/core/Chip";
import { Grid, Box } from "@material-ui/core";
import InfoCard from "../info-card/info-card.component";
import DirectionCard from "../direction-card/direction-card.component";

import { withGoogleMap, GoogleMap, Marker, Map } from "react-google-maps";

//import restaurants from "./restaurant.data";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`https://ufoodapi.herokuapp.com/unsecure/restaurants/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ restaurant: result });
      });
  }

  render() {
    const google = window.google;
    const { restaurant } = this.state;
    const { id, edit } = this.props.match.params;
    if (edit === "edit") return <RestaurantEdit data={restaurant} />;

    if (restaurant.length === 0) {
      return null;
    }

    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
    } = require("react-google-maps");

    const coords = new google.maps.LatLng(
      restaurant.location.coordinates[0],
      restaurant.location.coordinates[1]
    );

    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={coords} defaultZoom={17}>
        <Marker position={coords} />
      </GoogleMap>
    ));

    let IMAGES = [];
    for (let i = 0; i < restaurant.pictures.length; i++) {
      const temp = {
        src: restaurant.pictures[i],
        width: 500,
        height: 300,
      };
      IMAGES.push(temp);
    }

    return (
      <div className="homepage">
        <h1>{restaurant.name}</h1>
        <Grid item xs={6}>
          {restaurant.genres.map((index) => (
            <Chip
              label={index}
              variant="outlined"
              color="secondary"
              key={index}
            />
          ))}
        </Grid>
        <Box mt={2}>
          {" "}
          <Gallery photos={IMAGES} direction={"row"} />
        </Box>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoCard {...restaurant} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DirectionCard {...restaurant} />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Restaurant;
