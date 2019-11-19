import React from 'react';

const validation = (props) => {
    let validationMessage = 'Text too long';

    if (props.inputLength <= 5) {
        validationMessage = 'Text too short';
    }

    return (
        <div>
            <p>{validationMessage}</p>
        </div>
    );
};

export default validation; 