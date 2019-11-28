import React from 'react';
import Ticker from './components/ticker';

class AppLifeCycle extends React.Component {

    state = { 
        show: true,
        buttonText: "Hide"
     };

    showHideTimer = (event) => {
        this.setState({
            show: !this.state.show,
            buttonText: this.state.show ? "Show" : "Hide"
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.show && <Ticker />
                }
                <button onClick={this.showHideTimer}>{this.state.buttonText}</button>
            </div>
        );
    }
}

export default AppLifeCycle;