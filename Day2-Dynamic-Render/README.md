# Making Your React Application More Dynamic 

### Goals
- In this lecture we will go through making the react methods more dynamic. Specifically, we will create a method which can be used in order to display the persons within state

### New topics covered
- matching id of the person
- spread operator to distribute the properties of a person
- setState
- eventListeners

### Updating the State within App.js
- So to start things off, we will update the state of the App component by giving each of the persons an `id` property and also adding a `showPersons` state.
- At this point in the application, if you do not include an `id` property, it won't break. However, whenever you glance at your developer tools, you will see an error pop up. 
```jsx 
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

```
- We will be using `id` in order to index each of the people and we will be using the `showPersons` for the toggle button we create to show the people
- So now, lets first start by making rendering of the people more dynamic.
- Underneath the `const style` variable in the render method we will add the following method of dynamically displaying people
```jsx
    let persons = null;

    if (this.state.showPersons) {
        persons = (
        <div>
            {this.state.persons.map((person, index) => {
                return <Person 
                    name={person.name} 
                    age={person.age} 
                    key={person.id} />
            })}
        </div>
        )
    }
```
- Now there is a couple this going on in here:
- First, we are creating a JSX object `persons` which we will be returned later on. 
- Second, we are checking the truthiness of this.state.showPersons - if it is true, then we will display the people.
- Now we have to replace the content of the return statement with the following: 
```jsx
    return (
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
            {persons}
      </div>
    );
```
- Now you should see the poeple dynamically displayed!

### Toggling Show Persons 
- Now let's create a button so that we toggle through seeing the people and not seeing the people
- Let's start by adding a button to the return statement 
```jsx
    return (
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        <button 
            style = {style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
```
- onClick is our EventListener and togglePersonsHandler will be the method we run whenever the button is clicked.
- We now add the following method above render
```jsx
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
```
- now you should be able to to click on Toggle Persons and hide and display the people within state

### Making nameChangedHandler Dynamic 
- Now that we are displaying the people dynamically, we can now make the nameChangedHandler more dynamic. We will insert the following code for `nameChangedHandler`
```jsx
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
    });

    const person = {
        ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }
```
- Now we pass both `event` and `id` as variables to nameChangedHandler in order to reference a unique id for each of the people
- `const personIndex` uses the JS method `.findIndex()` in order to return `true` or `false` as to whether the person's id is the one we are actually looking for - if it is true, then it will return the index value
- We then create a new `const person` and use the spread operator in order to spread the current properties of the person we are currently changing the input form of. 
- We then changed the value of `person.name` to `event.target.value`
- Now we create a new `persons` array where again spread the properties of `this.state.persons` and specifically update the person input of `personIndex`
- Finally, we then have to set the new State of the persons 
- Now in order to get the function working correctly, we have to pass the props `changed` to the `Person` component  with `nameChangedHandler` method and the appropriate variables
```jsx
    {this.state.persons.map((person, index) => {
        return <Person 
            name={person.name} 
            age={person.age} 
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
    })}
```
- You should now be able to dynamically change the names of each of the people 

### Addtional Delete Method 
- Finally, let's create one more method which will allow us to delete a person whenever we click on a given panel
```jsx
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
```
- Similar to the `nameChangedHandler` method, we will use the spread operator in order to create a copy of the current state 
- We then use the splice method in order to remove a given person from the array 
- Congratulations! You now have an application which now dynamically renders data and also dynamically passes functions to a given component