import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '@/views/Base.vue'
import Home from '@/views/Home.vue'
import Classify from '@/views/Classify.vue'
import Tag from '@/views/Tag.vue'
import App from '@/App.vue'
import BlogDetail from '@/views/BlogDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: Base,
    component: Base,
    children: [
      {
        path: '',
        name: Home,
        component: Home
      },
      {
        path: '/Classify',
        name: Classify,
        component: Classify
      },
      {
        path: '/Tag',
        name: Tag,
        component: Tag
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
