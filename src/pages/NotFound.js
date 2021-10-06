import React from 'react';
import {  Route,Link } from 'react-router-dom';
import Image from './assets/img.PNG';
import Landing from '../pages/Landing';
export const NotFoundScreen = () => (
    <div
        style={{
            backgroundColor: '#efefef',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',overflowX:'hidden'
        }}
    >
        <img src={Image} alt="Img" />
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1>Oh no! 404!</h1>
            <p>
                It looks like you've reached a URL that doesn't exit. Please use the below
                navigation button to find to way back to the home page
            </p>

            <Link
                to="/"
                style={{ color: 'white', backgroundColor: '#4040ff', padding: '.5rem 2rem', borderRadius:'24px 4px', listStyle:'none', fontWeight:'bolder' }}
            >
                Home
            </Link>
        </div>
    </div>
);
