import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '@/views/Base.vue'
import Home from '@/views/Home.vue'
import Classify from '@/views/Classify.vue'
import Tag from '@/views/Tag.vue'
import Manager from '@/views/Manager.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import Search from '@/views/Search.vue'
import store from '@/store'
import { Message } from 'element-ui';
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
      },
      {
        path: '/Manager',
        name: Manager,
        component: Manager
      },
      {
        path: '/BlogDetail',
        name: BlogDetail,
        component: BlogDetail
      },
      {
        path: '/Search',
        name: Search,
        component: Search
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  if(to.fullPath !== '/Manager') {
    next()
    return
  }
  let token = store.state.user.userInfo.token
  if(token) {
    // 如果token存在
    if(token !== '') {
      next()
      return
    } else {
      next(from.fullPath)
      Message.error("需要登录才能访问")
      return
    }
  } else {
    // 如果token不存在
    next(from.fullPath)
    Message.error("需要登录才能访问")
    return
  }
})
export default router
