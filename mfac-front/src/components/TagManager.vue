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
                <vs-pagination style="margin-top: 20px;" prev-icon="fa-angle-double-left"
                    next-icon="fa-angle-double-right" icon-pack="fa" :total="30" :max="pageSize" v-model="pageNum">
                </vs-pagination>
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
        </div>
    </div>
</template>

<script>
export default {
    watch: {
        pageNum(newValue, oldValue) {
            console.log("进行分页")
        }
    },
    data() {
        return {
            // 搜索表单
            SearchForm: {
                name: '',
            },
            // Select测试数据
            options: [
                { text: 'IT', value: 0 },
                { text: 'Blade Runner', value: 2 },
                { text: 'Thor Ragnarok', value: 3 },
            ],
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
            // 分页参数
            pageNum: 1,
            pageSize: 8
        }
    },
    methods: {
        // 搜索
        handleSearch() {
            console.log("搜索博客")
        },
        // 重置搜索表单
        handleReset() {
            console.log("重置搜索表单")
        },
        // 编辑标签
        handleEdit(tag) {
            console.log("编辑标签")
            this.editPopVis = true
        },
        // 确定编辑
        acceptEdit() {
            console.log("确定编辑")
            this.editPopVis = false
        },
        // 取消编辑
        cancelEdit() {
            console.log("取消编辑")
            this.editPopVis = false
        },
        // 删除标签
        handleDelete(tag) {
            console.log("删除标签")
        },
        // 创建标签
        handleCreate() {
            this.createFrom.name = '标签名称'
            this.createFrom.color = '#c72a75'
            this.craetePopVis = true
        },
        // 确认创建
        acceptCreate() {
            console.log("确认创建")
            this.craetePopVis = false
        },
        // 取消创建
        cancelCreate() {
            console.log("取消创建")
            this.craetePopVis = false
        }
    }
}
</script>

<style lang="less" scoped></style>