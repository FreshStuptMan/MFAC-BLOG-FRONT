<template>
  <div>
    <div style="width: 1400px;height: 650px;position: relative;left: 50%;margin-left: -700px;background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px;">
        <!-- 搜索表单 -->
        <div style="display: flex;padding-left: 25px;padding-top: 10px;width: 920px;height: 75px;">
            <!-- 博客标题 -->
            <vs-input width="150px" label="博客标题"  icon-pack="fa" icon="fa-search" placeholder="博客名称" v-model="SearchForm.name"/>
            <!-- 博客分类 -->
            <vs-select placeholder="博客分类" width="150px" style="margin-left: 5px;" label="博客分类" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.classifyId">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options" />
            </vs-select>
            <!-- 博客标签 -->
            <vs-select placeholder="博客标签" width="150px" style="margin-left: 5px;" label="博客标签" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.tagId">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options" />
            </vs-select>
            <!-- 博客状态 -->
            <vs-select placeholder="博客状态" width="100px" style="margin-left: 5px;" label="博客状态" icon-pack="fa" icon="fa-angle-down" v-model="SearchForm.status">
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options" />
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

                        <vs-td style="text-align: center;" :data="blog.type">
                            {{ blog.type === 1 ? '转载' : '原创' }}
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
            <vs-pagination style="margin-top: 20px;" prev-icon="fa-angle-double-left"
                next-icon="fa-angle-double-right" icon-pack="fa" :total="30" :max="pageSize" v-model="pageNum">
            </vs-pagination>
        </div>
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
                tagId: null,
                classifyId: null,
                status: null,
            },
            // Select测试数据
            options:[
                {text:'IT',value:0},
                {text:'Blade Runner',value:2},
                {text:'Thor Ragnarok',value:3},
            ],
            // 表格测试数据
            blogs: [{
                id: 1,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 2,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 3,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 4,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 5,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 6,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 1,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 3,
            },{
                id: 7,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 1,
            },{
                id: 8,
                title: '博客标题博客标题博客标题',
                classifyName: '博客分类博客分类',
                type: 0,
                authorName: '作者名称作者名称作者名称',
                createTime: '2024-12-21 12:33:33',
                updateTime: '2024-12-21 12:33:33',
                status: 2,
            }],
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
        // 编辑博客
        handleEdit(blog) {
            this.$emit('edit-blog')
            console.log("编辑博客")
        },
        // 发布博客
        handleUp(blog) {
            console.log("发布博客")
        },
        // 下架博客
        handleDown(blog) {
            console.log("下架博客")
        },
        // 删除博客
        handleDelete(blog) {
            console.log("删除博客")
        },
        // 创建博客
        handleCreate() {
            this.$emit('create-blog')
        }
    }
}
</script>

<style lang="less" scoped>
</style>