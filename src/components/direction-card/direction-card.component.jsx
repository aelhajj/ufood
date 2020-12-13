import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from "react";

import RoomIcon from "@material-ui/icons/Room";

export default class DirectionCard extends Component {
  render() {
    const google = window.google;
    const { location, address } = this.props;
    const coords = new google.maps.LatLng(
      location.coordinates[1],
      location.coordinates[0]
    );
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={coords} defaultZoom={17}>
        <Marker position={coords} />
      </GoogleMap>
    ));

    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Location
          </Typography>
          <Box>
            <GoogleMapExample
              containerElement={
                <div style={{ height: `300px`, width: "100%", margin: "20px 0px" }}/>
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
            <a
              className="review-link"
              target="_blank"
              rel="noreferrer"
              href={`https://maps.google.com/?ll=${location.coordinates[1]},${location.coordinates[0]}`}
            >
              <Button variant="contained" color="secondary">
                Get Directions
              </Button>
            </a>
          </Box>
          <Box mt={1}>
            <Typography variant="body1" className="aligned-box">
              <RoomIcon aria-label="location" />
              {address}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
}
