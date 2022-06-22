<template>
  <div class="py-8 px-6">
    <h3 class="text-right font-bold">total: {{ total }}</h3>
    <ul class="card-list [ grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-4 ]">
      <li v-for="(card, i) of cards" :key="i" class="bg-[#f8f8f8]">
        <card-item :card="card"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ComposedSpecies } from '~/interfaces/interfaces';

interface Props{
  cards: ComposedSpecies[],
  total: number,
}
const { cards, total } = defineProps<Props>()
</script>
