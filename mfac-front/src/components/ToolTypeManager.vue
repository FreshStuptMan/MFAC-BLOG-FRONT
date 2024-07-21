<template>
    <div>
        <div
            style="width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
            <!-- 搜索表单 -->
            <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
                <!-- 工具类型名称 -->
                <vs-input width="150px" label="工具类型名称" icon-pack="fa" icon="fa-search" placeholder="工具类型名称"
                    v-model="SearchForm.name" />
                <!-- 搜索 -->
                <vs-button @click="handleSearch" size="small"
                    style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;"
                    color="#c72a75" type="filled">搜索类型</vs-button>
                <!-- 重置 -->
                <vs-button @click="handleReset" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">重置</vs-button>
                <!-- 创建 -->
                <vs-button @click="handleCreate" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">创建类型</vs-button>
            </div>
            <!-- 主体表格 -->
            <div
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
                <vs-table max-items="3" :data="toolTypes" style="padding-top: 20px;height: 100%;">
                    <template slot="thead">
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">工具类型名称</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建者</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">工具数</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建时间</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">操作</h4>
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="toolType.id" v-for="toolType in data">

                            <vs-td style="text-align: center;" :data="toolType.name">
                                {{ toolType.name }}
                            </vs-td>


                            <vs-td style="text-align: center;" :data="toolType.creatorName">
                                {{ toolType.creatorName }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="toolType.totalType">
                                {{ toolType.totalType }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="toolType.createTime">
                                {{ toolType.createTime }}
                            </vs-td>
                            <vs-td style="text-align: center;" :data="toolType">
                                <vs-button @click="handleEdit(toolType)" color="danger" type="line">编辑</vs-button>
                                <vs-button @click="handleDelete(toolType)" color="danger" type="line">删除</vs-button>
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
            <vs-popup title="创建分类" :active.sync="craetePopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="分类名称"
                        v-model="createFrom.name" />
                </div>
                <div style="width: 100%;">
                    <vs-button @click="acceptCreate" style="float: right;" color="danger" type="line">创建</vs-button>
                    <vs-button @click="cancelCreate" style="float: right;" color="danger" type="line">取消</vs-button>
                </div>
            </vs-popup>
            <!-- 编辑表单弹窗 -->
            <vs-popup title="编辑分类" :active.sync="editPopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="分类名称"
                        v-model="editForm.name" />
                    <input style="margin-top: 6px;" type="color" v-model="editForm.color">
                </div>
                <div style="width: 100%;">
                    <div style="float: left;width: 100%;">
                        预览：<vs-button :color="editForm.color" type="filled">{{ editForm.name }}</vs-button>
                    </div>
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
                    <vs-button @click="acceptDelete" style="margin-right: 10px;" color="danger"
                        type="filled">确定</vs-button>
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
            // 表格数据
            classifys: [{
                id: 1,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 2,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 3,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 4,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 5,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 6,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 7,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }, {
                id: 8,
                name: '分类名称',
                color: '#c72a75',
                creatorName: '创建者',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33'
            }],
            toolTypes: [],
            // 分类创建表单
            createFrom: {
                name: '',
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
            // 被选择的分类
            activeClassfiy: {},
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
            this.GetClassifyList()
        },
        // 搜索
        handleSearch() {
            this.GetClassifyList()
        },
        // 重置搜索表单
        handleReset() {
            this.SearchForm.name = ''
            this.GetClassifyList()
        },
        // 获取类型列表
        GetToolTypeList() {
            axios.post('/api/admin/toolType/list', {
                name: this.SearchForm.name,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }, {
                headers: { token: this.token }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.toolTypes = response.data.data.records
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
        },


        // 编辑分类
        handleEdit(classify) {
            this.activeClassfiy = classify
            this.editForm.name = classify.name
            this.editForm.color = classify.color
            this.editPopVis = true
        },
        // 确定编辑
        acceptEdit() {
            if (!this.editFormVarify()) {
                return
            }
            axios.post('/api/admin/classify/update', {
                id: this.activeClassfiy.id,
                name: this.editForm.name,
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
                        this.GetClassifyList()
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



        // 删除分类
        handleDelete(classify) {
            this.activeClassfiy = classify
            this.deletePopVis = true
        },
        // 确定删除
        acceptDelete() {
            axios.delete(`/api/admin/classify/delete/${this.activeClassfiy.id}`, {
                headers: { token: this.token }
            })
                .then(response => {
                    if (response.data.code === 200) {
                        this.$vs.notify({
                            title: '提示',
                            text: '删除成功',
                            color: 'success'
                        })
                        this.GetClassifyList()
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


        // 创建类型
        handleCreate() {
            this.createFrom.name = ''
            this.craetePopVis = true
        },
        // 确认创建
        acceptCreate() {
            if (!this.createFormVarify()) {
                return
            }
            axios.post('/api/admin/toolType/create', this.createFrom, {
                headers: { token: this.token }
            })
                .then(response => {
                    if (response.data.code === 200) {
                        this.$vs.notify({
                            title: '提示',
                            text: '创建成功',
                            color: 'success'
                        })
                        this.GetClassifyList()
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
                    text: '请填写完整的类型名称',
                    color: 'red'
                })
                return false
            }
            return true
        },
        // 编辑表单验证
        editFormVarify() {
            if (this.editForm.name === this.activeClassfiy.name && this.editForm.color === this.activeClassfiy.color) {
                this.$vs.notify({
                    title: '提示',
                    text: '请做出修改后再提交',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.name === '' || this.editForm.color === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写完整的分类信息',
                    color: 'red'
                })
                return false
            }
            return true
        }
    },
    mounted() {
        this.GetToolTypeList()
    }
}
</script>

<style lang="less" scoped></style>