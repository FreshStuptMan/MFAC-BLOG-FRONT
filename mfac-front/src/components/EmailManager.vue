<template>
  <div>
    <div
      style="border-radius: 20px;width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
      <!-- 搜索表单 -->
      <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
        <!-- 友链名称 -->
        <vs-input width="150px" label="友链名称" placeholder="友链名称"
          v-model="SearchForm.name" />
        <!-- 友链邮箱 -->
        <vs-input style="margin-left: 5px;" width="150px" label="友链邮箱" placeholder="友链邮箱"
          v-model="SearchForm.email" />
        <!-- 邮件状态 -->
        <vs-select placeholder="邮件状态" width="100px" style="margin-left: 5px;" label="邮件状态" icon-pack="fa"
          icon="fa-angle-down" v-model="SearchForm.status">
          <vs-select-item :value="0" text="发送中"/>
          <vs-select-item :value="1" text="发送成功"/>
          <vs-select-item :value="2" text="发送失败"/>
        </vs-select>
        <!-- 邮件类型 -->
        <vs-select placeholder="邮件类型" width="100px" style="margin-left: 5px;" label="邮件类型" icon-pack="fa"
          icon="fa-angle-down" v-model="SearchForm.emailType">
          <vs-select-item :value="1" text="上架通知邮件"/>
          <vs-select-item :value="2" text="下架通知邮件"/>
        </vs-select>      
        <!-- 搜索 -->
        <vs-button @click="handleSearch" size="small"
          style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;" color="#c72a75"
          type="filled">搜索邮件</vs-button>
        <!-- 重置 -->
        <vs-button @click="handleReset" size="small" style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;"
          color="#c72a75" type="filled">重置</vs-button>
      </div>
      <!-- 主体表格 -->
      <div
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
        <vs-table max-items="3" :data="emails" style="padding-top: 20px;height: 100%;">
          <template slot="thead">
            <vs-th>
              <h4 style="width: 100%;text-align: center;">创建时间</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">目标邮箱</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">邮件类型</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">关联友链</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">邮件状态</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">操作</h4>
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="email.id" v-for="email in data">

              <vs-td style="text-align: center;" :data="email.recordTime">
                {{ email.recordTime }}
              </vs-td>

              <vs-td style="text-align: center;" :data="email.email">
                {{ email.email }}
              </vs-td>

              <vs-td style="text-align: center;" :data="email.emailType">
                {{ email.emailType === 1 ? '上架通知' : '下架通知' }}
              </vs-td>

              <vs-td style="text-align: center;" :data="email.friendLinkName">
                {{ email.friendLinkName }}
              </vs-td>

              <vs-td style="text-align: center;" :data="email.status">
                {{ email.status === 0 ? '发送中' : (email.status === 1 ? '发送成功' : '发送失败' ) }}
              </vs-td>
              <vs-td style="text-align: center;" :data="email">
                <vs-button v-if="email.status === 2" @click="handleDetail(email)" color="danger" type="line">失败原因</vs-button>
                <vs-button v-if="email.status === 2" @click="handleEdit(email)" color="danger" type="line">更新邮箱</vs-button>
                <vs-button v-if="email.status === 2" @click="handleResent(email)" color="danger" type="line">重发</vs-button>
                <vs-button :disabled="email.status != 1" @click="handleDelete(email)" color="danger" type="line">删除</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- 分页 -->
        <el-pagination style="float: right;margin-top: 20px;" background layout="prev, pager, next"
          @current-change="handlePageChange" :page-size="pageSize" :current-page="pageNum" :total="total">
        </el-pagination>
      </div>
      <!-- 失败原因弹窗 -->
      <vs-popup title="失败原因" :active.sync="faultReasonPopVis" :button-close-hidden="true">
        <div>
          {{ activeEmail.faultReason }}
        </div>
        <div style="width: 100%;">
          <vs-button @click="faultReasonPopVis = false" style="float: right;" color="danger" type="line">关闭</vs-button>
        </div>
      </vs-popup>
      <!-- 编辑表单弹窗 -->
      <vs-popup title="编辑邮件记录" :active.sync="editPopVis" :button-close-hidden="true">
        <div>
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="目标邮箱"
            v-model="editForm.email" />
        </div>
        <div style="width: 100%;">
          <vs-button @click="acceptEdit" style="float: right;" color="danger" type="line">确定</vs-button>
          <vs-button @click="cancelEdit" style="float: right;" color="danger" type="line">取消</vs-button>
        </div>
      </vs-popup>
      <!-- 删除二次确认弹窗 -->
      <vs-popup title="提示" :active.sync="deletePopVis">
        <p>
          确定要删除吗？
        </p>
        <div style="float: right;">
          <vs-button @click="acceptDelete" style="margin-right: 10px;" color="danger" type="filled">确定</vs-button>
          <vs-button @click="cancelDelete" color="warning" type="filled">取消</vs-button>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import axios from 'axios'
