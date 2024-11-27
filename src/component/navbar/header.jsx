import React from 'react';
import { Link } from 'react-router-dom';
import search_icon from '../../assets/search-icon.svg';
import logo from '../../assets/logo.svg';
const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt='' className='logo'></img>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Popular</li>
            <li>Subcribe</li>
        </ul>
        <div className='search-box'>
            <input type='text' placeholder='Search'/>
            <img src={search_icon} alt=''/> 

        </div>


    </div>

    
  );
};

export default Header;