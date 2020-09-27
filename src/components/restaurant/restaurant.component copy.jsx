import React from "react";

import Rating from "@material-ui/lab/Rating";
import Gallery from "react-photo-gallery";
import RestaurantEdit from "../restaurant-edit/restaurant-edit.component";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";


import restaurants from "./restaurant.data";
import { Grid } from "@material-ui/core";


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
        <GoogleMapExample
          containerElement={
            <div
              style={{ height: `300px`, width: "100%", margin: "20px 0px" }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
        <Button variant="contained" color="secondary">
          Get Directions
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>
              Address : <span className="value">{data.address}</span>
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Rating
              name="half-rating-read"
              value={data.rating}
              precision={0.1}
              readOnly
              size="small"
            />
          </Grid>
        </Grid>
        <Gallery photos={IMAGES} direction={"row"} />
        <Grid>
          <Grid item xs={12}>
            <h4>
              Phone number : <span className="value">{data.phone} </span>
            </h4>
          </Grid>
          <Grid item xs={6}>
            <h3>Service hours :</h3>
            {data.open_hours.map((d, index) => (
              <h5 key={index} style={{ marginLeft: "10px" }}>
                {" "}
                {d.day}: {d.hours}
              </h5>
            ))}
          </Grid>
          <Grid item xs={6}>
            <h3>
              {" "}
              Price range :{" "}
              <span className="value">
                CAD {data.price_min} ~ {data.price_max}
              </span>
            </h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Associated types : </h3>
            {data.genres.map((e, index) => (
              <Chip
                label={e}
                variant="outlined"
                color="secondary"
                key={index}
              />
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Restaurant;
