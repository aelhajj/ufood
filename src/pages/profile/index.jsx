import React from "react";

import restaurants from "../../components/restaurant/restaurant.data";

import CardList from "../../components/card-list/card-list.component";
class Profile extends React.Component {



    render() {
        const filteredRestaurants = restaurants.filter((restaurants) => restaurants.id < 4);

        return (
            <div style={{ padding: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                    <img alt="avatar" src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
                        width={200} height={200} style={{ borderRadius: '50%' }} />
                    <h1> JOHN SMITH</h1>
                    <h2>SCORE: 100</h2>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>RECENTLY VISITED:</h2>
                    <CardList items={filteredRestaurants} />
                </div>
            </div>
        );
    }
}

export default Profile;
