import React from "react";

import restaurants from "../../components/restaurant/restaurant.data";

import CardList from "../../components/card-list/card-list.component";
class Profile extends React.Component {
  render() {
    const filteredRestaurants = restaurants.filter(
      (restaurants) => restaurants.id < 4
    );

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
          <h1> Uncle Iroh </h1>
          <h2>SCORE: 100</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>RECENTLY VISITED:</h2>
          <CardList items={filteredRestaurants} />
        </div>
      </div>
    );
  }
}

export default Profile;
