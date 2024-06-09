import React from 'react';

const Loader = () => {
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
    };

    const spinnerStyle = {
        border: '8px solid #6854EC',
        borderTop: '8px solid transparent',
        borderRadius: '50%',
        width: '90px',
        height: '90px',
        animation: 'spin 2s linear infinite',
    };

    return (
        <div style={loaderStyle}>
            <div style={spinnerStyle}></div>
        </div>
    );
};

export default Loader;
