<template>
	<article
		class="flex relative flex-col bg-[#f8f8f8] rounded-md border-[3px] border-[#f8f8f8] shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer card [ hover:bg-[linear-gradient(#f8f8f8, #f8f8f8) padding-box, linear-gradient(135deg, #f8f8f8, #1d4ed8, #c026d3) border-box] ]"
		@mouseup="handleCardMouseUp"
		@mousedown="handleCardMouseDown"
	>
		<!-- card-header -->
		<header
			class="absolute top-0 left-0 py-[0.3rem] px-1.5 w-full card__header"
		>
			<small class="text-xs font-bold leading-none card__id">
				{{ card.id }}
			</small>
		</header>
		<!-- /card-header -->

		<!-- card-figure -->
		<figure
			class="flex relative z-[2] justify-center items-center mx-auto w-full h-[150px] card__figure ["
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
			<h2 class="text-lg font-bold text-center card__label">
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

import { ComposedSpecies } from '~/interfaces/interfaces'

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
