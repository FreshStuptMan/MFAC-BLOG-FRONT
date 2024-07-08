<template>
  <div style="padding-top: 30px;">
    <!-- 博客主体 -->
    <div
      style="padding-bottom: 20px;bottom: 30px;margin-top: 30px;width: 1000px;height: auto;position: relative;left: 50%;margin-left: -500px;background-color: white;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
      <!-- 博客标题 -->
      <div style="padding-top: 10px;text-align: center;width: 100%;height: 75px;">
        <vs-button size="large" style="float: right;width: 100px;" color="danger" type="line">
          {{ BlogDetail.types === 1 ? '转载' : '原创' }}
        </vs-button>
        <h1 style="width: 300px;position: relative;margin-left: -150px;left: 50%;">{{ BlogDetail.title }}</h1>
        <vs-divider color="#ad289f"></vs-divider>
      </div>
      <!-- 博客头图 -->
      <div style="width: 100%;height: 450px;">
        <img style=" box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            width: 800px;height: 400px;border-radius: 5px;position: relative;left: 50%;
            margin-left: -400px;" :src="BlogDetail.avatar">
        <vs-divider color="#ad289f"></vs-divider>
      </div>
      <!-- 博客主体内容 -->
      <div style="width: 100%;min-height: 400px;max-height: auto;padding-left: 50px;padding-right: 50px;">
        <div v-html="BlogDetail.content"></div>
      </div>
      <vs-divider color="#ad289f"></vs-divider>
      <!-- 分类与标签 -->
      <div style="width: 100%;height: 75px;padding-left: 30px;padding-right: 10px;">
        <vs-row style="height: 100%;" vs-align="flex-end" vs-type="flex" vs-justify="space-between" vs-w="12">
          <!-- 博客分类 -->
          <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
            <vs-button color="#c72a75" type="filled">{{ BlogDetail.classifyName }}</vs-button>
          </vs-col>
          <!-- 博客标签 -->
          <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
            <vs-button style="margin-right: 5px;" line-position="top" line-origin="left" :color="tag.color"
              v-for="tag in BlogDetail.tags" :key="tag.id"
              type="line">{{ tag.name }}</vs-button>
          </vs-col>
        </vs-row>
      </div>
    </div>
    <!-- 侧边工具栏 -->
    <div style="width: 60px;height: 150px;background-color: white;border-radius: 10px;position: fixed;right: 50px;bottom: 50px;">
      <!-- 回到首页 -->
      <vs-button @click="GoToHome" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning" icon-pack="fa" type="filled" icon="fa-home"></vs-button>
      <!-- 回到上一页 -->
      <vs-button @click="GoToBack" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning" icon-pack="fa" type="filled" icon="fa-backward"></vs-button>
      <!-- 回到顶部 -->
      <vs-button @click="GoToTop" style="width: 50px;margin-left: 10px;margin-top: 10px;" color="warning" icon-pack="fa" type="filled" icon="fa-chevron-up"></vs-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      BlogDetail: {}
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
    },
    // 获取博客详情
    GetBlogDetail(id) {
      axios.get(`/api/blog/detail/${id}`)
      .then(response => {
        if(response.data.code === 200) {
          this.BlogDetail = response.data.data
        } else {
          this.$vs.notify({
            title: '提示',
            text: response.data.msg,
            color: 'red'
          })
        }
      })
      .catch(error => {
        this.$vs.notify({
          title: '提示',
          text: error,
          color: 'red'
        })
      })
    }
  },
  mounted() {
    this.GoToTop()
    this.GetBlogDetail(this.$route.params.id)
  }
}
</script>

<style></style>