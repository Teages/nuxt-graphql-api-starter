// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig: {
    public: {
      graphqlURL: '/graphql',
    },
  },

  graphqlCodegen: {
    config: {
      schema: 'gql/schema.graphql',
      documents: ['**/*.vue'],
      ignoreNoDocuments: true, // for better experience with the watcher
      generates: {
        './gql/': {
          preset: 'client',
          presetConfig: {
            fragmentMasking: false,
          },
          config: {
            useTypeImports: true,
          },
        },
      },
    },
  },

})
