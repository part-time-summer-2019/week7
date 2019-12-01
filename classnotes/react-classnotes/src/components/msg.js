import React from 'react';
import PropTypes from 'prop-types';

export default class Msg extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        greeting: PropTypes.string.isRequired,
        clickHandler: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <div>{this.props.greeting}</div>
                <div onClick={() => this.props.clickHandler()}>{this.props.children}</div>
            </div>
        )
    }
}