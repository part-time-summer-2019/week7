import 'bootstrap/dist/css/bootstrap.css';

import React, {Component} from 'react';
import './App.css';
import Person from './components/Person';
import Button from 'react-bootstrap/Button';
import StatesWorker from './workers/StatesWorker';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';

class App extends Component {

    state = {
        persons: [
            {name: 'Boyan', age: 27},
            {name: 'Som', age: 20},
            {name: 'Nikhil', age: 26}
        ],
        states: [],
        cohortName: 'Spartans - Part Time'
    };

    statesWorker = new StatesWorker();

    nameChangeHandler() {
        this.setState({
            persons: [
                {name: 'Boyan', age: 27},
                {name: 'Som', age: 20},
                {name: 'Akmal', age: 28},
                {name: 'Nikhil', age: 26}
            ]
        });

        console.log("Button change handler");
    }

    populateStates() {
        let states = this.statesWorker.getStates();

        this.setState({
            states: states
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("In component did update");
    }

    componentDidMount() {
        console.log("In component mount");
    }

    componentWillMount() {
        console.log("In component will mount");

        // logic
    }

    componentWillUnmount() {
        console.log("In component will unmount");
    }


    render() {
        console.log("Calling render...");

        return (
            <div className="App">
                <h2>My New React App</h2>

                <div>{this.state.cohortName}</div>

                <Button variant="outline-info" onClick={() => this.populateStates()}>Validate Me</Button>

                {
                    this.state.persons.map((p, i) => {
                        return <Person key={i} name={p.name} age={p.age}/>
                    })
                }

                <DropdownButton title="States">
                    {
                        this.state.states.map((state, i) => {
                            return <DropdownItem key={i}>{state.name}</DropdownItem>
                        })
                    }
                </DropdownButton>

            </div>
        );
    }
}

export default App;
