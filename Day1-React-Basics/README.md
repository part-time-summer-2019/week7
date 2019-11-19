# Creating your first React App!

### Getting Started
- React was created by developers at Facebook who were looking for an easier way to create more 'reactive' websites
- To start things off, lets us npm to create our first react application. Type the following commands below in your terminal 

```script
npx create-react-app my-first-app
cd my-first-app
npm start

```
### Goals
- In this initial tutorial, we will go over the basic aspects of react by creating an application which toggle's the display based on user inputs


#TODO EXPLAIN EACH
### Starter Folders
- node_modules
- public
- src

### Starter Files
- App.js
- index.js
- package.json

### Key pieces to a React application
- Components 
- Containers
- Render
- Return
- class extends Component
- state
- props 
- props.children
- handlers
- export default

### Time to get coding
- Lets start in the `App.js` file and delete the contents between the `<header>` tags and replace it with `Hello World!`
- Lets also go ahead and remove the logo import statement
- You will see that the wepage automatically re-renders
```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          Hello World!
      </div>
    );
  }
}

export default App;
```
- Lets now also make changes to the App.css so that the file now looks like this
```css
.App {
    text-align: center;
  }
```

### Using App is our Primary Container
- Normally App would hold multiple containers, but in this example we will use it as the primary container 
- Within each container are multiple components that make up a given webpage

### Creating our first component
- So lets now start by creating our first component. In the src folder lets create a new folder called `components`
- Then let's go ahead and create two files in there, one called `Person.js` and one called `Person.css`
- Within the `Person.css` file enter the following code simply for styling: 
```css
.Person {
    width: 60%;
    margin: 16px auto; 
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
}
```
- To start things off, we first import react and the css file we will be using 
```jsx
import React from 'react';

import './Person.css';
```
- In its simplest form, a component is merely a function which returns a JSX file
- By convention, the function name should be the same as the component - just lower case
- By convention, props is used to get the properties of a given component

```jsx
const person = (props) => {
    return (
        <div className="Person">
            This is a sample person
        </div>
    )
};

export default person;
```

### Adding Components to containers 
- We then import Person from components in to the App.js file and then use Person as a component within our container 
```jsx
import Person from './components/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Here we will start by deleting */}
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        <Person />
      </div>
    );
  }
}

export default App;
```

### Adding State
- Now lets add state to the App component and create some new people 
- Normally state would be a little more dynamic, but we are fixing the values for illustrative purposes 
```jsx
class App extends Component {
  state = {
      persons: [
          {name: 'Gabby', age: 27},
          {name: 'Carter', age: 100},
          {name: 'Kenso', age: 50},
          {name: 'Greg', age: 40}
      ],
      otherState: 'some other value'
  }

```

### Using Props with Person.js
- We will now add props which will allow us to dynamically render data to the Person component
```jsx
const person = (props) => {
    return (
        <div className="Person">
            <p> I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )
};

```
- We will now add all 4 people to the app container by accessing `this.state.persons[id]`
- your return JSX object should look like this: 
```jsx
    return (
      <div className="App">
        {/* Here we will start by deleting the default entries */}
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
        <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age} />
        <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
        <Person
            name={this.state.persons[3].name}
            age={this.state.persons[3].age} />    
      </div>
    );
```
- Let's now also add `props.children`, which is special syntax which allows you to access the value between in the opening and closing tags
```jsx
const person = (props) => {
    return (
        <div className="Person">
            <p> I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )
};

```
- Additionally, let's add some children props to our `Person` in App.js
```jsx
        <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}>Children Props! </Person> 
```

### Event Handlers 
- Event handlers allow us to interact with the props within each of our components
- Here we will start by creating an `onClick` event handler which will handle changing names 
```jsx
const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}> I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )
};
```
- Back in our App.js file, we will also create a method called `switchNameHandler` which will change the current state (i.e. names and ages) of the application into our set output 
```jsx
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
```
- Now we will add a button right above our `Persons`, which will fire `swithNameHandler`. We will have to pass in an argument for `newName` for 'Gabby'
- Here we are calling the `onClick` event handler which runs the method `swithNameHandler`
- This is not the most efficient way to create event handlers, as you can see it is not very dynamic  
```jsx
        <button 
            onClick={() =>this.switchNameHandler('Gabby is the Best')}>Switch Name</button>
```
- One of the downfalls of this function is that we cannot revert back to our original state once the button has been clicked. We will address this issue and the issue of dynamically passing state in later lectures 

### Using render and adding Style
- Continuing on, let's add some style to the button by creating a variable within `render` in the App.js file. 
- The `render` method is required when you are writing a React component using a class method. Per the docs:
```text
When called, it should examine this.props and this.state and return one of the following types:

React elements. Typically created via JSX. An element can either be a representation of:
 a native DOM component (<div />), or a user-defined composite component (<MyComponent />).

String and numbers. These are rendered as text nodes in the DOM.

Portals. Created with ReactDOM.createPortal. null. Renders nothing.

Booleans. Render nothing. (Mostly exists to support return test && pattern, where test is boolean.)

```
- For our purposes, we are simply pass in-line css and not anything with `state` or `props`. We will be passing state and props in later lectures
```jsx
  render() {
    const style ={
        backgroundColor: 'white',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer'
    };
```
- Let's also pass the style to the button
```jsx
<button 
    style = {style}
    onClick={() =>this.switchNameHandler('Gabby is the Best')}>Switch Name</button>
```

### Input Handlers 
- Let's now create a new method to change the input of a given `Person` 
- Let's start in the Person.js file by adding an input form for each person
- We will use the `onChange` event handler and add a new props called `props.changed`
- We will set the `value` equal to the name we would like to change from the input form
- And finally set the input `type` to `text`
```jsx
<div className="Person">
    <p> I'm {props.name} and I am {props.age} years old!</p>
    <p>{props.children}</p>
    <input type ="text" onChange={props.changed} value={props.name}/>
</div>
```
- Now we have to go back into the App.js file and create a method to deal with the input form
- Here you will notice some problems already with hardcoding some of the functionality - which again we will deal with in later lectures
- We will change the state of a given variable by calling on `event.target.value` which is built-in jsx functionality which will allow to change the state of a selected variable 
- Here we will purposely change the names of all the instructors to animals in order to show the rigidity of the method 
```jsx
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
```
- Then finally, within our Person component, we have to add the props which will allow us to fire off nameChangedHandler
```jsx
<Person
    name={this.state.persons[1].name}
    age={this.state.persons[1].age}
    changed={this.nameChangedHandler}>Children Props! </Person> 
```
- Here we can see that 'Carter' is able to change his name but the rest of the instructors get turned to animals! 

### Key Points
- Here we got to see the basic parts of a react applicaiton, but as you can see, there are still a lot of problems with the application in terms of dynamic rendering
- There are a lot of what not to do's in this tutorial, but it gets across the point how we use props, state, components, and other basic functions of a react application. 

