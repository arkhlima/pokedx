<template>
	<transition name="fade">
		<div
			v-if="isShown"
			id="dialog"
			aria-hidden="true"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			class="flex fixed inset-0 top-0 left-0 z-[999] justify-center items-center backdrop-blur-[2px]"
		>
			<div
				class="absolute top-0 left-0 w-full h-full fade"
				@click="$emit('click')"
			/>
			<div class="z-10 shadow-2xl">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
defineProps<{
	isShown: boolean
}>()
defineEmits(['click'])
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.fade {
	background: rgba(0, 0, 0, 0.5);
}
</style>
