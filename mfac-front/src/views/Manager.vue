<template>
  <div>
    <vs-tabs alignment="center">
      <vs-tab label="博客管理">
        <div>
          <BlogManagerVue></BlogManagerVue>
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
export default {
    components: {
        BlogManagerVue,
        ClassifyManagerVue,
        TagManagerVue,
        PersonalManagerVue
    }
}
</script>

<style>

</style>