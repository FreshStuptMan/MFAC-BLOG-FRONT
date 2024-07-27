<template>
    <div>
        <!-- Quill文本编辑器 -->
        <div style="min-height: 600px;max-height: auto;" ref="editor" class="ql-container"></div>
        <div>
            <el-upload action="/api/admin/file/image" :headers="headers" :on-success="handleUploadSuccess" name="file" :show-file-list="false"
                style="display: none" ref="upload" v-if="this.uploadUrl">
            </el-upload>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
    computed: {
        token() {
            return this.$store.state.user.userInfo.token ? this.$store.state.user.userInfo.token : ''
        },
        headers() {
            return {token: this.token}
        }
    },
    data() {
        return {
            uploadUrl: 'api/image',
            Quill: null,//quill实例
            currentValue: "",
            options: {
                theme: "snow",//主题
                bounds: document.body,
                debug: "warn",
                modules: {
                    // 工具栏配置
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
                        ["blockquote", "code-block"],                    // 引用  代码块
                        [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
                        [{ indent: "-1" }, { indent: "+1" }],            // 缩进
                        [{ size: ["small", false, "large", "huge"] }],   // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
                        [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
                        [{ align: [] }],                                 // 对齐方式
                        ["clean"],                                       // 清除文本格式
                        ["link", "image"]                                // 链接、图片
                    ],
                },
                placeholder: "请输入内容",
                readOnly: this.readOnly,//只读
            },

        }
    },
    methods: {
        init() {
            const editor = this.$refs.editor;//dom元素
            //创建
            this.Quill = new Quill(editor, this.options);
            // 定义图片上传事件
            if (this.uploadUrl) {
                let toolbar = this.Quill.getModule("toolbar");
                toolbar.addHandler("image", (value) => {
                    if (value) {
                        this.$refs.upload.$children[0].$refs.input.click();
                    } else {
                        this.quill.format("image", false);
                    }
                });
            }
            //赋值，显示内容
            this.Quill.clipboard.dangerouslyPasteHTML(this.currentValue);
            //修改内容后，得到显示内容
            this.Quill.on("text-change", (delta, oldDelta, source) => {
                const html = this.$refs.editor.children[0].innerHTML;
                const text = this.Quill.getText();
                const quill = this.Quill;
                this.currentValue = html;
            })
        },
        handleUploadSuccess(res, file) {
            // 获取富文本组件实例
            let quill = this.Quill;
            // 如果上传成功
            console.log(res)
            if (res.code === 200) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  res.url为服务器返回的图片地址
                quill.insertEmbed(length, "image", res.data)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                this.$vs.notify({
                    title: '提示',
                    text: res.msg,
                    color: 'red'
                })
            }
        },
        getContent() {
            return this.currentValue
        },
        clearContent() {
            this.currentValue = ""
            this.Quill.clipboard.dangerouslyPasteHTML(this.currentValue)
        },
        initForUpdate(content) {
            this.currentValue = content
            this.init()
        }
    }
}
</script>

<style></style>