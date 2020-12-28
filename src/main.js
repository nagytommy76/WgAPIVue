import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Tooltip from './components/inc/Tooltip'

const app = createApp(App)

app.component('Tooltip', Tooltip)
app.use(store).use(router).mount('#app')
