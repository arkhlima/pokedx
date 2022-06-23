<template>
	<button
		class="flex items-center py-1 px-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>

<script setup>
defineEmits(['click'])
</script>
