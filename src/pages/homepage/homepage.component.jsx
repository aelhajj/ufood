import React from "react";

import "./homepage.styles.css";

import CardList from "../../components/card-list/card-list.component";
//import restaurants from "../../components/restaurant/restaurant.data";
import SearchBar from "../../components/search-bar/search-bar.component";

//import * as api from '../../services/api';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurants: [],
      searchField: "",
    };
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    fetch("https://ufoodapi.herokuapp.com/unsecure/restaurants/")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ restaurants: result.items });
      });
  }

  render() {
    const { restaurants, searchField } = this.state;
    console.log(restaurants);

    const filteredRestaurants = restaurants.filter((restaurants) =>
      restaurants.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="homepage">
        <div>
          <SearchBar handleChange={this.handleChange} />
          <CardList items={filteredRestaurants} />
        </div>
      </div>
    );
  }
}

export default Homepage;
