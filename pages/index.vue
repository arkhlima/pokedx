<template>
  <div>
    <!-- navigation -->
    <navigation>
      <template #left>
        <h1 class="text-xl text-[#f8f8f8] font-bold">
          pokédx
        </h1>
      </template>
      <template #right>
        <btn class="text-[#f8f8f8]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="font-bold">
            filter
          </span>
        </btn>
      </template>
    </navigation>
    <!-- /navigation -->

    <!-- main -->
    <main>
      <!-- card-list -->
      <card-list :cards="species" />
      <!-- /card-list -->
    </main>
    <!-- /main -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

let species = ref([])
let totalSpecies = ref<number>();

const state = reactive({
  fetching: false,
  error: false,
});
const pagination = reactive({
  limit: 12,
  offset: 0,
});


const fetchPokemons = async () => {
  try {
    state.fetching = true;
    const response = await GqlPokemons(pagination);
    species.value = response?.species;
    totalSpecies.value = response?.species_aggregate?.aggregate?.count;
  } catch (error) {
    state.error = error;
  } finally {
    state.fetching = false;
  }
};

onMounted(() => {
  fetchPokemons();
});
</script>
