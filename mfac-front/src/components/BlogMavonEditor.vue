<template>
    <div style="height: 800px;">
        <mavon-editor 
            ref="md"
            style="height: 100%;" 
            :toolbars="toolbars" 
            codeStyle='idea'
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            v-model="content">
        </mavon-editor>
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
            // 主体内容
            content: '',
            // 图片数组
            img_file: {},
            // 配置项
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: false, // 保存（触发events中的save事件）
                navigation: true, // 导航目录
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    methods: {
        // 创建时初始化
        init() {
            this.content = '',
            this.img_file = {}
        },
        // 更新时初始化
        initForUpdate(content) {
            // console.log("content: "+content)
            this.content = content
        },
        // 添加图片
        $imgAdd(pos, $file) {
            this.img_file[pos] = $file
        },
        // 移除图片
        $imgDel(pos){
            delete this.img_file[pos]
        },
        // 统一上传图片
        async uploadimg($e){
            return new Promise((resolve, reject) => { 
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                for(var _img in this.img_file){
                    formdata.append(_img, this.img_file[_img])
                }
                axios({
                    url: 'api/admin/file/batchImages',
                    method: 'post',
                    data: formdata,
                    headers: {
                        'token': this.token,
                        'Content-Type': 'multipart/form-data' 
                    },
                }).then((res) => {
                    /**
                     * 返回数据为 res = [[pos, url], [pos, url]...]
                     * pos 为原图片标志（0）
                     * url 为上传后图片的url地址
                     */
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    for (var img in res.data.data) {
                        this.$refs.md.$img2Url(img, res.data.data[img])
                    }
                    resolve()
                })
            })
        },
        // 获取主体内容
        async getContent() {
            await this.uploadimg()
            return this.content
        },
        // 清空内容
        clearContent() {
            this.content = ''
            this.img_file = {}
        }

    }
}
</script>

<style></style>