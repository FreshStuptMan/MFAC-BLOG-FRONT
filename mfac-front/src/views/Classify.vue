<template>
  <div>
    <!-- 头部分类列表 -->
    <div style="border-radius: 20px;width: 1000px;height: auto;position: relative;margin-top: 20px;
      left: 50%;margin-left: -500px;background-color: #F596AA;">
      <!-- header -->
      <div style="width: 100%;height: 60px;">
        <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-between">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
            <span style="font-size: 30px;font-weight: bolder;">𝓒𝓵𝓪𝓼𝓼𝓲𝓯𝓲𝓬𝓪𝓽𝓲𝓸𝓷</span>
          </vs-col>
          <vs-col style="font-size: 20px;font-weight: bold;" vs-type="flex" vs-justify="center" vs-align="center"
            vs-w="3">
            <span style="font-size: 25px;"> 𝓣𝓸𝓽𝓪𝓵：</span><span
              style="margin-left: 4px;margin-right: 4px;font-size: 27px;font-weight: bolder;">{{ classifysLength }}</span>
          </vs-col>
        </vs-row>
        <vs-divider style="margin-top: 0px;" color="#DB4D6D"></vs-divider>
      </div>
      <!-- content -->
      <div style="display: flex;flex-wrap: wrap;margin-top: 10px;height: auto;width: 900px;position: relative;margin-left: -450px;left: 50%;">
        <ClassifyBlockVue style="margin-right: 10px;margin-bottom: 10px;"
          v-for="classify in classifys" :key="classify.id" :classify="classify"
          @classify-click="handleClassifyClick" :class="{ 'active-classify': activeClassifyId === classify.id}">
        </ClassifyBlockVue>
      </div>
    </div>                                                                                              
    <!-- 该分类的博客列表 -->
    <div v-if="blogsLength !== 0" style="border-radius: 20px;padding-top: 10px;padding-bottom: 20px;margin-top: 80px;width: 1000px;height: auto;position: relative;left: 50%;margin-left: -500px; background-color: #F596AA;bottom: 40px;">
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
</template>

<script>
import { Loading } from 'element-ui'
import ClassifyBlockVue from '@/components/ClassifyBlock.vue'
import BlogBlock from '@/components/BlogBlock.vue'
import axios from 'axios'
export default {
  computed: {
    classifysLength() {
      return this.classifys.length
    },
    blogsLength() {
      return this.blogs.length
    }
  },
  components: {
    ClassifyBlockVue,
    BlogBlock
  },
  data() {
    return {
      // 被选中的分类
      activeClassifyId: null,
      // 分页相关
      pageNum: 1,
      pageSize: 6,
      total: 0,
      // 分类列表
      classifys: [],
      // 博客列表
      blogs: []
    }
  },
  methods: {
    handleClassifyClick(id) {
      this.activeClassifyId = id
      this.pageNum = 1
      this.GetBlogList()
    },

    // 分页
    handlePageChange(pageNum) {
      this.pageNum = pageNum
      this.GetBlogList()
    },
    // 获取分类列表
    GetClassifyList() {
      axios.get('/api/classify/listAllWithTotal')
      .then(response => {
        if(response.data.code === 200) {
          this.classifys = response.data.data
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
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        classifyId: this.activeClassifyId
      })
      .then(response => {
        if(response.data.code === 200) {
          this.blogs = response.data.data.records
          this.total = response.data.data.total
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
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
  },
  mounted() {
    this.GetClassifyList()
    let id = this.$route.params.id
    if(id) {
      this.activeClassifyId = id
    }
    this.GetBlogList()
  }
}
</script>

<style>
.active-classify{
  color: #FEDFE1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>