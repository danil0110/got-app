import React from 'react';
import img from './img/got-logo.png';
import './homePage.css';

const HomePage = () => {
    return (
        <div class="home-block">
            <h1>Welcome to the Game Of Thrones DB</h1>
            <img src={img} alt="got-logo" />
        </div>
    );
}

export default HomePage;