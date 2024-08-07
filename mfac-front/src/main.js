import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Upload,Button,Select, Option,Pagination } from 'element-ui'
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(Vuesax, {
})
Vue.component(Upload.name, Upload)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Pagination.name, Pagination)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
