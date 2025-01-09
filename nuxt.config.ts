import tailwindTypography from '@tailwindcss/typography'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  target: 'static',

  router: {
    base: ''
  },

  app: {
    head: {
      title: 'infla.cz - Personalizovaná míra inflace',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Spočítejte si svou vlastní míru inflace podle vašich výdajů' }
      ],
      script: process.env.NODE_ENV === 'production' ? [
        {
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': 'c5fb7126-55f4-4aa1-8568-f705132eb0a4',
          defer: true
        }
      ] : []
    }
  },

  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },

  compatibilityDate: '2025-01-02'
})
