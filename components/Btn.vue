<template>
  <button
    class="button [ flex items-center rounded-md focus:ring focus:ring-gray-300 focus:outline-none py-0.5 px-2 ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
  defineEmits(['click']);
</script>
