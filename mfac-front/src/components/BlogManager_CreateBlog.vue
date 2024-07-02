<template>
    <div>
        <div style="width: 900px;min-height: 600px;max-height: auto;padding-bottom: 20px;position: relative;left: 50%;margin-left: -450px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            background-color: white;">
            <!-- 博客标题和类型 -->
            <div style="padding-top: 15px;width: 100%;height: 75px;">
                <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                        <vs-input style="width: 600px;" size="large" placeholder="请输入博客标题"
                            v-model="createForm.title" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="3">
                        <vs-select
                            icon-pack="fa"
                            icon="fa-chevron-up"
                            placeholder="请选择博客类型"
                            v-model="createForm.type"
                            >
                            <vs-select-item :value="1" text="转载" />
                            <vs-select-item :value="2" text="原创" />
                        </vs-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客正文 -->
            <div style="width: 100%;padding-left: 10px;padding-right: 10px;">
                <BlogEditorVue></BlogEditorVue>
            </div>
            <vs-divider color="#ad289f"></vs-divider>
            <!-- 博客类型与标签 -->
            <div style="width: 100%;min-height: 75px;max-height: auto;margin-top: 20px;">
                <vs-row
                    vs-align="center"
                    style="height: 100%;"
                    vs-type="flex" vs-justify="space-around" vs-w="12">
                    <!-- 博客分类 -->
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                        <vs-select
                            icon-pack="fa"
                            icon="fa-chevron-up"
                            placeholder="请选择博客分类"
                            v-model="createForm.classifyId"
                            >
                            <vs-select-item :value="1" text="分类1" />
                            <vs-select-item :value="2" text="分类1" />
                            <vs-select-item :value="3" text="分类1" />
                            <vs-select-item :value="4" text="分类1" />
                        </vs-select>
                    </vs-col>
                    <!-- 博客标签 -->
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                        <el-select size="small"  v-model="createForm.tagIds" :multiple-limit="3" multiple placeholder="请选择标签(最多3个)">
                            <el-option
                                label="item1.label"
                                :value="1">
                            </el-option>
                            <el-option
                                label="item.2label"
                                :value="2">
                            </el-option>
                            <el-option
                                label="item3.label"
                                :value="3">
                            </el-option>
                            <el-option
                                label="item.4label"
                                :value="4">
                            </el-option>
                        </el-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客首图 -->
            <div style="width: 100%;height: 100px;padding-left: 125px;">
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
                    <el-button slot="trigger" size="small" type="primary">选择博客首图</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadAvatar">确定上传</el-button>
                </el-upload>
            </div>
            <vs-divider color="#ad289f"></vs-divider>
            <!-- 博客描述 -->
            <div style="width: 100%;padding-left: 30px;padding-right: 30px;">
                <vs-textarea counter="20" label="博客描述: 20" :counter-danger.sync="counterDanger" v-model="createForm.description" />
            </div>
            <!-- 操作 -->
            <div style="width: 100%;height: 50px;">
                <vs-row style="height: 100%;" vs-type="flex" vs-justify="flex-end">
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                        <vs-button @click="handleCancel" style="margin-right: 10px;width: 75px;" color="danger" type="filled">取消</vs-button>
                        <vs-button @click="handleSave" style="margin-right: 10px;width: 75px;" color="danger" type="filled">保存</vs-button>
                        <vs-button @click="handlePublish" style="margin-right: 10px;width: 75px;" color="danger" type="filled">发布</vs-button>
                    </vs-col>
                </vs-row>
            </div>
        </div>
    </div>
</template>

<script>
import BlogEditorVue from './BlogEditor.vue'
export default {
    components: {
        BlogEditorVue
    },
    data() {
        return {
            createForm: {
                title: '',
                type: null,
                content: '',
                classifyId: null,
                tagIds: [],
                avatar: '',
                description: ''
            },
            counterDanger: false,
            // 上传的头像
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
        // 取消
        handleCancel() {
            this.$emit('create-cancel')
        },
        // 保存
        handleSave() {},
        // 发布
        handlePublish() {}
    }
}
</script>

<style lang="less" scoped>
</style>