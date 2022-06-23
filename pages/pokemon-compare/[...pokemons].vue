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
				<span class="text-lg font-bold text-neutral-50">comparison</span>
			</template>
		</navigation>
		<!-- /navigation -->

		<!-- main -->
		<main v-if="response?.length">
			<section class="py-8 px-6">
				<div
					class="grid overflow-hidden relative grid-cols-2 gap-x-8 items-center py-8 px-6 bg-[#f8f8f8] rounded-md shadow-md poke"
				>
					<article v-for="(res, i) of response" :key="i">
						<header
							class="flex relative z-[2] flex-col justify-center items-center"
						>
							<!-- poke-figure -->
							<figure
								class="flex relative justify-center items-center w-full h-[140px] poke__figure"
							>
								<img
									:src="getPokemonImg(res?.pokemons[0]?.id)"
									:alt="res?.pokemons[0]?.name"
									width="140"
									height="140"
									class="object-contain w-[140px] h-[140px] transition-all poke__img"
								/>
							</figure>
							<h2 class="py-2 mt-4 text-lg font-bold text-center poke__name">
								{{ res?.pokemons[0]?.name }}
							</h2>
							<div
								class="flex gap-x-2 justify-center items-center poke__badges"
							>
								<span
									v-for="(pokemonType, pokemonTypeKey) of res?.pokemons[0]
										?.types"
									:key="pokemonTypeKey"
									:class="getPokemonTypeColorClass(pokemonType?.type?.name)"
									class="py-0.5 px-2 text-xs text-[#f8f8f8] rounded-md poke__badge"
								>
									{{ pokemonType?.type?.name }}
								</span>
							</div>
							<!-- /poke-figure -->
						</header>
						<hr
							class="block my-8 w-full h-[1px] border-t-0 border-b border-b-neutral-[400]"
						/>
						<!-- poke-info -->
						<dl class="grid grid-cols-[100px_1fr] gap-y-2 mt-4 text-sm">
							<dt class="font-semibold text-neutral-400">height</dt>
							<dd>{{ res?.pokemons[0]?.height }}cm</dd>
							<dt class="font-semibold text-neutral-400">weight</dt>
							<dd>{{ res?.pokemons[0]?.weight }}kg</dd>
						</dl>
						<!-- /poke-info -->
						<hr
							class="block my-8 w-full h-[1px] border-t-0 border-b border-b-neutral-[400]"
						/>
						<!-- poke-stats -->
						<div class="w-full">
							<ul class="flex flex-col gap-y-4 mt-4 w-full">
								<li
									v-for="(pokemonStat, i) of res?.pokemons[0]?.stats"
									:key="i"
								>
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
					</article>
				</div>
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

const response = ref()
const state = reactive({
	fetching: false,
	error: false,
})

const fetchPokemons = async () => {
	try {
		state.fetching = true
		const data = await GqlPokemonCompare({
			name1: route.params.pokemons[0],
			name2: route.params.pokemons[1],
		})
		response.value = [...data.firstPokemon, ...data.secondPokemon]
	} catch (error: any) {
		state.error = error
	} finally {
		state.fetching = false
	}
}

const getPokemonTypeColorClass = (name: string) => {
	return POKEMON_TYPE_COLOR[name]
}

const getPokemonImg = (id: number) => {
	return `${POKEMON_IMG_BASE_URL}${id}.png`
}

onMounted(() => {
	fetchPokemons()
})
</script>

<style scoped>
.poke__img {
	filter: drop-shadow(0 0 5px rgb(18 18 18 / 20%));
}
</style>
