import React from 'react';

import './card.styles.css';

export const Card = ({id, name}) => (
    <div className='card-container'>
        <div className='card-info'>
            <span className='name'>{name}</span>
            <span className='cote'>3</span>

        </div>
    </div>
);

export default Card;