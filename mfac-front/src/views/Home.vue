<template>
  <div>
    <div style="top: 30px;width: 1600px;
      left: 50%;margin-left: -800px;max-height: 2200px;
      position: relative;">
      <vs-row vs-w="12" style="max-height: 2000px;">
        <!-- 博客列表 -->
        <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
          <div
            style="border-radius: 20px;background-color: #FEDFE1;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 1000px;height: 100%;padding-bottom: 20px;">
            <!-- Header -->
            <div style="width: 100%;height: 60px;">
              <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-between">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                  <span style="font-size: 30px;font-weight: bolder;">𝓑𝓛𝓞𝓖</span>
                </vs-col>
                <vs-col style="font-size: 20px;font-weight: bold;" vs-type="flex" vs-justify="center" vs-align="center"
                  vs-w="3">
                  <span style="font-size: 25px;"> 𝓣𝓸𝓽𝓪𝓵：</span><span
                    style="margin-left: 4px;margin-right: 4px;font-size: 27px;font-weight: bolder;">{{ total }}</span>
                </vs-col>
              </vs-row>
              <vs-divider style="margin-top: 0px;" color="#DB4D6D"></vs-divider>
            </div>
            <!-- Content -->
            <div v-if="blogsLength > 0" style="width: 100%;height: 100%;">
              <BlogBlockVue v-for="blog in blogs" :key="blog.id" :blog="blog"></BlogBlockVue>
              <!-- 分页 -->
              <el-pagination v-if="total > pageSize" style="float: right;margin-top: 20px;" background layout="prev, pager, next" @current-change="handlePageChange"
                :page-size="pageSize" :current-page="pageNum" :total="total">
              </el-pagination>
            </div>
            <div v-else style="font-size: 30px;width: 400px;position: relative;left: 50%;margin-left: -200px;text-align: center;">
                暂无相关博客
            </div>
          </div>
        </vs-col>
        <!-- 侧边栏 -->
        <vs-col vs-justify="center" vs-w="4">
          <!-- 网站介绍 -->
          <!-- <div
            style="padding-top: 10px;text-align: center;width: 400px;height: 500px;background-color: #FEDFE1;margin-top: 30px;position: relative;margin-left: -200px;left: 50%;">
            <h1>𝓘𝓷𝓽𝓮𝓻𝓭𝓾𝓬𝓮</h1>
            <vs-divider color="#ad289f"></vs-divider>
            <div style="width: 350px;height: 300px;position: relative;left: 50%;margin-left: -175px;">
              <p>
                欢迎来到我的个人博客--MFAC！<br> 
                博客采用技术栈：<br>
                SpringBoot+Mybatis+Vue+Vuesax
              </p>
            </div>
          </div> -->
          <!-- 实现粘滞效果 -->
          <div style="position: sticky;top: 10px;">
            <!-- 最新博客 -->
            <div style="background-color: #FEDFE1;
              border-radius: 15px;padding-top: 20px;text-align: center;
              width: 400px;height: auto;
              padding-bottom: 20px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              position: relative;margin-left: -200px;left: 50%;">
              <h2>𝓝𝓮𝔀𝓮𝓼𝓽 𝓑𝓵𝓸𝓰𝓼</h2>
              <vs-divider color="#ad289f"></vs-divider>
              <NewestBlogBlockVue v-for="blog in newestBlogList" :key="blog.id" :blog="blog"></NewestBlogBlockVue>
            </div>
            <!-- 随机分类与标签 -->
            <div style="background-color: #FEDFE1;
              border-radius: 15px;padding-top: 20px;
              text-align: center;
              width: 400px;height: auto;padding-bottom: 20px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              margin-top: 30px;position: relative;margin-left: -200px;left: 50%;">
              <h2>𝓒𝓱𝓸𝓸𝓼𝓮 𝓨𝓸𝓾𝓻 𝓕𝓪𝓿𝓸𝓻</h2>
              <vs-divider color="#ad289f"></vs-divider>
              <ul style="list-style-type: none;display: flex;flex-wrap: wrap;width: 350px;position: relative;left: 50%;margin-left: -175px;">
                <li v-for="classify in classifyList" :key="classify.id" style="min-width: auto;max-width: 150px;">
                  <ClassifySiderBlockVue :info="classify"></ClassifySiderBlockVue>
                </li>
                <li v-for="tag in tagList" :key="tag.id" style="min-width: auto;max-width: 150px;">
                  <TagSiderBlockVue :info="tag"></TagSiderBlockVue>
                </li>
              </ul>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import BlogBlockVue from '@/components/BlogBlock.vue'
import NewestBlogBlockVue from '@/components/NewestBlogBlock.vue'
import axios from 'axios'
import ClassifySiderBlockVue from '@/components/ClassifySiderBlock.vue'
import TagSiderBlockVue from '@/components/TagSiderBlock.vue'
export default {
  computed: {
    blogsLength() {
      return this.blogs.length
    }
  },
  components: {
    BlogBlockVue,
    NewestBlogBlockVue,
    ClassifySiderBlockVue,
    TagSiderBlockVue
  },
  data() {
    return {
      // 博客列表
      blogs: [],
      // 分页相关
      pageNum: 1,
      pageSize: 6,
      total: 0,
      // 最新博客侧边栏数据
      newestBlogList: [],
      // 分类列表
      classifyList: [],
      // 标签列表
      tagList: []
    }
  },
  methods: {
    // 分页
    handlePageChange(pageNum) {
      this.pageNum = pageNum
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
      axios.get(`/api/blog/list/${this.pageNum}/${this.pageSize}`)
      .then(response => {
        if(response.data.code === 200) {
          this.blogs = response.data.data.records
          this.total = response.data.data.total
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
      Loading.service({ fullscreen: true }).close()
    },
    // 获取最新博客列表
    GetNewestBlogList() {
      axios.get(`/api/blog/newest`)
      .then(response => {
        if(response.data.code === 200) {
          this.newestBlogList = response.data.data
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
    },
    // 随机获取5个分类
    GetClassifyList() {
      axios.get('/api/classify/random')
      .then(response => {
        if(response.data.code === 200) {
          this.classifyList = response.data.data
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
    },
    // 随机获取5个标签
    GetTagList() {
      axios.get('/api/tag/random')
      .then(response => {
        if(response.data.code === 200) {
          this.tagList = response.data.data
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
    this.GetBlogList()
    this.GetNewestBlogList()
    this.GetClassifyList()
    this.GetTagList()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>


<style lang="less" scoped></style>