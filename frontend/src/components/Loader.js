import React from 'react';
import {Spinner} from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner
        animation="border"
        role="status"
        variant="success"
        style= {{
            height: '100px',
            width: '100px',
            margin: 'auto',
            display: 'block' 
        }}
        >
        <span className='sr-only'>Planting....</span>
        </Spinner>
    )
}

export default Loader;
