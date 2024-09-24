<template>
  <div>
    <div style="flex-wrap: wrap;display: flex;padding-top: 20px;margin-top: 30px;width: 900px;height: auto;position: relative;left: 50%;margin-left: -450px;background-color: #F596AA;">
      <vs-row vs-type="flex" vs-justify="space-around">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
          <vs-button @click="applyPopVis = true" line-origin="left" color="#D0104C" type="line">申请友链</vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
          <vs-button @click="noticePopVis = true" line-origin="right" color="#D0104C" type="line">注意事项</vs-button>
        </vs-col>
      </vs-row>
      <vs-divider color="white">友链</vs-divider>
      <div v-if="friendLinkTotal > 0">
        <FriendLinkBlock v-for="FriendLink in FriendLinks" :key="FriendLink.id" :FriendLink="FriendLink"></FriendLinkBlock>
      </div>
      <div v-else style="height: 60px;text-align: center;width: 100%;">
        <h2 style="color: white;">期待您的加入</h2>
      </div>
    </div>
    <!-- 申请友链弹窗 -->
    <vs-popup style="color: white" background-color-popup="#F596AA" title="申请友链" :active.sync="applyPopVis">
      <p>
        请发送如下信息至邮箱 <span style="color: red">1367213168@qq.com</span> 即可。
      </p>
      <p>
        信息包括：{<br>
          <span style="margin-left: 10px;">友链作者：必填；</span><br>
          <span style="margin-left: 10px;">友链名称：必填；</span><br>
          <span style="margin-left: 10px;">友链地址：必填；</span><br>
          <span style="margin-left: 10px;">友链描述：必填（100字以内）；</span><br>
          <span style="margin-left: 10px;">友链头像：必填；</span><br>
          <span style="margin-left: 10px;">作者邮箱：必填；</span><br>
        }
      </p>
    </vs-popup>
    <!-- 注意事项弹窗 -->
    <vs-popup style="color: white" background-color-popup="#F596AA" title="注意事项" :active.sync="noticePopVis">
      <p>
        1. 在收到友链申请的后，会对贵站内容进行访问，若内容健康，符合相应法律法规，则会在48H内上架于本站友链页并通过邮件通知。<br><br>
        2. 当贵站在收到了本站发送的上架通知邮件后，请于7*24H之内也将本站添加到贵方友链中（如果有该功能的话）。<br><br>
        3. 本站将每月审查一次贵站内容是否符合相应法律法规，若内容不符，则将对贵站友链进行下架处理，并通过邮件通知告知下架理由。<br><br>
        4. 本站对友链的上架与下架均会有邮件通知，为此请保证所提供的邮箱的正确。<br><br>
      </p>
    </vs-popup>
  </div>
</template>

<script>
import FriendLinkBlock from '@/components/FriendLinkBlock.vue'
import axios from 'axios';
export default {
  computed: {
    friendLinkTotal() {
      return this.FriendLinks.length
    }
  },
  components: {
    FriendLinkBlock
  },
  data() {
    return {
      // 申请友链弹窗控制
      applyPopVis: false,
      // 注意事项弹窗控制
      noticePopVis: false,
      // 友链列表
      FriendLinks: []
    }
  },
  methods: {
    // 获取所有友链
    GetFriendLinkList() {
      axios.get('/api/friendLink/listAllUp')
      .then(response => {
        if(response.data.code === 200) {
          this.FriendLinks = response.data.data
          console.log(this.FriendLinks)
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
    }
  },
  mounted() {
    this.GetFriendLinkList()
  }
}
</script>

<style lang="less" scoped>
</style>