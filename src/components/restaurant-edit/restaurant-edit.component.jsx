import React from "react";

import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";

class RestaurantEdit extends React.Component {
  render() {
    const data = this.props.data;

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
        <h1>Name:</h1>
        <TextField value={data.name} fullWidth /> <hr />
        <Rating
          name="half-rating-read"
          value={data.rating}
          precision={0.1}
          size="small"
        />
        <br />
        <h4>Address:</h4>
        <TextField value={data.address} fullWidth /> &nbsp;
        <br />
        <h4> Numéro de téléphone:</h4>
        <TextField value={data.phene} fullWidth /> &nbsp;
        <br />
        <h4> Genre(s) associé(s) au restaurant:</h4>
        <TextField value={data.gender} fullWidth /> &nbsp;
        <br />
        <h4> Fourchette de prix du restaurant:</h4>
        <TextField value={data.price_min} /> &nbsp;
        <TextField value={data.price_max} /> &nbsp;
      </div>
    );
  }
}

export default RestaurantEdit;
