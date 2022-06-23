export const SITE_TITLE = 'pokédx'
export const SITE_DESCRIPTION = 'pokémon collections'
export const SITE_AUTHOR = '@arkhlima'
export const SITE_LANG = 'en'

export const SITE_HEAD = {
	head: {
		htmlAttrs: {
			lang: SITE_LANG,
		},
		title: SITE_TITLE,
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				name: 'description',
				content: SITE_DESCRIPTION,
			},
			{
				name: 'twitter:card',
				content: 'summary_large_image',
			},
			{
				name: 'twitter:url',
				content: 'https://pokedx.arkhlima.xyz',
			},
			{
				name: 'twitter:title',
				content: SITE_TITLE,
			},
			{
				name: 'twitter:description',
				content: 'pokemon collections.',
			},
			{
				property: 'og:url',
				content: 'https://pokedx.arkhlima.xyz',
			},
			{
				property: 'og:title',
				content: SITE_TITLE,
			},
			{
				property: 'og:description',
				content: 'pokemon collections.',
			},
		],
		link: [
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: './static/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				sizes: '32x32',
				href: './static/favicon-32x32.png',
			},
			{
				rel: 'icon',
				sizes: '16x16',
				href: './static/favicon-16x16.png',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: '',
			},
			{
				rel: 'preload',
				as: 'style',
				href: 'https://fonts.googleapis.com/css?family=Poppins:500,600,700&display=swap',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Poppins:500,600,700&display=swap',
				media: 'print',
				onload: "this.media='all'",
			},
		],
	},
}

export const PWA = {
	meta: {
		name: SITE_TITLE,
		author: SITE_AUTHOR,
	},
	manifest: {
		name: SITE_TITLE,
		short_name: SITE_TITLE,
		lang: SITE_LANG,
		start_url: '/',
		display: 'standalone',
	},
	icon: {
		source: './static/apple-touch-icon.png',
	},
	workbox: {
		enabled: true,
		// unfortunately this doesnt work out, the current module doesnt support this config :(
		runtimeCaching: [
			{
				urlPattern: 'https://beta.pokeapi.co/graphql/v1beta',
				handler: 'NetworkFirst',
				method: 'POST',
				strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
			},
			{
				urlPattern:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/.*',
				handler: 'NetworkFirst',
				method: 'GET',
				strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
			},
			{
				urlPattern: 'https://fonts.(?:googleapis|gstatic).com/(.*)',
				strategyOptions: {
					cacheName: 'font',
				},
			},
		],
		cachingExtensions: '@/plugins/workbox-sync.js',
	},
}
