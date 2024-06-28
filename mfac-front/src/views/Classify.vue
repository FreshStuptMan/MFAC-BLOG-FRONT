<template>
  <div>
    <!-- 头部分类列表 -->
    <div style="width: 1000px;height: auto;position: relative;margin-top: 20px;
      left: 50%;margin-left: -500px;background-color: #FEDFE1;">
      <!-- header -->
      <div style="width: 100%;height: 60px;">
        <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-between">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
            <span style="font-size: 30px;font-weight: bolder;">𝓒𝓵𝓪𝓼𝓼𝓲𝓯𝓲𝓬𝓪𝓽𝓲𝓸𝓷</span>
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
      <div style="display: flex;flex-wrap: wrap;margin-top: 10px;height: auto;width: 900px;position: relative;margin-left: -450px;left: 50%;">
        <ClassifyBlockVue style="margin-right: 10px;margin-bottom: 10px;" @classify-click="handleClassifyClick" :class="{ 'active-classify': activeClassifyId === 1}"></ClassifyBlockVue>
        <ClassifyBlockVue style="margin-right: 10px;margin-bottom: 10px;" @classify-click="handleClassifyClick" :class="{ 'active-classify': activeClassifyId === 1}"></ClassifyBlockVue>
        <ClassifyBlockVue style="margin-right: 10px;margin-bottom: 10px;" @classify-click="handleClassifyClick" :class="{ 'active-classify': activeClassifyId === 1}"></ClassifyBlockVue>
        <ClassifyBlockVue style="margin-right: 10px;margin-bottom: 10px;" @classify-click="handleClassifyClick" :class="{ 'active-classify': activeClassifyId === 1}"></ClassifyBlockVue>
      </div>
    </div>                                                                                              
    <!-- 该分类的博客列表 -->
    <div style="padding-top: 20px;padding-bottom: 20px;margin-top: 80px;width: 1000px;height: auto;position: relative;left: 50%;margin-left: -500px; background-color: #FEDFE1;bottom: 40px;">
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
  </div>
</template>

<script>
import ClassifyOrTagSiderBlock from '@/components/ClassifyOrTagSiderBlock.vue'
import ClassifyBlockVue from '@/components/ClassifyBlock.vue'
import BlogBlock from '@/components/BlogBlock.vue'
export default {
  components: {
    ClassifyOrTagSiderBlock,
    ClassifyBlockVue,
    BlogBlock
  },
  watch: {
    pageNum(newValue, oldValue){
      console.log("处理分页")
    }
  },
  data() {
    return {
      // 被选中的分类
      activeClassifyId: 0,
      // 分页相关
      pageNum: 1,
      pageSize: 6,
      totalBlog: 30 
    }
  },
  methods: {
    handleClassifyClick(id) {
      this.activeClassifyId = id
    }
  }
}
</script>

<style>
.active-classify{
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>