import React from 'react';

const SnakeSvg = ({ snakePosition }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="snake" style={{ left: snakePosition.x, top: snakePosition.y }}>
        <path fill="#00FF00" d="M128 0l-96 96v320h96l96 96 192-192-96-96-96 96 64 64V128l-64-64-160 160L128 0zm320 320h-64v-64h64v64z"/>
    </svg>
);

export default SnakeSvg;
