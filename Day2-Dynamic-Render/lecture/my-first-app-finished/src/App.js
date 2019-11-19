import React, { Component } from 'react';
import './App.css';
import Person from './components/Person';

class App extends Component {
  state = {
    persons: [
        {id: 'aa', name: 'Gabby', age: 27},
        {id: 'bb', name: 'Carter', age: 30},
        {id: 'cc', name: 'Kenso', age: 29},
        {id: 'dd', name: 'Greg', age: 27}
    ],
    otherState: 'some other value',
    showPersons: true
  }

  switchNameHandler = (newName) => {
    this.setState({
        persons: [
            {name: newName, age: 27},
            {name: 'Carter Adams', age: 50},
            {name: 'Kenso Trabing', age: 99},
            {name: 'Greg Smith', age: 10000}
        ]
    })
  }

  // we need to include the id of each of the persons
  // return true or false on whether it is actually the person you are looking for
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
    });

    // create const person in order to update the appropriate person
    // here we can distribute the properties using the spread operator to the person variable
    const person = {
        ...this.state.persons[personIndex]
    };

    //alternatively
    //const person = Object.assign({},this.state.persons[personIndex]);
    
    //Now we mutate the copy of the array
    person.name = event.target.value;

    // and update the persons array with the updated person
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // now we update the persons state with the new updated value
    this.setState({persons: persons});
  }
  
  // here we are creating a method to delete a person from the list
  // const persons is merely acting as a pointer to the position of the array 
  // this.setState is reassigning the array without the newly deleted person
  // make sure to include .slice() so that you don't mutate the original array
  deletePersonHandler = (personIndex) => {
    //   const persons = this.state.persons.slice();
    // alternative: spread operator (...) which separates the elements of a given array
    // and then adds them to a given list
    // *** always create a copy of a list, never mutate an original
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  // Here we create a method which will allow us to show and hide the div containers
  // const doesShow grabds the current state of showPersons 
  // 2nd line - set the state to the what doesShow is not
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style ={
        backgroundColor: 'white',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

    // Creating the logic for the conditional outside the actual return statement is best practices
    let persons = null;

    if (this.state.showPersons) {
        persons = (
        <div>
            {/* This is how to render a list using map */}
            {/* This is how to input JSX into React - this way, you don't have to repeat Person several times*/}
            {/* click is the event that triggers the deletePersonHandler method */}
            {/* we include index here to bind the specific person */}
            {/* We need to add a key property so that React may be able to track each individual element more efficiently */}
            {/* Now we need to add changed property to update the state of the Component to handle the change in the input of text*/}
            {this.state.persons.map((person, index) => {
                return <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id}
                    changed={(event) => this.nameChangedHandler(event, person.id)} />
            })}
        </div>
        )
    }
    // ^^ is how to create conditionals ^^

    return (
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        <button 
            style = {style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {/* By wrapping the div in {}, we are able to manipulate the containers with JS */}
        {/* Only simple statements may be used - however, we can use terinary expersions*/}
        {/* We enter {persons} here to place the conditional */}
        {persons}
      </div>
    );
  }
} 

export default App;
