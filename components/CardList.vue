<template>
	<div class="py-8 px-6">
		<h3 class="font-semibold text-right">total: {{ total }}</h3>
		<ul
			class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-4 card-list"
		>
			<li v-for="(card, i) of cards" :key="i" class="bg-neutral-50">
				<card-item :card="card" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ComposedSpecies } from '~/models/interfaces'

interface Props {
	cards: ComposedSpecies[]
	total: number
}
const props = defineProps<Props>()
</script>
