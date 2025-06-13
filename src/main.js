import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import JsonViewer from 'vue3-json-viewer'
import Vue3EasyDataTable from 'vue3-easy-data-table'

import 'vue3-json-viewer/dist/index.css'
import 'vue3-easy-data-table/dist/style.css'

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.use(JsonViewer)
app.component('EasyDataTable', Vue3EasyDataTable)
app.mount('#app')
