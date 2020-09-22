import React from 'react';

import './card-list.styles.css';

import Card from '../card/card.component';
import restaurants from '../restaurant/restaurant.data';

const CardList = ({ items }) => (
    <div className= 'card-list'>
        <h1 className='title'>RESTAURANTS LISTE</h1>
        <div className = 'preview'>
            {
                restaurants
                    .filter((restaurant, idx) => idx < 4)
                    .map(({id, ...otherItemProps}) => (
                        <Card key={id} {...otherItemProps}/>
                    ))
            }
        </div>
    </div>
);

export default CardList;