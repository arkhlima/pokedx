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
  </div>
</template>

<script setup lang="ts">
</script>
