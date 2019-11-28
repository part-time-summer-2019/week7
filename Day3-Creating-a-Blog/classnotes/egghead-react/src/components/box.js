import React from 'react';
import './css/box.css';

function Box({style, size, ...rest}) {
    return (
        <div className={`box box--${size}`} style={style} {...rest}/>
    );
}

export default Box;