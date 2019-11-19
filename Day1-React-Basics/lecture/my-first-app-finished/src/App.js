import React, { Component } from 'react';
import './App.css';
// it is convention to name the import with a capital letter for a given file
import Person from './components/Person';

class App extends Component {
  // The following only works in 'class extends component'
  // Unlike "props" which accesses properties from outside a component, "state" accesses properties within a component
  state = {
    persons: [
        {name: 'Gabby', age: 27},
        {name: 'Carter', age: 30},
        {name: 'Kenso', age: 29},
        {name: 'Greg', age: 27}
    ],
    otherState: 'some other value'
  }

  // Handler is used by convention to show that you are not actively calling the method, but using it as an event handler
  switchNameHandler = (newName) => {
    //   console.log('Was Clicked!');
    // DONT DO THIS: this.state.persons[0].name='Gabriel';
    // this is how you're able to change the current state of variables within a given component
    this.setState({
        persons: [
            {name: newName, age: 27},
            {name: 'Carter Adams', age: 50},
            {name: 'Kenso Trabing', age: 99},
            {name: 'Greg Smith', age: 10000}
        ]
    })
  }

  // this is for inputing a specific name
  // event.target.value is how you access the value being inputted into the app
  nameChangedHandler = (event) => {
    this.setState({
        persons: [
            {name: 'TREX', age: 27},
            {name: event.target.value, age: 100},
            {name: 'RHINO', age: 99},
            {name: 'ELEPHAT', age: 10000}
        ]
    })
  }

  render() {
    // This is in-line css -> use this when you want to scope the style
    const style ={
        backgroundColor: 'white',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };

    return (
      // Must always use 'className' instead of 'class' for labeling components
      // good practice to wrap everything within a given root element you are returning
      // Keep in mind that is isn't HTML code, but JSX
      <div className="App">
        {/* Here we will start by deleting the default entries */}
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        {/* you can use the bind(this, list) in order to bind input to the new name (i.e. passing an arugment)*/}
        {/* <button onClick={this.switchNameHandler.bind(this, 'Gabriel')}>Switch Name</button> */}
        {/* You may also use the construction below, however, it is not the most efficient way to create the click method */}
        <button 
            style = {style}
            onClick={() =>this.switchNameHandler('Gabby is the Best')}>Switch Name</button>
        {/* This is customized HTML tag with a self closing back slash */}
        {/* You can access state by using this.state.persons[n].name */}
        <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
        {/* We can now add changed as a function within the person component */}
        <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            changed={this.nameChangedHandler}>Children Props! </Person> 
        <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
        <Person
            name={this.state.persons[3].name}
            age={this.state.persons[3].age} />    
      </div>
    );
  }
} 

export default App;
