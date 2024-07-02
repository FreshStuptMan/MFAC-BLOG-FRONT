<template>
  <div>
    <div style="margin-top: 30px;text-align: center;width: 400px;height: 600px;position: relative;left: 50%;margin-left: -200px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
        <div>
            <vs-avatar size="210px" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/>
        </div>
        <div>
            <vs-button @click="avatarEditPopVis = true" line-position="top" line-origin="left" color="warning" type="line">修改头像</vs-button>
        </div>
        <vs-input style="margin-left: 100px;" label="Account" placeholder="Account" v-model="editForm.account"/>
        <vs-input style="margin-left: 100px;" label="Name" placeholder="Name" v-model="editForm.name"/>
        <vs-input style="margin-left: 100px;" label="Password" placeholder="Password" v-model="editForm.password"/>

        <div style="margin-top: 100px;">
            <vs-button @click="handleSave" style="margin-right: 5px;width: 100px;" color="warning" type="gradient">保存</vs-button>
        </div>
    </div>
    <!-- 头像编辑弹窗 -->
    <vs-popup  title="设置头像" :active.sync="avatarEditPopVis">
        <el-upload
            ref="avatarUpload"
            action="/api/image"
            :on-remove="handleAvatarRemove"
            :on-success="handleAvatarSuccess"
            :on-exceed="handleAvatarExceed"
            :on-error="handleAvatarError"
            :auto-upload="false"
            :file-list="avatarFile"
            :limit="1"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadAvatar">确定上传</el-button>
            <el-button style="margin-left: 10px;" size="small" type="info" @click="handleAvatarCancel">取消上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </vs-popup>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 编辑表单
            editForm: {
                avatar: '',
                account: '',
                name: '',
                password: ''
            },
            // 头像编辑窗口控制
            avatarEditPopVis: false,
            // 头像相关
            avatarFile: []
        }
    },
    methods: {
        /** 头像上传相关 */
        // 移除
        handleAvatarRemove(file, fileList) {},
        // 上传成功
        handleAvatarSuccess(response, file, fileList) {
            console.log(response)
        },
        // 确定上传
        uploadAvatar() {
            this.$refs.avatarUpload.submit()
        },
        // 图片超限
        handleAvatarExceed() {
            console.log("图片数量超限")
        },
        // 上传失败
        handleAvatarError(err, file, fileList) {
            console.log(err)
        },
        // 取消上传
        handleAvatarCancel() {
            this.avatarEditPopVis = false
        },

        //  保存信息
        handleSave() {}
    }
}
</script>

<style>

</style>