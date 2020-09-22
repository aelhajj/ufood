import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import SearchBox from '../search-box/search-box.component';

import './header.styles.css';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='search-box'>
            {/* La barre de recherche sera implémentée a la remise 2 */}
            <SearchBox
                placeholder='search'
            />
        </div>
        <div className='options'>
            <Link className='option' to='/'>
                Page d'acceuil
            </Link>
        </div>
    </div>
);

export default Header;