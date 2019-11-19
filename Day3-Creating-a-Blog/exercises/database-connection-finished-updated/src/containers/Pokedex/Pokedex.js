import React, { Component } from 'react';
import axios from 'axios';

import Pokemon from '../../components/Pokemon/Pokemon';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import './Pokedex.css';

class Pokedex extends Component {
    state = {
        pokemon:[],
        selectedPokemonUrl: null
    }

    componentDidMount() {
        axios.get( 'https://pokeapi.co/api/v2/pokemon' )
        .then( response => {
            // This gets only the first 4 items of the response data
            const pokemon = response.data.results.slice(0,5);
            const updatedPokemon = pokemon.map(poke => {
                return {
                    ...poke
                }
            })
            this.setState({pokemon:updatedPokemon})
            console.log(this.state.pokemon)
        })
        .catch(err => {
            console.log(err)
        })
    }

    pokemonSelectedHandler = (url) => {
        this.setState({selectedPokemonUrl:url})
    }

    render () {
        
        const pokemon = this.state.pokemon.map(poke => {
            return <Pokemon 
                    key={poke.url}
                    name={poke.name}
                    url={poke.url}
                    clicked={() => this.pokemonSelectedHandler(poke.url)}/>;
        });

        return (
            <div>
                <section className="Pokedex">
                    {pokemon}
                </section>
                <section>
                    <PokemonDetails url={this.state.selectedPokemonUrl}/>
                </section>
            </div>
        );
    }
}

export default Pokedex;