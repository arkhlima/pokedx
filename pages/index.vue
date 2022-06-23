<template>
	<div>
		<!-- navigation -->
		<navigation>
			<template #left>
				<h1 class="text-xl font-bold text-neutral-50">
					<nuxt-link
						to="/"
						class="py-0.5 px-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
					>
						pokédx
					</nuxt-link>
				</h1>
			</template>
			<template #right>
				<btn class="text-neutral-50" @click="handleFilterModalVisibility">
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
			<infinite-loading
				v-if="species.length"
				@infinite="handleInfiniteScrollPokedex"
			>
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

			<!-- filter-modal -->
			<modal
				:is-shown="isFilterModalShown"
				@click="handleFilterModalVisibility"
			>
				<div
					role="document"
					class="relative p-6 max-w-md bg-neutral-50 rounded-md shadow-md hover:shadow-lg transition-all"
				>
					<header class="flex justify-between items-center">
						<h2 class="text-xl font-bold">filter pokemon</h2>
						<btn @click="handleFilterModalVisibility">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</btn>
					</header>
					<form class="mt-4">
						<h3 class="font-bold">type:</h3>
						<fieldset class="flex flex-wrap gap-2 mt-2">
							<checkbox
								v-for="(value, key, i) in POKEMON_TYPE_COLOR"
								:key="i"
								:label="key"
								:class="value"
								class="inline-flex py-0.5 px-2 text-sm text-neutral-50 rounded-md cursor-pointer"
								@input="handleFilterTypeCheckbox(key)"
							/>
						</fieldset>
						<btn
							class="justify-center py-3 mt-4 w-full font-bold text-neutral-50 bg-neutral-900"
							@click="handleFilterApply"
						>
							apply
						</btn>
					</form>
				</div>
			</modal>
			<!-- /filter-modal -->
		</main>
		<!-- /main -->
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

import {
	Pokedex,
	ComposedPokedex,
	Species,
	Pokemons,
	Types,
} from '~/models/interfaces'
import { POKEMON_IMG_BASE_URL, POKEMON_TYPE_COLOR } from '~/utils/constants'
import padNumber from '~/utils/pad-number'

const state = reactive({
	fetching: false,
	error: false,
})
const pagination = reactive({
	limit: 12,
	offset: 0,
})

const species = ref([] as ComposedPokedex['species'])
const totalSpecies = ref<number>(0)
const currentPage = ref<number>(1)

// const filter = reactive({
// types: Array(),
// gens: Array(),
// })

const composeSpecies = (species: Pokedex['species']) => {
	return species.map((specy: Species) => ({
		id: padNumber(specy.id),
		name: specy.name,
		img: `${POKEMON_IMG_BASE_URL}${specy.id}.png`,
		pokemons: specy.pokemons.map((pokemons: Pokemons) => ({
			types: pokemons.types.map((pokemonsTypes: Types) => ({
				type: {
					name: pokemonsTypes.type.name,
					color: POKEMON_TYPE_COLOR[pokemonsTypes.type.name],
				},
			})),
		})),
	}))
}

const fetchPokedex = async () => {
	try {
		state.fetching = true
		const response = (await GqlPokedex(pagination)) as Pokedex
		species.value = composeSpecies(response?.species)
		totalSpecies.value = response?.species_aggregate?.aggregate?.count
	} catch (error: any) {
		state.error = error
	} finally {
		state.fetching = false
	}
}

const handleInfiniteScrollPokedex = async ($state: {
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

const selectedFilterByType = ref<Array<String>>([])
const isFilterModalShown = ref<boolean>(false)

const handleFilterModalVisibility = () => {
	isFilterModalShown.value = !isFilterModalShown.value
	selectedFilterByType.value = []
}

const handleFilterTypeCheckbox = (type: string) => {
	if (selectedFilterByType.value.includes(type)) {
		const index = selectedFilterByType.value.indexOf(type)
		selectedFilterByType.value.splice(index, 1)
	} else {
		selectedFilterByType.value.push(type)
	}
}

const handleFilterApply = () => {
	filter.types = selectedFilterByType.value
}

onMounted(() => {
	fetchPokedex()
})
</script>
