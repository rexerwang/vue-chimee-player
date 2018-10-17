// 引入chimee-player
import 'chimee-player/lib/chimee-player.browser'
import 'chimee-player/lib/chimee-player.browser.css'

import Vue from 'vue'
import App from './app.vue'

// 全局引入
import VueChimeePlayer from '../src/directive'
Vue.use(VueChimeePlayer)

new Vue({
  render: h => h(App)
}).$mount('#app')
