import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h1>Seems like you're lost...</h1>
            <Link to="/">
                <button className="btn btn-primary">Go to home page</button>
            </Link>
        </>
    );
}

export default NotFound;