import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ol>
          <li>We will be using the pokemon api `https://pokeapi.co/api/v2/pokemon` in order to dynamically render the names of different Pokemon</li>  
          <li>Create a Pokemon component, similar to Post.js. This is where we will render the attributes of a given Pokemon</li>
          <li>Create a PokemonDetails component, similar to FullPost.js. This is where you will render the details of a specific Pokemon you click on</li>
          <li>Create a container for holding the Pokemon Component and the Pokemon Details component</li>
          <li>Import this container into your App.js file</li>
          <li>Use componentDidMount() in order to set your state to the first 5 pokemon received from the API call</li>
          <li>Dynamically render the first 5 Pokemon you retrieved from the API call</li>
          <li>At the very minimum, pass the name of a given Pokemon to the Pokemon component</li>
          <li>Use componentDidUpdate() to render the details of a given Pokemon component, within the PokemonDetails component</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
