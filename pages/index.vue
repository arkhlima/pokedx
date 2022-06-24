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
				<btn
					:class="{ 'ring focus:ring-gray-300': isFiltered }"
					class="text-neutral-50"
					@click="handleFilterModalVisibility"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
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
				</btn>
				<btn
					:class="{ 'ring focus:ring-gray-300': isCompared }"
					class="text-neutral-50"
					@click="handleCompareMode"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
						/>
					</svg>
				</btn>
			</template>
		</navigation>
		<!-- /navigation -->

		<!-- main -->
		<main>
			<!-- card-list -->
			<div class="py-8 px-6">
				<h3 class="font-semibold text-right">total {{ totalSpecies }}</h3>
				<ul
					class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-4 card-list"
				>
					<li v-for="(specy, i) of species" :key="i" class="bg-neutral-50">
						<card-item
							:is-compared="isCompared"
							:is-disabled="selectedPokemonComparison.length >= 2"
							:card="specy"
							@input="handleCompareCheckbox"
						/>
					</li>
				</ul>
			</div>
			<!-- /card-list -->

			<!-- infinite-loading -->
			<infinite-loading
				v-if="species.length"
				@infinite="handleInfiniteScrollPokedex"
			>
				<template #spinner>
					<svg
						class="mx-auto mb-8 w-6 h-6 animate-spin"
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

			<!-- compare-popup -->
			<compare-popup
				:comparison="selectedPokemonComparison"
				@click="handleComparisonSubmit"
			/>
			<!-- /compare-popup -->

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
								class="w-6 h-6"
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
					<form class="mt-4" @submit.prevent>
						<h3 class="font-semibold text-neutral-400">by type:</h3>
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
							class="justify-center py-3 mt-8 w-full font-bold text-neutral-50 bg-neutral-900"
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
/* eslint-disable @typescript-eslint/no-use-before-define */
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

const router = useRouter()

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

		const apiCall = isFiltered.value
			? GqlPokedexFilter({
					...pagination,
					types: filterByTypes.value as Array<string>,
			  })
			: GqlPokedex(pagination)

		const response = (await apiCall) as Pokedex
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

		const apiCall = isFiltered.value
			? GqlPokedexFilter({
					...pagination,
					types: filterByTypes.value as Array<string>,
			  })
			: GqlPokedex(pagination)

		const response = (await apiCall) as Pokedex
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

const selectedFilterByTypes = ref<Array<String>>([])
const isFilterModalShown = ref<boolean>(false)
const filterByTypes = ref<Array<String>>([])

const handleFilterModalVisibility = () => {
	isFilterModalShown.value = !isFilterModalShown.value
	selectedFilterByTypes.value = []
}

const handleFilterTypeCheckbox = (type: string) => {
	if (selectedFilterByTypes.value.includes(type)) {
		const index = selectedFilterByTypes.value.indexOf(type)
		selectedFilterByTypes.value.splice(index, 1)
	} else {
		selectedFilterByTypes.value.push(type)
	}
}

const handleFilterApply = () => {
	filterByTypes.value = selectedFilterByTypes.value
	pagination.offset = 0
	handleFilterModalVisibility()
	fetchPokedex()
}

const isFiltered = computed(() => {
	return filterByTypes.value.length > 0
})

const isCompared = ref<boolean>(false)
const selectedPokemonComparison = ref<Array<String>>([])

const handleCompareMode = () => {
	isCompared.value = !isCompared.value
	selectedPokemonComparison.value = []
}

const handleCompareCheckbox = (data: string) => {
	if (selectedPokemonComparison.value.includes(data)) {
		const index = selectedPokemonComparison.value.indexOf(data)
		selectedPokemonComparison.value.splice(index, 1)
	} else {
		selectedPokemonComparison.value.push(data)
	}
}

const handleComparisonSubmit = () => {
	router.push(
		`/pokemon-compare/${selectedPokemonComparison.value[0]}/${selectedPokemonComparison.value[1]}`
	)
}

onMounted(() => {
	fetchPokedex()
})
</script>
