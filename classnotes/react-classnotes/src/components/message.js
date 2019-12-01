import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
    let child;

    if (props.children) {
        child = <div>{props.children}</div>
    } else {
        child = <div>No Message</div>
    }

    return (
        <div>
            {
                child
            }
        </div>
    )
};

Message.propTypes = {
    children: PropTypes.string
}

export default Message;