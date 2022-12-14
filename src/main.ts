import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
// Toast
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const routes = setupLayouts(generatedRoutes)
const app = createApp(App)
app.use(MotionPlugin)
app.use(pinia)
const options: PluginOptions = {
  // You can set your default options here
  maxToasts: 3,
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
}

app.use(Toast, options)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
