<template>
  <ul class="card-list [ grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 py-8 px-6 ]">
    <li v-for="(card, i) of cards" :key="i" class="bg-[#f8f8f8]">
      <card-item
        :card="card"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props{
  cards
}
const { cards } = defineProps<Props>()
</script>
