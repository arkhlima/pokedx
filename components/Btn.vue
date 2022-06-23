<template>
	<button
		class="flex items-center py-1 px-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300 disabled:opacity-50 transition-all duration-75 disabled:cursor-not-allowed"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>

<script setup>
defineEmits(['click'])
</script>
