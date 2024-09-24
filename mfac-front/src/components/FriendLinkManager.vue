<template>
  <div>
    <div
      style="border-radius: 20px;width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
      <!-- 搜索表单 -->
      <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
        <!-- 友链名称 -->
        <vs-input width="150px" label="友链名称" icon-pack="fa" placeholder="友链名称" v-model="SearchForm.name" />
        <vs-input width="150px" style="margin-left: 5px;" label="作者名称" icon-pack="fa" placeholder="友链名称"
          v-model="SearchForm.author" />
        <!-- 友链状态 -->
        <vs-select placeholder="友链状态" width="100px" style="margin-left: 5px;" label="友链状态" icon-pack="fa"
          icon="fa-angle-down" v-model="SearchForm.status">
          <vs-select-item :value="0" text="下架" />
          <vs-select-item :value="1" text="上架" />
        </vs-select>
        <!-- 搜索 -->
        <vs-button @click="handleSearch" size="small"
          style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;" color="#c72a75"
          type="filled">搜索友链</vs-button>
        <!-- 重置 -->
        <vs-button @click="handleReset" size="small" style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;"
          color="#c72a75" type="filled">重置</vs-button>
        <!-- 创建友链 -->
        <vs-button @click="handleCreate" size="small"
          style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
          type="filled">创建友链</vs-button>
      </div>
      <!-- 主体表格 -->
      <div
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .1, 2), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
        <vs-table max-items="3" :data="friendLinks" style="padding-top: 20px;height: 100%;">
          <template slot="thead">
            <vs-th>
              <h4 style="width: 100%;text-align: center;">友链名称</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">友链颜色</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">友链作者</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">创建时间</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">更新时间</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">状态</h4>
            </vs-th>
            <vs-th>
              <h4 style="width: 100%;text-align: center;">操作</h4>
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="friendLink.id" v-for="friendLink in data">

              <vs-td style="text-align: center;" :data="friendLink.name">
                {{ friendLink.name }}
              </vs-td>

              <vs-td style="text-align: center;" :data="friendLink.color">
                <input type="color" v-model="friendLink.color" disabled>
              </vs-td>

              <vs-td style="text-align: center;" :data="friendLink.author">
                {{ friendLink.author }}
              </vs-td>

              <vs-td style="text-align: center;" :data="friendLink.createTime">
                {{ friendLink.createTime }}
              </vs-td>

              <vs-td style="text-align: center;" :data="friendLink.updateTime">
                {{ friendLink.updateTime }}
              </vs-td>

              <vs-td style="text-align: center;" :data="friendLink.status">
                {{ friendLink.status === 0 ? '下架' : '上架' }}
              </vs-td>
              <vs-td style="text-align: center;" :data="friendLink">
                <vs-button v-if="friendLink.status === 0" @click="handleUp(friendLink)" color="danger"
                  type="line">上架</vs-button>
                <vs-button v-else @click="handleDown(friendLink)" color="danger" type="line">下架</vs-button>
                <vs-button v-if="friendLink.status === 0" @click="handleDetail(friendLink)" color="danger" type="line">下架原因</vs-button>
                <vs-button @click="handleEdit(friendLink)" color="danger" type="line">编辑</vs-button>
                <vs-button @click="handleDelete(friendLink)" color="danger" type="line">删除</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- 分页 -->
        <el-pagination style="float: right;margin-top: 20px;" background layout="prev, pager, next"
          @current-change="handlePageChange" :page-size="pageSize" :current-page="pageNum" :total="total">
        </el-pagination>
      </div>
      <!-- 创建表单弹窗 -->
      <vs-popup title="创建友链" :active.sync="craetePopVis" :button-close-hidden="true">
        <div>
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链名称"
            v-model="createFrom.name" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链链接"
            v-model="createFrom.link" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链图标"
            v-model="createFrom.avatar" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="作者名称"
            v-model="createFrom.author" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="作者邮箱"
            v-model="createFrom.email" />
          <input style="float: left;margin-top: 6px;" type="color" v-model="createFrom.color">
          <!-- 友链描述 -->
          <div style="float: left;width: 100%;padding-right: 30px;padding-bottom: 20px;padding-top: 10px;">
            <vs-textarea counter="100" label="友链描述: 100" :counter-danger.sync="counterDanger"
              v-model="createFrom.description" />
          </div>
        </div>
        <div style="width: 100%;">
          <vs-button @click="acceptCreate" style="float: right;" color="danger" type="line">创建</vs-button>
          <vs-button @click="cancelCreate" style="float: right;" color="danger" type="line">取消</vs-button>
        </div>
      </vs-popup>
      <!-- 编辑表单弹窗 -->
      <vs-popup title="编辑友链" :active.sync="editPopVis" :button-close-hidden="true">
        <div>
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链名称"
            v-model="editForm.name" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链链接"
            v-model="editForm.link" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="友链图标"
            v-model="editForm.avatar" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="作者名称"
            v-model="editForm.author" />
          <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="作者邮箱"
            v-model="editForm.email" />
          <input style="float: left;margin-top: 6px;" type="color" v-model="editForm.color">
          <!-- 友链描述 -->
          <div style="float: left;width: 100%;padding-right: 30px;padding-bottom: 20px;padding-top: 10px;">
            <vs-textarea counter="100" label="友链描述: 100" :counter-danger.sync="counterDanger"
              v-model="editForm.description" />
          </div>
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
      <!-- 下架原因填写弹窗 -->
      <vs-popup title="请填写下架原因" :active.sync="downReasonPopVis">
        <div style="float: left;width: 100%;padding-right: 30px;padding-bottom: 20px;padding-top: 10px;">
            <vs-textarea counter="100" label="下架原因: 100" :counter-danger.sync="counterDanger"
              v-model="downReason"/>
          </div>
        <div style="float: right;">
          <vs-button @click="acceptDown" style="margin-right: 10px;" color="danger" type="filled">确定</vs-button>
          <vs-button @click="cancelDown" color="warning" type="filled">取消</vs-button>
        </div>
      </vs-popup>
      <!-- 下架原因弹窗 -->
      <vs-popup title="下架原因" :active.sync="downReasonShowPopVis" :button-close-hidden="true">
        <div>
          {{ activeFriendLink.downReason }}
        </div>
        <div style="width: 100%;">
          <vs-button @click="downReasonShowPopVis = false" style="float: right;" color="danger" type="line">关闭</vs-button>
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
        name: '',
        author: '',
        status: null
      },
      // 表格数据
      friendLinks: [],
      // 友链创建表单
      createFrom: {
        name: '',
        link: '',
        description: '',
        avatar: '',
        author: '',
        email: '',
        color: '#c72a75'
      },
      // 创建表单弹窗控制
      craetePopVis: false,
      // 友链编辑表单
      editForm: {
        name: '',
        link: '',
        description: '',
        avatar: '',
        author: '',
        email: '',
        color: ''
      },
      // 编辑表单窗口控制
      editPopVis: false,
      // 被选择的友链
      activeFriendLink: {},
      // 删除的二次确认弹窗控制 
      deletePopVis: false,
      // 下架原因展示弹窗
      downReasonShowPopVis: false,
      // 下架原因填写弹窗
      downReasonPopVis: false, 
      // 分页参数
      pageNum: 1,
      pageSize: 8,
      total: 0,
      counterDanger: false,
      // 下架原因
      downReason: ''
    }
  },
  methods: {
    handlePageChange(pageNum) {
      this.pageNum = pageNum
      this.GetFriendLinkList()
    },
    // 搜索
    handleSearch() {
      this.GetFriendLinkList()
    },
    // 重置搜索表单
    handleReset() {
      this.SearchForm.name = ''
      this.SearchForm.author = ''
      this.SearchForm.status = null
      this.pageNum = 1
      this.GetFriendLinkList()
    },

    // 获取友链列表
    GetFriendLinkList() {
      Loading.service({
        lock: true,
        text: '数据加载中，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255)',
        fullscreen: true
      })
      axios.post('/api/admin/friendLink/list', {
        name: this.SearchForm.name,
        author: this.SearchForm.author,
        status: this.SearchForm.status,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.friendLinks = response.data.data.records
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


    // 编辑友链
    handleEdit(friendLink) {
      this.activeFriendLink = friendLink
      this.editForm.name = friendLink.name
      this.editForm.description = friendLink.description
      this.editForm.author = friendLink.author
      this.editForm.avatar = friendLink.avatar
      this.editForm.email = friendLink.email
      this.editForm.link = friendLink.link
      this.editForm.color = friendLink.color
      this.editPopVis = true
    },
    // 确定编辑
    acceptEdit() {
      if (!this.editFormVarify()) {
        return
      }
      axios.post('/api/admin/friendLink/update', {
        id: this.activeFriendLink.id,
        name: this.editForm.name,
        link: this.editForm.link,
        description: this.editForm.description,
        avatar: this.editForm.avatar,
        author: this.editForm.author,
        email: this.editForm.email,
        color: this.editForm.color
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
            this.GetFriendLinkList()
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

    // 查看下架原因
    handleDetail(friendLink) {
      this.activeFriendLink = friendLink
      this.downReasonShowPopVis = true
    },

    // 删除友链
    handleDelete(friendLink) {
      this.activeFriendLink = friendLink
      this.deletePopVis = true
    },
    // 确定删除
    acceptDelete() {
      axios.delete(`/api/admin/friendLink/delete/${this.activeFriendLink.id}`, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title: '提示',
              text: '删除成功',
              color: 'success'
            })
            this.GetFriendLinkList()
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
      this.activeClassfiy = {}
      this.deletePopVis = false
    },

    // 上架友链
    handleUp(friendLink) {
      this.changeStatus(friendLink.id, '', 1)
    },
    // 下架友链
    handleDown(friendLink) {
      this.downReason = ''
      this.activeFriendLink = friendLink
      this.downReasonPopVis = true
    },
    // 确认下架
    acceptDown() {
      if(this.downReason === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写下架原因',
          color: 'red'
        })
        return
      }
      this.changeStatus(this.activeFriendLink.id, this.downReason, 0)
      this.downReasonPopVis = false
    },
    // 取消下架
    cancelDown() {
      this.downReasonPopVis = false
    },
    // 修改友链状态
    changeStatus(id, reason, status) {
      axios.post('/api/admin/friendLink/changeStatus', {
        id,
        status,
        downReason: reason
      }, {
        headers: { token: this.token }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.$vs.notify({
            title: '提示',
            text: '状态更新成功',
            color: 'success'
          })
          this.GetFriendLinkList()
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

    // 创建友链
    handleCreate() {
      this.createFrom.name = ''
      this.createFrom.link = ''
      this.createFrom.description = ''
      this.createFrom.author = ''
      this.createFrom.avatar = ''
      this.createFrom.email = ''
      this.createFrom.color = ''
      this.craetePopVis = true
    },
    // 确认创建
    acceptCreate() {
      if (!this.createFormVarify()) {
        return
      }
      axios.post('/api/admin/friendLink/create', this.createFrom, {
        headers: { token: this.token }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.$vs.notify({
              title: '提示',
              text: '创建成功',
              color: 'success'
            })
            this.GetFriendLinkList()
            this.craetePopVis = false
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
    // 取消创建
    cancelCreate() {
      this.craetePopVis = false
    },


    // 创建表单验证
    createFormVarify() {
      if (this.createFrom.name === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链名称',
          color: 'red'
        })
        return false
      }
      if (this.createFrom.link === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链链接',
          color: 'red'
        })
        return false
      }
      if (this.createFrom.avatar === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链图标',
          color: 'red'
        })
        return false
      }
      if (this.createFrom.author === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写作者名称',
          color: 'red'
        })
        return false
      }
      if (this.createFrom.email === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写作者邮箱',
          color: 'red'
        })
        return false
      }
      if (this.createFrom.color === '') {
        this.$vs.notify({
          title: '提示',
          text: '请选择友链的颜色',
          color: 'red'
        })
        return false
      }
      return true
    },

    // 编辑表单验证
    editFormVarify() {
      if (this.editForm.name === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链名称',
          color: 'red'
        })
        return false
      }
      if (this.editForm.link === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链链接',
          color: 'red'
        })
        return false
      }
      if (this.editForm.avatar === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写友链图标',
          color: 'red'
        })
        return false
      }
      if (this.editForm.author === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写作者名称',
          color: 'red'
        })
        return false
      }
      if (this.editForm.email === '') {
        this.$vs.notify({
          title: '提示',
          text: '请填写作者邮箱',
          color: 'red'
        })
        return false
      }
      if (this.editForm.color === '') {
        this.$vs.notify({
          title: '提示',
          text: '请选择友链的颜色',
          color: 'red'
        })
        return false
      }
      return true
    }
  },
  mounted() {
    this.GetFriendLinkList()
  }
}
</script>

<style lang="less" scoped></style>