import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <span>Name: {props.name}, Age: {props.age} </span>
            <span>{props.children}</span>
        </div>
    );
};

export default person;