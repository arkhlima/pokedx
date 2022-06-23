<template>
	<div v-if="response.length">
		<!-- navigation -->
		<navigation>
			<template #left>
				<btn class="text-[#f8f8f8]" @click="$router.go(-1)">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
						/>
					</svg>
					<span class="font-bold"> back </span>
				</btn>
			</template>
			<template #center>
				<span class="text-lg font-bold text-[#f8f8f8]">
					{{ padNumber(pokemonId) }}
				</span>
			</template>
		</navigation>
		<!-- /navigation -->

		<!-- main -->
		<main>
			<section class="py-8 px-6">
				<article class="py-8 px-6 bg-[#f8f8f8] rounded-md shadow-md poke">
					<!-- poke-figure -->
					<figure
						class="flex relative justify-center items-center w-full h-[200px] poke__figure"
					>
						<img
							:src="pokemonImg"
							:alt="pokemonName"
							width="200"
							height="200"
							loading="lazy"
							class="object-contain w-[200px] h-[200px] transition-all poke__img"
						/>
					</figure>
					<!-- /poke-figure -->

					<h1 class="py-2 mt-4 text-2xl font-bold text-center poke__name">
						{{ pokemonName }}
					</h1>

					<div class="flex gap-x-2 justify-center items-center poke__badges">
						<span
							v-for="(pokemonType, i) of pokemonTypes"
							:key="i"
							:class="getPokemonTypeColorClass(pokemonType?.type?.name)"
							class="py-0.5 px-2 text-sm text-[#f8f8f8] rounded-md poke__badge"
						>
							{{ pokemonType?.type?.name }}
						</span>
					</div>
				</article>
			</section>
		</main>
		<!-- /main -->
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { POKEMON_IMG_BASE_URL, POKEMON_TYPE_COLOR } from '~/utils/constants'
import padNumber from '~/utils/pad-number'

const route = useRoute()
const router = useRouter()

const response = ref({})
const state = reactive({
	fetching: false,
	error: false,
})

const pokemonId = computed(() => {
	return response.value[0]?.id
})
const pokemonName = computed(() => {
	return response.value[0]?.pokemon[0]?.name
})
const pokemonDescription = computed(() => {
	return response.value[0]?.description[0]?.text
})
const pokemonStats = computed(() => {
	return response.value[0]?.pokemon[0]?.stats
})
const pokemonTypes = computed(() => {
	return response.value[0]?.pokemon[0]?.types
})
const pokemonWeight = computed(() => {
	return response.value[0]?.pokemon[0]?.weight
})
const pokemonHeight = computed(() => {
	return response.value[0]?.pokemon[0]?.height
})
const pokemonEvolutions = computed(() => {
	return response.value[0]?.evolutions?.species
})
const pokemonImg = computed(() => {
	return `${POKEMON_IMG_BASE_URL}${pokemonId.value}.png`
})

const fetchPokemon = async () => {
	try {
		state.fetching = true
		const { pokemons } = await GqlPokemon({ name: route.params.pokemon })
		response.value = pokemons
	} catch (error: any) {
		state.error = error
	} finally {
		state.fetching = false
	}
}

const getPokemonTypeColorClass = (name: string) => {
	return POKEMON_TYPE_COLOR[name]
}

onMounted(() => {
	fetchPokemon()
})
</script>
