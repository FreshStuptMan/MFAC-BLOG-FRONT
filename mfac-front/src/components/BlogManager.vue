<template>
  <div>
    <div style="width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
        <!-- 搜索表单 -->
        <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
            <!-- 博客标题 -->
            <vs-input width="150px" label="博客标题"  icon-pack="fa" icon="fa-search" placeholder="博客标题" v-model="SearchForm.title"/>
            <!-- 博客分类 -->
            <vs-select placeholder="博客分类" width="150px" style="margin-left: 5px;" label="博客分类" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.classifyId">
                <vs-select-item :key="classify.id" :value="classify.id" :text="classify.name" v-for="classify in classifys" />
            </vs-select>
            <!-- 博客标签 -->
            <vs-select placeholder="博客标签" width="150px" style="margin-left: 5px;" label="博客标签" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.tagId">
                <vs-select-item :key="tag.id" :value="tag.id" :text="tag.name" v-for="tag in tags" />
            </vs-select>
            <!-- 博客状态 -->
            <vs-select placeholder="博客状态" width="100px" style="margin-left: 5px;" label="博客状态" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.status">
                <vs-select-item :value="1" text="草稿" />
                <vs-select-item :value="2" text="已发布" />
                <vs-select-item :value="3" text="已下架" />
            </vs-select>
            <!-- 搜索 -->
            <vs-button @click="handleSearch" size="small" style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;" color="#c72a75" type="filled">搜索博客</vs-button>
            <!-- 重置 -->
            <vs-button @click="handleReset" size="small" style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75" type="filled">重置</vs-button>
            <!-- 创建博客 -->
            <vs-button @click="handleCreate" size="small" style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75" type="filled">创建博客</vs-button>
        </div>
        <!-- 主体表格 -->
        <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
            <vs-table max-items="3" :data="blogs" style="padding-top: 20px;height: 100%;">
                <template slot="thead">
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">博客标题</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">博客分类</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">博客类型</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">作者名</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">创建时间</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">更新时间</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">博客状态</h4>
                    </vs-th>
                    <vs-th>
                        <h4 style="width: 100%;text-align: center;">操作</h4>
                    </vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="blog.id" v-for="blog in data" >

                        <vs-td style="text-align: center;" :data="blog.title">
                            {{ blog.title }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.classifyName">
                            {{ blog.classifyName }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.types">
                            {{ blog.types === 1 ? '转载' : '原创' }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.authorName">
                            {{ blog.authorName }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.createTime">
                            {{ blog.createTime }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.updateTime">
                            {{ blog.updateTime }}
                        </vs-td>

                        <vs-td style="text-align: center;" :data="blog.status">
                            <span v-if="blog.status === 1">草稿</span>
                            <span v-if="blog.status === 2">已发布</span>
                            <span v-if="blog.status === 3">已下架</span>
                        </vs-td>
                        <vs-td style="text-align: center;" :data="blog">
                            <vs-button @click="handleEdit(blog)" color="danger" type="line">编辑</vs-button>
                            <vs-button @click="handleDown(blog)" v-if="blog.status ===  2" color="danger" type="line">下架</vs-button>
                            <vs-button @click="handleUp(blog)" v-if="blog.status === 3 || blog.status === 1" color="danger" type="line">发布</vs-button>
                            <vs-button @click="handleDelete(blog)" color="danger" type="line">删除</vs-button>
                        </vs-td>
                    </vs-tr>
                </template>
            </vs-table>
            <!-- 分页 -->
            <el-pagination style="float: right;margin-top: 20px;" background layout="prev, pager, next" @current-change="handlePageChange"
                :page-size="pageSize" :current-page="pageNum" :total="total">
            </el-pagination>
            <!-- 删除二次确认弹窗 -->
            <vs-popup
                title="提示" :active.sync="deletePopVis">
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
                title: '',
                tagId: null,
                classifyId: null,
                status: null,
            },
            // 表格测试数据
            blogs: [],
            // 被选择的博客
            activeBlog: {},
            // 分页参数
            pageNum: 1,
            pageSize: 8,
            total: 0,
            // 分类列表
            classifys: [],
            // 标签列表
            tags: [],
            //删除的二次确认弹窗控制
            deletePopVis: false
        }
    },
    methods: {
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.GetBlogList()
        },
        // 搜索
        handleSearch() {
            this.GetBlogList()
        },
        // 重置搜索表单
        handleReset() {
            this.SearchForm.title = ''
            this.SearchForm.classifyId = null,
            this.SearchForm.tagId = null,
            this.SearchForm.status = null
            this.GetBlogList()
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
        // 获取博客列表
        GetBlogList() {
            Loading.service({
                lock: true,
                text: '数据加载中，请稍等。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(255,255,255)',
                fullscreen: true
            })
            axios.post('/api/admin/blog/list', {
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                title: this.SearchForm.title,
                classifyId: this.SearchForm.classifyId,
                tagId: this.SearchForm.tagId,
                status: this.SearchForm.status
            }, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.blogs = response.data.data.records
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



        // 编辑博客
        handleEdit(blog) {
            this.$emit('edit-blog', blog.id)
            console.log("编辑博客")
        },


        
        // 发布博客
        handleUp(blog) {
            this.handleChangeStatus(blog.id, blog.publishTime, 2)
        },
        // 下架博客
        handleDown(blog) {
            this.handleChangeStatus(blog.id, blog.publishTime, 3)
        },
        // 修改博客状态
        handleChangeStatus(id, publishTime, status) {
            axios.post('/api/admin/blog/changeStatus', {
                id,
                status,
                publishTime
            }, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '状态更新成功',
                        color: 'success'
                    })
                    this.GetBlogList()
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



        // 删除博客
        handleDelete(blog) {
            this.activeBlog = blog
            this.deletePopVis = true
        },
        // 确定删除
        acceptDelete() {
            axios.delete(`/api/admin/blog/delete/${this.activeBlog.id}`, {
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '删除成功',
                        color: 'success'
                    })
                    this.GetBlogList()
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
            this.activeBlog = {}
            this.deletePopVis = false
        },
        // 取消删除
        cancelDelete() {
            this.activeBlog = {}
            this.deletePopVis = false
        },



        // 创建博客
        handleCreate() {
            this.$emit('create-blog')
        }
    },
    mounted() {
        this.GetClassifyList()
        this.GetTagList()
        this.GetBlogList()
    }
}
</script>

<style lang="less" scoped>
</style>