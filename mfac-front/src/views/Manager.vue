<template>
  <div>
    <vs-tabs v-model="activeTab" alignment="center">
      <vs-tab label="博客管理">
        <div>
          <component 
            @edit-cancel="handleEditCancel"
            @edit-success="handleEditSuccess"
            @edit-blog="handleEditBlog"
            @create-cancel="handleCreateCancel"
            @create-success="handleCreateSuccess"
            @create-blog="handleCreateBlog"
            :id="blogId"
            :is="currentComponent">
          </component>
        </div>
      </vs-tab>
      <vs-tab label="分类管理">
        <div>
          <ClassifyManagerVue></ClassifyManagerVue>
        </div>
      </vs-tab>
      <vs-tab label="标签管理">
        <div>
          <TagManagerVue></TagManagerVue>
        </div>
      </vs-tab>
      <vs-tab label="工具类型管理">
        <div>
          <ToolTypeManagerVue></ToolTypeManagerVue>
        </div>
      </vs-tab>
      <vs-tab label="工具管理">
        <div>
          <ToolManagerVue></ToolManagerVue>
        </div>
      </vs-tab>
      <vs-tab label="个人信息修改">
        <div>
          <PersonalManagerVue></PersonalManagerVue>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import BlogManagerVue from '@/components/BlogManager.vue'
import ClassifyManagerVue from '@/components/ClassifyManager.vue'
import TagManagerVue from '@/components/TagManager.vue'
import PersonalManagerVue from '@/components/PersonalManager.vue'
import BlogManager_CreateBlogVue from '@/components/BlogManager_CreateBlog.vue'
import BlogManager_EditBlogVue from '@/components/BlogManager_EditBlog.vue'
import ToolTypeManagerVue from '@/components/ToolTypeManager.vue'
import ToolManagerVue from '@/components/ToolManager.vue'
export default {
  components: {
    BlogManagerVue,
    ClassifyManagerVue,
    TagManagerVue,
    PersonalManagerVue,
    BlogManager_CreateBlogVue,
    BlogManager_EditBlogVue,
    ToolTypeManagerVue,
    ToolManagerVue
  },
  data() {
    return {
      currentComponent: 'BlogManagerVue',
      activeTab: '0',
      blogId: null
    }
  },
  methods: {
    // 处理创建博客
    handleCreateBlog() {
      this.currentComponent = 'BlogManager_CreateBlogVue'
    },
    // 取消创建
    handleCreateCancel() {
      this.currentComponent = 'BlogManagerVue'
    },
    // 创建成功
    handleCreateSuccess() {
      this.currentComponent = 'BlogManagerVue'
    },


    // 编辑博客
    handleEditBlog(id) {
      this.blogId = id
      this.currentComponent = 'BlogManager_EditBlogVue'
    },
    // 取消编辑
    handleEditCancel() {
      this.blogId = null
      this.currentComponent = 'BlogManagerVue'
    },
    // 编辑成功
    handleEditSuccess() {
      this.blogId = null
      this.currentComponent = 'BlogManagerVue'
    },
    // 处理导航栏跳转至个人信息修改
    handleTranPersonalInfo() {
        if (this.$store.state.Manager_Tab) {
        if(this.$store.state.Manager_Tab === 'PersonalManager') {
          this.activeTab = '5'
          this.$store.dispatch('updateManagerTab', '')
        }
      }
    }
  },
  created() {
    this.handleTranPersonalInfo()
  }
}
</script>

<style>

</style>