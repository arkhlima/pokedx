<template>
	<div>
		<!-- navigation -->
		<navigation>
			<template #left>
				<btn class="text-[#f8f8f8]" @click="$router.go(-1)">
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</btn>
			</template>
			<template #center>
				<span v-if="response?.length" class="text-lg font-bold text-[#f8f8f8]">
					{{ padNumber(pokemonId) }}
				</span>
			</template>
			<template #right>
				<btn class="text-[#f8f8f8]">
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
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</btn>
			</template>
		</navigation>
		<!-- /navigation -->

		<!-- main -->
		<main v-if="response?.length">
			<section class="py-8 px-6">
				<article
					class="flex overflow-hidden relative flex-col items-center py-8 px-6 bg-[#f8f8f8] rounded-md shadow-md poke"
				>
					<header class="relative z-[2]">
						<!-- poke-figure -->
						<figure
							class="flex relative justify-center items-center w-full h-[200px] poke__figure"
						>
							<img
								:src="pokemonImg"
								:alt="pokemonName"
								width="200"
								height="200"
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
					</header>

					<hr
						class="block my-8 w-full h-[1px] border-t-0 border-b border-b-neutral-[400]"
					/>

					<!-- poke-about -->
					<div>
						<h2 class="pb-4 text-xl font-bold text-neutral-400">about</h2>
						<p>{{ pokemonDescription }}</p>

						<!-- poke-info -->
						<dl class="grid grid-cols-[100px_1fr] gap-y-2 mt-4 text-sm">
							<dt class="font-semibold text-neutral-400">height</dt>
							<dd>{{ pokemonHeight }}</dd>
							<dt class="font-semibold text-neutral-400">weight</dt>
							<dd>{{ pokemonWeight }}</dd>
							<dt class="font-semibold text-neutral-400">abilities</dt>
							<dd>{{ pokemonAbilities }}</dd>
						</dl>
						<!-- /poke-info -->
					</div>
					<!-- /poke-about -->

					<hr
						class="block my-8 w-full h-[1px] border-t-0 border-b border-b-neutral-[400]"
					/>

					<!-- poke-stats -->
					<div class="w-full">
						<h2 class="pb-4 text-xl font-bold text-neutral-400">stats</h2>
						<ul class="flex flex-col gap-y-4 mt-4 w-full">
							<li v-for="(pokemonStat, i) of pokemonStats" :key="i">
								<div>
									<div class="flex justify-between text-sm">
										<span class="font-semibold">{{
											pokemonStat.stat.name
										}}</span>
										<span class="">{{ pokemonStat.base_stat }}</span>
									</div>
									<div
										class="flex relative mt-1 w-full h-[8px] bg-neutral-200 rounded-lg"
									>
										<span
											class="flex h-[8px] bg-neutral-400 rounded-md"
											:style="{ width: pokemonStat.base_stat + '%' }"
										>
										</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- /poke-stats -->

					<div
						:class="getPokemonTypeColorClass(pokemonTypes[0]?.type?.name)"
						class="absolute top-[-75px] z-[1] w-[150%] h-[250px] rounded-[100%] opacity-25"
					/>
				</article>
			</section>
		</main>
		<!-- /main -->
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { PokemonDetail } from '~/models/interfaces'

import { POKEMON_IMG_BASE_URL, POKEMON_TYPE_COLOR } from '~/utils/constants'
import padNumber from '~/utils/pad-number'

const route = useRoute()

const response = ref([] as PokemonDetail[])
const state = reactive({
	fetching: false,
	error: false,
})

const pokemonId = computed(() => {
	return response.value[0]?.pokemon[0]?.id
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
const pokemonAbilities = computed(() => {
	return (
		response.value[0]?.pokemon[0]?.abilities
			.map((item) => item.ability.name)
			.join(', ') ?? '-'
	)
})
const pokemonWeight = computed(() => {
	return `${response.value[0]?.pokemon[0]?.weight}kg`
})
const pokemonHeight = computed(() => {
	return `${response.value[0]?.pokemon[0]?.height * 10}cm`
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
		const { species } = await GqlPokemon({
			name: route.params.pokemon,
		})
		response.value = species
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

<style scoped>
.poke__img {
	filter: drop-shadow(0 0 5px rgb(18 18 18 / 20%));
}
</style>
