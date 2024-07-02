<template>
    <div>
        <!-- 头部搜索栏 -->
        <div style="padding-top: 15px;width: 850px;height: 75px;
        border-radius: 10px;
        position: relative;left: 50%;margin-left: -425px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: white;margin-top: 30px;">
            <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
                    <vs-input style="width: 600px;" size="large" icon-pack="fa" icon="fa-search" placeholder="Search"
                        v-model="search" />
                </vs-col>
                <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="2">
                    <vs-button style="width: 100px;" color="#c72a75" type="relief">搜索</vs-button>
                </vs-col>
            </vs-row>
        </div>
        <!-- 博客列表 -->
        <div
            style="padding-top: 20px;padding-bottom: 20px;margin-top: 80px;width: 1000px;max-height: auto;min-height: 400px;position: relative;left: 50%;margin-left: -500px; background-color: #FEDFE1;bottom: 40px;">
            <BlogBlock></BlogBlock>
            <BlogBlock></BlogBlock>
            <BlogBlock></BlogBlock>
            <BlogBlock></BlogBlock>
            <BlogBlock></BlogBlock>
            <BlogBlock></BlogBlock>
            <div style="width: 400px;position: relative;left: 50%;margin-left: -200px;">
                <vs-pagination style="margin-top: 20px;" prev-icon="fa-angle-double-left"
                    next-icon="fa-angle-double-right" icon-pack="fa" :total="30" :max="pageSize" v-model="pageNum">
                </vs-pagination>
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
import BlogBlock from '@/components/BlogBlock.vue';
export default {
    components: {
        BlogBlock
    },
    data() {
        return {
            search: '',
            // 分页相关
            pageNum: 1,
            pageSize: 6
        }
    },
    methods: {
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
    }
}
</script>

<style></style>