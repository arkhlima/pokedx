export interface Pokedex {
	species: Species[]
	species_aggregate: Aggregate
}

export interface ComposedPokedex {
	species: ComposedSpecies[]
	species_aggregate: Aggregate
}

export interface Aggregate {
	aggregate: {
		count: number
	}
}

export interface Species {
	id: number
	name: string
	pokemons: Pokemons[]
}

export interface ComposedSpecies {
	id: string
	name: string
	img: string
	pokemons: ComposedPokemons[]
}

export interface Pokemons {
	types: Types[]
}

export interface ComposedPokemons {
	types: ComposedTypes[]
}

export interface Types {
	type: {
		name: string
	}
}

export interface ComposedTypes {
	type: {
		name: string
		color: string
	}
}
