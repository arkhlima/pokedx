import { defineNuxtConfig } from 'nuxt'
import * as CONFIG from './utils/site-config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: CONFIG.SITE_HEAD,

	// https://nuxtjs.org/docs/configuration-glossary/configuration-target/
	target: 'static',
	// https://nuxtjs.org/docs/configuration-glossary/configuration-components/
	components: true,
	css: ['~/assets/styles.scss'],
	modules: [
		// https://tailwindcss.nuxtjs.org/
		'@nuxtjs/tailwindcss',
		// https://nuxt-graphql-client.web.app/
		'nuxt-graphql-client',
	],
	runtimeConfig: {
		public: {
			'graphql-client': {
				clients: {
					default: 'https://beta.pokeapi.co/graphql/v1beta',
				},
			},
		},
	},
})
