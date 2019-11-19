import React from 'react';

import './Pokemon.css';

const pokemon = (props) => (
    <article className="Pokemon" onClick={props.clicked}>
        <h1>{props.name}</h1>
        <div className="Info">
            <div className="Author">Other Content</div>
        </div>
    </article>
);

export default pokemon;