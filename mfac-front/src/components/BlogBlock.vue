<template>
    <div @click="handleClick">
        <!-- 博客块 -->
        <div style="width: 800px;height: 300px;margin-top: 20px;position: relative;left: 50%;margin-left: -400px;">
            <vs-card style="height: 300px;" actionable class="cardx">
                <div slot="header">
                    <vs-row vs-align="flex-end" style="width: 100%;height: 100%;" vs-type="flex"
                        vs-justify="space-between" vs-w="12">
                        <vs-col style="height: 100%;" vs-type="flex" vs-align="center" vs-w="6">
                            <span style="margin-left: 30px;font-weight: bold;font-size: 20px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ blog.title }}</span>
                        </vs-col>
                        <!-- <vs-col style="height: 100%;" vs-type="flex" vs-justify="center" vs-align="center" vs-w="1">
                            <vs-button style="margin-right: 15px;" color="#c72a75" size="small"
                                type="filled">{{ blog.classifyName }}</vs-button>
                        </vs-col> -->
                        <div>
                            <vs-button style="margin-right: 15px;" color="#c72a75" size="small"
                                type="filled">{{ blog.classifyName }}
                            </vs-button>
                            <vs-button color="#c72a75" size="small" type="line">
                                {{ blog.types === 1 ? '转载' : '原创' }}
                            </vs-button>
                        </div>
                    </vs-row>
                </div>
                <div style="margin-top: 10px;" slot="media">
                    <vs-row vs-type="flex" vs-justify="space-around">
                        <vs-col style="width: 350px;height: 170px;" vs-type="flex"
                            vs-justify="center" vs-align="center" vs-w="6">
                            <img style=" box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 300px;height: 150px;border-radius: 5px;" :src="blog.avatar">
                        </vs-col>
                        <vs-col style="width: 350px;height: 170px;" vs-type="flex" vs-w="6">
                            <p class="blog-description">
                                {{ blog.description }}
                            </p>
                        </vs-col>
                    </vs-row>
                </div>
                <div style="width: 100%;height: 60px;">
                    <vs-row vs-type="flex" vs-justify="space-around">
                        <vs-col vs-type="flex" vs-align="center" vs-w="2">
                            <vs-avatar size="40px" style="margin-left: 20px;"
                                :src="blog.authorAvatar" />
                            {{ blog.authorName }}
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                            <vs-icon icon-pack="fa" size="10px" icon="fa-calendar" color="#c72a75"
                                style="margin-right: 6px;"></vs-icon>
                            <vs-tooltip color="rgb(199,42,117)" position="bottom" style="margin-right: 50px;margin-top: 3px" text="发布时间">
                                <span style="font-size: 13px;">{{ blog.publishTime }}</span>
                            </vs-tooltip>
                            <vs-icon icon-pack="fa" size="10px" icon="fa-pencil" color="#c72a75"
                                style="margin-right: 4px;"></vs-icon>
                            <vs-tooltip color="rgb(199,42,117)" position="bottom" style="margin-right: 50px;margin-top: 3px" text="更新时间">
                                <span style="font-size: 13px;margin-top: 3px">{{ blog.updateTime }}</span>
                            </vs-tooltip>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="4">
                            <vs-button v-for="tag in blog.tags" :key="tag.id" :color="tag.color" 
                                line-position="top" type="line" style="margin-right: 5px;">
                                {{ tag.name }}
                            </vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-card>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blog'],
    methods: {
        // 点击前往博客详情
        handleClick() {
            console.log("前往博客详情")
            this.$router.push(`/BlogDetail/${this.blog.id}`)
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