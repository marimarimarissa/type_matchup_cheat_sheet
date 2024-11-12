import { Pokemon, Sprites } from '../models/pokemon'
import { getTypeConstant } from './typeParser'

export function createPokemon(obj: any): Pokemon {
    const poke_types = getTypes(obj.types)
    const sprites = getSprite(obj.sprites)
    return <Pokemon>{
        abilities: obj.abilities,
        name: obj.name,
        moves: obj.moves,
        sprites: sprites,
        stats: obj.stats,
        types: poke_types
    }
}

function getTypes(poke_types: any): any[] {
    const collected_types = <any[]>[];
    poke_types.forEach(async (poke_type: any) => {
        collected_types.push(getTypeConstant(poke_type.type.name))
    });
    return collected_types;
}

function getSprite(sprite: any): Sprites {
    return {
        male_default: sprite.front_default,
        female_default: sprite.front_female,
        male_shiny: sprite.front_shiny,
        female_shiny: sprite.front_shiny_female,
    }
}

