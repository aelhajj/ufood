import React from "react";

import Gallery from "react-photo-gallery";
//import RestaurantEdit from "../restaurant-edit/restaurant-edit.component";
import Chip from "@material-ui/core/Chip";
import { Grid, Box, LinearProgress } from "@material-ui/core";
import InfoCard from "../info-card/info-card.component";
import DirectionCard from "../direction-card/direction-card.component";
import VisitModal from "../visit-modal/visit-modal.component";
import FavoriteModal from "../favorite-modal/favorite-modal.component";
import ViewVisitModal from "../view-visit-modal/view-visit-modal.component";

import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import { api } from "../../services/api";
const styles = (theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
});

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      restaurant: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    api.getRestaurantByID(id)
    .then((result) => {
      this.setState({ restaurant: result, loading: false });
    });
  }

  render() {
    const { restaurant, loading } = this.state;
    const { classes } = this.props;

    if (loading) {
      return (
        <div class="homepage">
          <LinearProgress/>
        </div>
      )
    }

    let IMAGES = [];
    for (let i = 0; i < restaurant.pictures.length && i < 5; i++) {
      const temp = {
        src: restaurant.pictures[i],
        width: 500,
        height: 300,
      };
      IMAGES.push(temp);
    }

    return (
      <div className="homepage">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={4}>
            <h1>{restaurant.name}</h1>
          </Grid>
          <Grid
            item
            xs={8}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={3}>
              <VisitModal restaurant={restaurant} text="Mark Visited" />
            </Grid>
            <Grid item xs={3}>
              <FavoriteModal restaurant={restaurant} text="Add to favorites" />
            </Grid>
            <Grid item xs={2}>
              <ViewVisitModal restaurant={restaurant} text="View visits" />
            </Grid>
          </Grid>
        </Grid>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoCard {...restaurant} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DirectionCard {...restaurant} />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          {" "}
          <Gallery photos={IMAGES} direction={"row"} />
        </Box>
      </div>
    );
  }
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurant);
