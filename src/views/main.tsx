import { useState } from 'react'
import axios from 'axios';
import { Pokemon } from '.././models/pokemon';
import { createPokemon } from '../composables/pokemonCreator.ts'
import PokemonInfo from './info.tsx';

export function Main() {
    const [pokemon_name, setPokemonName] = useState("");
    var [pokemon, setPokemon] = useState<Pokemon>();
    const title = "Keely's Handy Dandy Type Matchup Cheat Sheet <3";
    let loading = false;

    async function getPokemon(){
      loading = true
      const uri = "https://pokeapi.co/api/v2/pokemon/" + pokemon_name.toLocaleLowerCase().replace(" ", "-")
      const response = await axios.get(uri);
      pokemon = createPokemon(response.data)
      setPokemon(pokemon)
      loading = false
    }
  
    return (
      <>
        <h1>{title}</h1>
         <div className="card">
           <input 
             id='pokemon_name'
             value={pokemon_name}
             onChange={(event)=>{setPokemonName(event.target.value)}} />
           <button onClick={getPokemon}>
             Check!
           </button>
         </div>
         <div>
           {loading ? <img src="https://cdn3.emoji.gg/emojis/2194-pokeballspin.gif" /> : (pokemon ? PokemonInfo(pokemon) : "")}
         </div>
      </>
    );
  }