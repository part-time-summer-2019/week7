import React from 'react';
import axios from 'axios';

export default class Ticker extends React.Component {
    state = {
        time: new Date()
    }

    updateTime() {
        let date = new Date();
        this.setState({
            time: date,
            timeString: date.toLocaleTimeString()
        })
    }

    componentDidMount() {
        console.log("Component Did mount");

        let responsePromise = axios.get('/time.json');

        responsePromise.then((response) => {
                console.log(response);

                let timeFromServer = response.data.time;

                // set the state
                this.setState({timeString: timeFromServer});
            });

        // this.timer = setInterval(() => {
        //     this.updateTime();
        // }, 1000);
    }

    shouldComponentUpdate() {
        console.log("Should component update -- Before rendering");

        if (this.state.time.getSeconds() % 2) {
            return false;
        }

        return true;
    }

    componentDidUpdate() {
        console.log("Component Did update -- After rendering");
    }

    componentWillUnmount() {
        console.log("Component will unmount");
        
        clearInterval(this.timer);
    }


    render() {
        return <div>{this.state.timeString}</div>
    }
}