export default {
  computed: {
    token() {
      return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
    }
  },
  data() {
    return {
      // 搜索表单
      SearchForm: {
        email: '',
        status: null,
        name: '',
        emailType: null
      },
      // 表格数据
      emails: [],
      // 邮件编辑表单
      editForm: {
        email: '',
      },
      // 编辑表单窗口控制
      editPopVis: false,
      // 失败原因窗口控制
      faultReasonPopVis: false,
      // 被选择的邮件记录
      activeEmail: {},
      // 删除的二次确认弹窗控制 
      deletePopVis: false,
      // 分页参数
      pageNum: 1,
      pageSize: 8,
      total: 0
    }
  },
  methods: {
    handlePageChange(pageNum) {
      this.pageNum = pageNum
      this.GetEmailList()
    },
    // 搜索
    handleSearch() {
      this.GetEmailList()
    },
    // 重置搜索表单
    handleReset() {
      this.SearchForm.name = ''
      this.SearchForm.email = ''
      this.SearchForm.emailType = null
      this.SearchForm.status = null
      this.pageNum = 1
      this.GetEmailList()
    },
    // 获取邮件记录列表
    GetEmailList() {
      Loading.service({
        lock: true,
        text: '数据加载中，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255)',
        fullscreen: true
      })
      axios.post('/api/admin/email/list', {
        name: this.SearchForm.name,
        email: this.SearchForm.email,
        emailType: this.SearchForm.emailType,
        status: this.SearchForm.status,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.emails = response.data.data.records
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

    // 查看失败原因
    handleDetail(email) {
      this.activeEmail = email
      this.faultReasonPopVis = true
    },

    // 手动重发
    handleResent(email) {
      axios.post('/api/admin/email/resent', {
        id: email.id,
        email: email.email,
        friendLinkId: email.friendLinkId,
        emailType: email.emailType
      }, {
        headers: {token: this.token}
      })
      .then(response => {
        if (response.data.code === 200) {
          this.$vs.notify({
            title: '提示',
            text: '发送成功',
            color: 'success'
          })
        } else {
          this.$vs.notify({
            title: '提示',
            text: response.data.msg,
            color: 'red'
          })
        }
        this.GetEmailList()
      })
      .catch(error => {
        this.$vs.notify({
            title: '提示',
            text: error,
            color: 'red'
          })
      })
    },

    // 编辑邮件记录
    handleEdit(email) {
      this.activeEmail = email
      this.editForm.email = email.email
      this.editPopVis = true
    },
    // 确定编辑
    acceptEdit() {
      if (!this.editFormVarify()) {
        return
      }
      axios.post('/api/admin/email/changeEmail', {
        id: this.activeEmail.id,
        email: this.editForm.email
      }, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title: '提示',
              text: '更新成功',
              color: 'success'
            })
            this.GetEmailList()
            this.editPopVis = false
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
    // 取消编辑
    cancelEdit() {
      this.editPopVis = false
    },



    // 删除邮件记录
    handleDelete(email) {
      this.activeEmail = email
      this.deletePopVis = true
    },
    // 确定删除
    acceptDelete() {
      axios.delete(`/api/admin/email/delete/${this.activeEmail.id}`, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title: '提示',
              text: '删除成功',
              color: 'success'
            })
            this.GetEmailList()
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
      this.cancelDelete()
    },
    // 取消删除
    cancelDelete() {
      this.activeEmail = {}
      this.deletePopVis = false
    },


    // 编辑表单验证
    editFormVarify() {
      if (this.editForm.email === '') {
        this.$vs.notify({
          title: '提示',
          text: '邮箱不能为空',
          color: 'red'
        })
        return false
      }
      return true
    }
  },
  mounted() {
    this.GetEmailList()
  }
}
</script>

<style lang="less" scoped></style>