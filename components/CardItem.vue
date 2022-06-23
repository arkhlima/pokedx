<template>
	<article class="relative card">
		<label
			v-if="isCompared"
			:class="{ 'cursor-not-allowed': isDisabled && !isSelected }"
			class="flex absolute top-0 left-0 z-[5] justify-center items-center w-full h-full text-neutral-900 cursor-pointer"
		>
			<input
				:disabled="isDisabled && !isSelected"
				type="checkbox"
				class="absolute appearance-none"
				@change="handleCheck($event)"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="relative z-[2] w-10 h-10 rounded-full transition-all duration-75"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
		<div
			class="flex relative flex-col bg-neutral-50 rounded-md shadow-md transition-all cursor-pointer card__content"
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

			<!-- card-body -->
			<div class="flex z-[3] justify-center items-center p-2 card__body">
				<h2 class="text-lg font-semibold text-center card__label">
					<nuxt-link
						:to="`/pokemon/${card.name}`"
						class="focus:border-b-[3px] focus:border-b-gray-300 focus:outline-none card__link"
					>
						{{ card.name }}
					</nuxt-link>
				</h2>
			</div>
			<!-- /card-body -->
		</div>
	</article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ComposedSpecies } from '~/models/interfaces'

interface Props {
	card: ComposedSpecies
	isCompared: boolean
	isDisabled: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['input'])

const router = useRouter()

const mouseUp = ref()
const mouseDown = ref()
const isSelected = ref<boolean>()

const handleCheck = ($event: any) => {
	isSelected.value = !isSelected.value
	emit('input', props.card.name)
}

const handleCardMouseUp = () => {
	mouseUp.value = +new Date()
	if (mouseUp.value - mouseDown.value < 200)
		router.push(`/pokemon/${props.card.name}`)
}

const handleCardMouseDown = () => {
	mouseDown.value = +new Date()
}
</script>

<style lang="scss" scoped>
.card {
	&:hover {
		.card__content {
			transform: scale(1.05);
		}
		.card__img {
			transform: scale(1.1);
			filter: grayscale(0) drop-shadow(0 0 5px rgb(18 18 18 / 20%));
		}
	}
}
svg {
	opacity: 0.5;
}
input {
	&:checked + svg {
		background: #fafafa;
		opacity: 1;
	}
}
</style>
