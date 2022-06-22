<template>
	<button
		class="flex items-center py-0.5 px-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 button"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>

<script setup>
defineEmits(['click'])
</script>
