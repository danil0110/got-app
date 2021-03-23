import React from 'react';
import './blockToggler.css';

const BlockToggler = ({text, onToggle}) => {
    return <button className="btn btn-primary block-toggler" onClick={onToggle}>{text}</button>
}

export default BlockToggler;