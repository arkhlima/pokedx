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

export interface PokemonDetail {
	pokemon: SpeciesDetail[]
	description: SpeciesDescription[]
	evolutions: SpeciesEvolutions
}

export interface SpeciesDetail {
	id: number
	name: string
	height: number
	weight: number
	abilities: SpeciesAbilities[]
	stats: SpeciesStats[]
	types: Types[]
}

export interface SpeciesAbilities {
	ability: {
		name: string
	}
}

export interface SpeciesDescription {
	text: string
}

export interface SpeciesEvolutions {
	species: {
		name: string
	}
}

export interface SpeciesStats {
	base_stat: number
	stat: {
		name: string
	}
}
