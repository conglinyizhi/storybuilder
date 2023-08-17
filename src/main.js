import {
  createApp
} from 'vue'
// import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import {
  createVuetify
} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
  aliases,
  mdi
} from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import {createPinia} from 'pinia'

// import routes from './router.js'

// import {createRouter,createWebHashHistory} from 'vue-router'

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes,
// })

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    },
  },
  // https://next.vuetifyjs.com/features/theme/
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#1697f6',
        },
      },
    },
  },
})

const pinia = createPinia()

const vueRuntimeApp = createApp(App)

vueRuntimeApp.use(vuetify).use(pinia).mount('#app')
// vueRuntimeApp.use(router)