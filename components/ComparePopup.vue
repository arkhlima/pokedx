<template>
	<div
		v-if="comparison.length > 0"
		class="grid fixed inset-x-0 bottom-[16px] z-[999] grid-cols-3 gap-y-6 p-6 m-auto w-[80%] bg-neutral-50 rounded-md shadow-md comparison"
	>
		<p class="flex justify-center items-center comparison__first-comparator">
			{{ comparison[0] }}
		</p>
		<div class="flex justify-center items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-8 h-8"
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
		</div>
		<p class="flex justify-center items-center comparison__second-comparator">
			{{ comparison[1] ?? '???' }}
		</p>
		<btn
			:disabled="comparison.length !== 2"
			class="col-span-3 justify-center py-3 w-full font-bold text-neutral-50 bg-neutral-900 comparison__btn"
			@click="handleClick"
		>
			compare!
		</btn>
	</div>
</template>

<script setup lang="ts">
interface Props {
	comparison: Array<string>
}
defineProps<Props>()
const emit = defineEmits(['click'])

const handleClick = () => {
	emit('click')
}
</script>
