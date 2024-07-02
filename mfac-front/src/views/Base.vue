<template>
    <div>
        <vs-navbar style="height: 80px;" color="#FEDFE1" v-model="indexActive" text-color="rgba(255,255,255,.6)"
            active-text-color="rgba(255,255,255,1)">
            <div slot="title">
                <vs-navbar-title style="font-size: 60px;font-weight: bolder;">
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
            <vs-dropdown style="margin-right: 20px;" v-if="true">
                <a class="a-icon" href="#">
                    <vs-avatar size="large" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4" />
                </a>
                <vs-dropdown-menu style="width: 100px;">
                    <vs-dropdown-item @click="handleEditPersonalInfo">
                        修改信息
                    </vs-dropdown-item>
                    <vs-dropdown-item divider>
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
export default {
    name: 'Base',
    data() {
        return {
            activeItem: 0,
            indexActive: 0,
            search: '',
            loginForm: {
                account: '',
                password: ''
            },
            loginPopVis: false
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
                console.log(1)
                return
            }
            // 获取vs-input中的那个input
            this.$refs.searchInput.$el.querySelector('input').blur()
            this.$router.push('/Search')
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
            this.cancelLogin()
        },
        cancelLogin() {
            this.loginPopVis = false
        }
    }
}
</script>

<style lang="less">
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