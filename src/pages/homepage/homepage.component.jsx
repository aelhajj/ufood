import React from 'react';

import './homepage.styles.css';

import CardList from '../../components/card-list/card-list.component';


class Homepage extends React.Component {
    render() {
        return (
            <div className='homepage'>
                {
                    <CardList />
                }
            </div>
        );
    }
}

export default Homepage;