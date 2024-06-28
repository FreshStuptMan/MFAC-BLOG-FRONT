<template>
    <div @click="handleClick">
        <!-- 博客块 -->
        <div style="width: 800px;height: 300px;margin-top: 20px;position: relative;left: 50%;margin-left: -400px;">
            <vs-card style="height: 300px;" actionable class="cardx">
                <div slot="header">
                    <vs-row vs-align="flex-end" style="width: 100%;height: 100%;" vs-type="flex"
                        vs-justify="space-between" vs-w="12">
                        <vs-col style="height: 100%;" vs-type="flex" vs-align="center" vs-w="6">
                            <span style="margin-left: 30px;font-weight: bold;font-size: 20px;">博客标题博客标题博客标题</span>
                        </vs-col>
                        <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                            <vs-button style="margin-right: 15px;" color="#c72a75" size="small"
                                type="filled">博客分类</vs-button>
                            <vs-button color="#c72a75" size="small" type="line">转载</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
                <div style="margin-top: 10px;" slot="media">
                    <vs-row vs-type="flex" vs-justify="space-around">
                        <vs-col style="width: 350px;height: 170px;" vs-type="flex"
                            vs-justify="center" vs-align="center" vs-w="6">
                            <img style=" box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 300px;height: 150px;border-radius: 5px;" src="https://picsum.photos/350/170">
                        </vs-col>
                        <vs-col style="width: 350px;height: 170px;" vs-type="flex" vs-w="6">
                            <p class="blog-description">
                                博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述
                                博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描述博客描
                            </p>
                        </vs-col>
                    </vs-row>
                </div>
                <div style="width: 100%;height: 60px;">
                    <vs-row vs-type="flex" vs-justify="space-around">
                        <vs-col vs-type="flex" vs-align="center" vs-w="4">
                            <vs-avatar size="40px" style="margin-left: 20px;"
                                src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4" />
                            作者名称作者名称作者名称
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                            <vs-icon icon-pack="fa" size="14px" icon="fa-calendar" color="#c72a75"
                                style="margin-right: 3px;"></vs-icon>
                            <span style="font-size: 14px;">2024-6-25 12:35:54</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="5">
                            <vs-button color="#c72a75"  line-position="top" type="line" style="margin-right: 5px;">博客标签</vs-button>
                            <vs-button color="#c72a75"  line-position="top" type="line" style="margin-right: 5px;">博客标签</vs-button>
                            <vs-button color="#c72a75"  line-position="top" type="line" style="margin-right: 5px;">博客标签</vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-card>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // 点击前往博客详情
        handleClick() {
            console.log("前往博客详情")
        }
    }
}
</script>

<style lang="less" scoped>
.blog-description{
  text-indent: 2em; /* 首行缩进 */
  display: -webkit-box;
  -webkit-line-clamp: 7; /* 限制显示6行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 10px;
  opacity: 0.6;
  height: 130px;
  text-overflow: ellipsis;
}
</style>