import React from 'react';

function Loader() {
    return (
        <div className="loader" style={{
            position: 'fixed',
            // top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
           
        </div>
    );
}

export default Loader;


