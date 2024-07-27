<template>
    <div>
        <div
            style="border-radius: 20px;width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
            <!-- 搜索表单 -->
            <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
                <!-- 工具名称 -->
                <vs-input width="150px" label="工具名称" icon-pack="fa" icon="fa-search" placeholder="工具类型名称"
                    v-model="SearchForm.name" />
                <!-- 工具类型 -->
                <vs-select placeholder="工具类型" width="150px" style="margin-left: 5px;" label="工具类型" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.toolTypeId">
                    <vs-select-item :key="toolType.id" :value="toolType.id" :text="toolType.name" v-for="toolType in toolTypes" />
                </vs-select>
                <!-- 搜索 -->
                <vs-button @click="handleSearch" size="small"
                    style="width: 75px;height: 35px;margin-right: 5px;margin-left: 10px;margin-top: 15px;"
                    color="#c72a75" type="filled">搜索工具</vs-button>
                <!-- 重置 -->
                <vs-button @click="handleReset" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">重置</vs-button>
                <!-- 创建 -->
                <vs-button @click="handleCreate" size="small"
                    style="width: 75px;height: 35px;margin-left: 5px;margin-top: 15px;" color="#c72a75"
                    type="filled">创建工具</vs-button>
            </div>
            <!-- 主体表格 -->
            <div
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width: 1200px;height: 500px;position: relative;margin-left: -600px;left: 50%;">
                <vs-table max-items="3" :data="tools" style="padding-top: 20px;height: 100%;">
                    <template slot="thead">
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">工具名称</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">所属类型</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建者</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">颜色</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">创建时间</h4>
                        </vs-th>
                        <vs-th>
                            <h4 style="width: 100%;text-align: center;">操作</h4>
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :key="tool.id" v-for="tool in data">

                            <vs-td style="text-align: center;" :data="tool.name">
                                {{ tool.name }}
                            </vs-td>
                            <vs-td style="text-align: center;" :data="tool.toolTypeName">
                                {{ tool.toolTypeName }}
                            </vs-td>
                            <vs-td style="text-align: center;" :data="tool.creatorName">
                                {{ tool.creatorName }}
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tool.color">
                                <input type="color" v-model="tool.color" disabled>
                            </vs-td>

                            <vs-td style="text-align: center;" :data="tool.createTime">
                                {{ tool.createTime }}
                            </vs-td>
                            <vs-td style="text-align: center;" :data="tool">
                                <vs-button @click="handleEdit(tool)" color="danger" type="line">编辑</vs-button>
                                <vs-button @click="handleDelete(tool)" color="danger" type="line">删除</vs-button>
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
            <vs-popup title="创建工具" :active.sync="craetePopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具名称"
                        v-model="createFrom.name" />
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具链接"
                        v-model="createFrom.link" />
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具图标"
                        v-model="createFrom.avatar" />
                    <vs-select placeholder="工具类型" width="150px" style="margin-left: 5px;" label="工具类型" icon-pack="fa" icon="fa-angle-down" v-model="createFrom.toolTypeId">
                        <vs-select-item :key="toolType.id" :value="toolType.id" :text="toolType.name" v-for="toolType in toolTypes" />
                    </vs-select>
                    <input style="margin-top: 6px;margin-left: 5px;" type="color" v-model="createFrom.color">
                    <!-- 工具描述 -->
                    <div style="width: 100%;padding-right: 30px;padding-bottom: 20px;padding-top: 10px;">
                        <vs-textarea counter="100" label="工具描述: 100" :counter-danger.sync="counterDanger" v-model="createFrom.description" />
                    </div>
                    <vs-button @click="autoSetToolAvatar('create')" style="float: right;" color="danger" type="line">自动设置工具图标</vs-button>
                </div>
                <div style="width: 100%;">
                    <vs-button @click="acceptCreate" style="float: right;" color="danger" type="line">创建</vs-button>
                    <vs-button @click="cancelCreate" style="float: right;" color="danger" type="line">取消</vs-button>
                </div>
            </vs-popup>
            <!-- 编辑表单弹窗 -->
            <vs-popup title="编辑工具" :active.sync="editPopVis" :button-close-hidden="true">
                <div>
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具名称"
                        v-model="editForm.name" />
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具链接"
                        v-model="editForm.link" />
                    <vs-input style="float: left;width: 50%;margin: 10px;margin-top: 5px;" placeholder="工具图标"
                        v-model="editForm.avatar" />
                    <vs-select placeholder="工具类型" width="150px" style="margin-left: 5px;" label="工具类型" icon-pack="fa" icon="fa-angle-down" v-model="editForm.toolTypeId">
                        <vs-select-item :key="toolType.id" :value="toolType.id" :text="toolType.name" v-for="toolType in toolTypes" />
                    </vs-select>
                    <!-- 工具描述 -->
                    <div style="width: 100%;padding-right: 30px;padding-bottom: 20px;padding-top: 10px;">
                        <vs-textarea counter="100" label="工具描述: 100" :counter-danger.sync="counterDanger" v-model="editForm.description" />
                    </div>
                    <vs-button @click="autoSetToolAvatar('update')" style="float: right;" color="danger" type="line">自动设置工具图标</vs-button>
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
                    <vs-button @click="acceptDelete" style="margin-right: 10px;" color="danger"
                        type="filled">确定</vs-button>
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
                name: '',
                toolTypeId: null
            },
            // 表格数据
            tools: [],
            // 工具类型列表
            toolTypes: [],
            // 创建表单
            createFrom: {
                name: '',
                link: '',
                description: '',
                avatar: '',
                color: '',
                toolTypeId: null
            },
            // 创建表单弹窗控制
            craetePopVis: false,
            // 编辑表单
            editForm: {
                name: '',
                link: '',
                description: '',
                avatar: '',
                toolTypeId: null
            },
            // 编辑表单窗口控制
            editPopVis: false,
            // 被选择的工具
            activeTool: {},
            // 删除的二次确认弹窗控制 
            deletePopVis: false,
            // 分页参数
            pageNum: 1,
            pageSize: 8,
            total: 0,
            counterDanger: false
        }
    },
    methods: {
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.GetToolList()
        },
        // 搜索
        handleSearch() {
            this.GetToolList()
        },
        // 重置搜索表单
        handleReset() {
            this.SearchForm.name = ''
            this.SearchForm.toolTypeId = null
            this.GetToolList()
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
        // 获取工具列表
        GetToolList() {
            Loading.service({
                lock: true,
                text: '数据加载中，请稍等。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(255,255,255)',
                fullscreen: true
            })
            axios.post('/api/admin/tool/list', {
                name: this.SearchForm.name,
                toolTypeId: this.SearchForm.toolTypeId,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }, {
                headers: { token: this.token }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.tools = response.data.data.records
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

        // 编辑工具
        handleEdit(tool) {
            console.log(tool)
            this.activeTool = tool
            this.editForm.name = tool.name
            this.editForm.link = tool.link
            this.editForm.description = tool.description
            this.editForm.avatar = tool.avatar
            this.editForm.toolTypeId = tool.toolTypeId
            this.editPopVis = true
        },
        // 确定编辑
        acceptEdit() {
            if (!this.editFormVarify()) {
                return
            }
            axios.post('/api/admin/tool/update', {
                id: this.activeTool.id,
                name: this.editForm.name,
                link: this.editForm.link,
                description: this.editForm.description,
                avatar: this.editForm.avatar,
                toolTypeId: this.editForm.toolTypeId
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
                    this.GetToolList()
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



        // 删除工具
        handleDelete(tool) {
            this.activeTool = tool
            this.deletePopVis = true
        },
        // 确定删除
        acceptDelete() {
            axios.delete(`/api/admin/tool/delete/${this.activeTool.id}`, {
                headers: { token: this.token }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '删除成功',
                        color: 'success'
                    })
                    this.GetToolList()
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
            this.activeTool = {}
            this.deletePopVis = false
        },


        // 创建工具
        handleCreate() {
            this.createFrom.name = ''
            this.createFrom.link = ''
            this.createFrom.description = ''
            this.createFrom.avatar = '',
            this.createFrom.color = ''
            this.createFrom.toolTypeId = null
            this.craetePopVis = true
        },
        // 确认创建
        acceptCreate() {
            if (!this.createFormVarify()) {
                return
            }
            axios.post('/api/admin/tool/create', this.createFrom, {
                headers: { token: this.token }
            })
            .then(response => {
                if (response.data.code === 200) {
                    this.$vs.notify({
                        title: '提示',
                        text: '创建成功',
                        color: 'success'
                    })
                    this.GetToolList()
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

        // 自动设置工具图标
        autoSetToolAvatar(ops) {
            if(ops === 'create') {
                if(this.createFrom.link === '' || this.createFrom.link === null) {
                    this.$vs.notify({
                        title: '提示',
                        text: '请先填写工具链接',
                        color: 'red'
                    })
                    return
                }
                this.createFrom.avatar = this.createFrom.link + '/favicon.ico'
                return
            }

            if(ops === 'update') {
                if(this.editForm.link === '' || this.editForm.link === null) {
                    this.$vs.notify({
                        title: '提示',
                        text: '请先填写工具链接',
                        color: 'red'
                    })
                    return
                }
                this.editForm.avatar = this.editForm.link + '/favicon.ico'
                return
            }
        },

        // 创建表单验证
        createFormVarify() {
            if (this.createFrom.name === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具名称',
                    color: 'red'
                })
                return false
            }
            if (this.createFrom.link === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具链接',
                    color: 'red'
                })
                return false
            }
            if (this.createFrom.avatar === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具图标',
                    color: 'red'
                })
                return false
            }
            if (this.createFrom.description === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具描述',
                    color: 'red'
                })
                return false
            }
            if (this.createFrom.toolTypeId === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择工具类型',
                    color: 'red'
                })
                return false
            }
            if (this.createFrom.color === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择颜色',
                    color: 'red'
                })
                return false
            }
            if(this.createFrom.description.length > 100) {
                this.$vs.notify({
                    title: '提示',
                    text: '描述不能超过100字',
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
                    text: '请填写工具名称',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.link === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具链接',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.avatar === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具图标',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.description === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请填写工具描述',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.toolTypeId === null) {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择工具类型',
                    color: 'red'
                })
                return false
            }
            if (this.editForm.color === '') {
                this.$vs.notify({
                    title: '提示',
                    text: '请选择颜色',
                    color: 'red'
                })
                return false
            }
            if(this.editForm.description.length > 100) {
                this.$vs.notify({
                    title: '提示',
                    text: '描述不能超过100字',
                    color: 'red'
                })
                return false
            }
            return true
        }
    },
    mounted() {
        this.GetToolList()
        this.GetToolTypeList()
    }
}
</script>

<style lang="less" scoped></style>