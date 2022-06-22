import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

  // https://nuxtjs.org/docs/configuration-glossary/configuration-target/
  target: 'static',
  // https://nuxtjs.org/docs/configuration-glossary/configuration-components/
  components: true,
  css: ['~/assets/styles.scss'],
  modules: [
    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss'
  ]
})
