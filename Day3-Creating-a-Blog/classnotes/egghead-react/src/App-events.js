import React from 'react';

class AppEvents extends React.Component {
    state = {
        input: 'Default',
        show: true
    };

    handleInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    showHide = (e) => {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.show &&
                    <div>
                        <label htmlFor="in">{this.state.input} : </label>
                        <input id="in" onChange={this.handleInputChange} />
                    </div>
                }
            </div>
        )
    }
}

export default AppEvents;