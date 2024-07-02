import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import { Upload,Button,Select, Option } from 'element-ui'

Vue.config.productionTip = false
Vue.use(Vuesax, {
})
Vue.component(Upload.name, Upload)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
