import React, { useEffect } from "react";

import CardResto from "../card/card.component";
import MapView from "../map-view";

import Grid from "@material-ui/core/Grid";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Map, GridOn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    flexDirection: "column",
  },
  viewModeController: {
    marginBottom: "20px",
  },
}));

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    var options = {
      maximumAge: 50000,
      timeout: 20000,
      enableHighAccuracy: false,
    };
    var pos = { lat: 46.8119889, lng: -71.2034528 };

    resolve(pos);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(pos);
        },
        function (error) {
          console.log("Unable to get current location at the moment.");
        },
        options
      );
    } else {
      reject("Unable to get Current Location at the moment");
    }
  });
}

export default function CardList({ items, visited, deleteCard }) {
  const classes = useStyles();
  const [viewMode, setViewMode] = React.useState("grid");
  const [currentPos, setCurrentPos] = React.useState({
    lat: 46.8119889,
    lng: -71.2034528,
  });

  useEffect(() => {
    async function getPos() {
      const currentPos = await getCurrentLocation();
      setCurrentPos(currentPos);
    }
    getPos();
  }, []);

  if (items.length > 0) {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <ToggleButtonGroup
          className={classes.viewModeController}
          value={viewMode}
          exclusive
          onChange={(e, value) => setViewMode(value)}
        >
          <ToggleButton value="grid">
            <GridOn />
          </ToggleButton>
          <ToggleButton value="map">
            <Map />
          </ToggleButton>
        </ToggleButtonGroup>
        {viewMode === "grid" ? (
          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid item key={item.name} xs={6} sm={6} md={4}>
                <span>
                  <CardResto
                    data={item}
                    visited={visited}
                    deleteCard={deleteCard}
                  />
                </span>
              </Grid>
            ))}
          </Grid>
        ) : (
          <MapView places={items} currentPos={currentPos} />
        )}
      </Container>
    );
  } else {
    return <span>No restaurants</span>;
  }
}
