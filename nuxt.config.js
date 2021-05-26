import webpack from 'webpack';

export default {
  ssr: false,
  server: {
    port: 3001, // default: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&display=swap'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#ff0050',
    height: '4px',
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/axios-accessor',
    { src: '@/plugins/vue-touch', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-material-design-icons',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "http://localhost:1340"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    transpile: ['three'],
    plugins:[
      new webpack.ProvidePlugin({
          "THREE": "three"
      })
  ],
  },
  router:{
    middleware:'router'
  }
}
