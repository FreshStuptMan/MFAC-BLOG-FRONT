<template>
  <div>
    <div style="margin-top: 30px;text-align: center;width: 400px;height: 600px;position: relative;left: 50%;margin-left: -200px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
        <div>
            <vs-avatar size="210px" :src="UserDetail.avatar"/>
        </div>
        <div>
            <vs-button @click="avatarEditPopVis = true" line-position="top" line-origin="left" color="warning" type="line">修改头像</vs-button>
        </div>
        <vs-input style="margin-left: 100px;" label="Account" placeholder="Account" v-model="editForm.account"/>
        <vs-input style="margin-left: 100px;" label="Name" placeholder="Name" v-model="editForm.name"/>
        <div style="margin-top: 100px;">
            <vs-button @click="handleSave" style="margin-right: 5px;width: 100px;" color="warning" type="gradient">保存</vs-button>
            <vs-button @click="handlePwd" style="margin-right: 5px;width: 100px;" color="warning" type="gradient">修改密码</vs-button>
        </div>
    </div>
    <!-- 头像编辑弹窗 -->
    <vs-popup  title="设置头像" :active.sync="avatarEditPopVis">
        <el-upload
            ref="avatarUpload"
            action="/api/admin/file/image"
            :on-remove="handleAvatarRemove"
            :on-success="handleAvatarSuccess"
            :on-exceed="handleAvatarExceed"
            :on-error="handleAvatarError"
            :auto-upload="false"
            :file-list="avatarFile"
            :limit="1"
            :headers="headers"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadAvatar">确定上传</el-button>
            <el-button style="margin-left: 10px;" size="small" type="info" @click="handleAvatarCancel">取消上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </vs-popup>
    <!-- 修改密码弹窗 -->
    <vs-popup title="修改密码" :active.sync="pwsPopVis" :button-close-hidden="true">
        <div>
            <vs-input type="password" style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="新密码"
                v-model="pwd" />
        </div>
        <div style="width: 100%;">
            <vs-button @click="acceptPwd" style="float: right;" color="danger" type="line">确定</vs-button>
            <vs-button @click="cancelPwd" style="float: right;" color="danger" type="line">取消</vs-button>
        </div>
    </vs-popup>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    computed: {
        token() {
            return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
        },
        headers() {
            return {token: this.token}
        }
    },
    data() {
        return {
            // 编辑表单
            editForm: {
                avatar: '',
                account: '',
                name: '',
            },
            // 用户信息
            UserDetail: {},
            // 头像编辑窗口控制
            avatarEditPopVis: false,
            // 头像相关
            avatarFile: [],
            // 新密码
            pwd: '',
            // 修改密码弹窗控制
            pwsPopVis: false
        }
    },
    methods: {
        /** 头像上传相关 */
        // 移除
        handleAvatarRemove(file, fileList) {
            this.editForm.avatar = ''
        },
        // 上传成功
        handleAvatarSuccess(response, file, fileList) {
            if(response.code === 200) {
                this.$vs.notify({
                    title: '提示',
                    text: '上传成功',
                    color: 'success'
                })
                this.editForm.avatar = response.data
            } else {
                this.$vs.notify({
                    title: '提示',
                    text: response.data.msg,
                    color: 'red'
                })
            }
        },
        // 确定上传
        uploadAvatar() {
            this.$refs.avatarUpload.submit()
        },
        // 图片超限
        handleAvatarExceed() {
            this.$vs.notify({
                title: '提示',
                text: '只能上传一张头像',
                color: 'red'
            })
        },
        // 上传失败
        handleAvatarError(err, file, fileList) {
            this.$vs.notify({
                title: '提示',
                text: err,
                color: 'red'
            })
        },
        // 取消上传
        handleAvatarCancel() {
            this.avatarFile = []
            this.avatarEditPopVis = false
        },

        // 保存信息
        handleSave() {
            axios.post('/api/admin/user/update', {
                id: this.UserDetail.id,
                name: this.editForm.name,
                avatar: this.editForm.avatar,
                account: this.editForm.account
            }, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '信息更新成功',
                        color: 'success'
                    })
                    this.GetUserInfo()
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


        // 修改密码弹窗控制
        handlePwd() {
            this.pwsPopVis = true
        },
        // 确定修改密码
        acceptPwd() {
            if(this.pwd === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '密码不能为空',
                    color: 'red'
                })
                return
            }
            if(this.pwd.length < 6) {
                this.$vs.notify({
                    title: '提示',
                    text: '密码长度至少要为6位',
                    color: 'red'
                })
                return
            }
            axios.post('/api/admin/user/changePassword', {
                id: this.UserDetail.id,
                password: this.pwd
            }, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '密码修改成功',
                        color: 'success'
                    })
                    this.pwd = ''
                    this.pwsPopVis = false
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
        // 取消修改密码
        cancelPwd() {
            this.pwd = ''
            this.pwsPopVis = false
        },

        // 初始化表单
        handleInit() {
            this.editForm.avatar = this.UserDetail.avatar
            this.editForm.name = this.UserDetail.name
            this.editForm.account = this.UserDetail.account
            this.avatarFile = [{name: 'avatar',url: this.editForm.avatar}]
        },
        // 获取用户信息
        GetUserInfo() {
            axios.get('/api/admin/user/detail', {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.UserDetail = response.data.data
                    this.handleInit()
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

        // 编辑表单验证
        editFormVarify() {
            if(this.editForm.account === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '账号不能为空',
                    color: 'red'
                })
                return false
            }
            if(this.editForm.avatar === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请上传用户头像',
                    color: 'red'
                })
                return false
            }
            if(this.editForm.name === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '用户名不能为空',
                    color: 'red'
                })
                return false
            }
            return true
        }
    },
    mounted() {
        this.GetUserInfo()
    }
}
</script>

<style>

</style>