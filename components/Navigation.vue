<template>
  <nav class="navigation [ bg-neutral-900 grid grid-cols-3 py-5 px-4 sticky top-0 z-[99] shadow-lg rounded-b-lg ]">
    <div class="flex items-center">
      <slot name="left" />
    </div>
    <div class="flex items-center justify-center">
      <slot name="center" />
    </div>
    <div class="flex items-center justify-end">
      <slot name="right" />
    </div>
  </nav>
</template>
