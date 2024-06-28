<template>
  <div>
    <div style="top: 30px;width: 1800px;
      left: 50%;margin-left: -900px;height: 2200px;
      position: relative;">
      <vs-row vs-w="12" style="height: 2000px;">
        <!-- 博客列表 -->
        <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
          <div
            style="background-color: #FEDFE1;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 1000px;height: 100%;padding-bottom: 20px;">
            <!-- Header -->
            <div style="width: 100%;height: 60px;">
              <vs-row style="width: 100%;height: 100%;" vs-type="flex" vs-justify="space-between">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                  <span style="font-size: 30px;font-weight: bolder;">𝓑𝓛𝓞𝓖</span>
                </vs-col>
                <vs-col style="font-size: 20px;font-weight: bold;" vs-type="flex" vs-justify="center" vs-align="center"
                  vs-w="3">
                  <span style="font-size: 25px;"> 𝓣𝓸𝓽𝓪𝓵：</span><span
                    style="margin-left: 4px;margin-right: 4px;font-size: 27px;font-weight: bolder;">25</span>
                </vs-col>
              </vs-row>
              <vs-divider style="margin-top: 0px;" color="#DB4D6D"></vs-divider>
            </div>
            <!-- Content -->
            <div style="width: 100%;height: 100%;">
              <BlogBlockVue></BlogBlockVue>
              <BlogBlockVue></BlogBlockVue>
              <BlogBlockVue></BlogBlockVue>
              <BlogBlockVue></BlogBlockVue>
              <BlogBlockVue></BlogBlockVue>
              <BlogBlockVue></BlogBlockVue>
              <div style="width: 400px;position: relative;left: 50%;margin-left: -200px;">
                <vs-pagination style="margin-top: 20px;" prev-icon="fa-angle-double-left"
                  next-icon="fa-angle-double-right" icon-pack="fa" :total="30" :max="pageSize" v-model="pageNum">
                </vs-pagination>
              </div>
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
          <div style="position: sticky;top: 10px;">
            <!-- 最新博客 -->
            <div style="background-color: #FEDFE1;
              border-radius: 15px;padding-top: 20px;text-align: center;
              width: 400px;height: 340px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              position: relative;margin-left: -200px;left: 50%;">
              <h2>𝓝𝓮𝔀𝓮𝓼𝓽 𝓑𝓵𝓸𝓰𝓼</h2>
              <vs-divider color="#ad289f"></vs-divider>
              <NewestBlogBlockVue></NewestBlogBlockVue>
              <NewestBlogBlockVue></NewestBlogBlockVue>
              <NewestBlogBlockVue></NewestBlogBlockVue>
              <NewestBlogBlockVue></NewestBlogBlockVue>
              <NewestBlogBlockVue></NewestBlogBlockVue>
              <NewestBlogBlockVue></NewestBlogBlockVue>
            </div>
            <!-- 博客数量前十的分类与标签 -->
            <div style="background-color: #FEDFE1;
              border-radius: 15px;padding-top: 20px;
              text-align: center;
              width: 400px;height: auto;padding-bottom: 20px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              margin-top: 30px;position: relative;margin-left: -200px;left: 50%;">
              <h2>𝓒𝓱𝓸𝓸𝓼𝓮 𝓨𝓸𝓾𝓻 𝓕𝓪𝓿𝓸𝓻</h2>
              <vs-divider color="#ad289f"></vs-divider>
              <div style="display: flexbox;width: 350px;position: relative;left: 50%;margin-left: -175px;">
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类1312</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
                <vs-button style="margin-top: 5px;margin-left: 5px;height: 40px;" color="#c72a75" type="filled">
                  <div style="text-align: center;">
                    <span style="font-size: 15px;">分类分类分类分类</span>
                    <vs-avatar color="#c72a75" size="20px" text="1000"
                      style="margin: 0px;margin-left: 15px;margin-right: 3px;font-size: 25px;float: right;"></vs-avatar>
                  </div>
                </vs-button>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import BlogBlockVue from '@/components/BlogBlock.vue'
import NewestBlogBlockVue from '@/components/NewestBlogBlock.vue'
export default {
  components: {
    BlogBlockVue,
    NewestBlogBlockVue
  },
  watch: {
    // 处理分页
    pageNum(newValue, oldValue) {
      console.log("发出分页请求")
    }
  },
  data() {
    return {
      // 分页相关
      pageNum: 1,
      pageSize: 6,
      total: 0,
      newestBlogList: [{
        title: 'CQUT',
        publishTime: '2024-02-20 12:12:23'
      }]
    }
  }
}
</script>


<style lang="less" scoped></style>