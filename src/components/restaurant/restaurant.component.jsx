import React from "react";

import Gallery from "react-photo-gallery";
//import RestaurantEdit from "../restaurant-edit/restaurant-edit.component";
import Chip from "@material-ui/core/Chip";
import { Grid, Box, Button, TextField } from "@material-ui/core";
import InfoCard from "../info-card/info-card.component";
import DirectionCard from "../direction-card/direction-card.component";
import VisitModal from "../visit-modal/visit-modal.component";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
      restaurant: [],
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
    const { restaurant } = this.state;
    const { classes } = this.props;
    // const { id, edit } = this.props.match.params;
    // if (edit === "edit") return <RestaurantEdit data={restaurant} />;

    if (restaurant.length === 0) {
      return null;
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
          <Grid item xs={12}>
            <h1>{restaurant.name}</h1>
          </Grid>
          <Grid item xs={12}>
            <VisitModal restaurant={restaurant} text="Mark Visited" />
          </Grid>
          <Grid item xs={6} button>
            <Button size="small" color="secondary">
              Add to favorites
            </Button>
            <Grid item xs={6} button>
              <Autocomplete
                className={classes.paper}
                multiple
                size="small"
                limitTags={2}
                id="multiple-limit-tags"
                options={["a"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Choose lists"
                  />
                )}
              />
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
