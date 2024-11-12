export interface Pokemon {
    abilities: Ability[],
    name: string,
    moves: Move[],
    sprites: Sprites,
    stats: Stat[],
    types: [],
}

export interface Ability {
    name: string,
    url: string,
    isHidden: boolean
}

export interface Move {
    name: string,
    url: string,
}

export interface Sprites {
    male_default: string,
    female_default: string,
    male_shiny: string,
    female_shiny: string,
}

export interface Stat {
    base_stat: number,
    name: string,
    url: string,
}
