import React from "react";

import "./homepage.styles.css";

import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { api } from "../../services/api";

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurants: [],
      searchField: "",
      genres: [],
      searchGenre: [],
      searchRating: [1, 2, 3, 4, 5],
    };
  }

  searchGenres = (e, v) => {
    this.setState({ searchGenre: v });
  };

  searchRatings = (e, v) => {
    this.setState({ searchRating: v.map((item) => item.id) });
  };

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    const genres_tmp = [];
    api.getRestaurants()
    .then((result) => {
      this.setState({ restaurants: result.items });
      result.items.map((item) =>
        item.genres.map((it) => genres_tmp.push(it))
      );
      this.setState({ genres: Array.from(new Set(genres_tmp)) });
    })
  }

  render() {
    const { restaurants, searchField, genres } = this.state;

    var { searchGenre, searchRating } = this.state;

    if (searchGenre.length === 0) {
      searchGenre = genres;
    }

    if (searchRating.length === 0) {
      searchRating = [1, 2, 3, 4, 5];
    }

    const filteredRestaurants = restaurants
      .filter((restaurants) =>
        restaurants.name.toLowerCase().includes(searchField.toLowerCase())
      )
      .filter((restaurants) =>
        searchRating.includes(Math.ceil(restaurants.rating))
      )
      .filter((restaurants) =>
        restaurants.genres.some((genre) => searchGenre.includes(genre))
      );

    return (
      <div className="homepage">
        <div>
          <SearchBar
            handleChange={this.handleChange}
            searchGenres={this.searchGenres}
            searchRatings={this.searchRatings}
            genres={genres}
          />
          <CardList items={filteredRestaurants} />
        </div>
      </div>
    );
  }
}

export default Homepage;
