<template>
	<article
		class="flex relative flex-col bg-neutral-50 rounded-md shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer card"
		@mouseup="handleCardMouseUp"
		@mousedown="handleCardMouseDown"
	>
		<!-- card-header -->
		<header
			class="grid absolute top-0 left-0 grid-cols-2 items-center py-[0.3rem] px-1.5 w-full card__header"
		>
			<small
				class="text-xs font-semibold leading-none text-neutral-400 card__id"
			>
				{{ card.id }}
			</small>
			<div
				v-if="card?.pokemons[0]?.types?.length > 0"
				class="flex gap-x-1 justify-end items-center card__badges"
			>
				<div
					v-for="(type, i) of card.pokemons[0].types"
					:key="i"
					:class="type?.type?.color"
					class="w-[10px] h-[10px] rounded-full card__badge [ ]"
				/>
			</div>
		</header>
		<!-- /card-header -->

		<!-- card-figure -->
		<figure
			class="flex relative z-[2] justify-center items-center mx-auto w-full h-[150px] card__figure"
		>
			<img
				:src="card.img"
				:alt="card.name"
				width="140"
				height="140"
				class="object-contain w-[140px] h-[140px] grayscale-[25%] transition-all card__img"
			/>
		</figure>
		<!-- /card-figure -->

		<!-- card-content -->
		<div class="flex z-[3] justify-center items-center p-2 card__content">
			<h2 class="text-lg font-semibold text-center card__label">
				<nuxt-link
					:to="`/${card.name}`"
					class="focus:border-b-[3px] focus:border-b-gray-300 focus:outline-none card__link"
				>
					{{ card.name }}
				</nuxt-link>
			</h2>
		</div>
		<!-- /card-content -->
	</article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ComposedSpecies } from '~/models/interfaces'

interface Props {
	card: ComposedSpecies
}
const props = defineProps<Props>()

const router = useRouter()

const mouseUp = ref()
const mouseDown = ref()

const handleCardMouseUp = () => {
	mouseUp.value = +new Date()
	if (mouseUp.value - mouseDown.value < 200) router.push(`/${props.card.name}`)
}

const handleCardMouseDown = () => {
	mouseDown.value = +new Date()
}
</script>

<style lang="scss" scoped>
.card {
	&:hover {
		.card__img {
			transform: scale(1.1);
			filter: grayscale(0) drop-shadow(0 0 5px rgb(18 18 18 / 20%));
		}
	}
}
</style>
