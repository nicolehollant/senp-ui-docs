// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['senp-ui'],
  srcDir: './src',
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient && config?.resolve?.alias) {
        ;(config.resolve.alias as any).vue = 'vue/dist/vue.esm-bundler'
      }
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
})
