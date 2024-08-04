<template>
  <div>
    <!-- 公告栏 -->
    <div 
      style="margin-top: 30px;width: 900px;height: 200px;position: relative;left: 50%;margin-left: -450px;
      background-color: rgb(254,223,225);border-radius: 20px;">
      <div style="font-size: 40px;font-weight: bolder;top: 10px;margin-left: 30px;position: relative;">
        常用工具传送门
      </div>
      <p style="font-weight: bolder;margin-left: 30px;margin-top: 30px;width: 600px;"><span style="color: red;">Why do this: </span>这些都是在过去学习过程所用到过的网站，也有听过但是没有用到过的，
        主要是我的浏览器收藏夹太多了，干脆弄个书签页记录一下，里面有许多不错的网站我也想分享一下呢。</p>
      <p style="font-weight: bolder;color: red;margin-left: 30px;margin-top: 10px;margin-right: 30px;">注：本站仅提供书签标记，不对其内容和其造成的任何影响负责。如有非法内容，请通过首页的联系方式进行检举，若确实违法，本站将对其下架处理。</p>
    </div>
    <!-- 工具展示 -->
    <div 
      style="margin-top: 30px;width: 900px;height: auto;padding-bottom: 30px;position: relative;left: 50%;margin-left: -450px;
      background-color: rgb(254,223,225);border-radius: 20px;">
      <vs-card v-for="toolType in ToolTypes" :key="toolType.id" style="width: 800px;margin-left: 50px;top: 20px;padding-bottom: 20px;position: relative;" actionable>
        <div slot="header" style="text-align: center;">
          <h3 style="font-size: 30px;">
            {{ toolType.name }}
          </h3>
        </div>
        <div slot="media">
          <ToolBlockVue :tool="tool" v-for="tool in toolType.tools" :key="tool.id"></ToolBlockVue>
        </div>
      </vs-card>
    </div>
  </div>
</template>

<script>
import ToolBlockVue from '@/components/ToolBlock.vue'
import axios from 'axios'
export default {
  data () {
    return {
      ToolTypes: []
    }
  },
  components: {
    ToolBlockVue
  },
  methods: {
    // 获取工具
    GetTools() {
      axios.get('/api/toolType/listDetailAll')
      .then(response => {
        if (response.data.code === 200) {
          this.ToolTypes = response.data.data
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
  },
  mounted () {
    this.GetTools()
  }
}
</script>

<style>

</style>