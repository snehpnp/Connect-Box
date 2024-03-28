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

// CSS styles
const styles = `
@keyframes moveUpDown {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.loader__coin {
    animation: moveUpDown 2s ease-in-out infinite;
}
`;

// Create a <style> element and append it to the <head> of the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
