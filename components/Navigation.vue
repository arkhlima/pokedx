<template>
	<nav
		class="grid sticky top-0 z-[99] grid-cols-3 py-5 px-4 bg-neutral-900 rounded-b-lg shadow-lg navigation"
	>
		<div class="flex items-center">
			<slot name="left" />
		</div>
		<div class="flex justify-center items-center">
			<slot name="center" />
		</div>
		<div class="flex gap-x-2 justify-end items-center">
			<slot name="right" />
		</div>
	</nav>
</template>
