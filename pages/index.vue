<template>
	<div>
		<!-- navigation -->
		<navigation>
			<template #left>
				<h1 class="text-xl font-bold text-[#f8f8f8]">pokédx</h1>
			</template>
			<template #right>
				<btn class="text-[#f8f8f8]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						/>
					</svg>
					<span class="font-bold"> filter </span>
				</btn>
			</template>
		</navigation>
		<!-- /navigation -->

		<!-- main -->
		<main>
			<!-- card-list -->
			<card-list :cards="species" :total="totalSpecies" />
			<!-- /card-list -->

			<!-- infinite-loading -->
			<infinite-loading v-if="species.length" @infinite="infiniteScrollPokedex">
				<template #spinner>
					<svg
						class="mx-auto mb-8 w-5 h-5 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</template>
			</infinite-loading>
			<!-- infinite-loading -->
		</main>
		<!-- /main -->
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import InfiniteLoading from 'vue-infinite-loading'

import { Pokedex, ComposedPokedex, Species } from '~/models/interfaces'
import { POKEMON_IMG_BASE_URL } from '~/utils/constants'
import padNumber from '~/utils/padNumber'

const species = ref([] as ComposedPokedex['species'])
const totalSpecies = ref<number>(0)
const currentPage = ref<number>(1)

const state = reactive({
	fetching: false,
	error: false,
})
const pagination = reactive({
	limit: 12,
	offset: 0,
})

const composeSpecies = (species: Pokedex['species']) => {
	return species.map((specy: Species) => ({
		id: padNumber(specy.id),
		name: specy.name,
		img: `${POKEMON_IMG_BASE_URL}${specy.id}.png`,
		pokemons: specy.pokemons,
	}))
}

const fetchPokedex = async () => {
	try {
		state.fetching = true
		const response = (await GqlPokedex(pagination)) as Pokedex
		species.value.push(...composeSpecies(response?.species))
		totalSpecies.value = response?.species_aggregate?.aggregate?.count
	} catch (error: any) {
		state.error = error
	} finally {
		state.fetching = false
	}
}

const infiniteScrollPokedex = async ($state: {
	loaded: () => void
	complete: () => void
}) => {
	if (state.fetching) return
	try {
		state.fetching = true
		pagination.offset = currentPage.value * pagination.limit
		const response = (await GqlPokedex(pagination)) as Pokedex
		const composedResponse = composeSpecies(response?.species)
		totalSpecies.value = response?.species_aggregate?.aggregate?.count

		if (composedResponse.length) {
			species.value.push(...composedResponse)
			state.fetching = false
			currentPage.value++
			$state.loaded()
		} else {
			$state.complete()
		}
	} catch (error: any) {
		state.error = error
	} finally {
		state.fetching = false
	}
}

onMounted(() => {
	fetchPokedex()
})
</script>
