import React from 'react';

import './card-list.styles.css';

import Card from '../card/card.component';


const CardList = ({ items }) => (
    <div className= 'card-list'>
        <h3 className='title'>RESTAURANTS LISTE</h3>
        <div className = 'preview'>
            {
                items
                    .filter((item, idx) => idx < 4)
                    .map(({id, ...otherItemProps}) => (
                        <Card key={id} {...otherItemProps}/>
                    ))
            }
        </div>
    </div>
);

export default CardList;