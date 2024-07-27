<template>
    <div>
        <!-- 头部搜索栏 -->
        <div style="padding-top: 15px;width: 850px;height: 75px;
            border-radius: 10px;
            position: relative;left: 50%;margin-left: -425px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            background-color: rgba(254,223,225);margin-top: 30px;">
            <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
                    <vs-input style="width: 600px;" size="large" icon-pack="fa" icon="fa-search" placeholder="Search"
                        v-model="search" />
                </vs-col>
                <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="2">
                    <vs-button @click="handleSearch" style="width: 100px;" color="#c72a75" type="relief">搜索</vs-button>
                </vs-col>
            </vs-row>
        </div>
        <!-- 博客列表 -->
        <div
            style="border-radius: 20px;padding-top: 20px;padding-bottom: 20px;margin-top: 80px;width: 1000px;max-height: auto;min-height: 400px;position: relative;left: 50%;margin-left: -500px; background-color: #FEDFE1;bottom: 40px;">
            <div v-if="blogsLength !== 0">
                <BlogBlock v-for="blog in blogs" :key="blog.id" :blog="blog"></BlogBlock>
                <!-- 分页 -->
                <el-pagination v-if="total > pageSize" style="margin-top: 20px;width: 200px;position: relative;left: 50%;margin-left: -100px;" background layout="prev, pager, next" @current-change="handlePageChange"
                    :page-size="pageSize" :current-page="pageNum" :total="total">
                </el-pagination>
            </div>
            <div v-else style="font-size: 30px;width: 400px;position: relative;left: 50%;margin-left: -200px;text-align: center;">
                暂无相关博客
            </div>
        </div>
        <!-- 侧边工具栏 -->
        <div
            style="width: 60px;height: 150px;background-color: white;border-radius: 10px;position: fixed;right: 50px;bottom: 50px;">
            <!-- 回到首页 -->
            <vs-button @click="GoToHome" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning"
                icon-pack="fa" type="filled" icon="fa-home"></vs-button>
            <!-- 回到上一页 -->
            <vs-button @click="GoToBack" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning"
                icon-pack="fa" type="filled" icon="fa-backward"></vs-button>
            <!-- 回到顶部 -->
            <vs-button @click="GoToTop" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning"
                icon-pack="fa" type="filled" icon="fa-chevron-up"></vs-button>
        </div>
    </div>
</template>

<script>
import { Loading } from 'element-ui'
import BlogBlock from '@/components/BlogBlock.vue'
import axios from 'axios'
export default {
    computed: {
        blogsLength() {
            return this.blogs ? this.blogs.length : 0
        }
    },
    components: {
        BlogBlock
    },
    data() {
        return {
            search: '',
            // 分页相关
            pageNum: 1,
            pageSize: 6,
            total: 0,
            // 博客列表
            blogs: []
        }
    },
    methods: {
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.GetBlogList()
        },

        // 搜索
        handleSearch() {
            this.pageNum = 1
            this.GetBlogList()
        },

        // 获取博客列表
        GetBlogList() {
            Loading.service({
                lock: true,
                text: '数据加载中，请稍等。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(255,255,255)',
                fullscreen: true
            })
            axios.post('/api/blog/search', {
                key: this.search,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.blogs = response.data.data.records
                    this.total = response.data.data.total
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
                    title:'提示',
                    text: error,
                    color:'red'
                })
            })
            Loading.service({ fullscreen: true }).close()
        },

        // 返回首页
        GoToHome() {
            this.$router.push('/')
        },
        // 返回上一页
        GoToBack() {
            this.$router.back()
        },
        // 回到顶部
        GoToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    },
    mounted() {
        this.search = this.$route.params.key
        this.GetBlogList()
    }
}
</script>

<style></style>