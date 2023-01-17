// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['senp-ui'],
  srcDir: './src',
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient && config?.resolve?.alias) {
        ;(config.resolve.alias as any).vue = 'vue/dist/vue.esm-bundler'
        ;(config.resolve.alias as any)['lodash.debounce'] = 'lodash.debounce/index.js'
        ;(config.resolve.alias as any).vuedraggable = 'vuedraggable/dist/vuedraggable.common.js'
        ;(config.resolve.alias as any).jsurl = 'jsurl/lib/jsurl.js'
        ;(config.resolve.alias as any)['highlight.js/styles'] = 'highlight.js/styles'
        ;(config.resolve.alias as any)['highlight.js'] = 'highlight.js/es'
      }
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
})
