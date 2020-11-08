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
      genres: [],
      searchGenres: [],
      seachRating: [],
    };
   // this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (e) => {
   //this.setState({ searchField: e.target.value });
   const {name, value} = e.target;
   this.setState({[name]: value});
   console.log(e.target);
  };

  componentDidMount() {
    const genres_tmp = [];
    fetch("https://ufoodapi.herokuapp.com/unsecure/restaurants/")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ restaurants: result.items });
        result.items.map((item) => item.genres.map((it) => genres_tmp.push(it)));
        //console.log(genres_tmp);
        this.setState({genres : Array.from(new Set(genres_tmp))});
      });
  }

  render() {
    const { restaurants, searchField, genres, seachRating, searchGenres } = this.state;

    const filteredRestaurants = restaurants.filter((restaurants) =>
      restaurants.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="homepage">
        <div>
          <SearchBar handleChange={this.handleChange} genres={genres}/>
          <span>a</span>
          <CardList items={filteredRestaurants} />
        </div>
      </div>
    );
  }
}

export default Homepage;
