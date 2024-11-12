import { FIGHTING, FIRE, FLYING, GHOST, NORMAL, POISON, GROUND, ROCK, BUG, STEEL, WATER, GRASS, ELECTRIC, PSYCHIC, DRAGON, ICE, DARK, FAIRY } from '../constants/pokemon_types/index.js'

export function getTypeConstant(type: string)
{
    switch(type) {
        case "normal": return NORMAL;
        case "fighting": return FIGHTING;
        case "flying": return FLYING;
        case "poison": return POISON;
        case "ground": return GROUND;
        case "rock": return ROCK;
        case "bug": return BUG;
        case "ghost": return GHOST;
        case "steel": return STEEL;
        case "fire": return FIRE;
        case "water": return WATER;
        case "grass": return GRASS;
        case "electric": return ELECTRIC;
        case "psychic": return PSYCHIC;
        case "ice": return ICE;
        case "dragon": return DRAGON;
        case "dark": return DARK;
        case "fairy": return FAIRY;
        default: return POISON;
    }
}

export function getTypeSprite(type: any) {
    return type.sprites["generation-viii"]["sword-shield"].name_icon
}