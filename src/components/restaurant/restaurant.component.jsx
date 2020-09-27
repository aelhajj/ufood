import React from "react";

import Gallery from "react-photo-gallery";
import RestaurantEdit from "../restaurant-edit/restaurant-edit.component";
import Chip from "@material-ui/core/Chip";
import { Grid, Box } from "@material-ui/core";
import InfoCard from "../info-card/info-card.component";
import DirectionCard from "../direction-card/direction-card.component";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import restaurants from "./restaurant.data";

class Restaurant extends React.Component {
  render() {
    const { id, edit } = this.props.match.params;
    const data = restaurants.find((r) => r.id === parseInt(id));
    if (edit === "edit") return <RestaurantEdit data={data} />;

    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
    } = require("react-google-maps");

    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={data.location} defaultZoom={17}>
        <Marker position={data.location} />
      </GoogleMap>
    ));

    let IMAGES = [];
    for (let i = 0; i < data.photos.length; i++) {
      const temp = {
        src: data.photos[i],
        width: 500,
        height: 300,
      };
      IMAGES.push(temp);
    }
    return (
      <div className="homepage">
        <h1>{data.name}</h1>
        <Grid item xs={6}>
          {data.genres.map((e, index) => (
            <Chip label={e} variant="outlined" color="secondary" key={index} />
          ))}
        </Grid>
        <Box mt={2}>
          <Gallery photos={IMAGES} direction={"row"} />
        </Box>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoCard {...data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DirectionCard {...data} />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Restaurant;
