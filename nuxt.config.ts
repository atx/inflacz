
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
      ]
    }
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  }
})
