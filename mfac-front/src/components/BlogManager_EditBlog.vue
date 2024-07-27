<template>
    <div>
        <div style="width: 900px;min-height: 600px;max-height: auto;padding-bottom: 20px;position: relative;left: 50%;margin-left: -450px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            background-color: white;">
            <!-- 博客标题和类型 -->
            <div style="padding-top: 15px;width: 100%;height: 75px;">
                <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
                        <vs-input style="width: 600px;" size="large" placeholder="请输入博客标题" v-model="editForm.title" />
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="3">
                        <vs-select icon-pack="fa" icon="fa-chevron-up" placeholder="请选择博客类型" v-model="editForm.types">
                            <vs-select-item :value="1" text="转载" />
                            <vs-select-item :value="2" text="原创" />
                        </vs-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客正文 -->
            <div style="width: 100%;padding-left: 10px;padding-right: 10px;">
                <!-- Quill文本编辑器 -->
                <!-- <BlogEditorVue ref="blogEditor"></BlogEditorVue> -->
                <!-- MavonEditor编辑器 -->
                <BlogMavonEditorVue ref="blogEditor"></BlogMavonEditorVue>
            </div>
            <vs-divider color="#ad289f"></vs-divider>
            <!-- 博客类型与标签 -->
            <div style="width: 100%;min-height: 75px;max-height: auto;margin-top: 20px;">
                <vs-row vs-align="center" style="height: 100%;" vs-type="flex" vs-justify="space-around" vs-w="12">
                    <!-- 博客分类 -->
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                        <vs-select icon-pack="fa" icon="fa-chevron-up" placeholder="请选择博客分类"
                            v-model="editForm.classifyId">
                            <vs-select-item v-for="classify in classifys" :key="classify.id" :value="classify.id" :text="classify.name" />
                        </vs-select>
                    </vs-col>
                    <!-- 博客标签 -->
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                        <el-select size="small" v-model="editForm.tagIds" :multiple-limit="3" multiple
                            placeholder="请选择标签(最多3个)">
                            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id">
                            </el-option>
                        </el-select>
                    </vs-col>
                </vs-row>
            </div>
            <!-- 博客首图 -->
            <div style="width: 100%;height: 160px;padding-left: 125px;padding-right: 30px;">
                <el-upload ref="avatarUpload" action="/api/admin/file/image" :on-remove="handleAvatarRemove"
                    :headers="headers"
                    :on-success="handleAvatarSuccess" :on-exceed="handleAvatarExceed" :on-error="handleAvatarError"
                    :auto-upload="false" :file-list="avatarFile" :limit="1" list-type="picture">
                    <el-button slot="trigger" size="small" type="primary">选择博客首图</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success"
                        @click="uploadAvatar">确定上传</el-button>
                </el-upload>
            </div>
            <vs-divider color="#ad289f"></vs-divider>
            <!-- 博客描述 -->
            <div style="width: 100%;padding-left: 30px;padding-right: 30px;">
                <vs-textarea counter="100" label="博客描述: 100" :counter-danger.sync="counterDanger"
                    v-model="editForm.description" />
            </div>
            <!-- 操作 -->
            <div style="width: 100%;height: 50px;">
                <vs-row style="height: 100%;" vs-type="flex" vs-justify="flex-end">
                    <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                        <vs-button @click="handleCancel" style="margin-right: 10px;width: 75px;" color="danger"
                            type="filled">取消</vs-button>
                        <vs-button @click="handleSave" style="margin-right: 10px;width: 75px;" color="danger"
                            type="filled">保存</vs-button>
                        <vs-button @click="handlePublish" style="margin-right: 10px;width: 75px;" color="danger"
                            type="filled">发布</vs-button>
                    </vs-col>
                </vs-row>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import BlogMavonEditorVue from './BlogMavonEditor.vue'
import BlogEditorVue from './BlogEditor.vue'
export default {
    props: ['id'],
    computed: {
        token() {
            return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
        },
        headers() {
            return {token: this.token}
        }
    },
    components: {
        BlogEditorVue,
        BlogMavonEditorVue
    },
    data() {
        return {
            // 博客信息
            blogDetail: {},
            // 编辑表单
            editForm: {
                id: '',
                title: '',
                types: null,
                content: '',
                classifyId: null,
                tagIds: [],
                avatar: '',
                description: '',
                status: null,
                publishTime: null
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
        // 获取博客详情
        GetBlogDetail() {
            axios.get(`/api/admin/blog/detail/${this.id}`, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.blogDetail = response.data.data
                    this.handleInit()
                    this.$refs.blogEditor.initForUpdate(this.editForm.content)
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
        // 表单初始化
        handleInit() {
            this.editForm.id = this.blogDetail.id
            this.editForm.title = this.blogDetail.title
            this.editForm.types = this.blogDetail.types
            this.editForm.avatar = this.blogDetail.avatar
            this.avatarFile = [{name: 'avatar',url: this.editForm.avatar}]
            this.editForm.content = this.blogDetail.content
            this.editForm.classifyId = this.blogDetail.classifyId
            this.blogDetail.tags.forEach(tag => {
                this.editForm.tagIds.push(tag.id)
            })
            this.editForm.description = this.blogDetail.description
            this.editForm.publishTime = this.blogDetail.publishTime
        },



        // 取消
        handleCancel() {
            this.handleReset()
            this.$emit('edit-cancel')
        },
        // 保存
        async handleSave() {
            this.editForm.content = await this.$refs.blogEditor.getContent()
            this.editForm.status = 1
            if(!this.editFormVarify()) {
                return
            }
            this.handleUpdateBlog()
        },
        // 发布
        async handlePublish() {
            this.editForm.content = await this.$refs.blogEditor.getContent()
            this.editForm.status = 2
            if(!this.editFormVarify()) {
                return
            }
            this.handleUpdateBlog()
        },
        // 更新
        handleUpdateBlog() {
            axios.post('/api/admin/blog/update', this.editForm, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '更新成功',
                        color: 'success'
                    })
                    this.handleReset()
                    this.$emit('edit-success')
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


        // 编辑表单校验
        editFormVarify() {
            if(this.editForm.content === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客内容不能为空',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.title === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客标题不能为空',
                    color: 'red'
                })
                return false
            }
            
            if(this.editForm.types === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客类型',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.classifyId === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客分类',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.tagIds.length === 0) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择博客标签',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.avatar === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请上传博客首图',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.description === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '博客描述不能为空',
                    color: 'red'
                })
                return false
            }

            if(this.editForm.description.length > 100) {
                this.$vs.notify({
                    title: '提示',
                    text: '博客描述不能超过100字',
                    color: 'red'
                })
                return false
            }

            return true
        },
        // 重置表单
        handleReset() {
            this.editForm.id = ''
            this.editForm.title = ''
            this.editForm.types = null
            this.editForm.content = ''
            this.editForm.classifyId = null
            this.editForm.tagIds = []
            this.editForm.avatar = ''
            this.editForm.description = ''
            this.editForm.status = null
            this.$refs.blogEditor.clearContent()
        },

    },
    mounted() {
        // 获取博客详情
        this.GetBlogDetail()
        this.GetClassifyList()
        this.GetTagList()
    }
}
</script>

<style lang="less" scoped></style>