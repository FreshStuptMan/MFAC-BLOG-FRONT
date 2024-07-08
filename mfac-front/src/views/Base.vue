<template>
    <div>
        <vs-navbar style="height: 80px;" color="#FEDFE1" v-model="indexActive" text-color="rgba(255,255,255,.6)"
            active-text-color="rgba(255,255,255,1)">
            <div slot="title">
                <vs-navbar-title class="logo_style">
                    𝓜𝓕𝓐𝓒
                </vs-navbar-title>
            </div>
            <vs-navbar-item index="0">
                <router-link to="/" style="font-size: 30px;">博客</router-link>
            </vs-navbar-item>
            <vs-navbar-item index="1">
                <router-link to="/Classify" style="font-size: 30px;">分类</router-link>
            </vs-navbar-item>
            <vs-navbar-item index="2">
                <router-link to="/Tag" style="font-size: 30px;">标签</router-link>
            </vs-navbar-item>
            <vs-navbar-item index="3">
                <router-link to="/Manager" style="font-size: 30px;">我的</router-link>
            </vs-navbar-item>
            <vs-input ref="searchInput" v-on:icon-click="handleBlogSearch" size="default" style="margin-bottom: 15px;margin-right: 15px;margin-left: 200px;" icon-pack="fa"
                icon-after="true" label-placeholder="icon-after" icon="fa-search" placeholder="搜索博客" v-model="search">
            </vs-input>
            <vs-dropdown style="margin-right: 20px;" v-if="token !== ''">
                <a class="a-icon" href="#">
                    <vs-avatar size="large" :src="UserDetail.avatar" />
                </a>
                <vs-dropdown-menu style="width: 100px;">
                    <vs-dropdown-item @click="handleEditPersonalInfo">
                        修改信息
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleLoginOff" divider>
                        注销
                    </vs-dropdown-item>
                </vs-dropdown-menu>
            </vs-dropdown>
            <vs-button @click="handleLoginClick" style="margin-right: 20px;" v-else color="danger" type="flat">登录</vs-button>
        </vs-navbar>
        <!-- 登录弹窗 -->
        <vs-popup title="登录" :active.sync="loginPopVis" :button-close-hidden="true">
            <div>
                <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="账户" v-model="loginForm.account"/>
                <vs-input type="password" style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="密码" v-model="loginForm.password"/>
            </div>
            <div style="width: 100%;">
                <vs-button @click="acceptLogin" style="float: right;" color="danger" type="line">登录</vs-button>
                <vs-button @click="cancelLogin" style="float: right;" color="danger" type="line">取消</vs-button>
            </div>
        </vs-popup>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
import { removeUserInfo } from '@/util/storage'
export default {
    name: 'Base',
    watch: {
        indexActive(newValue, oldValue) {
            if(newValue === '3') {
                console.log(this.$route.path)
                if(this.$route.path === '/'){
                    this.indexActive = '0'
                } else if (this.$route.path === '/Classify'){
                    this.indexActive = '1'
                } else if(this.$route.path === '/Tag') {
                    this.indexActive = '2'
                }
            }
        }
    },
    computed: {
        token() {
            return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
        }
    },
    data() {
        return {
            indexActive: '0',
            search: '',
            loginForm: {
                account: '',
                password: ''
            },
            loginPopVis: false,
            UserDetail: {}
        }
    },
    methods: {
        // 处理登录
        handleLoginClick() {
            this.loginForm.account = ''
            this.loginForm.password = ''
            this.loginPopVis = true
            console.log("前往登录")
        },
        // 处理博客搜索
        handleBlogSearch() {
            if(this.search === '') {
                this.$vs.notify({
                    title:'提示',
                    text:'搜索内容不能为空哦',
                    color: 'red',
                    position:'bottom-right'
                })
                return
            }
            // 获取vs-input中的那个input
            this.$refs.searchInput.$el.querySelector('input').blur()
            this.$router.push(`/Search/${this.search}`)
            this.search = ''
            console.log("搜索博客"+this.search) 
        },
        // 修改个人信息
        handleEditPersonalInfo() {
            if (this.$route.path === '/Manager') {
                return
            } 
            // 放入Vuex中
            this.$store.dispatch('updateManagerTab', 'PersonalManager')
            // 进行页面跳转
            this.$router.push('/Manager')
        },
        // 发起登录
        acceptLogin() {
            if(!this.loginFormVaify()) {
                return
            }
            // 发送登录请求
            axios.post('/api/login', this.loginForm)
            .then(response => {
                if(response.data.code === 200) {
                    // 保存登录用户的token
                    this.$store.commit('user/setUserInfo', response.data.data)
                    this.$vs.notify({
                        title: '提示',
                        text: '登录成功',
                        color: 'success'
                    })
                    this.GetUserInfo()
                    this.cancelLogin()
                } else {
                    this.$vs.notify({
                        title:'提示',
                        text: response.data.msg,
                        color:'red'
                    })
                }
            })
            .catch(error => {
                this.$vs.notify({
                    title:'Notify',
                    text: error,
                    color:'red'
                })
            })
        },
        // 取消登录
        cancelLogin() {
            this.loginPopVis = false
        },
        // 登录表单校验
        loginFormVaify() {
            if(this.loginForm.account === '' || this.loginForm.password === '') {
                this.$vs.notify({title:'提交失败',text:'请填写完整的用户消息',color:'red'})
                return false
            }
            if(this.loginForm.password.length < 6) {
                this.$vs.notify({title:'提交失败',text:'密码不能少于6位',color:'red'})
                return false
            }
            return true
        },
        // 注销登录
        handleLoginOff() {
            removeUserInfo()
            this.$store.commit('user/setUserInfo', '')
        },
        // 获取用户信息
        GetUserInfo() {
            // if(this.$store.state.user.userInfo.token) {
            //     return
            // }
            // if(this.$store.state.user.userInfo.token === '') {
            //     return
            // }
            axios.get('/api/admin/user/detail', {
                headers: {token: this.$store.state.user.userInfo.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    console.log(response)
                    this.UserDetail = response.data.data
                }
            })
            .catch(error => {
            })
        },
    },
    mounted() {
        if(this.$route.path === '/'){
            this.indexActive = '0'
        } else if (this.$route.path === '/Classify'){
            this.indexActive = '1'
        } else if(this.$route.path === '/Tag') {
            this.indexActive = '2'
        } else if(this.$route.path === '/Manager') {
            this.indexActive = '3'
        } else {
            this.indexActive = '4'
        }
        this.GetUserInfo()
    }
}
</script>

<style lang="less">
@keyframes logoColorCycle {
  0% {
    color: red;
  }
  16.6% {
    color: purple;
  }
  33.3% {
    color: pink;
  }
  50% {
    color: blue;
  }
  66.6% {
    color: pink;
  }
  83.3% {
    color: purple;
  }
  100% {
    color: red;
  }
}



.logo_style{
    animation: logoColorCycle 20s linear infinite;
    font-size: 60px !important;
    font-weight: bolder;
}


.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>