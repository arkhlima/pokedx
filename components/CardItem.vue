<template>
  <article
    class="card [ bg-[#f8f8f8] flex relative flex-col rounded-md border-[3px] border-[#f8f8f8] shadow-md cursor-pointer transition-all hover:scale-105 hover:shadow-lg hover:bg-[linear-gradient(#f8f8f8, #f8f8f8) padding-box, linear-gradient(135deg, #f8f8f8, #f8f8f8, #1d4ed8, #c026d3) border-box] ]"
    @mouseup="handleCardMouseUp"
    @mousedown="handleCardMouseDown"
  >
    <!-- card-header -->
    <header class="card__header [ absolute top-0 left-0 w-full py-[0.3rem] px-1.5 ]">
      <small class="card__id [ text-xs leading-none font-bold ]">
        {{ card.id }}
      </small>
    </header>
    <!-- /card-header -->

    <!-- card-content -->
    <div class="card__content [ flex justify-center items-center p-2 z-[3] ]">
      <h2 class="card__label [ text-lg text-center font-bold ]">
        <nuxt-link :to="`/${card.name}`" class="card__link [ focus:border-b-[3px] focus:border-b-gray-300 focus:outline-none ]">
          {{ card.name }}
        </nuxt-link>
      </h2>
    </div>
    <!-- /card-content -->
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props{
  card,
};
const { card } = defineProps<Props>();

const router = useRouter();

let mouseUp = ref();
let mouseDown = ref();

const handleCardMouseUp = () => {
  mouseUp.value = +new Date();
  if ((mouseUp.value - mouseDown.value) < 200) router.push(`/${card.name}`);
};

const handleCardMouseDown = () => {
  mouseDown.value = +new Date();
};
</script>
