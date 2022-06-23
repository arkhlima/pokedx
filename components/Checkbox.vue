<template>
	<label
		class="items-center transition-all duration-75"
		:class="{ 'ring ring-gray-300': isChecked }"
	>
		<input
			type="checkbox"
			class="absolute opacity-0 appearance-none"
			@change="handleCheck($event)"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="relative z-[2] mr-2 w-4 h-4 rounded-full transition-all duration-75"
			:class="checkboxCheckedSiblingClass"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clip-rule="evenodd"
			/>
		</svg>
		<span :class="checkboxCheckedSiblingClass">{{ label }}</span>
	</label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
	label: string
}>()

const emit = defineEmits(['input'])
const isChecked = ref<boolean>(false)

const checkboxCheckedSiblingClass = computed(() => {
	return isChecked.value ? 'opacity-100' : 'opacity-75'
})

const handleCheck = ($event: any) => {
	isChecked.value = !!$event.target.checked
	emit('input')
}
</script>

<style scoped lang="scss">
input {
	&:focus:not(:checked) + svg {
		opacity: 1;
	}
}
</style>
