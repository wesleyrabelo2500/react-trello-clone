import React from 'react';

export const NotFoundPage = () => (
    <>
        <img
            alt="404"
            wifth
            src="Images/404.svg"
            style={{
                display: 'block',
                width: '60%',
                height: '70%',
                margin: 'auto',
                marginTop: '5%',
            }}
        />
        <p
            style={{
                textAlign: 'center',
                marginTop: '2%',
                fontFamil: 'Time new Roman',
                fontSize: '25px',
            }}
        >
            The page isn't available. Sorry!
        </p>
    </>
);
