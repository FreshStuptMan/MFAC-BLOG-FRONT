<template>
  <div>
    <!-- 头部分类列表 -->
    <div style="width: 1000px;height: auto;position: relative;margin-top: 20px;
      left: 50%;margin-left: -500px;background-color: #FEDFE1;">
      <!-- header -->
      <div style="width: 100%;height: 60px;">
        <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-between">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
            <span style="font-size: 30px;font-weight: bolder;">𝓣𝓪𝓰</span>
          </vs-col>
          <vs-col style="font-size: 20px;font-weight: bold;" vs-type="flex" vs-justify="center" vs-align="center"
            vs-w="3">
            <span style="font-size: 25px;"> 𝓣𝓸𝓽𝓪𝓵：</span><span
              style="margin-left: 4px;margin-right: 4px;font-size: 27px;font-weight: bolder;">25</span>
          </vs-col>
        </vs-row>
        <vs-divider style="margin-top: 0px;" color="#DB4D6D"></vs-divider>
      </div>
      <!-- content -->
      <div
        style="display: flex;flex-wrap: wrap;margin-top: 10px;height: auto;width: 900px;position: relative;margin-left: -450px;left: 50%;">
        <TagBlockVue style="margin-right: 10px;margin-bottom: 10px;" @tag-click="handleTagClick"
        :class="{ 'active-tag': activeTagId === 1 }"></TagBlockVue>
      </div>
    </div>
    <!-- 该分类的博客列表 -->
    <div
      style="padding-top: 20px;padding-bottom: 20px;margin-top: 80px;width: 1000px;height: auto;position: relative;left: 50%;margin-left: -500px; background-color: #FEDFE1;bottom: 40px;">
      <BlogBlock></BlogBlock>
      <BlogBlock></BlogBlock>
      <BlogBlock></BlogBlock>
      <BlogBlock></BlogBlock>
      <BlogBlock></BlogBlock>
      <BlogBlock></BlogBlock>
      <div style="width: 400px;position: relative;left: 50%;margin-left: -200px;">
        <vs-pagination style="margin-top: 20px;" prev-icon="fa-angle-double-left" next-icon="fa-angle-double-right"
          icon-pack="fa" :total="30" :max="pageSize" v-model="pageNum">
        </vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BlogBlock from '@/components/BlogBlock.vue'
import TagBlockVue from '@/components/TagBlock.vue'
export default {
  components: {
    BlogBlock,
    TagBlockVue
  },
  watch: {
    pageNum(newValue, oldValue) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      console.log("处理分页")
    }
  },
  data() {
    return {
      // 被选中的分类
      activeTagId: 0,
      // 分页相关
      pageNum: 1,
      pageSize: 6,
      totalBlog: 30
    }
  },
  methods: {
    handleTagClick(id) {
      this.activeTagId = id
    }
  }
}
</script>

<style>
.active-tag {
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>