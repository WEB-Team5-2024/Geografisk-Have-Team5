import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import AudioPlayer from '@liripeng/vue-audio-player'

const app = createApp(App)

app.use(AudioPlayer)
app.use(createPinia())
app.use(router)

app.mount('#app')
