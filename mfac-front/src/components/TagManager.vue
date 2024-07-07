<template>
    <div>
        <div
            style="width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
            <!-- 搜索表单 -->
            <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
                <!-- 标签名称 -->
                <vs-input width="150px" label="标签名称" icon-pack="fa" icon="fa-search" placeholder="标签名称"
                    v-model="SearchForm.name" />
                <!-- 搜索 -->
                <vs-button @click="handleSearch" size="small"
                    style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;"
                    color="#c72a75" type="filled">搜索标签</vs-button>
                <!-- 重置 -->
                <vs-button @click="handleReset" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">重置</vs-button>
                <!-- 创建博客 -->
                <vs-button @click="handleCreate" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">创建标签</vs-button>
            </div>
            <!-- 主体表格 -->
            <div
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
                <vs-table max-items="3" :data="tags" style="padding-top: 20px;height: 100%;">
                    <template slot="thead">
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">标签名称</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">标签颜色</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建者</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建时间</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">更新时间</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">操作</h4>
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="tag.id" v-for="tag in data">

                            <vs-td style="text-align: center;" :data="tag.name">
                                {{ tag.name }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tag.color">
                                <input type="color" v-model="tag.color" disabled>
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tag.creatorName">
                                {{ tag.creatorName }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tag.createTime">
                                {{ tag.createTime }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tag.updateTime">
                                {{ tag.updateTime }}
                            </vs-td>
                            <vs-td style="text-align: center;" :data="tag">
                                <vs-button @click="handleEdit(tag)" color="danger" type="line">编辑</vs-button>
                                <vs-button @click="handleDelete(tag)" color="danger" type="line">删除</vs-button>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
                <!-- 分页 -->
                <el-pagination style="float: right;margin-top: 20px;" background layout="prev, pager, next" @current-change="handlePageChange"
                    :page-size="pageSize" :current-page="pageNum" :total="total">
                </el-pagination>
            </div>
            <!-- 创建表单弹窗 -->
            <vs-popup title="创建标签" :active.sync="craetePopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="标签名称"
                        v-model="createFrom.name" />
                    <input style="margin-top: 6px;" type="color" v-model="createFrom.color">
                </div>
                <div style="width: 100%;">
                    <div style="float: left;width: 100%;">
                        预览：<vs-button line-position="top" line-origin="left" :color="createFrom.color" type="line">{{ createFrom.name }}</vs-button>
                    </div>
                    <vs-button @click="acceptCreate" style="float: right;" color="danger" type="line">创建</vs-button>
                    <vs-button @click="cancelCreate" style="float: right;" color="danger" type="line">取消</vs-button>
                </div>
            </vs-popup>
            <!-- 编辑表单弹窗 -->
            <vs-popup title="编辑标签" :active.sync="editPopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="标签名称"
                        v-model="editForm.name" />
                    <input style="margin-top: 6px;" type="color" v-model="editForm.color">
                </div>
                <div style="width: 100%;">
                    <div style="float: left;width: 100%;">
                        预览：<vs-button line-position="top" line-origin="left" :color="editForm.color" type="line">{{ editForm.name }}</vs-button>
                    </div>
                    <vs-button @click="acceptEdit" style="float: right;" color="danger" type="line">确定</vs-button>
                    <vs-button @click="cancelEdit" style="float: right;" color="danger" type="line">取消</vs-button>
                </div>
            </vs-popup>
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
</template>

<script>
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
            },
            // 表格测试数据
            tags: [{
                id: 1,
                name: '标签名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }],
            // 分类创建表单
            createFrom: {
                name: '分类名称',
                color: '#c72a75'
            },
            // 创建表单弹窗控制
            craetePopVis: false,
            // 分类编辑表单
            editForm: {
                name: '',
                color: ''
            },
            // 编辑表单窗口控制
            editPopVis: false,
            // 被选中的标签
            activeTag: {},
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
            this.GetTagList()
        },
        // 搜索
        handleSearch() {
            this.pageNum = 1
            this.GetTagList()
        },
        // 重置搜索表单
        handleReset() {
            this.SearchForm.name = ''
            this.pageNum = 1
            this.GetTagList()
        },
        // 获取标签列表
        GetTagList() {
            axios.post('/api/admin/tag/list',{
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name: this.SearchForm.name
            },{
                headers: {token: this.token}
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.tags = response.data.data.records
                    this.total = response.data.data.total
                    console.log(this.total)
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



        // 编辑标签
        handleEdit(tag) {
            this.activeTag = tag
            this.editForm.name = tag.name
            this.editForm.color = tag.color
            this.editPopVis = true
        },
        // 确定编辑
        acceptEdit() {
            if(!this.editFormVarify()) {
                return
            }
            axios.post('/api/admin/tag/update', {
                id: this.activeTag.id,
                name: this.editForm.name,
                color: this.editForm.color
            }, {
                headers: { token: this.token }
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '标签更新成功',
                        color: 'success'
                    })
                    this.GetTagList()
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



        // 删除标签
        handleDelete(tag) {
            this.activeTag = tag
            this.deletePopVis = true
        },
        // 确定删除
        acceptDelete() {
            axios.delete(`/api/admin/tag/delete/${this.activeTag.id}`, {
                headers: { token: this.token }
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '删除成功',
                        color: 'success'
                    })
                    this.GetTagList()
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
            this.cancalDelete()
        },
        // 取消删除
        cancelDelete() {
            this.activeTag = {}
            this.deletePopVis = false
        },



        // 创建标签
        handleCreate() {
            this.createFrom.name = '标签名称'
            this.createFrom.color = '#c72a75'
            this.craetePopVis = true
        },
        // 确认创建
        acceptCreate() {
            if(!this.createFormVarify()) {
                return
            }
            axios.post('/api/admin/tag/create', this.createFrom, {
                headers: {
                    token: this.token
                }
            })
            .then(response => {
                if(response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '创建成功',
                        color: 'success'
                    })
                    this.craetePopVis = false
                    this.GetTagList()
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
            console.log("取消创建")
            this.craetePopVis = false
        },



        // 标签创建表单验证
        createFormVarify() {
            if(this.createFrom.name === '标签名称' || '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写完整的标签信息',
                    color: 'red'
                })
                return false
            }
            if(this.createFrom.color === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择标签的颜色',
                    color: 'yellow'
                })
                return false
            }
            return true
        },
        // 标签编辑表单验证
        editFormVarify() {
            if(this.editForm.name === this.activeTag.name && this.editForm.color === this.activeTag.color) {
                this.$vs.notify({
                    title: '提示',
                    text: '请做出修改后再提交',
                    color: 'red'
                })
                return false
            }
            if(this.editForm.name === '' || this.editForm.color === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写完整的标签信息',
                    color: 'red'
                })
                return false
            }
            return true
        }
    },
    mounted() {
        this.GetTagList()
    }
}
</script>

<style lang="less" scoped></style>