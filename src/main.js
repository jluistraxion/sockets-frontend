import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.use(JsonViewer)
app.mount('#app')
