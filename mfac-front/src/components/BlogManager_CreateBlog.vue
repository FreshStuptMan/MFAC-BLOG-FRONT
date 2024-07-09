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
                            v-model="createForm.types"
                            >
                            <vs-select-item :value="1" text="转载" />
                            <vs-select-item :value="2" text="原创" />
                        </vs-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客正文 -->
            <div style="width: 100%;padding-left: 10px;padding-right: 10px;">
                <BlogEditorVue ref="blogContent"></BlogEditorVue>
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
                            <vs-select-item v-for="classify in classifys" :key="classify.id" :value="classify.id" :text="classify.name" />
                        </vs-select>
                    </vs-col>
                    <!-- 博客标签 -->
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                        <el-select size="small"  v-model="createForm.tagIds" :multiple-limit="3" multiple placeholder="请选择标签(最多3个)">
                            <el-option
                                v-for="tag in tags"
                                :key="tag.id"
                                :label="tag.name"
                                :value="tag.id">
                            </el-option>
                        </el-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客首图 -->
            <div style="width: 100%;height: 160px;padding-left: 125px;padding-right: 30px;">
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
                    <el-button slot="trigger" size="small" type="primary">选择博客首图</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadAvatar">确定上传</el-button>
                </el-upload>
            </div>
            <vs-divider color="#ad289f"></vs-divider>
            <!-- 博客描述 -->
            <div style="width: 100%;padding-left: 30px;padding-right: 30px;">
                <vs-textarea counter="100" label="博客描述: 100" :counter-danger.sync="counterDanger" v-model="createForm.description" />
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
import axios from 'axios'
import BlogEditorVue from './BlogEditor.vue'
export default {
    computed: {
        token() {
            return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
        },
        headers() {
            return {token: this.token}
        }
    },
    components: {
        BlogEditorVue
    },
    data() {
        return {
            // 博客创建表单
            createForm: {
                title: '',
                types: null,
                content: '',
                classifyId: null,
                tagIds: [],
                avatar: '',
                description: '',
                status: null
            },
            // 博客描述字数
            counterDanger: false,
            // 上传的头像
            avatarFile: [],
            // 分类列表
            classifys: [],
            // 标签列表
            tags: []
        }
    },
    methods: {
        /** 头像上传相关 */
        // 移除
        handleAvatarRemove(file, fileList) {
            this.createForm.avatar = ''
        },
        // 上传成功
        handleAvatarSuccess(response, file, fileList) {
            if(response.code === 200) {
                this.$vs.notify({
                    title: '提示',
                    text: '上传成功',
                    color: 'success'
                })
                this.createForm.avatar = response.data
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
                text: '只能上传一张博客首图',
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



        // 获取分类列表
        GetClassifyList() {
            axios.get('/api/classify/listAll')
            .then(response => {
                if(response.data.code === 200) {
                    this.classifys = response.data.data
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
        // 获取标签列表
        GetTagList() {
            axios.get('/api/tag/listAll')
            .then(response => {
                if(response.data.code === 200) {
                    this.tags = response.data.data
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



        // 取消
        handleCancel() {
            this.handleReset()
            this.$emit('create-cancel')
        },
        // 保存
        handleSave() {
            this.createForm.content = this.$refs.blogContent.getContent()
            this.createForm.status = 1
            if(!this.createFormVarify()) {
                return
            }
            this.handleCreateBlog()
        },
        // 发布
        handlePublish() {
            this.createForm.content = this.$refs.blogContent.getContent()
            this.createForm.status = 2
            if(!this.createFormVarify()) {
                return
            }
            this.handleCreateBlog()
        },
        // 创建博客
        handleCreateBlog() {
            axios.post('/api/admin/blog/create', this.createForm, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '创建成功',
                        color: 'success'
                    })
                    this.handleReset()
                    this.$emit('create-success')
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



        // 创建博客内容校验
        createFormVarify() {
            if(this.createForm.content === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客内容不能为空',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.title === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客标题不能为空',
                    color: 'red'
                })
                return false
            }
            
            if(this.createForm.types === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客类型',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.classifyId === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客分类',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.tagIds.length === 0) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客标签',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.avatar === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请上传博客首图',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.description === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客描述不能为空',
                    color: 'red'
                })
                return false
            }

            if(this.createForm.description.length > 100) {
                this.$vs.notify({
                    title: '提示',
                    text: '博客描述不能超过100字',
                    color: 'red'
                })
                return false
            }

            return true
        },
        // 重置页面内容
        handleReset() {
            this.createForm.title = ''
            this.createForm.types = null
            this.createForm.content = ''
            this.createForm.classifyId = null
            this.createForm.tagIds = []
            this.createForm.avatar = ''
            this.createForm.description = ''
            this.createForm.status = null
            this.$refs.blogContent.clearContent()
        }
    },
    mounted() {
        this.GetClassifyList()
        this.GetTagList()
        this.$refs.blogContent.init()
    }
}
</script>

<style lang="less" scoped>
</style>