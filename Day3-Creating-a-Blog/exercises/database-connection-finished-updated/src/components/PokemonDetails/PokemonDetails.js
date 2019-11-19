import React, { Component } from 'react';
import axios from 'axios'

import './PokemonDetails.css';


class PokemonDetails extends Component {
    state = {
        loadedPokemon: null
    }

    componentDidUpdate () {
        if (this.props.url) {
            if(!this.state.loadedPokemon) {
                axios.get( 'https://pokeapi.co/api/v2/pokemon' )
                .then( response => {
                    const pokemon = response.data.results.filter(poke => poke.url === this.props.url)
                    this.setState({loadedPokemon:pokemon})
                });
            }

        }   
    }

    render () {
        let pokemon =  <p style={{textAlign: 'center'}}>Please select a Pokemon</p>;
        if (this.props.name) {
            pokemon = <p style={{textAlign: 'center'}}>Loading....!</p>
        }

        if (this.state.loadedPokemon) {
            pokemon = (
                <div className="PokemonDetails">
                    <h1>{this.state.loadedPokemon[0].name}</h1>
                </div>
            )
        }
        return pokemon;
    }
}

export default PokemonDetails;