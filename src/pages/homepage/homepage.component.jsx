import React from "react";

import "./homepage.styles.css";

import CardList from "../../components/card-list/card-list.component";
import SearchBox from "../../components/search-box/search-box.component";

import restaurants from "../../components/restaurant/restaurant.data";

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurants: restaurants,
      searchField: "",
    };
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { restaurants, searchField } = this.state;
    const filteredRestaurants = restaurants.filter((restaurants) =>
      restaurants.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="homepage">
        <SearchBox
          placeholder="search restaurants"
          handleChange={this.handleChange}
        />
        <CardList items={filteredRestaurants} />
      </div>
    );
  }
}

export default Homepage;
