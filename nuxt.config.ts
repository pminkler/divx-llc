// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  
  app: {
    head: {
      title: 'Divx LLC',
      titleTemplate: '%s',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional web development and design services' },
        { name: 'keywords', content: 'web development, design, professional services' },
        { property: 'og:title', content: 'Divx LLC' },
        { property: 'og:description', content: 'Professional web development and design services' },
        { property: 'og:url', content: 'https://divx.llc' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Divx LLC' },
        { name: 'twitter:description', content: 'Professional web development and design services' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://divx.llc'
    }
  }
})
